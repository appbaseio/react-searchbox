/** @jsx jsx */
import { jsx } from '@emotion/core';
import Highlight from 'react-highlight-words';
import Flex from '../styles/Flex';

const highlightStyle = {
  fontWeight: 600,
  padding: 0,
  backgroundColor: 'transparent',
  color: 'inherit'
};

const SuggestionItem = ({ currentValue, suggestion }) => {
  const { label, value, title, description, image } = suggestion;
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
  } else if (title || image || description) {
    return (
      <Flex alignItems="center" css={{ width: '100%' }}>
        {image && (
          <div css={{ margin: 'auto', marginRight: 10 }}>
            <img
              src={image}
              alt=" "
              height="50px"
              width="50px"
              css={{ objectFit: 'contain' }}
            />
          </div>
        )}
        <Flex
          direction="column"
          css={{ width: image ? 'calc(100% - 60px)' : '100%' }}
        >
          {title && (
            <div className="trim">
              <Highlight
                searchWords={currentValue.split(' ')}
                textToHighlight={title}
                highlightStyle={highlightStyle}
                css={{ fontSize: '1rem' }}
              />
            </div>
          )}
          {description && (
            <Highlight
              searchWords={currentValue.split(' ')}
              textToHighlight={description}
              highlightStyle={highlightStyle}
            />
          )}
        </Flex>
      </Flex>
    );
  }
  return value;
};

export default SuggestionItem;
