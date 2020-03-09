import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchPost} from '../actions';


class testPage2 extends Component {
  componentDidMount (){
    this.props.fetchPost();
  }
  render() {
    return (
      <div> textInComponent </div>
    );
  }
}

export default 
connect (null,
  {fetchPost}
  )(testPage2)