"use strict";
import React, { Component } from "react";
import { Form, Button, Modal, Col, Row } from "react-bootstrap";
import axios from "axios";
import { withRouter } from "react-router-dom";

export class Editcommentmodal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  updatecomment = async (e) => {
    e.preventDefault();

    const reqBody = {
      title: this.props.obj.title,
      newcomment: e.target.newComment.value,
    };

    let res = await axios.put(
      `${process.env.REACT_APP_API_URL}/updateLike/${this.props.user._id}`,
      reqBody
    );
    localStorage.setItem("user", JSON.stringify(res.data));

    this.setState({
      newuser: res.data,
    });
    this.props.closemodal();
  };

  render() {
    return (
      <Modal
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={this.props.showCommentEdit}
      >
        <Modal.Header
          closeButton
          onClick={this.props.closemodal}
          style={{
            border: "0px",
          }}
        ></Modal.Header>

        <Row className="row-grid align-items">
          <Col md="6">
            <img
              width="100%"
              src={this.props.obj.imgUrl}
              style={{ padding: "10px 20px 30px", height: "600px" }}
            />
          </Col>
          <Col md="6" padding="20px">
            <div className="postCard">
              <h2>{this.props.obj.title}</h2>
              <Modal.Body>
                <p
                  style={{
                    height: "310px",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    marginBottom: "0",
                  }}
                >
                  {" "}
                  {this.props.obj.description}
                </p>
                <br />

                <h5
                  style={{
                    padding: "20px",
                    backgroundColor: "#eae9e9",
                    marginBottom: "20px",
                    borderRadius: "2em",
                  }}
                >
                  {this.props.obj.comment}
                </h5>

                <Form onSubmit={this.updatecomment}>
                  <Form.Control
                    type="text"
                    name="newComment"
                    defaultValue= "Edit Your Note!"
                    style={{
                      width: "100%",
                      height: "50px",
                      borderRadius: "4em",
                    }}
                  />

                  <button type="submit" className="button">
                    <i class="fas fa-pen" style={{ fontSize: ".7em" }}></i>
                  </button>
                </Form>
              </Modal.Body>
            </div>
          </Col>
        </Row>
      </Modal>
    );
  }
}
export default withRouter(Editcommentmodal);
