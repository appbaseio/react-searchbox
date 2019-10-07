import React from 'react';
import SuggestionWrapper from '../addons/SuggestionsWrapper';

const NoSuggestions = props => {
  const {
    isLoading,
    renderNoSuggestion,
    innerClass,
    error,
    renderError,
    suggestionsList,
    isOpen,
    currentValue
  } = props;

  if (
    renderNoSuggestion &&
    isOpen &&
    !suggestionsList.length &&
    !isLoading &&
    currentValue &&
    !(renderError && error)
  ) {
    return (
      <SuggestionWrapper
        innerClass={innerClass}
        innerClassName='noSuggestion'
      >
        {typeof renderNoSuggestion === 'function'
          ? renderNoSuggestion(currentValue)
          : renderNoSuggestion}
      </SuggestionWrapper>
    );
  }
  return null;
};

export default NoSuggestions;
