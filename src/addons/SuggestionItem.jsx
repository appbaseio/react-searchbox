/** @jsx jsx */
import { jsx } from '@emotion/core';
import Highlight from 'react-highlight-words';

const highlightStyle = {
  fontWeight: 600,
  padding: 0,
  backgroundColor: 'transparent',
  color: 'inherit'
};

const SuggestionItem = ({ currentValue, suggestion }) => {
  const { label, value } = suggestion;
  if (label) {
    // label has highest precedence
    return typeof label === 'string' ? (
      <div className="trim">
        <Highlight
          searchWords={currentValue.split(' ')}
          textToHighlight={label}
          autoEscape
          highlightStyle={highlightStyle}
        />
      </div>
    ) : (
      label
    );
  }
  return value;
};

export default SuggestionItem;
