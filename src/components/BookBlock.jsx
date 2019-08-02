import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
  CardImg
} from 'reactstrap';
import BookDetail from './BookDetail';

class BookBlock extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let book = this.props.book;
    return (
      <div className="">
        <Card body className="p-0 m-0 cards" height="">
          <CardImg top width="219px" src={book.image} alt={book.title} />

          <CardText>
            {/* <h4 className="">{book.title}</h4>

            <h5>
              {book.author}
              {book.price}
            </h5> */}
          </CardText>
        </Card>
      </div>
    );
  }
}

export default BookBlock;
