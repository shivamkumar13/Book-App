import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class BookDetail extends Component {
  constructor(props) {
    super(props);
    /* this.state = {
      modal: false
    };
    this.toggle = this.toggle.bind(this); */
  }

  /*   toggle(e) {
    if (e === 1) {
      this.setState(prevState => ({
        modal: !prevState.modal
      }));
      e = 0;
    }
  } */

  render() {
    console.log("card clicked inside bookdetail " + this.props.book.id);
    return (
      <div>
        {/* <Button color="danger" onClick={this.toggle(this.props.event)}>
          Click Me!
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>
              Do Something
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal> */}
      </div>
    );
  }
}

export default BookDetail;
