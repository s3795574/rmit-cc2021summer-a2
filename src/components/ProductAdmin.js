import React, { Component, Fragment } from 'react';
import axios from "axios";
const config = require('../config.json');

export default class ProductAdmin extends Component {

  state = {
    newFile: { 
      "user": "",
      "etag": "",
      "filename":"",
      "metaData":""
    },
    files: []
  }

  addingDynamoDBRecord = async (user,etag,filename,metaData, event) => {
    event.preventDefault();
    // add call to AWS API Gateway add product endpoint here
    try {
      const params = {
        "user": user,
        "etag": etag,
        "filename":filename,
        "metaData":metaData
      };
      await axios.post(`${config.api.invokeUrl}/files/${user}`, params);
      this.setState({ files: [...this.state.files, this.state.newFile] });
      this.setState({ newFile: { "user": "", "etag": "", "filename": "", "metaData": ""}});
    }catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }

  updatingDynamoDBRecord = async (user,etag,filename,metaData, name) => {
    // add call to AWS API Gateway update product endpoint here
    try {
      const params = {
        "user": user,
        "etag": etag,
        "filename":filename,
        "metaData":metaData
      };
      await axios.patch(`${config.api.invokeUrl}/files/${user}`, params);
    }catch (err) {
      console.log(`Error updating product: ${err}`);
    }
  }

  deletingDynamoDBRecord = async (user,etag, event) => {
    event.preventDefault();
    // add call to AWS API Gateway delete product endpoint here
    try {
      await axios.delete(`${config.api.invokeUrl}/files/${user}?etag=${etag}`);
    }catch (err) {
      console.log(`Unable to delete product: ${err}`);
    }
  }

  componentDidMount = () => {
  }

  render() {
    return (
      <Fragment>
       <section className="section">
          <form onSubmit={event => this.addingDynamoDBRecord(this.props.auth.user.username,"abcde","fn","dl", event)}>
            <h1>File Upload</h1>
            <p className="subtitle is-5">Add a file to your cloud storage:</p>
            <input type="file" onChange={this.onChange} />
            <button type="submit">Upload</button>
          </form>
        </section>
      </Fragment>
    )
  }
}
