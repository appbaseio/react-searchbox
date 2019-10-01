import React from 'react';
import CancelSvg from '../styles/CancelSvg';
import InputIcon from '../styles/InputIcon';
import SearchSvg from '../styles/SearchSvg';
import { getClassName } from '../utils/helper';
import Mic from './Mic';

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
    <div>
      {currentValue && showClear && (
        <InputIcon
          onClick={clearValue}
          iconPosition='right'
          clearIcon={iconPosition === 'right'}
          theme={theme}
        >
          {clearIcon || <CancelSvg />}
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
    </div>
  );
};

export default Icons;
