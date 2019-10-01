import { css } from '@emotion/core';
import { dark } from './Theme';

const webkitLineClamp = css`
  line-height: 1.4em;
  max-height: 5.6em;
`;

const noSuggestions = (themePreset, theme) => css`
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  background-color: #fff;
  font-size: 0.9rem;
  z-index: 3;
  position: absolute;
  top: 39px;
  margin: 0;
  padding: 0;
  list-style: none;
  max-height: 260px;
  overflow-y: auto;

  &.small {
    top: 30px;
  }

  li {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    user-select: none;

    & > .trim {
      display: block;
      display: -webkit-box;
      width: 100%;
      max-height: 2.3rem;
      line-height: 1.2rem;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      ${webkitLineClamp}
    }
  }

  ${themePreset === 'dark' && dark(theme)}
`;

const suggestions = (themePreset, theme) => css`
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  background-color: #fff;
  font-size: 0.9rem;
  z-index: 3;
  position: absolute;
  top: 39px;
  margin: 0;
  padding: 0;
  list-style: none;
  max-height: 260px;
  overflow-y: auto;

  &.small {
    top: 30px;
  }

  li {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    padding: 10px;
    user-select: none;

    .trim {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &:hover,
    &:focus {
      background-color: #eee;
    }
  }

  ${themePreset === 'dark' && dark(theme)}
`;

const suggestionsContainer = css`
  position: relative;
  .cancel-icon {
    cursor: pointer;
  }
`;

export { suggestionsContainer, suggestions, noSuggestions };
