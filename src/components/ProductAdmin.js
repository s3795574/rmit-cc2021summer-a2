import React, { Component, Fragment } from 'react';
import axios from "axios";
const config = require('../config.json');

export default class ProductAdmin extends Component {

  state = {
    etag:"",
    filename:"",
    downloadLink:""
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
  //because the setState and console.log are not asynchronous, so we use the callback function as a secondary argument
  //So that we can debug in browser console. This method will set filename once we select a file
  onChange = async (event) => {
    this.setState({filename:event.target.files[0].name},()=>{
      console.log(this.state.filename)
    }) 
    
  }

  componentDidMount = () => {
  }

  render() {
    return (
      <Fragment>
       <section className="section">
          <form onSubmit={event => this.addingDynamoDBRecord(
            this.props.auth.user.username,this.state.etag,this.state.filename,this.state.downloadLink, event)}>
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
