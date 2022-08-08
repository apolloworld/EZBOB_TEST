import React, { useState, FC, useMemo, useRef, useEffect } from "react";
import SuggestionListItem from "../SuggestionListItem/SuggestionListItem";
import "./SearchInput.css";

export interface SuggestionItem {
  id: number;
  suggestStr: string;
}

export interface SearchInputProps {
  className?: string;
  suggestionList: SuggestionItem[];
  handleSearchSite: (searchStr: string) => void;
}

const SearchInput: FC<SearchInputProps> = ({
  className = "",
  suggestionList = [],
  handleSearchSite,
}: SearchInputProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [inputFocused, setInputFocused] = useState<boolean>(false);
  const [historyItems, setHistoryItems] = useState<string[]>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] =
    useState<number>(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const selfRef = useRef<HTMLDivElement>(null);

  const filteredSuggestionList = useMemo<SuggestionItem[]>(() => {
    const lowerCaseTerm = searchTerm.toLocaleLowerCase();
    return suggestionList
      .filter((item: SuggestionItem) =>
        item.suggestStr.toLowerCase().includes(lowerCaseTerm)
      )
      .slice(0, 10);
  }, [suggestionList, searchTerm]);

  const handleChangeSearchTerm: React.ChangeEventHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
    setInputFocused(true);
  };

  const handleRemoveHistoryItem = (suggestStr: string) => {
    setHistoryItems(historyItems.filter((item) => item !== suggestStr));
  };

  const handleClickSuggestionListItem = (suggestStr: string) => {
    if (!historyItems.includes(suggestStr)) {
      setHistoryItems([...historyItems, suggestStr]);
    }
    setInputFocused(false);
    searchInputRef.current.value = suggestStr;
    setSearchTerm(suggestStr);
    handleSearchSite(suggestStr);
  };

  const handleKeyDown: React.KeyboardEventHandler = (
    event: React.KeyboardEvent
  ) => {
    if (event.key === "ArrowUp") {
      if (activeSuggestionIndex >= 0) {
        setActiveSuggestionIndex(activeSuggestionIndex - 1);
        if (activeSuggestionIndex > 0) {
          searchInputRef.current.value =
            filteredSuggestionList[activeSuggestionIndex - 1].suggestStr;
        } else {
          searchInputRef.current.value = searchTerm;
        }
        event.preventDefault();
      }
    } else if (event.key === "ArrowDown") {
      if (filteredSuggestionList.length - 1 > activeSuggestionIndex) {
        setActiveSuggestionIndex(activeSuggestionIndex + 1);
        searchInputRef.current.value =
          filteredSuggestionList[activeSuggestionIndex + 1].suggestStr;
        event.preventDefault();
      }
    } else if (event.key === "Enter") {
      if (searchInputRef.current.value !== "") {
        handleSearchSite(searchInputRef.current.value);
        setInputFocused(false);
      }
    }
  };

  const handleClickOutside = (event) => {
    if (selfRef.current && !selfRef.current.contains(event.target)) {
      setInputFocused(false);
    }
  };

  const handleClickSearchBtn: React.MouseEventHandler = (event) => {
    if (searchInputRef.current.value !== "") {
      handleSearchSite(searchInputRef.current.value);
      setInputFocused(false);
    }
  };

  const handleClickRemoveBtn: React.MouseEventHandler = (event) => {
    setSearchTerm("");
    searchInputRef.current.value = "";
    setInputFocused(true);
  };

  useEffect(() => {
    const savedItems: string[] = JSON.parse(
      localStorage.getItem("my-search-input-history-items")
    ) as string[];
    if (savedItems) {
      setHistoryItems(savedItems);
    }

    searchInputRef.current.focus();

    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "my-search-input-history-items",
      JSON.stringify(historyItems)
    );
  }, [historyItems]);

  return (
    <div
      ref={selfRef}
      className={`search-input-container ${className}`}
      onKeyDown={handleKeyDown}
    >
      <div className="search-input-box">
        {inputFocused && (
          <span className="search-input-box-search-icon">
            <svg
              focusable="false"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
            </svg>
          </span>
        )}
        <input
          type="text"
          className="search-input-box-textinput"
          onChange={handleChangeSearchTerm}
          onFocus={() => setInputFocused(true)}
          onClick={() => setInputFocused(true)}
          ref={searchInputRef}
        />
        {searchInputRef?.current?.value !== "" && (
          <>
            <span
              className="search-input-box-close-btn"
              onClick={handleClickRemoveBtn}
            >
              <svg
                focusable="false"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
              </svg>
            </span>
            <span className="search-input-box-vseg-line" />
          </>
        )}
        <span className="search-input-box-voice-rec-btn">
          <svg
            focusable="false"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#4285f4"
              d="m12 15c1.66 0 3-1.31 3-2.97v-7.02c0-1.66-1.34-3.01-3-3.01s-3 1.34-3 3.01v7.02c0 1.66 1.34 2.97 3 2.97z"
            ></path>
            <path fill="#34a853" d="m11 18.08h2v3.92h-2z"></path>
            <path
              fill="#fbbc05"
              d="m7.05 16.87c-1.27-1.33-2.05-2.83-2.05-4.87h2c0 1.45 0.56 2.42 1.47 3.38v0.32l-1.15 1.18z"
            ></path>
            <path
              fill="#ea4335"
              d="m12 16.93a4.97 5.25 0 0 1 -3.54 -1.55l-1.41 1.49c1.26 1.34 3.02 2.13 4.95 2.13 3.87 0 6.99-2.92 6.99-7h-1.99c0 2.92-2.24 4.93-5 4.93z"
            ></path>
          </svg>
        </span>
        <span
          className="search-input-box-search-btn"
          onClick={handleClickSearchBtn}
        >
          <svg
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
          </svg>
        </span>
      </div>
      {inputFocused && filteredSuggestionList.length > 0 && (
        <>
          <div className="search-input-seg-line" />
          <div>
            <ul
              className="search-input-suggest-list"
              onMouseLeave={() => {
                setActiveSuggestionIndex(-1);
              }}
            >
              {filteredSuggestionList.map(
                (suggestItem: SuggestionItem, index: number) => (
                  <li
                    key={`key-${suggestItem.id}`}
                    className="search-input-suggest-list-item"
                    onMouseEnter={() => setActiveSuggestionIndex(index)}
                  >
                    <SuggestionListItem
                      searched={historyItems.includes(suggestItem.suggestStr)}
                      suggestStr={suggestItem.suggestStr}
                      handleItemClick={() =>
                        handleClickSuggestionListItem(suggestItem.suggestStr)
                      }
                      handleRemoveHistoryClick={(event) => {
                        event.stopPropagation();
                        handleRemoveHistoryItem(suggestItem.suggestStr);
                      }}
                      actived={activeSuggestionIndex === index}
                    />
                  </li>
                )
              )}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchInput;
