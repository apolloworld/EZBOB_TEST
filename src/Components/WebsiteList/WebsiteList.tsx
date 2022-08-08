import React, { FC, useEffect, useMemo, useState } from "react";
import { SiteItem } from "../../types";
import WebsiteItem from "../WebsiteItem/WebsiteItem";
import { Pagination } from "@mui/material";
import "./WebsiteList.css";

export interface WebsiteListProps {
  siteList: SiteItem[];
  itemsPerPage?: number;
}

const WebsiteList: FC<WebsiteListProps> = ({
  siteList,
  itemsPerPage = 5,
}: WebsiteListProps) => {
  const [curPage, setCurPage] = useState(1);
  const pageSiteList = useMemo(() => {
    return siteList.slice((curPage - 1) * itemsPerPage, curPage * itemsPerPage);
  }, [curPage, itemsPerPage, siteList]);

  useEffect(() => {
    setCurPage(1);
  }, [siteList, itemsPerPage])

  const handleChangePage = (event: React.ChangeEvent, page: number) => {
    setCurPage(page);
  };

  return (
    <div className="website-list-container">
      <div>
        {pageSiteList.map((siteItem) => (
          <WebsiteItem key={`key-${siteItem.id}`} siteInfo={siteItem} />
        ))}
      </div>
      {siteList.length > 0 && (
        <Pagination
          count={Math.ceil(siteList.length / itemsPerPage)}
          page={curPage}
          onChange={handleChangePage}
        />
      )}
    </div>
  );
};

export default WebsiteList;
