import React from 'react';
import { getClassName } from '../utils/helper';

const SuggestionWrapper = ({ children, innerClassName, innerClass }) => (
  <div className={getClassName(innerClass, innerClassName || '')}>
    {children}
  </div>
);

export default SuggestionWrapper;
