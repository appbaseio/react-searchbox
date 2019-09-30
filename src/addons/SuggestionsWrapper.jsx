import React from 'react';
import { getClassName } from '../utils/helper';
import { noSuggestions } from '../styles/Input';

const SuggestionWrapper = ({
  theme,
  themePreset,
  children,
  innerClassName,
  innerClass
}) => (
  <div
    className={`${noSuggestions(themePreset, theme)} ${getClassName(
      innerClass,
      innerClassName || ''
    )}`}
  >
    <div>{children}</div>
  </div>
);

export default SuggestionWrapper;
