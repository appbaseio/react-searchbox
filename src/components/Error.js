import React from 'react';
import SuggestionWrapper from '../addons/SuggestionsWrapper';
import { isFunction } from '../utils/helper';

const Error = props => {
  const { error, renderError, isLoading, innerClass, currentValue } = props;
  if (error && renderError && currentValue && !isLoading) {
    return (
      <SuggestionWrapper innerClass={innerClass} innerClassName="error">
        {isFunction(renderError) ? renderError(error) : renderError}
      </SuggestionWrapper>
    );
  }
  return null;
};

export default Error;
