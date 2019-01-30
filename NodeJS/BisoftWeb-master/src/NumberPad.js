/**
 * App module stores the main state and several methods for manipulating it
 * as well as contains the main code.
 * @module App
 * @see module:components/concept/
 * @see module:components/assembly/
 */

var React = require('react');
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory, browserHistory, IndexRoute, IndexRedirect } from 'react-router';
var PropTypes = React.PropTypes;
var Utils = require(__base+'./src/utils');
var Imagepath=Utils.getImagePath();


var NumberPad = React.createClass({
    
    number_write:function(x){
         var text_box = document.getElementById("number");
         console.log("clicked number " + (x));
         text_box.value = x.split('_')[1];
         this.props.updateBtvalue(x);
    },

    render(){
     	return(
            <div className="container">
                <div className="bottom-container">
                    <div className="bottom-num-container">
        		        <div className="main_panel">
                            <br/><br/>
                            <div className="number_button push_button top_b" onClick={this.number_write.bind(this,"B_49")}><p className="padding_font">1</p></div>
                            <div className="number_button push_button top_b" onClick={this.number_write.bind(this,"B_50")}><p className="padding_font">2</p></div>
                            <div className="number_button push_button top_b" onClick={this.number_write.bind(this,"B_51")}><p className="padding_font">3</p></div>
                            <div className="number_button push_button" onClick={this.number_write.bind(this,"B_52")}><p className="padding_font">4</p></div>
                            <div className="number_button push_button" onClick={this.number_write.bind(this,"B_53")}><p className="padding_font">5</p></div>
                            <div className="number_button push_button" onClick={this.number_write.bind(this,"B_54")}><p className="padding_font">6</p></div>
                            <div className="number_button push_button" onClick={this.number_write.bind(this,"B_55")}><p className="padding_font">7</p></div>
                            <div className="number_button push_button" onClick={this.number_write.bind(this,"B_56")}><p className="padding_font">8</p></div>
                            <div className="number_button push_button" onClick={this.number_write.bind(this,"B_57")}><p className="padding_font">9</p></div>
                            <div className="number_button push_button" onClick={this.number_write.bind(this,"B_83")}><p className="padding_font">S</p></div>
                            <div className="number_button push_button" onClick={this.number_write.bind(this,"B_48")}><p className="padding_font">0</p></div>
                            <div className="number_button push_button" onClick={this.number_write.bind(this,"B_69")}><p className="padding_font">E</p></div>
                            <center><input style={{'textAlign':'center'}} className="text_box" type="text_l" id="number" name="num" disabled/></center>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
  
});

module.exports = NumberPad;
