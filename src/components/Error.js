import React from 'react';
import SuggestionWrapper from '../addons/SuggestionsWrapper';
import { isFunction } from '../utils/helper';

const Error = props => {
  const {
    error,
    renderError,
    themePreset,
    theme,
    isLoading,
    innerClass,
    currentValue
  } = props;
  if (error && renderError && currentValue && !isLoading) {
    return (
      <SuggestionWrapper
        innerClass={innerClass}
        innerClassName="error"
        theme={theme}
        themePreset={themePreset}
      >
        {isFunction(renderError) ? renderError(error) : renderError}
      </SuggestionWrapper>
    );
  }
  return null;
};

export default Error;
