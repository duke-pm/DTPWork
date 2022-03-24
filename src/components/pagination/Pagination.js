import React from "react";
import {useTranslation} from "react-i18next";
import {
  Pagination,
  PaginationLink,
  PaginationItem,
} from "reactstrap";
/** COMMON */
import Icon from "../icon/Icon";

const PaginationComponent = ({itemPerPage, totalItems, paginate, currentPage}) => {
  const {t} = useTranslation();
  const pageNumbers = [];
  let i = 1;
  for (i = 1; i <= Math.ceil(totalItems / itemPerPage); i++) {
    pageNumbers.push(i);
  }

  /**
   ** FUNCTIONS
   */
  const nextPage = () => {
    paginate(currentPage + 1);
  };

  const prevPage = () => {
    paginate(currentPage - 1);
  };

  /**
   ** RENDER
   */
  return (
    <Pagination aria-label="Page navigation">
      <PaginationItem disabled={currentPage - 1 === 0 ? true : false}>
        <PaginationLink
          className="page-link-prev cursor-pointer"
          onClick={prevPage}>
          <Icon name="chevrons-left" />
          <span>{t("common:prev")}</span>
        </PaginationLink>
      </PaginationItem>
      
      {pageNumbers.map((item) => {
        return (
          <PaginationItem className={currentPage === item ? "active" : ""} key={item}>
            <PaginationLink
              tag="a"
              className="cursor-pointer"
              onClick={(ev) => {
                ev.preventDefault();
                paginate(item);
              }}>
              {item}
            </PaginationLink>
          </PaginationItem>
        );
      })}

      <PaginationItem disabled={pageNumbers[pageNumbers.length - 1] === currentPage}>
        <PaginationLink
          className="page-link-next cursor-pointer"
          onClick={nextPage}>
          <span>{t("common:next")}</span>
          <Icon name="chevrons-right" />
        </PaginationLink>
      </PaginationItem>
    </Pagination>
  );
};
export default PaginationComponent;
