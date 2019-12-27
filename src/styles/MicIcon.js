import styled from '@emotion/styled';

const right = `
  right: 35px;
`;

const MicIcon = styled.div`
  height: 40px;
  position: absolute;
  top: calc(50% - 17px);
  cursor: pointer;
  right: 10px;
  ${({ iconPosition, showClear }) => {
    if (showClear && iconPosition !== 'left') return 'right: 51px;';
    if (iconPosition === 'right' || showClear) {
      return right;
    }
    return null;
  }}
  ${({ showIcon, showClear }) => {
    if (!showIcon && showClear) return 'right: 32px;';
    if (!showIcon && !showClear) return 'right: 10px;';
    return null;
  }}
  width: 11px;
  margin-top: 7px;
`;

export default MicIcon;
