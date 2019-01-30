var React = require('react');
import ReactDOM from 'react-dom';
var PropTypes = React.PropTypes;
var App = require('../App'); 
var page = require('page');
import { Router, Route, Link, hashHistory, browserHistory } from 'react-router'
var Data = require('../data.js');
var ProjectManager = require('../ProjectManager'); 
var uuid = require('node-uuid');
var Utils = require(__base+'./src/utils');
var Imagepath=Utils.getImagePath();
var localDataArray=[];
var localProjectNamesList='';
var projectCompleteData=[];
var PortConnections = require(__base + 'src/components/assembly/PortConnections');
var FlowCodeGeneration = require('../FlowCodeGeneration'); 


var ProjectDisplay= React.createClass({
	componentDidMount: function(){
	    var id=this.props.projId; 
	    var curTab=this.props.curTab;
	    var hostUrl=Utils.getHostUrl();
	    var url = hostUrl;
	    if(curTab=="tutorials"){
	    	url+="/web_bisoft/tutorial/"+id;
	    }else{
	    	url+="/web_bisoft/project/"+id;
	    }
	    $.ajax({
	            url: url,
	            type: 'GET',
	            success: function(data) {
	            	  //console.log("success project:  "+data.project["name"]);
	            	  var projType=data.project["projectType"];
	            	  if(projType=="tutorial"){
							document.getElementsByClassName('explore')[0].style.display='none';
							document.getElementsByClassName('tutorial')[0].style.display='block';
					  }
	                  this.setState({selectedProjectData: data.project,showloading: false});               
	            }.bind(this),
	            error: function(xhr, status, err) {
	              //window.location.href="/"+this.props.curTab;
	              //console.error("/save", status, err.toString());
	            }.bind(this)
	    });
		
  	},
  	getInitialState: function() {
  		console.log("displaying project.js init");
    	return {selectedProjectData: {},loadingpage: false, showloading: true,tutorialMode: false,componentsUsedData: '',ExploreProject: 'false',Projectvalue: 'Project1',ProjectDescvalue: 'This is a sample project!'};
  	},
  	ExploreProject: function(e){
		e.preventDefault();
		var currentProjectId=this.props.projId;
		var hostUrl=Utils.getHostUrl();
		var urlExplore;
		if(this.props.curTab=="tutorials"){
			urlExplore = hostUrl+"/web_bisoft/tutorial_app/"+currentProjectId;
		}
		else{
			urlExplore = hostUrl+"/web_bisoft/app/"+currentProjectId;
		}
		$.ajax({
            url: urlExplore,
            type: 'GET',
            async: true,
            dataType: "json",
            success: function(data) {
                sessionStorage.setItem("AppDetails-"+this.props.projId,JSON.stringify(data.project));
	            var AppUrl='#/App/'+currentProjectId+'/concept';
	    		browserHistory.push(AppUrl);
	    		window.location.reload();
            }.bind(this),
            error: function(xhr, status, err) {
              
            }.bind(this)
          });  
	},
	uploadToSelectedDevice: function(){
		var currentProjectId=this.props.projId;
		var hostUrl=Utils.getHostUrl();
		$.ajax({
            url: hostUrl+"/web_bisoft/app/"+currentProjectId,
            type: 'GET',
            async: true,
            dataType: "json",
            success: function(data) {
                var CurrentLogicScreen=null;
			    if(sessionStorage.getItem("CurrentLogicScreen")){
			      CurrentLogicScreen=sessionStorage.getItem("CurrentLogicScreen");
			    }else{
			      CurrentLogicScreen='hexa';
			    }
			    if(data.project && CurrentLogicScreen=='hexa'){
			        var host="http://localhost:9009";
			        var imgObj=new Image(1,1);
			        console.log("upload");
			        if(data.project.PortConnections){
			        	PortConnections = data.project.PortConnections;
			        }
			        // var params={"logic":{"program":[{"type":"start","state":{"bic1":false,"bic2":false,"bic3":false,"bid2":false,"bif1":false,"bif2":false,"bif3":false,"bid3":false,"bid1":false,"bmp3":false}},{"type":"output","state":{"assignA1":true,"valueA1":190}}],"end":{"type":"end","state":"end"},"offset":{"left":0,"top":0},"scale":1,"currentProgramGuide":-1,"active":[1,3],"bottomPanel":"border","insertState":false},"components":{"A1":{"type":"led","index":0},"A2":null,"A3":null,"A4":null,"MOTOR1":null,"MOTOR2":null,"BC":null,"DE":null,"F":null,"G":null,"A5":null,"A6":null,"BATTERY":{"type":"battery","index":0}}};
			        var logicData=data.project.logic;
			        var params={"logic":logicData,"components":PortConnections};
			        //var Bytecode=this.uploadCall(params);
			        var Bytecode=JSON.stringify({"code":params});
			        //console.log("code: ",Bytecode);
			        var Appstate=this;
			        var changeAppstate= function(status){
				        //alert("inside state");
				        Appstate.setState({showModalToggle: true,uploadModal: status});
			        };
					try{
						var imgobjectappStatus=new Image(1,1);
				        imgobjectappStatus.onload= function(){
				              		//changeAppstate('newtabModal');
							var socket = io.connect("http://localhost:9009"); 
					      	var mac = (localStorage.getItem("selectbibox")).split(";")[1]||"";
					      	var res=JSON.stringify({code:mac});
					      	socket.emit('/device', { code: res });
					      	socket.on('_device', function (data) {
						        var respVal=data.result+'';
						        socket.emit('close');
						  		socket.emit('/selected_device');
						  		socket.on('_selected_device', function (data) {
					  				if(data.deviceId){
					  					changeAppstate('uploadingModal'); 
					  					socket.emit('/upload',{"code":params});
					  					socket.on('_upload', function (data) {
					  						if(data.success)
					  							console.log(data.success);
					  						else
					  							console.log("false");
					  					});
					  				}else{
					  					var AppUrl='/#/connectivity';
					      					browserHistory.push(AppUrl);
					      					window.location.reload();
					  				}
					  				socket.emit('close');
					  			});
				      		});
				        };
		            	imgobjectappStatus.onerror= function(){
		              		//alert("onerror");
		              		changeAppstate('downloadModal');
		            	};
		            	var currTime=Date.now();
		            	imgobjectappStatus.src=host+"/uptime/?b="+currTime; 
					
					}catch(e){
						console.log(e);
						changeAppstate('downloadModal'); 
					}
			    }else if(CurrentLogicScreen=='flow'){
			        var dataToPass=FlowCodeGeneration(this.state.logicNew);
			        $.ajax({
			            url: hostUrl+"/upload/flow_code",
			            dataType: "json",
			            contentType: "application/json; charset=utf-8",
			            type: 'POST',
			            data: JSON.stringify({ code: dataToPass }),
			            success: function(hex_data) {          
			              console.log("success "+hex_data.success);
			              this.uploadHexFile(hex_data.success);
			            }.bind(this),
			            error: function(xhr, status, err) {
			              console.log("error");
			            }.bind(this)
			        });
			    }else{
			        var dataToPass=this.state.logicEditor.code;
			        $.ajax({
			            url: hostUrl+"/upload/editor_code",
			            dataType: 'json',
			            contentType: "application/json; charset=utf-8",
			            type: 'POST',
			            data: JSON.stringify({ code: dataToPass }),
			            success: function(hex_data) {
			              console.log("success "+hex_data.success);
			            }.bind(this),
			            error: function(xhr, status, err) {
			              console.log("error");
			            }.bind(this)
			        });
			    }  
			}.bind(this),
            error: function(xhr, status, err) {
              
            }.bind(this)
          }); 
  },
	render: function() {
		var currentData=(this.state.selectedProjectData);
		var currentProjectId,currentProjectData={};
		var completeAppDataJson;
        currentProjectId=this.props.projId;
        if(true){
              if(currentData){
                currentProjectData=currentData;
              }
        }
        var Clientheight=document.body.clientHeight;
        var leftArea;
        var Clientheight=document.body.clientHeight;
		var imageUrl;
		var biboxType = localStorage.getItem("selectbibox");
		var selectedBiboxSplit = biboxType.split(';');
		var selectedBibox = selectedBiboxSplit[0];
		if(selectedBibox=="BIBOX Starling"){
	        if(this.state.showloading==true){
	        		console.log("loading....");
	        		leftArea=(<div className="left-area"><div className="loading" style={{backgroundColor: 'transparent'}}><img src={Imagepath+"loading2.gif"} alt="loading"/></div></div>);
	        }else{
	        	leftArea=(<div className="left-area" style={{position: 'relative',height:'70vh'}}>
							<div className="product-image" style={{width: '100%', position: 'relative', overflow: 'hidden', maxHeight: '54%'}}>
								<img width="auto" height="auto" maxWidth="100%" src={currentProjectData["imgsource"]} alt="Bisoft"/>
							</div>
							<div className="product-detail" style={{position: 'relative',maxHeight: '55%',}}>
								<div className="eachBlock" style={{display: 'inline-block', width: '100%',paddingBottom:'10px'}}>
								<h1 style={{display: 'inline-block', width: '40%', position: 'relative'}}><span>Name of the project:</span></h1>
								<input style={{display: 'inline-block', width: '60%', position: 'relative', fontSize: '18px', marginBottom: '8px', lineHeight: '32px', height: '38px', backgroundColor:'E0EFF4', borderLeft: 'none',}} type="text" name="country" value={currentProjectData["name"]} readOnly></input>
								</div>
								<div className="eachBlock" style={{display: 'inline-block', width: '100%',paddingBottom:'10px'}}>
								<h1 style={{display: 'inline-block', width: '40%', position: 'relative'}}><span>Bibox type:</span></h1>
								<input style={{display: 'inline-block', width: '60%', position: 'relative', fontSize: '18px', marginBottom: '8px', lineHeight: '32px', height: '38px', backgroundColor:'E0EFF4', borderLeft: 'none'}} type="text" name="country" value="Bibox Starling" readOnly></input>
								</div>
								<h1 style={{display: 'inline-block', width: '40%', position: 'relative',paddingBottom:'10px'}}><span>Components used:</span></h1>
								<input style={{display: 'inline',width:'60%',overflowY:'hidden',overflowX:'auto',wordWrap:'break-word',position: 'relative',fontSize: '18px', marginBottom: '8px', lineHeight: '32px', height: '38px', backgroundColor:'E0EFF4', borderLeft: 'none',paddingLeft: '4px'}} type="text" name="country" value={currentProjectData["componentsUsed"]} readOnly></input>
								<br></br>
								<h1 style={{display: 'inline-block',width: '40%',paddingBottom:'10px'}}><span>Description:</span></h1>
								<p style={{display: 'inline-block', width: '50%', border: 'none', fontSize: '19px', marginBottom: '8px', lineHeight: '32px', height: '38px', backgroundColor:'E0EFF4', borderLeft: 'none',paddingLeft: '4px'}}>{currentProjectData["head"]}{currentProjectData["desc"]}</p>
							
								<div className="clear"></div>
							</div>
					</div>);

	        }
    	}
    	else{
    		 if(this.state.showloading==true){
	        		console.log("loading....");
	        		leftArea=(<div className="left-area"><div className="loading" style={{backgroundColor: 'transparent'}}><img src={Imagepath+"loading2.gif"} alt="loading"/></div></div>);
	        }else{
	        	leftArea=(<div className="left-area" style={{position: 'relative',height:'70vh'}}>
							<div className="product-image" style={{width: '100%', position: 'relative', overflow: 'hidden', maxHeight: '54%'}}>
								<img width="auto" height="auto" maxWidth="100%" src={currentProjectData["imgsource"]} alt="Bisoft"/>
							</div>
							<div className="product-detail" style={{position: 'relative',maxHeight: '55%',}}>
								<div className="eachBlock" style={{display: 'inline-block', width: '100%',paddingBottom:'10px'}}>
								<h1 style={{display: 'inline-block', width: '40%', position: 'relative'}}><span>Name of the project:</span></h1>
								<input style={{display: 'inline-block', width: '60%', position: 'relative', fontSize: '18px', marginBottom: '8px', lineHeight: '32px', height: '38px', backgroundColor:'E0EFF4', borderLeft: 'none',}} type="text" name="country" value={currentProjectData["name"]} readOnly></input>
								</div>
								<div className="eachBlock" style={{display: 'inline-block', width: '100%',paddingBottom:'10px'}}>
								<h1 style={{display: 'inline-block', width: '40%', position: 'relative'}}><span>Bibox type:</span></h1>
								<input style={{display: 'inline-block', width: '60%', position: 'relative', fontSize: '18px', marginBottom: '8px', lineHeight: '32px', height: '38px', backgroundColor:'E0EFF4', borderLeft: 'none'}} type="text" name="country" value="Bibox Hornbill" readOnly></input>
								</div>
								<h1 style={{display: 'inline-block', width: '40%', position: 'relative',paddingBottom:'10px'}}><span>Components used:</span></h1>
								<input style={{display: 'inline',width:'60%',overflowY:'hidden',overflowX:'auto',wordWrap:'break-word',position: 'relative',fontSize: '18px', marginBottom: '8px', lineHeight: '32px', height: '38px', backgroundColor:'E0EFF4', borderLeft: 'none',paddingLeft: '4px'}} type="text" name="country" value={currentProjectData["componentsUsed"]} readOnly></input>
								<br></br>
								<h1 style={{display: 'inline-block',width: '40%',paddingBottom:'10px'}}><span>Description:</span></h1>
								<p style={{display: 'inline-block', width: '50%', border: 'none', fontSize: '19px', marginBottom: '8px', lineHeight: '32px', height: '38px', backgroundColor:'E0EFF4', borderLeft: 'none',paddingLeft: '4px'}}>{currentProjectData["head"]}{currentProjectData["desc"]}</p>
							
								<div className="clear"></div>
							</div>
					</div>);

	        }
    	}
		var AppUrl="/App/"+currentProjectId;	
		var AppUrlForTutorial="/App/tutorial/"+currentProjectId;
		var path=this.props.path;
		var Editable=(path.indexOf('save') > -1)+'';
		var AppDataParsed=false;
		if(AppDataParsed){
				if(AppDataParsed.sidebarContents){
					var componentsList=AppDataParsed.sidebarContents;
					var componentsListAsString='';
					for(var i=0;i<componentsList.length;i++){
						componentsListAsString+=Data[componentsList[i]].name;
						if(i==componentsList.length-1){
							componentsListAsString+="."
						}else{
							componentsListAsString+=","
						}
					}
					componentsListAsString=componentsListAsString.toLowerCase();
					this.state.componentsUsedData=componentsListAsString;
				}
		}		
		if(Editable=="false"){
			if(currentProjectData=={}){
				return(<div/>);
			}else{
				var videoFrame;
				if(currentProjectData["videoUrl"]){
					var urlEmbed=currentProjectData["videoUrl"].replace("watch?v=","embed/");
					videoFrame=(<iframe src={urlEmbed} frameBorder="0" allowFullScreen></iframe>);
				}else{
					videoFrame=(<div style={{color: 'white',height: '40%',backgroundColor: 'black'}}><h4 style={{textAlign: 'center',padding: '25%',fontWeight: 'normal'}}>No video found</h4></div>);
				}
				return (
					<div id="project" className="inner" style={{width: '100%', height: '100%', backgroundImage: 'url(images/newbisoft-screens-15.png)',backgroundSize: 'contain',backgroundPosition:'center'}}>
						<header id="header">
							<a href="/#/bisoft/local" className="logo"><img src={Imagepath+"logo.png"} alt="Bisoft"/></a>
							{/*<a className="setting"><img src={Imagepath+"setting.png"} alt="setting"/></a>*/}
							<div className="clear"></div>
						</header>
						<section id="product" style={{height: Clientheight-91}}>
							<div className="auto-area">
								{leftArea}
								<div className="right-area">
									<div className="project-video">
										{videoFrame}
									</div>
									<a onClick={this.uploadToSelectedDevice} className="button upload">Upload Program</a>
									<a onClick={this.ExploreProject} style={{display: 'block'}} className="button explore">Explore</a>
									<Link to={{pathname: AppUrlForTutorial, query: { step: '1',tab: 'concept'}}} style={{display: 'none'}} className="button tutorial">Start Tutorial</Link>
								</div>
								<div className="clear"></div>
							</div>
							<div className="auto-area row">					
							</div>
						</section>
					</div>
	        	);
			}
		}			
	}
});

module.exports = ProjectDisplay;