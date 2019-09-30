import React from 'react';
import CancelSvg from '../styles/CancelSvg';
import InputIcon from '../styles/InputIcon';
import SearchSvg from '../styles/SearchSvg';
import { getClassName } from '../utils/helper';
import Mic from './Mic';

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
    icon,
    enableVoiceSearch,
    innerClass,
    renderMic,
    getMicInstance,
    onMicClick,
    micStatus
  } = props;

  return (
    <React.Fragment>
      {currentValue && showClear && (
        <InputIcon
          onClick={clearValue}
          iconPosition='right'
          clearIcon={iconPosition === 'right'}
          theme={theme}
        >
          <CancelIcon showClear={showClear} clearIcon={clearIcon} />
        </InputIcon>
      )}
      {enableVoiceSearch && (
        <Mic
          getInstance={getMicInstance}
          render={renderMic}
          iconPosition={iconPosition}
          className={getClassName(innerClass, 'mic') || null}
          onClick={onMicClick}
          status={micStatus}
        />
      )}
      <InputIcon
        theme={theme}
        onClick={handleSearchIconClick}
        iconPosition={iconPosition}
      >
        <SearchIcon showIcon={showIcon} icon={icon} />
      </InputIcon>
    </React.Fragment>
  );
};

export default Icons;
