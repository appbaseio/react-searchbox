import React from 'react';
import SearchBox from './components/SearchBox';
import { Global, css } from '@emotion/core';

const SearchBoxWithStyle = props => (
  <div>
    <Global
      styles={css`
        * {
          margin: 0;
          font-family: inherit;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}
    />
    <SearchBox {...props} />
  </div>
);

export default SearchBoxWithStyle;
