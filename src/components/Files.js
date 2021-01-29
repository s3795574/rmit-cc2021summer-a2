import React, { Component, Fragment } from 'react';
import File from './File';
import axios from "axios";
const config = require('../config.json');

export default class Products extends Component {

  state = {
    user:null,
    newfile: null,
    files: []
  }

  fetchProducts = async () => {
    // add call to AWS API Gateway to fetch products here
    // then set them in state
    try {
      //Get all the files of the current user.
      const res = await axios.get(`${config.api.invokeUrl}/files/${this.props.auth.user.username}`);
      const files = res.data;
      this.setState({ files: files });
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }

  componentDidMount = () => {
    if(!this.props.auth.user){
      //do nothing if no user logged in
    }else{
      this.setState({user:this.props.auth.user.username})
      this.fetchProducts();
    }   
  }

  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <h1>Files</h1>
            <p className="subtitle is-5">All files:</p>
            <br />
            <div className="columns">
              <div className="column">
                <div className="tile is-ancestor">
                  <div className="tile" id="file-display">
                    { 
                      this.state.files && this.state.files.length > 0
                      ? this.state.files.map(file => <File etag={file.etag.replace(/['"]+/g, '')} filename={file.filename} metaData={file.metaData} key={file.user+"/"+file.filename} user={file.user}/>)
                      : <div className="tile notification is-warning">No products available</div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    )
  }
}
