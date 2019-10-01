import React from 'react';
import SearchBox from './components/SearchBox';
import { Global, css } from '@emotion/core';

const SearchBoxWithStyle = props => (
  <div>
    <Global
      styles={css`
        * {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
            'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
            'Helvetica Neue', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}
    />
    <SearchBox {...props} />
  </div>
);

export default SearchBoxWithStyle;
