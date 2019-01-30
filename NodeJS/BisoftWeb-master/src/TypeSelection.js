/**
 * This module is the main module of the concept tab and is a dumb component
 * @see module:components/concept/Coverflow
 * @module components/concept/
 */

var React = require('react');
var PropTypes = React.PropTypes;
import { Router, Route, Link, hashHistory, browserHistory, IndexRoute, IndexRedirect } from 'react-router';
import selectBibox from './components/selectbibox/index';
var route_to = "/";


var TypeSelection = React.createClass({
 
  usbSelected:function(){
        // var AppUrl='/#/bisoft/local';
        //     localStorage.setItem('connectivity-type','USB');
        //     browserHistory.push(AppUrl);
        //     window.location.reload();

        var socket = io.connect("http://localhost:9009"); 
        socket.emit('/starling',"requesting bibox device");
        socket.on('message', function (data) {
          var msg = data.output;
          console.log('data',msg);
          console.log('datatype',typeof(msg));
          if(msg=="*STA#"){
            console.log("yes");
            localStorage.setItem('biboxTypes',msg);
            var AppUrl='/#/bisoft/local';
            //localStorage.setItem('connectivity-type','USB');
            browserHistory.push(AppUrl);
            window.location.reload();
          }
          else if(msg=="*HOR#"){
            console.log("yes");
            localStorage.setItem('biboxTypes',msg);
            var AppUrl='/#/bisoft/local';
            //localStorage.setItem('connectivity-type','USB');
            browserHistory.push(AppUrl);
            window.location.reload();
          }
          else{
            console.log('no bibox connected');
          }
          socket.emit('close');
        });
      
      
  },
  wifiSelected:function(){
    alert('Please select either USB or Blutooth');
  },
  bluetoothSelected:function(){
    var AppUrl='#/App/new/selectbibox';
    localStorage.setItem('connectivity-type','Bluetooth');
    browserHistory.push(AppUrl);
    window.location.reload();
  },
  render: function() {
    localStorage.setItem('selectbibox','Bibox Hornbill;00:00:00:00:00:00');
    //localStorage.setItem('biboxSelected','Bibox Hornbill;00:00:00:00:00:00');
    var App=this.props.app;
    return (
      <div className="container">
          <div className="top">
              <div className="logo">
                 <Link to={route_to}><img style={{marginLeft:'10px',marginTop:'15px'}} src="./src/ProjectManager/images/logo.png" alt="Bisoft"/></Link>
              </div>
          </div>
          <div className="bottom" style={{backgroundColor:'#ccd8e4'}}>
              <p className="selectConnectionType">Select Bibox Connectivity type</p>
              <div className="usb">
                  <div className="usb_image_container">
                      <button onClick={this.usbSelected}><img title="click to use usb version" src="images/usb_select.png"/></button>
                  </div>
                  <p>USB</p>
              </div>
              <div className="wifi">
                  <div className="wifi_image_container">
                      <button onClick={this.wifiSelected}><img title="click to use wifi version" src="images/wifi_select.png"/></button>
                  </div>
                  <p>Wi-Fi</p>
              </div>
              <div className="bluetooth_style">
                <div className="ble_image_container">
                  <button onClick={this.bluetoothSelected}><img title="click to use bluetooth version" src="images/bluetooth_select.png"/></button>
                </div>  
                  <p>Bluetooth</p>
              </div>
          </div>
      </div>

    );
  }

});

module.exports = TypeSelection;
