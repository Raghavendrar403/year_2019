/**
 * App module stores the main state and several methods for manipulating it
 * as well as contains the main code.
 * @module App
 * @see module:components/concept/
 * @see module:components/assembly/
 */

var React = require('react');
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory, browserHistory } from 'react-router';
const Vertical_NoUISlider = require('./helpers/vertical_Nouislider');
var PropTypes = React.PropTypes;
var page = require('page');
const Sizes = require('./helpers/Sizes');
var components = require('./data.js');
var componentProps = require('./componentProps');
var Project = require('./ProjectManager/Project');
var uuid = require('node-uuid');
import App from './App';
var Utils = require(__base+'./src/utils');
var Imagepath=Utils.getImagePath();
var socketHost="http://localhost:9009";//Utils.socketHost;
var macID="52:6C";
var deviceId='';
var Overlay = require('react-overlays');
var NumberPad = require('./NumberPad');

const modalStyle = {
  position: 'fixed',
  zIndex: 1040,
  top: 0, bottom: 0, left: 0, right: 0
};
const backdropStyle = {
  ...modalStyle,
  zIndex: 'auto',
  backgroundColor: 'black',
  opacity: '0.5'
};
let rand = ()=> (Math.floor(Math.random() * 20) - 10);
const dialogStyle = function() {
  // we use some psuedo random coords so nested modals
  // don't sit right on top of each other.
  let top = 50 + rand();
  let left = 50 + rand();

  return {
    position: 'absolute',
    width: 400,
    top: '40%',
    left: '30%',
    border: '1px solid #e5e5e5',
    backgroundColor: 'white',
    boxShadow: '0 5px 15px rgba(0,0,0,.5)',
    border: '1px solid #00AAD9',
    paddingLeft: 20,
    paddingBottom: 20,
    paddingRight: 2,
    paddingTop: '4px',
  };
};
var Connectivity=React.createClass({
  getInitialState: function(){
	return({BTconnected: false, currentPad: "navigation", uploadModal: '', showModalToggle: false, btvalue:'99', value:0, val:0,socket:io.connect(socketHost)});
  },
  componentWillUnmount: function(){
  	this.state.socket.emit('close');
  },
  componentDidMount: function(){
  	var Btconnected = false;
  	var _this = this;
	try{
		/*var socket=io.connect("http://localhost:9009", {query:"test_data"});
		console.log("connected:", socket);
		if(socket.Socket.connected==true){ 
			console.log("in");
			this.setState({Btconnected: true}); 
		}*/
		var host="http://localhost:9009"; 
		var imgobjectappStatus=new Image(1,1);
            	imgobjectappStatus.onload= function(){
              		//changeAppstate('newtabModal');
              		var socket = _this.state.socket;
					var mac = (localStorage.getItem("selectbibox")).split(";")[1]||"";
				  	var res=JSON.stringify({code:mac});
				  	socket.emit('/device', { code: res });
				 	socket.on('_device', function (data) {
					  	socket.emit('/btRemote', { data: _this.state.btvalue });
						socket.on('_btRemote', function (data) {
							console.log(data);
							Btconnected = data.success;
							//socket.emit('close');
							var status = 'uploadingModal';
							if(data.success)
								status = '';
							_this.setState({Btconnected: data.success, showModalToggle: !data.success, uploadModal: status});
						});
					});
            	};
    	imgobjectappStatus.onerror= function(){
      		console.log("server not up");
    	};
    	var currTime=Date.now();
    	imgobjectappStatus.src=host+"/uptime/?b="+currTime;  
	}catch(err) {
		console.log("not connected");
    		//if(document.getElementsByClassName("remoteconnectionimage")[0])
			//document.getElementsByClassName("remoteconnectionimage")[0].src="images/remote_connected.png"; 
	}
	//this.scan();
  },
  newProject: function(){
    sessionStorage.clear();
    var AppUrl="#/App/"+'new'+'/selectbibox';
    //var AppUrl="#/App/"+'new'+'/concept';
    browserHistory.push(AppUrl);
    window.location.reload();
  },
  upload: function(mac){
	//alert("upload: "+ mac);
	var res=JSON.stringify({code:mac});
	var socket = io.connect(socketHost);
  	socket.emit('/device', { code: res });
	socket.on('_device', function (data) {
		var respVal=data.result+'';
      	console.log("hello: "+ respVal);
      	socket.emit('close');
	});
  }, 
  checkSelectedDevice: function(){
	document.getElementById('list').textContent = "";
	var socket = io.connect(host);
  	socket.emit('/selected_device', { data: 'data' });
	socket.on('_selected_device', function (data) {
		if(data.deviceId){
    		var node = document.createElement("LI");                 
			var devicemac=data.deviceId;
			deviceId=data.deviceId;
		}
		socket.emit('close');
	});
  },
  /*scan: function(){
	document.getElementById('list').textContent = "";
	document.getElementsByClassName('loadinggif')[0].style.display = 'block';
	var list = document.getElementById('list');
	document.getElementById("scanbutton").style.pointerEvents = 'none';
	var _this=this; 
	var socket = io.connect(socketHost);
  	socket.emit('/getDevices', { data: 'data' });
	socket.on('_getDevices', function (data) {
	    console.log(data.devices.length);			
		for(var i=0;i<data.devices.length;i++){
			var node = document.createElement("LI");
			var devicemac=data.devices[i].mac;
			var textnode = document.createTextNode(data.devices[i].mac);        
			node.appendChild(textnode);                              
			macID=data.devices[i].mac;
			if(deviceId==macID)
				node.className="highlightdevice";
			document.getElementById("list").appendChild(node);
			var list=document.getElementById("list");
			document.getElementsByTagName("LI")[i].id=i+"MAC";
			var buttons=document.getElementById(i+"MAC");
			buttons.addEventListener('click', function(node,list){
				return function(e) {
				var h1node = document.createElement("H1");  
				var textnodeConnected = document.createTextNode(devicemac);
				h1node.appendChild(textnodeConnected);	
				//console.log("mac:",devicemac,"node",node.childNodes);
				var list=document.getElementById("list");
				for(var j=0;j<list.childNodes.length;j++){
					list.childNodes[j].className="";
				}
				node.className="highlightdevice";
				_this.upload(e.target.textContent);
			}}(node));
		}
		document.getElementsByClassName('loadinggif')[0].style.display = 'none';
		document.getElementById("scanbutton").style.pointerEvents = 'auto';
	    if(data.status=="success"){
			//window.location.reload();
			this.close();
	    }
	    socket.emit('close');
	});
  },*/
  disconnect: function(){
	// alert("upload: "+ mac);
	document.getElementById('list').textContent = "";
  },
  stop: function(){
	var devices=[];
	for(var i=0;i<4;i++){
		devices.push({mac : i+"mac"});
	}
	for(var i=0;i<devices.length;i++){
		  var node = document.createElement("LI");                 // Create a <li> node
		  var textnode = document.createTextNode(devices[i].mac);         // Create a text node
		  node.setAttribute('id', i+"MAC");
		  // node.setAttribute('onclick', 'upload('+devices[i].mac+')');
		  node.appendChild(textnode);                              // Append the text to <li>
		  document.getElementById("list").appendChild(node);
		  document.getElementsByTagName("LI")[i].id=i+"MAC";
		  var buttons=document.getElementById(i+"MAC");
		  buttons.addEventListener('click', function(e) {
			  alert("device selected: "+e.target.textContent);
			  upload(e.target.textContent);
		  });
		  // addListener(document.getElementById(i+"MAC"), 'click', this.upload(devices[i].mac));
		  // document.getElementById(i+"MAC").onclick=this.upload(devices[i].mac);
		  // document.getElementById('list').textContent = ;
	}
  },
  changePad: function(pad){
  	console.log(pad);
  	this.setState({currentPad:pad});
  },

  buttonClicked: function(value){
  	var _this = this;
  	document.getElementById("bt_num_display").innerHTML = value.split('_')[1];
	var socket = this.state.socket;
	var mac = (localStorage.getItem("selectbibox")).split(";")[1]||"";
  	var res=JSON.stringify({code:mac});
 	this.setState({btvalue:value});
  	socket.emit('/device', { code: res });
	console.log(value);
  },

    updateBtvalue: function(val){
    var _this = this;
    var socket = this.state.socket;
	var mac = (localStorage.getItem("selectbibox")).split(";")[1]||"";
  	var res=JSON.stringify({code:mac});
    socket.emit('/device', { code: res });
    console.log("numvalue :" + val);
  	this.setState({btvalue:val});

  },
  
  onChange: function (e) {
  	var _this = this;
  	var socket = this.state.socket;
  	var mac = (localStorage.getItem("selectbibox")).split(";")[1]||"";
  	var res=JSON.stringify({code:mac});
	this.setState({value:parseInt(e[0]), btvalue:"S_"+parseInt(e[0])});
  	socket.emit('/device', { code: res });
  	console.log("onChange=  S_"+parseInt(e[0]));
    //this.props.onChange(parseInt(e[0]));
  },
  onSlide: function (e) {
  	//console.log("onSlide=  "+parseInt(e[0]));
  	document.getElementById("bt_num_display").innerHTML = parseInt(e[0]);
    //this.props.onSlide(parseInt(e[0]));
  },
  close: function () {
  	this.setState({showModalToggle: false, uploadModal: ''});
  },
  retry: function () {
  	this.setState({showModalToggle: false, uploadModal: ''});
  	this.componentDidMount();
  },
  	render: function(){
	  	var max=255, min=0, disabled=false;
		var connect_image="images/remote1.png";
		if(this.state.Btconnected==true)
			connect_image="images/remote_connected.png";
		console.log("img ",connect_image); 
		var Modal=Overlay.Modal;
		var modalData;
	    if(this.state.uploadModal=='uploadingModal'){
	        modalData=(<div style={dialogStyle()}>
	                      <button style={{backgroundColor: 'transparent',border: 'none',outline: 'none',overflow: 'visible',position: 'relative',marginLeft: '90%',marginTop: '2px',marginBottom: '8px'}} onClick={this.close}>
	                          <img src="images/btn_close1.png" style={{height: '24px',width: '24px',borderRadius: '20px', backgroundColor: 'transparent'}}/>
	                      </button>
	                      <p style={{textAlign: 'center'}}>Device not connected, click Retry to connect again....</p>
	                      <div style={{marginLeft: '20%',marginTop: '8px'}}>
	                      <button className='YesNobutton' onClick={this.close} style={{marginRight: '75px'}}>Cancel</button>
	                      <button className='YesNobutton' onClick={this.retry} style={{marginRight: '5px'}}>Retry</button>
	                      </div>
	                    </div>);
	        var Appstate=this;
	        if(this.state.showModalToggle){
	          //Appstate.setState({showModalToggle: false});
	          setTimeout(function(){
	          }, 2000);
	        }  
	    }else{
	    	modalData=(<div style={dialogStyle()}>
	                      
	                    </div>);
	    }
	    var btRemoteSection,tabInStatus, tabOutStatus;
	    if(this.state.currentPad == "navigation"){
	    	tabInStatus = 'activetab-n';
            tabOutStatus = 'inactivetab-n';
		    btRemoteSection = (
		    	<section style={{height: '100%'}} className="remoteinner">
					<div className='modal-example' style={{position: 'fixed',display: 'none'}}>
		                    <Modal aria-labelledby='modal-label' style={modalStyle}
		                      backdropStyle={backdropStyle} show={this.state.showModalToggle} onHide={this.close}>    
		                      {modalData}
		                    </Modal>
		            </div>
					<div className="left">
						<h3 style={{'cursor':'pointer'}} className="subhead {tabOutStatus}" onClick={this.changePad.bind(this,"navigation")}>Navigation pad</h3>
						<div className="navigation">
							<div className="navgroup">
							<a className="vol vup" onClick={this.buttonClicked.bind(this, "B_117")}></a>
							<a className="vol vprev" onClick={this.buttonClicked.bind(this, "B_108")}></a>
							<a className="vol vnext" onClick={this.buttonClicked.bind(this, "B_114")}></a>
							<a className="vol vdown" onClick={this.buttonClicked.bind(this, "B_100")}></a>
									<div className="navigation-inner">
											<div className="stop-nav">
											<a onClick={this.buttonClicked.bind(this, "B_99")}><img src="images/stop.png" alt="volup"/></a>
											</div>  
									</div>
								</div>
						</div>
					</div>
					<div className="right">
						<h3 style={{'cursor':'pointer'}} className="subhead {tabInStatus}" onClick={this.changePad.bind(this,"number")}>Number pad</h3>
						<div className="numberpad">
							<a onClick={this.buttonClicked.bind(this, "B_66")} className="b">B</a>
							<a onClick={this.buttonClicked.bind(this, "B_67")} className="c">C</a>
							<a onClick={this.buttonClicked.bind(this, "B_65")} className="a">A</a>
							<a onClick={this.buttonClicked.bind(this, "B_68")} className="d">D</a>
							
						</div>
						
						<div className="scroll">
							<div id="slider-vertical" className="dragdealer">
						<Vertical_NoUISlider  range={{min: min, max: max}} start={[this.state.value]} orientation="vertical" direction='rtl' onChange={this.onChange} disabled={disabled} onSlide={this.onSlide}/>
							  <div clearlassName="handle red-bar">
							  </div>
							</div>
						</div>
					</div>
					<div className="clear"></div>
					<span className="chanel" id='bt_num_display'>0</span>
				</section>
		    );
	    }else{
	    	btRemoteSection = (
		    	<section style={{height: '100%'}} className="remoteinner">
					<div className='modal-example' style={{position: 'fixed',display: 'none'}}>
		                    <Modal aria-labelledby='modal-label' style={modalStyle}
		                      backdropStyle={backdropStyle} show={this.state.showModalToggle} onHide={this.close}>    
		                      {modalData}
		                    </Modal>
		            </div>
					<div className="left {tabOutStatus}">
						<h3 style={{'cursor':'pointer'}} className="subhead" onClick={this.changePad.bind(this,"navigation")}>Navigation pad</h3>
					</div>
					<div className="right {tabOutStatus}">
						<h3 style={{'cursor':'pointer'}}  className="subhead {tabInStatus}" onClick={this.changePad.bind(this,"number")}>Number pad</h3>
					</div>
					<div className="clear"></div>
					<NumberPad updateBtvalue={this.updateBtvalue}/>
				</section>
		    );
	    }
    	return (
        	<div id="remote" className="inner">
        	
				<header id="header">
					<a href="/" className="logo"><img src="images/logo.png" alt="Bisoft"/></a>
					<h1 className="heading">Remote <img src="images/ic_bt_remote_white.png" alt=""/></h1>
					<div className="headright"><img className="remoteconnectionimage" style={{'width':'49px','height':'50px'}}src={connect_image} alt="Bisoft"/></div>
					<div className="clear"></div>
				</header>
				{btRemoteSection}
				<footer id="footer">
					
				</footer>
			</div>
		);
  	}
});

module.exports = Connectivity;
