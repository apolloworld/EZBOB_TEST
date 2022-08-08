import React, { useState } from "react";
import "./App.css";
import SearchInput, { SuggestionItem } from "./Components/SearchInput/SearchInput";
import data from "./searchList.json";
import WebsiteList from "./Components/WebsiteList/WebsiteList";
import { SiteItem } from "./types";
const suggestionList = data.map(
  (item): SuggestionItem => ({
    id: item.id,
    suggestStr: item.title.toLowerCase(),
  })
);
function App() {
  const [siteList, setSiteList] = useState<SiteItem[]>([]);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [curSearchStr, setCurSearchStr] = useState<string>("");
  const handleSearchSite = (searchStr: string): void => {
    const lowcaseSearchStr = searchStr.toLowerCase();
    setCurSearchStr(searchStr);
    setSiteList(
      data.filter((item) => item.title.toLowerCase().includes(lowcaseSearchStr))
    );
    setElapsedTime(Math.random() + 0.5);
  };
  return (
    <div className="App">
      <div className="search-box-div">
        <SearchInput
          suggestionList={suggestionList}
          handleSearchSite={handleSearchSite}
        />
      </div>
        <div className="search-result-metadata-text">
        {siteList.length > 0 ?
          `About ${siteList.length} Results (${elapsedTime.toFixed(2)} seconds)` : ""}
        </div>
      <WebsiteList siteList={siteList} />
      {
        siteList.length === 0 && elapsedTime > 0 && <div> 
        <p>Your search - <b>{curSearchStr}</b> - did not match any documents </p>
        Suggestions :
        <ul>
          <li>Make sure all words are spelled correctly.</li>
          <li>Try different keywords</li>
          <li>Try more general keywords</li>
          <li>Try fewer keywords</li>
        </ul>
      </div>

      }
    </div>
  );
}

export default App;
