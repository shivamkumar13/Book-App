import React, { Component } from 'react';
import AllBooksPage from '../components/AllBooksPage';
import BookList from '../components/BookList';
import Banner from './Banner';
import Tabs from './Tabs';

const Main = () => {
  return (
    <div>
      <Banner />
      <div className="container-fluid text-center horizontalBar pt-5 pl-5 pr-5 pb-3 ">
        <BookList />
      </div>
      <div className="container-fluid text-center tableBack p-0 pt-sm-5 pl-sm-5 pr-sm-5 pb-sm-3 ">
        <AllBooksPage />
      </div>
    </div>
  );
};

export default Main;
