import React from 'react';
import './App.css';
import DataSearch from './components/DataSearch';

function App() {
  return (
    <div className="App">
      <DataSearch
        index="good-books-ds"
        credentials="nY6NNTZZ6:27b76b9f-18ea-456c-bc5e-3a5263ebc63d"
        url="https://scalr.api.appbase.io"
        showClear
      />
    </div>
  );
}

export default App;
