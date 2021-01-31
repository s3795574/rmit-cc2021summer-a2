import React, { Component, Fragment }  from 'react';
import axios from "axios";

const config = require('../config.json');
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class ProductAdmin extends Component {

  state = {
    isEditMode: false,
    updatedproductname: this.props.name
  }
  //delete item in both S3 and DynamoDB
  deleteFile = async (user,filename,etag, event) =>{
    event.preventDefault();
    try {
      await axios.delete(`${config.S3api.invokeUrl}/s3delete/${user}?filename=${filename}`);
       const params = {
       };
      console.log(user);
      await axios.delete(`${config.api.invokeUrl}/files/${user}?etag=${etag}`,params);
      console.log("done");
      //redirect to files page
      window.location.reload();
    }catch (err) {
      console.log(`Unable to delete product: ${err}`);
    }
  }



  render() {
    return (
      <div className="tile is-child box notification is-success">
        {
          //this.props.isAdmin && 
          <Fragment>
            {/* <a href="/" onClick={this.handleProductEdit} className="product-edit-icon">
              <FontAwesomeIcon icon="edit" />
            </a> */}
            <button onClick={event => this.deleteFile(this.props.user,this.props.filename,this.props.etag, event)} className="delete"></button>
          </Fragment>
        }
        {
          // this.state.isEditMode 
          // ? <div>
          //     <p>Edit product name</p>
          //     <input 
          //       className="input is-medium"
          //       type="text" 
          //       placeholder="Enter name"
          //       value={this.state.updatedproductname}
          //       onChange={this.onAddProductNameChange}
          //     />
          //     <p className="product-id">id: { this.props.id }</p>
          //     <button type="submit" 
          //       className="button is-info is-small"
          //       onClick={ this.handleEditSave }
          //     >save</button>
          //   </div>
          // : 
          <div>
              <p className="product-title">File Name: { this.props.filename + ".jpg"}</p>
              <p className="product-id">Etag: { this.props.etag}</p>
              <a href={this.props.metaData}>Download Link</a>
          </div>
        }
      </div>
    )
  }
}
