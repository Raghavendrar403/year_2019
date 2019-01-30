var React = require('react');
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory, browserHistory, IndexRoute, IndexRedirect } from 'react-router';
var PropTypes = React.PropTypes;
var Utils = require(__base+'./src/utils');
var Imagepath=Utils.getImagePath();
var selectedValue ;
var serverData;
var route_to = "/";


var Firmware = React.createClass({
    componentDidMount:function(){
        selectedValue = 'hornbill';
        console.log('selectedValue',selectedValue);
    },
    selectedHornbill:function(){
      selectedValue = document.querySelector('.hornbillValue').value;
      console.log("selected", selectedValue);
    },
    selectedStarling:function(){
      selectedValue = document.querySelector('.starlingValue').value;
      console.log("selected", selectedValue);
    },
    selectOnlyThis:function() {
      $('input.chk').on('change', function() {
      $('input.chk').not(this).prop('checked', false);  
      });
    },
    hornbillCall:function(){
        this.selectedHornbill();
        this.selectOnlyThis();
    },
    starlingCall:function(){
        this.selectOnlyThis();
        this.selectedStarling();
    },
    update:function(){
      document.getElementById('successMsg').innerHTML = '';
      document.getElementById('failureMsg').innerHTML = '';
      document.getElementById('buttonUpdate').style.display = 'none';
      document.getElementById('installGif').style.display = 'block';
      document.getElementById('installMsg').style.display = 'block';
      var displayMsg;
      var socket = io.connect("http://localhost:9009", {reconnect: true});
      console.log("selected", selectedValue);
      socket.emit('/dfu', selectedValue);
      socket.on('message', function(data){
        serverData = data.output;
        //console.log("serverData", serverData);
        var checkForSuccess = data.output.split('Progress');
        var sucesslastIndex = checkForSuccess[checkForSuccess.length-1];
        var thenum = sucesslastIndex.replace( /^\D+/g, '');
        var theLastMsg = thenum.split('%');
        var sucessMsg = theLastMsg[0];
        if(sucessMsg=="100"){
            displayMsg= 'Firmware installed successfully.';
            document.getElementById('installGif').style.display = 'none';
            document.getElementById('buttonUpdate').style.display = 'block';
            document.getElementById('failureMsg').innerHTML = '';
            document.getElementById('successMsg').innerHTML = displayMsg;
            document.getElementById('installMsg').style.display = 'none';
        
        }
        else{
           displayMsg = serverData;
           document.getElementById('installGif').style.display = 'none';
           document.getElementById('buttonUpdate').style.display = 'block';
           document.getElementById('failureMsg').innerHTML = displayMsg;
           document.getElementById('installMsg').style.display = 'none';
        }
      });
    },
    render(){
      return(
            <div className="container">
              <div className="topContainer">
                    <div className="logo">
                        <Link to={route_to}><img style={{marginLeft:'5px',marginTop:'10px'}} src="./src/ProjectManager/images/logo.png" alt="Bisoft"/></Link>
                    </div>
                </div>
              <div className="bottomContainer">
                   <p className="select_Bibox_dfu" style={{position:'absolute',top:'50%',left:'40%'}}>Select below Bibox type to install</p>
                   <p id="installMsg" style={{position:'absolute',top:'80%',left:'38%',color:'black',display:'none'}}>Installing Firmware , Please wait....</p>
                   <p style={{position:'absolute',top:'80%',left:'40%',color:'green'}} id="successMsg"></p>
                   <p style={{position:'absolute',top:'80%',left:'10%',color:'red'}} id="failureMsg"></p>
                   <div className="biboxStyle">
                        <div style={{width:'50%',float:'left'}}>
                        <span className='hornbillStyle' style={{position:'absolute',top:'60%',marginLeft:'40%'}}>Hornbill <input id="hornbill"  onClick={this.hornbillCall} className = "hornbillValue chk" type="radio" name="hornbill" value="hornbill" checked/></span>
                        </div>
                         <div style={{width:'50%',float:'right'}}>
                         <span className='starlingStyle' style={{position:'absolute',top:'60%'}}>Starling <input id="starling"  onClick={this.starlingCall} className = "starlingValue chk" type="radio" name="starling" value="starling" /></span>
                        </div>
                       
                        
                   </div>
                 <img className="ifImage" style={{height:'140',width:'140'}} src="images/ic_logicflow_if.png"/>
               <button onClick={this.update} id="buttonUpdate" className="buttonUpdate">install</button>
               <img id="installGif" style={{height:'60',width:'60',marginTop:'45%',marginLeft:'48%',display:'none'}} src="images/firmwareinstall.gif"/>
              </div>
            </div>

      );
    }
});


module.exports = Firmware;
