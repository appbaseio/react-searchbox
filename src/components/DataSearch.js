/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Component } from 'react';
import {
  bool,
  string,
  object,
  number,
  func,
  dataField,
  position,
  suggestions,
  highlightField,
  queryFormat,
  fuzziness,
  title,
  any,
  themePreset
} from '../utils/types';
import Input, {
  suggestionsContainer,
  suggestions as suggestionsCss
} from './Input';
import Container from '../styles/Container';
import Title from '../styles/Title';
import {
  deepGet,
  getClassName,
  getComponent,
  hasCustomRenderer
} from '../utils/helper';
import Downshift from 'downshift';
import Icons from './Icons';
import Loader from './Loader';
import Error from './Error';
import SuggestionItem from '../addons/SuggestionItem';
import NoSuggestions from './NoSuggestions';
import Searchbase from '@appbaseio/searchbase';

class DataSearch extends Component {
  constructor(props) {
    super(props);
    const {
      index,
      url,
      dataField,
      credentials,
      analytics,
      headers,
      nestedField,
      defaultQuery,
      beforeValueChange,
      queryFormat,
      defaultSuggestions,
      fuzziness,
      searchOperators,
      onChange,
      onQueryChange,
      onValueChange,
      onSuggestions,
      onError,
      onResults
    } = props;
    const currentValue = props.value || props.defaultValue || '';

    this.state = {
      currentValue,
      suggestionsList: [],
      isOpen: false,
      error: null
    };

    const transformQuery = query => {
      if (defaultQuery) return defaultQuery(query, this.state.currentValue);
      return query;
    };

    this.searchBase = new Searchbase({
      index,
      url,
      dataField,
      credentials,
      analytics,
      headers,
      nestedField,
      transformQuery,
      beforeValueChange,
      queryFormat,
      suggestions: defaultSuggestions,
      fuzziness,
      searchOperators
    });

    this.searchBase.subscribeToStateChanges(this.setStateValue, [
      'suggestions'
    ]);

    this.searchBase.onQueryChange = onQueryChange;
    this.searchBase.onValueChange = onValueChange;
    this.searchBase.onSuggestions = onSuggestions;
    this.searchBase.onError = error => {
      this.setState({ error });
      if (onError) onError(error);
    };
    this.searchBase.onResults = onResults;

    if (onChange) onChange(currentValue, this.triggerQuery);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { dataField, headers, fuzziness, nestedField } = this.props;
    this._applySetter(prevProps.dataField, dataField, 'setDataField');
    this._applySetter(prevProps.headers, headers, 'setHeaders');
    this._applySetter(prevProps.fuzziness, fuzziness, 'setFuzziness');
    this._applySetter(prevProps.nestedField, nestedField, 'setNestedField');
  }

  componentWillUnmount() {
    this.searchBase.unsubscribeToStateChanges(this.setStateValue);
  }

  _applySetter = (prev, next, setterFunc) => {
    if (prev !== next) this.searchBase[setterFunc](next);
  };

  setStateValue = ({ suggestions }) => {
    this.setState({
      suggestionsList: deepGet(suggestions, ['next', 'data']) || []
    });
  };

  getComponent = (downshiftProps = {}) => {
    const { error, isLoading } = this.props;
    const { currentValue, suggestionsList } = this.state;
    const data = {
      error,
      loading: isLoading,
      downshiftProps,
      data: suggestionsList,
      value: currentValue,
      triggerClickAnalytics: this.searchBase.triggerClickAnalytics
    };
    return getComponent(data, this.props);
  };

  get hasCustomRenderer() {
    return hasCustomRenderer(this.props);
  }

  withTriggerQuery = func => {
    if (func) {
      return e => func(e, this.triggerQuery);
    }
    return undefined;
  };

  triggerQuery = () => {
    this.searchBase.setValue(this.props.value, {
      triggerQuery: true
    });
  };

  onInputChange = event => {
    this.setValue({ value: event.target.value, event });
  };

  setValue = ({ value, isOpen = true, ...rest }) => {
    if (this.props.value) {
      if (this.props.onChange)
        this.props.onChange(value, this.triggerQuery, rest.event);
      return;
    }
    this.setState({ isOpen, currentValue: value });
    this.searchBase.setValue(value, {
      triggerSuggestionsQuery: true
    });
  };

  getBackgroundColor = (highlightedIndex, index) => {
    const isDark = this.props.themePreset === 'dark';
    if (isDark) {
      return highlightedIndex === index ? '#555' : '#424242';
    }
    return highlightedIndex === index ? '#eee' : '#fff';
  };

  handleSearchIconClick = () => {
    const { currentValue } = this.state;
    if (currentValue.trim())
      this.setValue({ value: currentValue, isOpen: false });
  };

  clearValue = () => {
    this.setValue({ value: '', isOpen: false });
  };

  onSuggestionSelected = suggestion => {
    this.setValue({ value: suggestion.value, isOpen: false });
    this.searchBase.triggerClickAnalytics(suggestion._click_id);
  };

  handleStateChange = changes => {
    const { isOpen, type } = changes;
    if (type === Downshift.stateChangeTypes.mouseUp) {
      this.setState({
        isOpen
      });
    }
  };

  handleFocus = event => {
    this.setState({
      isOpen: true
    });
    if (this.props.onFocus) {
      this.props.onFocus(event, this.triggerQuery);
    }
  };

  render() {
    const {
      style,
      className,
      title,
      innerClass,
      defaultSuggestions,
      autoSuggest,
      showIcon,
      showClear,
      iconPosition,
      placeholder,
      onBlur,
      onKeyPress,
      onKeyUp,
      themePreset,
      theme,
      downShiftProps,
      onFocus,
      onKeyDown,
      autoFocus,
      clearIcon,
      loader,
      renderError,
      renderNoSuggestion,
      icon,
      value,
      getMicInstance,
      renderMic,
      enableVoiceSearch
    } = this.props;
    const isLoading = this.searchBase.suggestionsRequestPending;
    const { isOpen, error, currentValue, suggestionsList } = this.state;
    return (
      <Container style={style} className={className}>
        {title && (
          <Title className={getClassName(innerClass, 'title') || null}>
            {title}
          </Title>
        )}
        {defaultSuggestions || autoSuggest ? (
          <Downshift
            id="search-box-downshift"
            onChange={this.onSuggestionSelected}
            onStateChange={this.handleStateChange}
            isOpen={isOpen}
            itemToString={i => i}
            {...downShiftProps}
          >
            {({
              getInputProps,
              getItemProps,
              isOpen,
              highlightedIndex,
              getRootProps,
              ...rest
            }) => (
              <div {...getRootProps({ css: suggestionsContainer })}>
                <Input
                  id="search-box"
                  showIcon={showIcon}
                  showClear={showClear}
                  iconPosition={iconPosition}
                  {...getInputProps({
                    className: getClassName(innerClass, 'input'),
                    placeholder: placeholder,
                    value: value
                      ? value
                      : currentValue === null
                      ? ''
                      : currentValue,
                    onChange: this.onInputChange,
                    onBlur: this.withTriggerQuery(onBlur),
                    onFocus: this.handleFocus,
                    onKeyPress: this.withTriggerQuery(onKeyPress),
                    onKeyUp: this.withTriggerQuery(onKeyUp),
                    onKeyDown: this.withTriggerQuery(onKeyDown)
                  })}
                  themePreset={themePreset}
                />
                <Icons
                  clearValue={this.clearValue}
                  iconPosition={iconPosition}
                  showClear={showClear}
                  clearIcon={clearIcon}
                  theme={theme}
                  currentValue={currentValue}
                  handleSearchIconClick={this.handleSearchIconClick}
                  icon={icon}
                  showIcon={showIcon}
                  getMicInstance={getMicInstance}
                  renderMic={renderMic}
                  innerClass={innerClass}
                  enableVoiceSearch={enableVoiceSearch}
                  onMicClick={this.searchBase.onMicClick}
                  micStatus={this.searchBase.micStatus}
                />
                {this.hasCustomRenderer &&
                  this.getComponent({
                    getInputProps,
                    getItemProps,
                    isOpen,
                    highlightedIndex,
                    ...rest
                  })}
                <Loader
                  loader={loader}
                  isLoading={isLoading}
                  themePreset={themePreset}
                  theme={theme}
                  innerClass={innerClass}
                  currentValue={currentValue}
                />
                <Error
                  error={error}
                  renderError={renderError}
                  themePreset={themePreset}
                  theme={theme}
                  isLoading={isLoading}
                  innerClass={innerClass}
                  currentValue={currentValue}
                />
                {!this.hasCustomRenderer && isOpen && suggestionsList.length ? (
                  <ul
                    css={suggestionsCss(themePreset, theme)}
                    className={getClassName(innerClass, 'list')}
                  >
                    {suggestionsList.slice(0, 10).map((item, index) => (
                      <li
                        {...getItemProps({ item })}
                        key={`${index + 1}-${item.value}`}
                        style={{
                          backgroundColor: this.getBackgroundColor(
                            highlightedIndex,
                            index
                          )
                        }}
                      >
                        <SuggestionItem
                          currentValue={currentValue}
                          suggestion={item}
                        />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <NoSuggestions
                    themePreset={themePreset}
                    theme={theme}
                    isLoading={isLoading}
                    renderNoSuggestion={renderNoSuggestion}
                    innerClass={innerClass}
                    error={error}
                    renderError={renderError}
                    suggestionsList={suggestionsList}
                    isOpen={isOpen}
                    currentValue={currentValue}
                  />
                )}
              </div>
            )}
          </Downshift>
        ) : (
          <div css={suggestionsContainer}>
            <Input
              className={getClassName(innerClass, 'input') || null}
              placeholder={placeholder}
              value={currentValue ? currentValue : ''}
              onChange={this.onInputChange}
              onBlur={this.withTriggerQuery(onBlur)}
              onFocus={this.withTriggerQuery(onFocus)}
              onKeyPress={this.withTriggerQuery(onKeyPress)}
              onKeyDown={this.withTriggerQuery(onKeyDown)}
              onKeyUp={this.withTriggerQuery(onKeyUp)}
              autoFocus={autoFocus}
              iconPosition={iconPosition}
              showIcon={showIcon}
              showClear={showClear}
              themePreset={themePreset}
            />
            <Icons
              clearValue={this.clearValue}
              iconPosition={iconPosition}
              showClear={showClear}
              clearIcon={clearIcon}
              theme={theme}
              currentValue={currentValue}
            />
          </div>
        )}
      </Container>
    );
  }
}

DataSearch.propTypes = {
  index: string.isRequired,
  url: string.isRequired,
  credentials: string.isRequired,
  analytics: bool.isRequired,
  headers: object,
  dataField: dataField,
  nestedField: string,
  title: string,
  defaultValue: string,
  value: string,
  downShiftProps: object,
  placeholder: string,
  showIcon: bool,
  iconPosition: position,
  icon: any,
  showClear: bool,
  clearIcon: any,
  autoSuggest: bool,
  strictSelection: bool,
  defaultSuggestions: suggestions,
  debounce: number,
  highlight: bool,
  highlightField,
  customHighlight: func,
  queryFormat,
  fuzziness,
  enableVoiceSearch: bool,
  searchOperators: bool,
  render: func,
  renderError: func,
  renderNoSuggestion: title,
  onChange: func,
  onValueChange: func,
  onSuggestions: func,
  onError: func,
  onResults: func,
  innerClass: object,
  style: object,
  defaultQuery: func,
  beforeValueChange: func,
  onQueryChange: func,
  theme: object,
  className: string,
  loader: object,
  onBlur: func,
  onKeyPress: func,
  onKeyUp: func,
  themePreset,
  onFocus: func,
  onKeyDown: func,
  autoFocus: bool,
  // Mic props
  getMicInstance: func,
  renderMic: func
};

DataSearch.defaultProps = {
  placeholder: 'Search',
  analytics: false,
  showIcon: true,
  iconPosition: 'right',
  showClear: false,
  autoSuggest: true,
  strictSelection: false,
  debounce: 0,
  highlight: false,
  queryFormat: 'or',
  enableVoiceSearch: false,
  searchOperators: false,
  className: '',
  themePreset: 'light',
  autoFocus: false,
  downShiftProps: {},
  theme: {
    typography: {
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Noto Sans", "Ubuntu", "Droid Sans", "Helvetica Neue", sans-serif',
      fontSize: '16px'
    },
    colors: {
      textColor: '#424242',
      primaryTextColor: '#fff',
      primaryColor: '#0B6AFF',
      titleColor: '#424242',
      alertColor: '#d9534f'
    }
  }
};

export default DataSearch;
