import React from 'react';
import CancelSvg from '../styles/CancelSvg';
import InputIcon from '../styles/InputIcon';
import SearchSvg from '../styles/SearchSvg';

const CancelIcon = props => {
  if (props.showClear) {
    return props.clearIcon || <CancelSvg />;
  }
  return null;
};

const SearchIcon = props => {
  if (props.showIcon) {
    return props.icon || <SearchSvg />;
  }
  return null;
};

const Icons = props => {
  const {
    clearValue,
    iconPosition,
    showClear,
    clearIcon,
    theme,
    currentValue,
    handleSearchIconClick,
    showIcon,
    icon
  } = props;

  return (
    <>
      {currentValue && showClear && (
        <InputIcon
          onClick={clearValue}
          iconPosition="right"
          clearIcon={iconPosition === 'right'}
          theme={theme}
        >
          <CancelIcon showClear={showClear} clearIcon={clearIcon} />
        </InputIcon>
      )}
      <InputIcon
        theme={theme}
        onClick={handleSearchIconClick}
        iconPosition={iconPosition}
      >
        <SearchIcon showIcon={showIcon} icon={icon} />
      </InputIcon>
    </>
  );
};

export default Icons;
