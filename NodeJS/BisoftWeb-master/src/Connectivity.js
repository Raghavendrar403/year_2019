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

var Connectivity=React.createClass({
	
  componentDidMount: function(){
  	try{
  		var _this = this;
		var imgobjectappStatus=new Image(1,1);
    	imgobjectappStatus.onload= function(){
      		_this.scan();
    	};
    	imgobjectappStatus.onerror= function(){
      		//alert("Open Connectivity App");
      		//changeAppstate('downloadModal');
    	};
    	var currTime=Date.now();
    	imgobjectappStatus.src=socketHost+"/uptime/?b="+currTime; 
	
	}catch(e){
		console.log(e);
		//changeAppstate('downloadModal'); 
	}
	
	
  },
  newProject: function(){
    sessionStorage.clear();
    var AppUrl="#/App/"+'new'+'/selectbibox';
    //var AppUrl="#/App/"+'new'+'/concept';
    browserHistory.push(AppUrl);
    window.location.reload();
  },
  upload: function(target,_this){	
  	var mac = target.textContent;
  	var macEnd = mac.split(' - ');
  	var resultedMac = macEnd[1];
  	var lastMacId = resultedMac.replace(':','').replace(':','').replace(':','').replace(':','').replace(':','');
  	console.log('lastMacId', lastMacId);
	console.log("upload: "+ lastMacId);
	var res=JSON.stringify({code:mac});
	var socket = io.connect(socketHost);
  	socket.emit('/device', { code: res });
	socket.on('_device', function (data) {
		var respVal=data.result+'';
      	//console.log("hello: "+ respVal);
		
     //turn bibox with mac id  
    var name = 'Bibox Starling'; 
    for(var i = 0; i<Number(target.attributes.length); i++){
	   	if(target.attributes[""+i].name == "name"){
		    name = target.attributes["0"]["nodeValue"];
		    break;
	   	}

	}
	localStorage.setItem("selectbibox",name+";"+lastMacId);
	var imageUrl;
	var biboxType = localStorage.getItem("selectbibox");
	var selectedBiboxSplit = biboxType.split(';');
	console.log('selectedBibox',selectedBiboxSplit);
	var selectedBibox = selectedBiboxSplit[0];
	if(selectedBibox=="BIBOX Starling"){
		imageUrl ="images/starling.png";
	}
	else{
		imageUrl ="images/hornbill.png";
	}
	var turnbibox = {type: 'Dummy Bibox', description:mac,color: '#30A8AD',name: name,"selected":false,"url":imageUrl}
	console.log('selectbibox',turnbibox);
	 
	 _this.addNewSelectedBibox(turnbibox); 
	
	browserHistory.goBack();   
	/*var AppUrl='/#/App/new/selectbibox';
    	browserHistory.push(AppUrl);
    	window.location.reload();*/
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
  scan: function(){
  	try{
		var _this=this; 
		var imgobjectappStatus=new Image(1,1);
    	imgobjectappStatus.onload= function(){
      		document.getElementById('list').textContent = "";
			document.getElementsByClassName('loadinggif')[0].style.display = 'block';
			var list = document.getElementById('list');
			document.getElementById("scanbutton").style.pointerEvents = 'none';
			var socket = io.connect(socketHost);
		  	socket.emit('/getDevices', { data: 'data' });
			socket.on('_getDevices', function (data) {
			    console.log(data.devices.length);			
				for(var i=0;i<data.devices.length;i++){
					var node = document.createElement("LI");
					var devicemac=data.devices[i].mac;

					// renamingID
					function chunk(str, n) {
					    var ret = [];
					    var i;
					    var len;

					    for(i = 0, len = str.length; i < len; i += n) {
					       ret.push(str.substr(i, n))
					    }

					    return ret;
					};

					var resultMacId =chunk(data.devices[i].mac, 2).join(':');

	
					var textnode = document.createTextNode(data.devices[i].name + " - "  + resultMacId);
					var att = document.createAttribute("name");
					att.value = data.devices[i].name;
					node.setAttributeNode(att); 
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
						_this.upload(e.target,_this);
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
    	};
    	imgobjectappStatus.onerror= function(){
      		//alert("Open Connectivity App");
      		//changeAppstate('downloadModal');
    	};
    	var currTime=Date.now();
    	imgobjectappStatus.src=socketHost+"/uptime/?b="+currTime; 
	
	}catch(e){
		console.log(e);
		//changeAppstate('downloadModal'); 
	}
		
  },
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
  
  isBiboxAdded:function(macid){
	 var sessionData=localStorage.getItem("biboxes");
     var dataTochange=JSON.parse(sessionData);
     var matchid = false;	 
	 
	 for(var i=dataTochange.length-1; i>= 0;i--)	 
	 {		  
		 if(dataTochange[i].description == macid)
		 {	
	         matchid = true;
             break;			
		 }		 
	 }
	 
	 
     if(matchid == true) 	
	 {
		 return matchid; 
	 }
     else{
		 return matchid;
	 }
	 
	 localStorage.setItem("biboxes",JSON.stringify(dataTochange)); 
  },

  
  addNewSelectedBibox: function(biboxObj){
	  
	   var sessionData=localStorage.getItem("biboxes");
	   var dataTochange=JSON.parse(sessionData);
	   
	  if(!this.isBiboxAdded(biboxObj.description)){		  
	 
		  //add to dataTochange variable biboxObj
		  //....
		  //		  
		 dataTochange.splice(0, 0, biboxObj);		
		//display first three index items(latest biboxs);
		dataTochange = dataTochange.slice(0,3);			       		
	  }  
	   dataTochange=JSON.stringify(dataTochange);	    
	   localStorage.setItem("biboxes",dataTochange);    
  },
  
  dummyBiboxSelected: function(){
	  
	var biboxType = localStorage.getItem("selectbibox");
	var selectedBiboxSplit = biboxType.split(';');
	console.log('selectedBibox',selectedBiboxSplit);
	var selectedBibox = selectedBiboxSplit[0];
	if(selectedBibox=="BIBOX Starling"){
		imageUrl ="images/starling.png";
	}
	else{
		imageUrl ="images/hornbill.png";
	}  
	  //dummy bibox with macid:-
	var dummybiboxObj={type: 'Dummy Bibox', description: '00:00:00:00:00:00',color: '#30A8AD',name: 'Dummy Bibox', "selected":false, "url":"images/hornbill.png"};
	localStorage.setItem("selectbibox",dummybiboxObj.name+";"+dummybiboxObj.description);
	 
	
	 this.addNewSelectedBibox(dummybiboxObj);
	
	
	browserHistory.goBack();
	
	
	/*var AppUrl='/#/App/new/selectbibox';
    	browserHistory.push(AppUrl);
    	window.location.reload();*/
  },
  render: function(){
            return (
        	<div id="connect" style={{height: '100%'}} className="inner">
		<header id="header">
			<a href="/" className="logo"><img src="images/logo.png" alt="Bisoft"/></a>
			<h1 className="heading">Connectivity <img src="images/conectivity.png" alt=""/></h1>
			<div className="clear"></div>
		</header>
		<section style={{height: '100%'}} id="conectivity">
			<div className="options">
				<div className="tabmenu">
					<h2>Bluetooth Options</h2>
				</div>
				
				<div id="bluetooth" className="tabcontent active">
				
				
				
					<div className="right">
						<h3 className="subhead">List of Available Devices</h3>
						<div className="subcontent">				 
							<div id="list">
							<li style={{borderBottomWidth:0}}>
							<h1 style={{cursor: 'pointer'}} onClick={this.dummyBiboxSelected}>Dummy Bibox</h1>
							</li>    
							</div>
							<img className="loadinggif" style={{display: 'none'}} src="./images/loading2.gif"></img>			
							<br></br>
						</div>
					</div>
					
					
					
					<div className="clear"></div>
					<div className="bt-footer">
						<ul style={{'margin':'0px'}}>
							<li className="big active"><a id="scanbutton" onClick={this.scan} >Scan for devices</a></li>
						</ul>
						<div className="clear"></div>
					</div>
				</div>
				<div id="wifi" className="tabcontent">
					<h3 className="subhead">Wifi connection</h3>
					<div className="subcontent"></div>
				</div>
				<div id="usb" className="tabcontent">
					<h3 className="subhead">USB connection</h3>
					<div className="subcontent"></div>
				</div>
				<div id="cloud" className="tabcontent">
					<h3 className="subhead">Cloud connection</h3>
					<div className="subcontent"></div>
				</div>
			</div>
		</section>
	</div>   );
  }
  });

module.exports = Connectivity;
