import React, { Component, Fragment } from 'react';
import axios from "axios";

const config = require('../config.json');

export default class ProductAdmin extends Component {

  state = {
    etag:"",
    filename:"",
    downloadLink:"",
    secureUploadLink:"",
    key:""
  }
  uploadFile = async (event) =>{
    event.preventDefault();
    //get the signedURL
    try{
      const res = await axios.get(`${config.S3api.invokeUrl}/s3/${this.props.auth.user.username}?filename=${this.state.filename}`);
      const data = res.data;
      //store the current state
      this.setState({secureUploadLink:data.uploadURL});
      this.setState({key:data.Key});
      console.log(this.state.secureUploadLink);
      console.log(this.state.key);
      //upload img via signedURL
      var image = document.getElementById('uploadFile').files[0];
      await fetch(
        new Request(this.state.secureUploadLink, {
          method: 'PUT',
          body: image,
          headers: new Headers({
            'Content-Type': 'image/jpeg',
            "Access-Control-Allow-Origin":"*"
          }),
        }),
      );
      //create a download link
      var prefix = "https://cc2021summer-assignment2.s3.amazonaws.com/";
      this.setState({downloadLink:prefix + this.state.key});
      //update DynamoDB 
      try {
        //This object represent a record in DynamoDB
        const params = {
          "user": this.props.auth.user.username,
          "etag": "etag",
          "filename":this.state.filename,
          "metaData":this.state.downloadLink
        };
        await axios.post(`${config.api.invokeUrl}/files/${this.props.auth.user.username}`, params);
      }catch (err) {
        console.log(`An error has occurred: ${err}`);
      }
      //clean the state
      this.setState({etag:"",filename:"",downloadLink:"",secureUploadLink:"",key:""});
    }catch(err){
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
