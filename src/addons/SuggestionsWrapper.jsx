/** @jsx jsx */
import { jsx } from '@emotion/core';
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
    css={noSuggestions(themePreset, theme)}
    className={getClassName(innerClass, innerClassName || '')}
  >
    <div>{children}</div>
  </div>
);

export default SuggestionWrapper;
