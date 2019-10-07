import React from 'react';
import SuggestionWrapper from '../addons/SuggestionsWrapper';

const Loader = props => {
  const { loader, isLoading, innerClass, currentValue } = props;
  if (isLoading && loader && currentValue) {
    return (
      <SuggestionWrapper innerClass={innerClass} innerClassName="loader">
        {loader}
      </SuggestionWrapper>
    );
  }
  return null;
};

export default Loader;
