import React from 'react';
import './App.css';
import SearchBox from './components/SearchBox';

function App() {
  return (
    <div className="App">
      <SearchBox
        app="good-books-ds"
        credentials="nY6NNTZZ6:27b76b9f-18ea-456c-bc5e-3a5263ebc63d"
        renderNoSuggestion={() => <p>No Suggestion</p>}
      />
    </div>
  );
}

export default App;
