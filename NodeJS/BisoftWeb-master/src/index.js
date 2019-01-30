import { Router, Route, Link, hashHistory, browserHistory, IndexRoute, IndexRedirect } from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import BisoftManager from './indexProj';
import Cloud from './ProjectManager/cloud';
import Project from './ProjectManager/Project';
import ProjectDisplay from './ProjectManager/ProjectDisplay';
import Tutorials from './ProjectManager/tutorials';
import Local from './ProjectManager/local';
import App from './App';
import Connectivity from './Connectivity';
import BTRemote  from './BTremote';
import selectBibox from './components/selectbibox/index';
import concept from './components/concept/';
import assembly from './components/assembly/';
import logic from './components/logic/';
import OverlayExample from './tutorials/tutorials';
import Plotter from './Plotter';
import Firmware from './Firmware';
import PictureUpload from './PictureUpload';
import TypeSelection from './TypeSelection';

var BUNDLE = require('./build_exe_config');

ReactDOM.render(<BisoftManager project=''/>, document.getElementById('root'));
var currentTab;


var ConnectivityWrap=React.createClass({
	render: function() {
		return <div>
			<Connectivity />
		</div>
	}
});

var BTremoteWrap=React.createClass({
	render: function() {
		return <div>
			<BTRemote />
		</div>
	}
});

var TutorialsWrap=React.createClass({
	render: function() {
		var urlSplit=this.props.params.userId;
		
		currentTab="tutorials";
		return <div>
			<Tutorials project={[]} tutorialMode="true" />
		</div>
	}
});

var LocalWrap=React.createClass({
	getInitialState: function() {
		return {startProject: false,project: [],localProjectNames: '',localProjectsData: [],CompleteProjectData: [],currentProjectData:'',tutorialMode: 'false',ProjectSelected: false,curTab: 'local'};
	},
	render: function() {
		sessionStorage.setItem("currentTab","local");
		currentTab="local";
	   	return (
	   		<Local />
	   	);
	}
});


var ProjSaveWrap=React.createClass({
	render: function() {
	    var currentProjectId,currentProjectData={};
	    currentProjectId=this.props.routeParams.id;
	    currentProjectData=sessionStorage.getItem("AppDetails-"+currentProjectId);
	    return(
		    <Project path={this.props.route.path} projId={currentProjectId} data={currentProjectData}/>
	    );
	}
});

var AppWrap=React.createClass({
  	render: function() {
    	var currentProjectId=this.props.routeParams.id;
    	var tutorialMode;
    	currentTab=sessionStorage.getItem("currentTab");
    	if(currentTab=="tutorials" && this.props.routeParams.screen!='selectbibox'){
    		tutorialMode="true";
    	}else{
    		tutorialMode="false";
    	}
	    return(
	    	<App Draft='true' curTab={this.props.routeParams.screen}  tutorialMode={tutorialMode} projId={currentProjectId} />
	    );
  	}
});

var ProjDescWrap=React.createClass({
	render: function() {
	    var currentProjectId=this.props.routeParams.id;
	    var currentProjectpath=this.props.route.path;
		sessionStorage.removeItem('AppDetails-'+currentProjectId);
		currentTab=sessionStorage.getItem("currentTab");
	    if(true){
	      	return(
	        	<ProjectDisplay path={currentProjectpath} curTab={currentTab} projId={currentProjectId}/>
	        );
	    }else{
	    	return(
	        	<div><h1>asd</h1></div>
	      	);
	  	}
  	}
});

var TutoWrap=React.createClass({
	render: function() {
		var currentProjectId=this.props.routeParams.id;
	    var currentStep=this.props.location.query.step;
	    var tab=this.props.location.query.tab;
	    if(true){
	      	return(
	      		<App curTab={tab} Draft='true' step={currentStep} tutorialMode="true" projId={currentProjectId}/>
	        );
	    }else{
	    	return(
	        	<div><h1>asd</h1></div>
	      	);
	  	}
  	}
});
/*<Route name="app"  path='/' component={loginFormHandler}/>
	    <Route path="profile/:email" component={googleSignin} /> 
		<Route path="/" component={BisoftManager}>
	    	<IndexRedirect to="TypeSelection" />
	    </Route>*/


var index_page;

if(BUNDLE.BUNDLE_TYPE == "USB"){
	index_page = "/bisoft/local";
}
else{
	index_page = "TypeSelection";
}


ReactDOM.render((
	<Router history={hashHistory}>
	    <Route path="connectivity" component={ConnectivityWrap}/>
	    <Route path="BTremote" component={BTremoteWrap}/>
	    <Route path="project/:id" component={ProjDescWrap}/>
	    <Route path="project/:id/saveAs" component={ProjSaveWrap}/>
	    <Route path="project/:id/save" component={ProjSaveWrap}/>
	    <Route path="/App/tutorial/:id" component={TutoWrap}/>
	    <Route path="App/:id/:screen" component={AppWrap}/>            
	    <Route path="Plotter" component={Plotter}/>            
	    <Route path="Firmware" component={Firmware}/>
	    <Route path="TypeSelection" component={TypeSelection}/>
		<Route path="PictureUpload" component={PictureUpload}/>            
	    <Route path="/" component={BisoftManager}>
	    	<IndexRedirect to=/*{index_page}*/{index_page}/>
	    </Route>
	    <Route path="/bisoft/" component={BisoftManager}>
	    	<IndexRedirect to="/bisoft/local" />
		    <Route path="cloud" component={Cloud}/>
		    <Route path="tutorials" component={TutorialsWrap}/>
		    <Route path="local" component={LocalWrap}/>
	    </Route>
	    {/* add the routes here*/ }
  	</Router>
), document.getElementById('root'))

