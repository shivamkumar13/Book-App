import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  InputGroupAddon,
  InputGroup,
  Label,
  Input
} from "reactstrap";
import axios from "axios";
import BookList from "./BookList";

function searchingFor(term) {
  return function(x) {
    return (
      !term ||
      x.title.toLowerCase().includes(term.toLowerCase()) ||
      x.author.toLowerCase().includes(term.toLowerCase()) ||
      x.publisher.toLowerCase().includes(term.toLowerCase()) ||
      x.ISBN.toLowerCase().includes(term.toLowerCase()) ||
      x.genre.toLowerCase().includes(term.toLowerCase()) ||
      x.format.toLowerCase().includes(term.toLowerCase())
    );
  };
}

class AllBooksPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],

      newBookModal: false,
      editBookModal: false,

      deleteBookModal: false,

      term: "",

      newBookData: {
        title: "",
        author: "",
        ISBN: "",
        publisher: "",
        price: "",
        genre: "",
        format: "",
        image: "../assets/images/default.jpg"
      },
      editBookData: {
        id: "",
        title: "",
        author: "",
        ISBN: "",
        publisher: "",
        price: "",
        genre: "",
        format: "",
        image: ""
      },

      deleteBookData: {
        id: "",
        title: ""
      }
    };
  }

  /*=============================== METHODS / FUNCTIONS ===================================== */

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

  toggleNewBookModal() {
    this.setState({ newBookModal: !this.state.newBookModal });
  }
  toggleEditBookModal() {
    this.setState({ editBookModal: !this.state.editBookModal });
  }
  toggleDeleteBookModal() {
    this.setState({ deleteBookModal: !this.state.deleteBookModal });
  }

  addBook() {
    axios
      .post("http://localhost:3001/books", this.state.newBookData)
      .then(response => {
        let books = this.state.books;
        books.push(response.data);
        this.setState({
          books: books,
          newBookModal: false,
          newBookData: {
            title: "",
            author: "",
            ISBN: "",
            publisher: "",
            price: "",
            genre: "",
            format: "",
            image: "../assets/images/default.jpg"
          }
        });
      });
  }

  updateBook() {
    let {
      title,
      author,
      ISBN,
      publisher,
      price,
      genre,
      format,
      image
    } = this.state.editBookData;
    axios
      .put("http://localhost:3001/books/" + this.state.editBookData.id, {
        title,
        author,
        ISBN,
        publisher,
        price,
        genre,
        format,
        image
      })
      .then(response => {
        this.setState({
          editBookModal: false,
          editBookData: {
            id: "",
            title: "",
            author: "",
            ISBN: "",
            publisher: "",
            price: "",
            genre: "",
            format: "",
            image: ""
          }
        });
        this._refreshList();
      });
  }

  editBook(book) {
    this.setState({
      editBookData: {
        id: book.id,
        title: book.title,
        author: book.author,
        ISBN: book.ISBN,
        publisher: book.publisher,
        price: book.price,
        genre: book.genre,
        format: book.format,
        image: book.image
      },
      editBookModal: !this.state.editBookModal
    });
  }
  /*  handleDelete(book) {
    this.setState({
      deleteBookData: {
        id: book.id,
        title: book.title
      },
      deleteBookModal: !this.state.deleteBookModal
    });
  } */

  deleteBook(id) {
    axios.delete("http://localhost:3001/books/" + id).then(response => {
      /*  this.setState({
        deleteBookData: {
          id: '',
          title: ''
        },
        deleteBookModal: !this.state.deleteBookModal
      }); */

      this._refreshList();
    });
  }
  searchHandler(event) {
    this.setState({ term: event.target.value });
  }

  /*===============================TABLE CONTENT ===================================== */

  render() {
    let index = 1;
    let books = this.state.books
      .filter(searchingFor(this.state.term))
      .map(book => {
        return (
          <tr key={book.id} className="boxRow">
            <th className="d-none d-sm-table-cell" scope="row">
              {index++}
            </th>
            <td className="p-xs-0 p-sm-12">
              <img width="100px" src={book.image} alt="" />
            </td>
            <td className="p-xs-0 p-sm-8 p-md-16">
              <h5>{book.title}</h5>
              <br />
              <hr />
              <div>Author: {book.author}</div>
              <div className="d-block d-sm-none">
                Price: {book.price}
                <br />
                Genre: {book.genre}
                <br />
                Format: {book.format}
                <br />
                Publisher: {book.publisher}
              </div>
            </td>

            <td className="d-none d-sm-table-cell">{book.ISBN}</td>
            <td className="d-none d-sm-table-cell">{book.publisher}</td>
            <td className="d-none d-sm-table-cell">{book.price}</td>
            <td className="d-none d-sm-table-cell">{book.genre}</td>
            <td className="d-none d-sm-table-cell">{book.format}</td>
            <td className="p-xs-0 p-sm-12">
              {/*===========================  EDIT BUTTON  ===========================*/}
              <Button
                className="m-1"
                color="success"
                onClick={this.editBook.bind(this, book)}
              >
                Edit
              </Button>

              {/*===========================  DELETE BUTTON  ===========================*/}
              {""}
              <Button
                className="m-1"
                color="danger"
                onClick={this.deleteBook.bind(this, book.id)}
              >
                Delete
              </Button>

              {/*===============================================================*/}
              {""}
            </td>
          </tr>
        );
      });

    return (
      <div>
        <div>
          {/*===========================SEARCH Button========================= */}
          <div className="container-fluid">
            <div className="row justify-content-center">
              <Button
                color="info"
                className="col-6 col-md-1 mt-1 mb-4"
                onClick={this.toggleNewBookModal.bind(this)}
              >
                Add Book
              </Button>
              <form className=" col-12 col-md-1 m-2 searchBox">
                <input
                  type="text"
                  placeholder="  Search..."
                  value={this.state.term}
                  onChange={this.searchHandler.bind(this)}
                />
              </form>
            </div>
          </div>

          {/*===============================ADD Book Model===================================== */}

          <Modal
            isOpen={this.state.newBookModal}
            toggle={this.toggleNewBookModal}
          >
            <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>
              Add a new Book
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input
                  id="title"
                  value={this.state.newBookData.title}
                  onChange={e => {
                    let newBookData = this.state.newBookData;
                    newBookData.title = e.target.value;
                    this.setState({ newBookData });
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for="author">Author</Label>
                <Input
                  id="author"
                  value={this.state.newBookData.author}
                  onChange={e => {
                    let newBookData = this.state.newBookData;
                    newBookData.author = e.target.value;
                    this.setState({ newBookData });
                  }}
                />
              </FormGroup>
              <div className="row">
                <InputGroup className="col-12 col-sm-6 ">
                  <InputGroupAddon addonType="prepend">ISBN</InputGroupAddon>
                  {/* <Label for="ISBN">ISBN</Label> */}
                  <Input
                    id="ISBN"
                    value={this.state.newBookData.ISBN}
                    onChange={e => {
                      let newBookData = this.state.newBookData;
                      newBookData.ISBN = e.target.value;
                      this.setState({ newBookData });
                    }}
                  />
                </InputGroup>
                <InputGroup className="col-12 col-sm-6 ">
                  <InputGroupAddon addonType="prepend">
                    Publisher
                  </InputGroupAddon>
                  {/* <Label for="publisher">Publisher</Label> */}
                  <Input
                    id="publisher"
                    value={this.state.newBookData.publisher}
                    onChange={e => {
                      let newBookData = this.state.newBookData;
                      newBookData.publisher = e.target.value;
                      this.setState({ newBookData });
                    }}
                  />
                </InputGroup>
              </div>
              <div className="row">
                <InputGroup for="price" className="col-12 col-sm-6 mt-1">
                  <InputGroupAddon addonType="prepend">Price</InputGroupAddon>
                  {/* <Label for="price">Price</Label> */}
                  <Input
                    id="price"
                    placeholder=""
                    value={this.state.newBookData.price}
                    onChange={e => {
                      let newBookData = this.state.newBookData;
                      newBookData.price = e.target.value;
                      this.setState({ newBookData });
                    }}
                  />
                </InputGroup>

                <InputGroup for="image" className="col-12 col-sm-6 mt-1">
                  <InputGroupAddon addonType="prepend">
                    Image URL
                  </InputGroupAddon>
                  {/* <Label for="image">image</Label> */}
                  <Input
                    id="image"
                    type="text"
                    value={this.state.newBookData.image}
                    onChange={e => {
                      let newBookData = this.state.newBookData;
                      newBookData.image = e.target.value;
                      this.setState({ newBookData });
                    }}
                  />
                </InputGroup>
              </div>
              <FormGroup>
                <Label for="genre">Genre</Label>

                <Input
                  type="select"
                  name="select"
                  id="genre"
                  placeholder="Select"
                  value={this.state.newBookData.genre}
                  onChange={e => {
                    let newBookData = this.state.newBookData;
                    newBookData.genre = e.target.value;
                    this.setState({ newBookData });
                  }}
                >
                  {" "}
                  <option>--Select--</option>
                  <option>Science Fiction</option>
                  <option>Novel</option>
                  <option>Fiction</option>
                  <option>Literature</option>
                  <option>Short Story</option>
                </Input>
                <Label for="genre">Format</Label>
                <Input
                  type="select"
                  id="format"
                  placeholder="Select"
                  value={this.state.newBookData.format}
                  onChange={e => {
                    let newBookData = this.state.newBookData;
                    newBookData.format = e.target.value;
                    this.setState({ newBookData });
                  }}
                >
                  <option>--Select--</option>
                  <option>PDF</option>
                  <option>EPUB</option>
                  <option>CD</option>
                  <option>CBR</option>
                  <option>KINDLE</option>
                </Input>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.addBook.bind(this)}>
                Add Book
              </Button>{" "}
              <Button
                color="secondary"
                onClick={this.toggleNewBookModal.bind(this)}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
          {/*===============================Edit Book Model===================================== */}
          <Modal
            isOpen={this.state.editBookModal}
            toggle={this.toggleEditBookModal}
          >
            <ModalHeader toggle={this.toggleEditBookModal.bind(this)}>
              Edit Book
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input
                  id="title"
                  value={this.state.editBookData.title}
                  onChange={e => {
                    let editBookData = this.state.editBookData;
                    editBookData.title = e.target.value;
                    this.setState({ editBookData });
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for="author">Author</Label>
                <Input
                  id="author"
                  value={this.state.editBookData.author}
                  onChange={e => {
                    let editBookData = this.state.editBookData;
                    editBookData.author = e.target.value;
                    this.setState({ editBookData });
                  }}
                />
              </FormGroup>
              <div className="row">
                <InputGroup className="col-6">
                  <InputGroupAddon addonType="prepend">ISBN</InputGroupAddon>
                  {/* <Label for="ISBN">ISBN</Label> */}
                  <Input
                    id="ISBN"
                    value={this.state.editBookData.ISBN}
                    onChange={e => {
                      let editBookData = this.state.editBookData;
                      editBookData.ISBN = e.target.value;
                      this.setState({ editBookData });
                    }}
                  />
                </InputGroup>
                <InputGroup className="col-6">
                  <InputGroupAddon addonType="prepend">
                    Publisher
                  </InputGroupAddon>
                  {/* <Label for="publisher">Publisher</Label> */}
                  <Input
                    id="publisher"
                    value={this.state.editBookData.publisher}
                    onChange={e => {
                      let editBookData = this.state.editBookData;
                      editBookData.publisher = e.target.value;
                      this.setState({ editBookData });
                    }}
                  />
                </InputGroup>
              </div>
              <FormGroup>
                <Label for="price">Price</Label>
                <Input
                  id="price"
                  value={this.state.editBookData.price}
                  onChange={e => {
                    let editBookData = this.state.editBookData;
                    editBookData.price = e.target.value;
                    this.setState({ editBookData });
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for="image">Image URL</Label>
                <Input
                  id="image"
                  value={this.state.editBookData.image}
                  onChange={e => {
                    let editBookData = this.state.editBookData;
                    editBookData.image = e.target.value;
                    this.setState({ editBookData });
                  }}
                />
              </FormGroup>
              <InputGroup className="">
                <InputGroupAddon addonType="prepend">Genre</InputGroupAddon>
                <Input
                  type="select"
                  id="genre"
                  placeholder="Select"
                  value={this.state.editBookData.genre}
                  onChange={e => {
                    let editBookData = this.state.editBookData;
                    editBookData.genre = e.target.value;
                    this.setState({ editBookData });
                  }}
                >
                  <option>--Select--</option>
                  <option>Science Fiction</option>
                  <option>Novel</option>
                  <option>Fiction</option>
                  <option>Literature</option>
                  <option>Short Story</option>
                </Input>
                <InputGroupAddon className="ml-2" addonType="prepend">
                  Format
                </InputGroupAddon>
                <Input
                  type="select"
                  id="format"
                  placeholder="Select"
                  value={this.state.editBookData.format}
                  onChange={e => {
                    let editBookData = this.state.editBookData;
                    editBookData.format = e.target.value;
                    this.setState({ editBookData });
                  }}
                >
                  <option>--Select--</option>
                  <option>PDF</option>
                  <option>EPUB</option>
                  <option>CD</option>
                  <option>CBR</option>
                  <option>KINDLE</option>
                </Input>
              </InputGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.updateBook.bind(this)}>
                Update Book
              </Button>{" "}
              <Button
                color="secondary"
                onClick={this.toggleEditBookModal.bind(this)}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
          {/*=====================DELETE BOOK MODAL ================================= */}
          <Modal
            isOpen={this.state.deleteBookModal}
            toggle={this.toggleDeleteBookModal.bind(this)}
            className={this.props.className}
          >
            <ModalHeader toggle={this.toggleDeleteBookModal.bind(this)}>
              Confirm Delete
            </ModalHeader>
            <ModalBody>
              Are you sure you want to delete{" "}
              <span className="font-weight-bold">
                {this.state.deleteBookData.title}
              </span>{" "}
              ?
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                onClick={this.toggleDeleteBookModal.bind(this)}
              >
                Delete
              </Button>{" "}
              <Button
                color="secondary"
                onClick={this.deleteBook.bind(
                  this,
                  this.state.deleteBookData.id
                )}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>

        {/*=============================== TABLE HEAD ===================================== */}
        <div className="App container-fluid ">
          <Table hover className="table-responsive ">
            <thead>
              <tr>
                <th className="d-none d-sm-table-cell">#</th>
                <th />
                <th>Title</th>
                <th className="d-none d-sm-table-cell">ISBN</th>
                <th className="d-none d-sm-table-cell">Publisher</th>
                <th className="d-none d-sm-table-cell">Price</th>
                <th className="d-none d-sm-table-cell">Genre</th>
                <th className="d-none d-sm-table-cell">Format</th>
                <th>Modify</th>
              </tr>
            </thead>
            <tbody>{books}</tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default AllBooksPage;
