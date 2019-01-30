var React = require('react');
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory } from 'react-router';
var PropTypes = React.PropTypes;
var Utils = require(__base+'./src/utils');
var Imagepath=Utils.getImagePath();
var Tutorials= React.createClass({
	getInitialState: function() {
 	return {startProject: false,ProjectsData: [],currentProjectData:'',showloading: true,tutorialMode: 'false',curTab: 'local'};
  	},
  componentDidMount: function() {
    var ProjectDataArray=[];
    var hostUrl=Utils.getHostUrl();
    $.ajax({
            url: hostUrl+"/web_bisoft/tutorials",
            type: 'GET',
            success: function(data) {
                  ProjectDataArray=data.projects;
                  if(ProjectDataArray == undefined){
                    ProjectDataArray = [];
                  }
                  this.state.showloading=false;
                  this.setState({ProjectsData: ProjectDataArray});

            }.bind(this),
            error: function(xhr, status, err) {
              //window.location.href="/"+this.props.curTab;
              //console.error("/save", status, err.toString());
            }.bind(this)
    });
  },
	render: function() {
    sessionStorage.setItem("currentTab",'tutorials');
    if(this.state.showloading==true){
        return(<div className="left-area"><div className="loading" style={{backgroundColor: 'transparent'}}><img style={{height: '30%',marginLeft: '38%'}} src={Imagepath+"loading2.gif"} alt="loading"/></div></div>);
    }else{
      if(this.state.ProjectsData.length>0){
        return(<div>    
            {   
              this.state.ProjectsData.map(function (element) {
                  //console.log("element: "+element);                  
                  var urlUpdate='project/'+element["projectId"];
                  return (<li><Link to={urlUpdate}><img src={element["imgsource"]} style={{width: '100%',height: '120px'}}></img><h1><span><b>{element["name"]}</b></span>{element["desc"]}</h1></Link></li>)              
              }, this)
            }    
        </div>);
      }
    }
	}
});
module.exports = Tutorials;