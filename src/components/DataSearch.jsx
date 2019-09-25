import React, { Component } from 'react';
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
  react,
  themePreset
} from '../utils/types';
import Input, { suggestionsContainer } from './Input';
import Container from '../styles/Container';
import Title from '../styles/Title';
import { getClassName, getComponent, hasCustomRenderer } from '../utils/helper';
import Downshift from 'downshift';
import Icons from './Icons';
import Loader from './Loader';
import Error from './Error';
import SuggestionItem from '../addons/SuggestionItem';
import NoSuggestions from './NoSuggestions';

class DataSearch extends Component {
  constructor(props) {
    super(props);
    const currentValue = props.value || props.defaultValue || '';

    this.state = {
      currentValue,
      suggestions: [],
      isOpen: false
    };
  }

  getComponent = (downshiftProps = {}) => {
    const { error, isLoading } = this.props;
    const { currentValue } = this.state;
    const data = {
      error,
      loading: isLoading,
      downshiftProps,
      data: this.parsedSuggestions,
      rawData: suggestions || [],
      value: currentValue,
      triggerClickAnalytics: this.triggerClickAnalytics
    };
    return getComponent(data, this.props);
  };
  get hasCustomRenderer() {
    return hasCustomRenderer(this.props);
  }

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
      renderNoSuggestion
    } = this.props;
    const { isOpen, currentValue, isLoading, error } = this.state;
    const suggestionsList = this.parseSuggestions;
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
              ...rest
            }) => (
              <div className={suggestionsContainer}>
                <Input
                  id="search-box"
                  showIcon={showIcon}
                  showClear={showClear}
                  iconPosition={iconPosition}
                  innerRef={c => {
                    this._inputRef = c;
                  }}
                  {...getInputProps({
                    className: getClassName(innerClass, 'input'),
                    placeholder: placeholder,
                    value: currentValue === null ? '' : currentValue
                    // onChange: this.onInputChange,
                    // onBlur: this.withTriggerQuery(onBlur),
                    // onFocus: this.handleFocus,
                    // onKeyPress: this.withTriggerQuery(onKeyPress),
                    // onKeyDown: e => this.handleKeyDown(e, highlightedIndex),
                    // onKeyUp: this.withTriggerQuery(onKeyUp)
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
                    className={`${suggestions(
                      themePreset,
                      theme
                    )} ${getClassName(innerClass, 'list')}`}
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
          <div className={suggestionsContainer}>
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
            {this.renderIcons()}
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
  showVoiceSearch: bool,
  searchOperators: bool,
  render: func,
  renderError: func,
  renderNoSuggestion: title,
  getMicInstance: func,
  renderMic: func,
  onChange: func,
  onSuggestions: func,
  onError: func,
  innerClass: object,
  style: object,
  customQuery: object,
  defaultQuery: object,
  beforeValueChange: func,
  onValueSelected: func,
  onQueryChange: func,
  react,
  theme: object,
  className: string,
  loader: object,
  onBlur: func,
  onKeyPress: func,
  onKeyUp: func,
  themePreset,
  onFocus: func,
  onKeyDown: func,
  autoFocus: bool
};

DataSearch.defaultProps = {
  analytics: false,
  showIcon: true,
  iconPosition: 'right',
  showClear: false,
  autoSuggest: true,
  strictSelection: false,
  debounce: 0,
  highlight: false,
  queryFormat: 'or',
  showVoiceSearch: false,
  searchOperators: false,
  className: '',
  themePreset: 'light',
  autoFocus: false,
  downShiftProps: {},
  theme: {
    typography: 'Object',
    colors: {
      textColor: '#424242',
      primaryTextColor: '#fff',
      primaryColor: '#0B6AFF',
      titleColor: '#424242',
      alertColor: '#d9534f'
    },
    component: 'Object'
  }
};

export default DataSearch;
