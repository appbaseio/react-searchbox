import React from 'react';
import SuggestionWrapper from '../addons/SuggestionsWrapper';

const Loader = props => {
  const {
    loader,
    isLoading,
    themePreset,
    theme,
    innerClass,
    currentValue
  } = props;
  if (isLoading && loader && currentValue) {
    return (
      <SuggestionWrapper
        innerClass={innerClass}
        innerClassName="loader"
        theme={theme}
        themePreset={themePreset}
      >
        {loader}
      </SuggestionWrapper>
    );
  }
  return null;
};

export default Loader;
