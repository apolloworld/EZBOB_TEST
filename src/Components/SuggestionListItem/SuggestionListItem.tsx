import React, { FC } from "react";
import "./SuggestionListItem.css";

export interface SuggestionListItemProps {
  actived: boolean;
  searched: boolean;
  suggestStr: string;
  handleItemClick: React.MouseEventHandler;
  handleRemoveHistoryClick: React.MouseEventHandler;
}

const SuggestionListItem: FC<SuggestionListItemProps> = ({
  actived,
  searched,
  suggestStr,
  handleItemClick,
  handleRemoveHistoryClick,
}: SuggestionListItemProps) => {
  return (
    <div className={`suggestion-list-item-container ${actived && "suggestion-list-item-container-active"}`} onClick={handleItemClick}>
      <div className="suggestion-list-item-searchtext-container">
        <div
          className={
            searched
              ? "suggestion-list-item-history-icon"
              : "suggestion-list-item-search-icon"
          }
        />
        <div className={`suggestion-list-item-text${searched ? "-searched" : ""}`}>
          {suggestStr}
        </div>
      </div>
      {searched && actived && (
        <div
          className="suggestion-list-item-remove-history"
          onClick={handleRemoveHistoryClick}
        >
          Delete
        </div>
      )}
    </div>
  );
};

export default SuggestionListItem;
