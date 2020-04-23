import React from 'react';
import {withRouter} from 'react-router'

const Header = (props) => {
  const pathName = props.location.pathname;
  // console.log(pathName);
  const {findMovieHandler, findFormClear, changeFilter} = props;
  return (
    <header>
      <div className="header-wrapper">
        <h1 id="headerTitle">Movies by TMDB</h1>
        {pathName === "/" ?
          <React.Fragment>
            <form
              name="find-form"
              className="find-form"
              onSubmit={findMovieHandler}
            >
              <input
                name="find-input"
                type="text"
                placeholder="Type to find movie"
              />
              <i className="fa fa-search"></i>
              <i className="fa fa-close" onClick={findFormClear}></i>
            </form>
            <form
              name="filter-form"
              className="filter-form"
              onChange={changeFilter}
            >
              <h3>Filter by: </h3>
              <div className="inputs-wrapper">
                <input
                  id="filter1"
                  name="filter"
                  type="radio"
                  data-filter="popularity.desc"
                  defaultChecked
                />
                <label htmlFor="filter1">Popularity</label>
                <input
                  id="filter2"
                  name="filter"
                  type="radio"
                  data-filter="release_date.desc"
                />
                <label htmlFor="filter2">Release date</label>
                <input
                  id="filter3"
                  name="filter"
                  type="radio"
                  data-filter="vote_average.desc"
                />
                <label htmlFor="filter3">Vote</label>
                <input
                  type="checkbox"
                  name="filter_adult"
                  id="filter4"
                  defaultChecked={false}
                />
                <label htmlFor="filter4">Adult</label>
              </div>
            </form>
          </React.Fragment>
          : null}
      </div>
    </header>
  );
}

export default withRouter(Header);
