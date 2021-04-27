import React from "react";
import { Pagination } from "react-bootstrap";

export default function AppPagination({ page, setPage, numOfPages }) {
  function adjustPage(amount) {
    setPage((prevPage) => prevPage + amount);
  }
  const gotoPage = (number) => {
    const adjustmentAmount = number - page;
    adjustPage(adjustmentAmount);
  };

  return (
    <Pagination className={"ml-3"}>
      {page > 2 && <Pagination.First onClick={() => gotoPage(1)} />}
      {page !== 1 && <Pagination.Prev onClick={() => adjustPage(-1)} />}
      {page !== 1 && <Pagination.Item onClick={() => setPage(1)}>1</Pagination.Item>}
      {page > 2 && <Pagination.Item onClick={() => adjustPage(-1)}>{page - 1}</Pagination.Item>}
      <Pagination.Item active>{page}</Pagination.Item>
      {page !== numOfPages && (
        <Pagination.Item onClick={() => adjustPage(1)}>{page + 1}</Pagination.Item>
      )}
      {page !== numOfPages && <Pagination.Next onClick={() => adjustPage(1)} />}
      {page < 28 && page !== numOfPages && <Pagination.Last onClick={() => gotoPage(numOfPages)} />}
    </Pagination>
  );
}
