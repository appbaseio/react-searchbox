import React from 'react';
import MicIcon from '../styles/MicIcon';
import MuteSvg from '../styles/MuteSvg';
import ListenSvg from '../styles/ListenSvg';
import MicSvg from '../styles/MicSvg';
import { hasCustomRenderer as hcr, getComponent as gc } from '../utils/helper';

const STATUS = {
  inactive: 'INACTIVE',
  stopped: 'STOPPED',
  active: 'ACTIVE',
  denied: 'DENIED'
};

const Icon = props => {
  const { className, status, onClick } = props;

  if (!window.SpeechRecognition) {
    return <MuteSvg className={className} onClick={onClick} />;
  }

  switch (status) {
    case STATUS.active:
      return <ListenSvg className={className} onClick={onClick} />;
    case STATUS.stopped:
    case STATUS.denied:
      return <MuteSvg className={className} onClick={onClick} />;
    default:
      return <MicSvg className={className} onClick={onClick} />;
  }
};

const Mic = props => {
  const { iconPosition, className, onClick, status } = props;

  const getComponent = () => {
    const data = {
      onClick,
      status
    };
    return gc(data, props);
  };

  const hasCustomRenderer = hcr(props);

  if (hasCustomRenderer) return getComponent();

  return (
    <div>
      <MicIcon iconPosition={iconPosition}>
        <Icon className={className} onClick={onClick} status={status} />
      </MicIcon>
    </div>
  );
};

export default Mic;
