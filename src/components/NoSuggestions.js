import React from 'react';
import { Global, css } from '@emotion/core';
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
      <div>
        <Global
          styles={css`
            .no-suggestions {
              border: 1px solid #ccc;
              border-top: 0;
              font-size: 0.9rem;
              padding: 10px;
            }
          `}
        />
        <SuggestionWrapper
          className="no-suggestions"
          innerClass={innerClass}
          innerClassName="noSuggestion"
        >
          {typeof renderNoSuggestion === 'function'
            ? renderNoSuggestion(currentValue)
            : renderNoSuggestion}
        </SuggestionWrapper>
      </div>
    );
  }
  return null;
};

export default NoSuggestions;
