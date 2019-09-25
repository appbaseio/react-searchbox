import React from 'react';
import CancelSvg from '../styles/CancelSvg';
import InputIcon from '../styles/InputIcon';

const CancelIcon = props => {
  if (props.showClear) {
    return props.clearIcon || <CancelSvg />;
  }
  return null;
};

const Icons = props => {
  const { clearValue, iconPosition, showClear, clearIcon, theme, currentValue } = props;
  if (!currentValue || !showClear) return null;
  return (
    <InputIcon
      onClick={clearValue}
      iconPosition="right"
      clearIcon={iconPosition === 'right'}
      theme={theme}
    >
      <CancelIcon showClear={showClear} clearIcon={clearIcon} />
    </InputIcon>
  );
};

export default Icons;
