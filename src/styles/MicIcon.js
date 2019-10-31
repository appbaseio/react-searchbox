import styled from '@emotion/styled';

const right = `
  right: 54px;
`;

const MicIcon = styled.div`
  height: 40px;
  position: absolute;
  top: calc(50% - 20px);
  cursor: pointer;
  right: 0;
  ${({ iconPosition }) => {
    if (iconPosition === 'right') {
      return right;
    }
    return 'right: 22px';
  }}
  width: 11px;
  margin-top: 7px;
`;

export default MicIcon;
