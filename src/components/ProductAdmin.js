import React, { Component, Fragment } from 'react';
import axios from "axios";
const config = require('../config.json');

export default class ProductAdmin extends Component {

  state = {
    etag:"",
    filename:"",
    downloadLink:"",
    secureUploadLink:"",
    key:"",
    image:""
  }
  uploadFile = async (event) =>{
    event.preventDefault();
    try{
      const res = await axios.get(`${config.S3api.invokeUrl}/s3/${this.props.auth.user.username}?filename=${this.state.filename}`);
      const data = res.data;
      this.setState({secureUploadLink:data.uploadURL});
      this.setState({key:data.Key});
      console.log(this.state.secureUploadLink);
      console.log(this.state.key);

      var image = document.getElementById('uploadFile').files[0];

      const response = await fetch(
        new Request(this.state.secureUploadLink, {
          method: 'PUT',
          body: image,
          headers: new Headers({
            'Content-Type': 'image/jpeg',
            "Access-Control-Allow-Origin":"*"
          }),
        }),
      );

      console.log(response);
      console.log(image);

    }catch(err){
      console.log(`An error has occurred: ${err}`);
    }  
  }

  addingDynamoDBRecord = async (user,etag,filename,metaData, event) => {
    event.preventDefault();
    // add call to AWS API Gateway add product endpoint here
    try {
      //This object represent a record in DynamoDB
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
      //This object represent a record in DynamoDB
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
    this.setState({filename:event.target.files[0].name.split('.')[0]},()=>{
      console.log(this.state.filename.split('.')[0])
    }) 
    
  }

  componentDidMount = () => {
  }

  render() {
    return (
      <Fragment>
       <section className="section">
          <form onSubmit={event => this.uploadFile(event)}>
            <h1>File Upload</h1>
            <p className="subtitle is-5">Add a file to your cloud storage:</p>
            <input type="file" id="uploadFile" onChange={this.onChange} />
            <button type="submit">Upload</button>
          </form>
        </section>
      </Fragment>
    )
  }
}
