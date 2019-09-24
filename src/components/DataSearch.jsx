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
  react
} from '../utils/types';

class DataSearch extends Component {
  render() {
    return <div></div>;
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
  react
};

DataSearch.defaultProps = {
  showIcon: true,
  iconPosition: 'right',
  showClear: false,
  autoSuggest: true,
  strictSelection: false,
  debounce: 0,
  highlight: false,
  queryFormat: 'or',
  showVoiceSearch: false,
  searchOperators: false
};

export default DataSearch;
