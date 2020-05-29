import React from "react";
import { useDispatch, useSelector } from "react-redux";
import BookPageLayout from "layouts/BookPage";
import {
  finishBook,
  goToNextPage,
  selectBook,
  selectPage,
  selectPageNumber,
  selectHasNextPage,
} from "./readSlice";
import Page from "./components/Page";

function Read() {
  const dispatch = useDispatch();
  const book = useSelector(selectBook);
  const pageNumber = useSelector(selectPageNumber);
  const page = useSelector(selectPage);
  const hasNextPage = useSelector(selectHasNextPage);

  if (!book) {
    // TODO: Use an effect hook or something to make sure that we get a warning to sentry
    return (
      <>
        <h1>Sorry, there has been an error.</h1>
        <p>We cannot find the book you selected.</p>
      </>
    );
  }

  // TODO: Naming is so wonky. finishBook used by completeBook passed as finishBook
  const completeBook = hasNextPage ? undefined : () => dispatch(finishBook());
  const pageForward = hasNextPage ? () => dispatch(goToNextPage()) : undefined;

  return (
    <BookPageLayout
      finishBook={completeBook}
      pageForward={pageForward}
      pageNumber={pageNumber}
    >
      {page === null && (
        <>
          <h2>Sorry, we cannot find that page.</h2>
        </>
      )}
      {page && <Page page={page} />}
    </BookPageLayout>
  );
}

export default Read;
