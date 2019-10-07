import React from 'react';
import { css, Global } from '@emotion/core';

const SuggestionItem = ({ currentValue, suggestion }) => {
  const { label, value } = suggestion;
  const stringToReplace = currentValue.split(' ').join('|');
  if (label) {
    // label has highest precedence
    return typeof label === 'string' ? (
      <div>
        <Global
          styles={css`
            .highlight-class {
              font-weight: 600;
              padding: 0;
              background-color: transparent;
              color: inherit;
            }
          `}
        />
        <div
          className="trim"
          dangerouslySetInnerHTML={{
            __html: label.replace(
              new RegExp(stringToReplace, 'ig'),
              matched => {
                return `<mark class="highlight-class">${matched}</mark>`;
              }
            )
          }}
        />
      </div>
    ) : (
      label
    );
  }
  return value;
};

export default SuggestionItem;
