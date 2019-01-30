var React = require('react');
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory, browserHistory, IndexRoute, IndexRedirect } from 'react-router';
var PropTypes = React.PropTypes;
var Utils = require(__base+'./src/utils');
var Imagepath=Utils.getImagePath();


var PictureUpload = React.createClass({
	render(){
    	return(
            <div className="body_container">
      	        <div className="top_container">
                    <p className="picture_text">Picture Upload</p>
      	        </div>
      	        <div className="bottom_container">
      	 	        <div className="left_container">
      	 		        <div className="browse">
                            <div className="browse_top"></div>
                            <div className="browse_bottom">
                                  <div className="browse_bottom_left">browse</div>
                                  <div className="browse_bottom_right"><img src="images/camera_white.png"/></div>
                            </div>
                        </div>
      	 	        </div>
      	 	        <div className="right_container">
      	 		        <div className="right_top_container">
      	 		            <div className="name"><label>Name<input type="text" name="name"/></label></div>
      	 		        </div>
      	 		        <div className="right_bottom_container">
      	 			        <button className="upload_button">upload</button>
      	 		        </div>
      	 	        </div>
      	        </div>
            </div>
        );
    }
});


module.exports = PictureUpload;