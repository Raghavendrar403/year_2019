var React = require('react');
import ReactDOM from 'react-dom';
var PropTypes = React.PropTypes;
var App = require('../App'); 
var page = require('page');
import { Router, Route, Link, hashHistory, browserHistory } from 'react-router'
var Data = require('../data.js');
var ProjectManager = require('../ProjectManager'); 
var uuid = require('node-uuid');
//var FormData = require('react-form-data');
var Utils = require(__base+'./src/utils');
var html2canvas = require ('../html2canvas/html2canvas');
var Imagepath=Utils.getImagePath();
var Project= React.createClass({
	getInitialState: function() {
    	return {tutorialMode: false,componentsUsedData: '',imgURL: '',ExploreProject: 'false',Projectvalue: 'Project1',ProjectDescvalue: 'This is a sample project!'};
  	},
	componentDidMount: function(){
		var _this = this;
		var div=document.getElementById('assemblyShot');
		if(sessionStorage.getItem("assempblyImageHTML") && sessionStorage.getItem("assempblyImageHTML")!=''){
		    div.innerHTML=sessionStorage.getItem("assempblyImageHTML");
		    html2canvas(div, {
		      onrendered: function(canvas) {
		        div.innerHTML="";
		        var img = canvas.toDataURL("image/png");
		        //console.log(img);
				var imgTag=document.getElementById('screenshot');
		        _this.setState({imgURL:img});
		        imgTag.src = img;
		        sessionStorage.setItem("assempblyImageURI",img);
		      }
		    });
		}
		var currentData=this.props.data;
		if(currentData["projectType"]=="tutorial"){
				document.getElementsByClassName('explore')[0].style.display='none';
				document.getElementsByClassName('tutorial')[0].style.display='block';
		}
	},
	startTutorial: function(e){
		e.preventDefault();
		this.setState({tutorialMode:true});
	},
	goHome: function(){
		var urlUpdateHome="h"/"";
      	browserHistory.push(urlUpdateHome);
      	window.location.reload();
	},
	valueChanged: function(event){
		this.setState({Projectvalue: event.target.value});

	},
	valueDescChanged: function(event){
		this.setState({ProjectDescvalue: event.target.value});

	},
	valueVideoUrlChanged: function(event){
		this.setState({VideoUrl: event.target.value});
	},
	ExploreProject: function(e){
		e.preventDefault();
        var currentProjectId=this.props.projId;
        var currentAppUrl='App/'+this.props.projId+'/concept';
		window.location.href=currentAppUrl;
		window.location.reload();
	},
	saveFileToLocal: function(e){
		e.preventDefault();
		var currentAppData=this.props.data;
        	var currentProjectId=this.props.projId;
        	var hostUrl=Utils.getHostUrl();
        	if(currentProjectId=="new"){
        		currentProjectId=uuid.v4();
        	}
        
		var ProjectDetails={
			"name":this.state.Projectvalue,
			"biboxType": "Bibox Starling",
			"componentsUsed": this.state.componentsUsedData,
			"desc": this.state.ProjectDescvalue,
			"imgsource": this.state.imgURL,
			"projectType":"local",
			"projectId": currentProjectId,
			"videoUrl": this.state.VideoUrl,
			"modifiedTime": Date.now()
		};
	    	var data=JSON.stringify(ProjectDetails);

	    	var fileProject = new File([data], "project.txt", {type: "text/plain;charset=utf-8"});

	    	var formDataProject = new FormData();
	    	formDataProject.append( 'text', fileProject);
	    	console.log(formDataProject['text']);
	    	if(fileProject){
		    $.ajax({
			url: hostUrl+"/web_bisoft/save/project/"+currentProjectId,
			type: 'POST',
			data: formDataProject,
			async: false,
			contentType: false,
			processData: false,
			success: function() {
              			console.log("Post app success");
           		}.bind(this),
            		error: function(xhr, status, err) {
              			console.log("error");
            		}.bind(this)
          	   }); 
	   	}

	     	var dataApp=currentAppData;
	     	var file = new File([dataApp], "app.txt", {type: "text/plain;charset=utf-8"}); 
	     	console.log("project data", JSON.parse(currentAppData));
	    	var formData = new FormData();
	    	formData.append( 'text', file );
	    	console.log(formData['text']);
	    	if(file){
		   $.ajax({
			url: hostUrl+"/web_bisoft/save/app/"+currentProjectId,
			type: 'POST',
			data: formData,
			async: false,
			contentType: false,
			processData: false,
			success: function() {
              			sessionStorage.setItem(("AppDetails-"+currentProjectId),(currentAppData));
          		        var AppUrl='#/App/'+currentProjectId+"/"+(JSON.parse(currentAppData)).curTab;
          			browserHistory.push(AppUrl);
          			window.location.reload();
           		}.bind(this),
            		error: function(xhr, status, err) {
              			console.log("error");
            		}.bind(this)
          	   });
	   	}
	},
	imageShow:function(){
		alert('image clicked');
	},
	render: function(){
		var currentData=this.props.data;
		// var urlSplit=page.current.split('/');
        var currentProjectId=this.props.projId;
		var AppUrl="/App/"+currentProjectId;	
		var AppUrlForTutorial="/App/"+currentProjectId;
		var path=this.props.path;
		var Editable=(path.indexOf('save') > -1)+'';
		var screenshotimgsource=sessionStorage.getItem("assempblyImageURI");
		this.state.imgURL=screenshotimgsource;
		if(this.props.data){
				var parsedData=JSON.parse(this.props.data);
				if(parsedData.sidebarContents){
					var componentsList=parsedData.sidebarContents;
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
		var Clientheight=document.body.clientHeight;
		var imageUrl;
		var biboxType = localStorage.getItem("selectbibox");
		var selectedBiboxSplit = biboxType.split(';');
		var selectedBibox = selectedBiboxSplit[0];
		if(selectedBibox=="BIBOX Starling"){
		return (

			<div id="project" className="inner" style={{width: '100%', height: '100%', backgroundImage: 'url(images/newbisoft-screens-15.png)',backgroundSize: 'contain',backgroundPosition:'center'}}>
				<header id="header">
					<a href="/#/bisoft/local" className="logo"><img src={Imagepath+"logo.png"} alt="Bisoft"/></a>
					<a className="setting"><img src={Imagepath+"setting.png"} alt="setting"/></a>
					<div className="clear"></div>
				</header>
				<section id="product">
					<div className="auto-area" style={{height: Clientheight-91}}>
						<div className="left-area" style={{position: 'relative'}}>
							<div className="product-image" style={{width: '100%', position: 'relative', overflow: 'hidden', maxHeight: '45%'}}>
							<img width="100%" height="100%" id='screenshot' src={this.state.imgURL} alt="Bisoft"/>
							</div>
							<div className="product-detail" style={{position: 'relative', maxHeight: '55%',}}>
								<div className="eachBlock" style={{display: 'inline-block', width: '100%'}}>
								<h1 style={{display: 'inline-block', width: '100%', position: 'relative'}}><span>Name of the project:</span></h1>
								<input style={{display: 'inline-block', width: '100%', position: 'relative', fontSize: '19px', marginBottom: '8px', lineHeight: '32px', height: '38px', backgroundColor:'E0EFF4', borderLeft: 'none',paddingLeft: '4px'}} type="text" name="country" onChange={this.valueChanged} value={this.state.Projectvalue}></input>
								</div>
								<div className="eachBlock" style={{display: 'inline-block', width: '100%'}}>
								<h1 style={{display: 'inline-block', width: '100%', position: 'relative'}}><span>Bibox type:</span></h1>
								<input style={{display: 'inline-block', width: '100%', position: 'relative', fontSize: '19px', marginBottom: '8px', lineHeight: '32px', height: '38px', backgroundColor:'E0EFF4', borderLeft: 'none',paddingLeft: '4px'}} type="text" name="country" value="Bibox Starling"></input>
								</div>
								<h1 style={{display: 'inline-block', width: '100%', position: 'relative'}}><span>Components used:</span></h1>
								<input style={{display: 'inline-block', width: '100%', position: 'relative', fontSize: '19px', marginBottom: '8px', lineHeight: '32px', height: '38px', backgroundColor:'E0EFF4', borderLeft: 'none',paddingLeft: '4px'}} type="text" name="country" value={componentsListAsString}></input>
								<br></br>
								<h1 style={{display: 'inline-block',width: '100%',}}><span>Description:</span></h1>
								<input style={{display: 'inline-block', width: '100%', border: 'none', fontSize: '19px', marginBottom: '8px', lineHeight: '32px', height: '38px', backgroundColor:'E0EFF4', borderLeft: 'none',paddingLeft: '4px'}} type="text" name="country" onChange={this.valueDescChanged} value={this.state.ProjectDescvalue}></input>
								<div className="clear"></div>
							</div>
						</div>
						<div className="right-area">
							<div className="project-video">
								<div className="eachBlock" style={{display: 'inline-block', width: '100%'}}>
								<h3 style={{display: 'inline-block',width: '100%'}}>Video Link for the project:</h3><br></br>
								<input style={{display: 'inline-block', width: '95%', marginTop: '8px',border: 'none', fontSize: '19px', marginBottom: '14px', lineHeight: '32px', height: '38px', backgroundColor:'E0EFF4', borderLeft: 'none',paddingLeft: '4px'}} type="text" name="country" placeholder="Enter the URL" onChange={this.valueVideoUrlChanged} value={this.state.VideoUrl}></input>
							</div>										</div>
							<a onClick={this.saveFileToLocal} className="button save">Save</a>
							
						</div> 
						<div className="clear"></div>
					</div>
					<div className="auto-area row">					
					</div>
				</section>
				<div id="assemblyShot"></div>
			</div>
    	);
    	}
    	else{
    		return (

			<div id="project" className="inner" style={{width: '100%', height: '100%', backgroundImage: 'url(images/newbisoft-screens-15.png)',backgroundSize: 'contain',backgroundPosition:'center'}}>
				<header id="header">
					<a href="/#/bisoft/local" className="logo"><img src={Imagepath+"logo.png"} alt="Bisoft"/></a>
					<a className="setting"><img src={Imagepath+"setting.png"} alt="setting"/></a>
					<div className="clear"></div>
				</header>
				<section id="product">
					<div className="auto-area" style={{height: Clientheight-91}}>
						<div className="left-area" style={{position: 'relative'}}>
							<div className="product-image" style={{width: '100%', position: 'relative', overflow: 'hidden', maxHeight: '45%'}}>
							<img width="100%" height="100%" id='screenshot' src={this.state.imgURL} alt="Bisoft"/>
							</div>
							<div className="product-detail" style={{position: 'relative', maxHeight: '55%',}}>
								<div className="eachBlock" style={{display: 'inline-block', width: '100%'}}>
								<h1 style={{display: 'inline-block', width: '100%', position: 'relative'}}><span>Name of the project:</span></h1>
								<input style={{display: 'inline-block', width: '100%', position: 'relative',  fontSize: '19px', marginBottom: '8px', lineHeight: '32px', height: '38px', backgroundColor:'E0EFF4', borderLeft: 'none',paddingLeft: '4px'}} type="text" name="country" onChange={this.valueChanged} value={this.state.Projectvalue}></input>
								</div>
								<div className="eachBlock" style={{display: 'inline-block', width: '100%'}}>
								<h1 style={{display: 'inline-block', width: '100%', position: 'relative'}}><span>Bibox type:</span></h1>
								<input style={{display: 'inline-block', width: '100%', position: 'relative',  fontSize: '19px', marginBottom: '8px', lineHeight: '32px', height: '38px', backgroundColor:'E0EFF4', borderLeft: 'none',paddingLeft: '4px'}} type="text" name="country" value="Bibox Hornbill"></input>
								</div>
								<h1 style={{display: 'inline-block', width: '100%', position: 'relative'}}><span>Components used:</span></h1>
								<input style={{display: 'inline-block', width: '100%', position: 'relative',  fontSize: '19px', marginBottom: '8px', lineHeight: '32px', height: '38px', backgroundColor:'E0EFF4', borderLeft: 'none',paddingLeft: '4px'}} type="text" name="country" value={componentsListAsString}></input>
								<br></br>
								<h1 style={{display: 'inline-block',width: '100%',}}><span>Description:</span></h1>
								<input style={{display: 'inline-block', width: '100%', border: 'none', fontSize: '19px', marginBottom: '8px', lineHeight: '32px', height: '38px', backgroundColor:'E0EFF4', borderLeft: 'none',paddingLeft: '4px'}} type="text" name="country" onChange={this.valueDescChanged} value={this.state.ProjectDescvalue}></input>
								<div className="clear"></div>
							</div>
						</div>
						<div className="right-area">
							<div className="project-video">
								<div className="eachBlock" style={{display: 'inline-block', width: '100%'}}>
								<h3 style={{display: 'inline-block',width: '100%'}}>Video Link for the project:</h3><br></br>
								<input style={{display: 'inline-block', width: '95%', marginTop: '8px',border: 'none', fontSize: '19px', marginBottom: '14px', lineHeight: '32px', height: '38px', backgroundColor:'E0EFF4', borderLeft: 'none',paddingLeft: '4px'}} type="text" name="country" placeholder="Enter the URL" onChange={this.valueVideoUrlChanged} value={this.state.VideoUrl}></input>
							</div>										</div>
							<a onClick={this.saveFileToLocal} className="button save">Save</a>
							
						</div> 
						<div className="clear"></div>
					</div>
					<div className="auto-area row">					
					</div>
				</section>
				<div id="assemblyShot"></div>
			</div>
    	);
    	}	
	}
});
module.exports = Project;