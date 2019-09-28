import React from 'react';
import { getClassName } from '../utils/helper';
import { noSuggestions } from '../components/Input';

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
    <li>{children}</li>
  </div>
);

export default SuggestionWrapper;
