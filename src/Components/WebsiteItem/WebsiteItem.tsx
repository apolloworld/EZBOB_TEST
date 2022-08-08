import React, { FC } from "react";
import { SiteItem } from "../../types";
import './WebsiteItem.css';

export interface WebsiteItemProps {
  siteInfo: SiteItem;
}

const WebsiteItem: FC<WebsiteItemProps> = ({ siteInfo }: WebsiteItemProps) => {
  return (
    <div className="website-item-container">
      <a href={siteInfo.link} className="website-item-link-container">
        <div className="website-item-link-text">{siteInfo.link}</div>
        <div className="website-item-link-title">{siteInfo.title}</div>
      </a>
      <div className="website-item-description-text">
        {siteInfo.description}
      </div>
    </div>
  );
};

export default WebsiteItem;
