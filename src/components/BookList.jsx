import React, { Component } from "react";
import { Card, Button, CardTitle, CardText, Row, Col } from "reactstrap";
import BookBlock from "./BookBlock";
import axios from "axios";
import BookDetail from "./BookDetail";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  _refreshList() {
    axios.get("http://localhost:3001/books").then(response => {
      this.setState({
        books: response.data
      });
    });
  }
  componentWillMount() {
    this._refreshList();
  }

  handleCardClick(book) {
    console.log("card clicked " + book.id);
    return <div />;
  }

  render() {
    let book = this.state.books.map(book => {
      return (
        <div className="col-3 col-sm-2 col-md-1 p-1 m-0">
          <div
            key={book.id}
            className=""
            onClick={this.handleCardClick.bind(this, book)}
          >
            <BookBlock book={book} />
          </div>
        </div>
      );
    });

    return (
      <div className="container-fluid  ml-15 mr-15 mt-10 mb-5 cardsBack">
        <div className="row justify-content-center cardRibbon">{book}</div>
      </div>
    );
  }
}

export default BookList;
