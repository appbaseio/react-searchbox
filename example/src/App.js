import React, { Component } from "react";

import DataSearch from "react-searchbox-zzzzz";

export default class App extends Component {
  render() {
    return (
      <div>
        <DataSearch
          index="good-books-ds"
          credentials="nY6NNTZZ6:27b76b9f-18ea-456c-bc5e-3a5263ebc63d"
          url="https://scalr.api.appbase.io"
          dataField={["original_title", "original_title.search"]}
          enableVoiceSearch
        />
      </div>
    );
  }
}
