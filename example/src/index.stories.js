import React, { useState } from 'react';
import SearchBox from 'react-searchbox-zzzzz';

export default { title: 'SearchBox' };

const initConfig = {
  app: 'good-books-ds',
  credentials: 'nY6NNTZZ6:27b76b9f-18ea-456c-bc5e-3a5263ebc63d',
  dataField: ['original_title', 'original_title.search']
};

export const gettingStarted = () => <SearchBox {...initConfig} />;

export const withAllProps = () => (
  <div>
    <SearchBox
      {...initConfig}
      title="Search"
      defaultValue="Songwriting"
      fieldWeights={[1, 3]}
      placeholder="Search for books"
      autosuggest={true}
      defaultSuggestions={[
        { label: 'Songwriting', value: 'Songwriting' },
        { label: 'Musicians', value: 'Musicians' }
      ]}
      highlight={true}
      highlightField="group_city"
      queryFormat="or"
      fuzziness="AUTO"
      showClear
      showVoiceSearch
    />
  </div>
);

export const withResponsive = () => (
  <div style={{ width: '50%' }}>
    <SearchBox {...initConfig} />
  </div>
);

export const withNoSuggestion = () => (
  <SearchBox {...initConfig} renderNoSuggestion={() => <p>No Suggestion</p>} />
);

export const withCustomRender = () => (
  <SearchBox
    {...initConfig}
    render={data => {
      return (data.data || []).map(dataItem => (
        <div key={dataItem.value}>{dataItem.label}</div>
      ));
    }}
  />
);

export const withControlledComponent = () => {
  const [value, setValue] = useState('');
  const handleKeyDown = (e, triggerQuery) => {
    if (e.key === 'Enter') {
      triggerQuery();
    }
  };
  return (
    <SearchBox
      {...initConfig}
      value={value}
      onChange={setValue}
      onKeyDown={handleKeyDown}
    />
  );
};
