import React from "react";

const Footer = (props) => {
  const { state, paginationHandler, pageInputHandler } = props;
  return (
    <footer>
      <div className="footer-wrapper">
        <button
          data-page="first"
          onClick={paginationHandler}
          disabled={
            state.page === 1 || state.error || state.isLoading ? true : false
          }
          className="primary"
        >
          Page 1
        </button>
        <button
          data-page="previous"
          onClick={paginationHandler}
          disabled={
            state.page === 1 || state.error || state.isLoading ? true : false
          }
          className="primary"
        >
          <i className="fa fa-chevron-left"></i>
          Prev
        </button>
        <span data-page="current" className="current-page">
          Current Page:
          <span className="current-page__number">
            {" "}
            <input
              id="currentPage"
              type="number"
              min="1"
              max={state.total_pages}
              defaultValue={state.page}
              onKeyUp={pageInputHandler}
            />{" "}
            from {state.total_pages}
          </span>
        </span>
        <button
          data-page="next"
          onClick={paginationHandler}
          disabled={
            state.total_pages === state.page || state.error || state.isLoading
              ? true
              : false
          }
          className="primary"
        >
          Next
          <i className="fa fa-chevron-right"></i>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
