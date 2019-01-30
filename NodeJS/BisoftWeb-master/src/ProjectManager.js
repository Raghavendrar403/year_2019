/**
 * App module stores the main state and several methods for manipulating it
 * as well as contains the main code.
 * @module App
 * @see module:components/concept/
 * @see module:components/assembly/
 */

var React = require('react');
import ReactDOM from 'react-dom';
var PropTypes = React.PropTypes;
var page = require('page');
const Sizes = require('./helpers/Sizes');
var components = require('./data.js');
var componentProps = require('./componentProps');
var Project = require('./ProjectManager/Project');
var uuid = require('node-uuid');
import App from './App';
var ProjectManager= React.createClass({
  componentDidMount: function() {
    // Initiate pagejs and define the routes
    page('/', ()=>this.switchTo('local'));
    page('/local', ()=>this.switchTo('local'));
    page('/cloud', ()=>this.switchTo('cloud'));
    page('/tutorials', ()=>this.switchTo('tutorials'));
    page('/App/:uuid', ()=>this.switchTo('App'));
    page('/project/:id', ()=>this.switchTo('project'));
    page('/project/:id/save', ()=>this.switchTo('project-save'));
    page('/project/:id/saveAs', ()=>this.switchTo('project-saveAs'));
    page({
      hashbang: true
    });
    //window.dispatchEvent(new Event('resize'));  
    
    $.ajax({
            url: "projects",
            type: 'GET',
            success: function(data) {
                  //console.log("projects:"+data.projects);
                  this.state.localProjectNames+=data.projects;
                  //this.state.localProjectNames="Project2.txt,Project2_complete.txt,SuperProject.txt,SuperProject_complete.txt";
                  var localProjectNamesList='';
                  localProjectNamesList=this.state.localProjectNames;
                  //console.log(localProjectNamesList);
                  var localDataArray=[];
                  var projectCompleteData=[];
                  function readTextFile(file)
                  {
                      if(file.indexOf("complete")<0){
                          var rawFile = new XMLHttpRequest();
                          rawFile.open("GET", file, false);
                      
                          rawFile.onreadystatechange = function ()
                          {
                              if(rawFile.readyState === 4)
                              {
                                  if(rawFile.status === 200 || rawFile.status == 0)
                                  {
                                      var contentsFromFile = rawFile.responseText;
                                      var contentsList=JSON.parse(contentsFromFile);
                                      localDataArray.push(contentsList);
                                      return(localDataArray);
                                      
                                  }
                              }
                          }
                          rawFile.send(null);
                      }else{
                          var rawFile = new XMLHttpRequest();
                          rawFile.open("GET", file, false);
                      
                          rawFile.onreadystatechange = function ()
                          {
                              if(rawFile.readyState === 4)
                              {
                                  if(rawFile.status === 200 || rawFile.status == 0)
                                  {
                                      var contentsFromFile = rawFile.responseText;
                                      var contentsList=JSON.parse(contentsFromFile);
                                      projectCompleteData.push(contentsList);
                                      return(projectCompleteData);
                                      
                                  }
                              }
                          }
                          rawFile.send(null);
                      }        
                  } 
                  var localProjectNamesArray=localProjectNamesList.split(',');
                  //console.log(localProjectNamesArray);
                  for(var i=0;i<localProjectNamesArray.length;i++){
                            var fileName=localProjectNamesArray[i];
                            var Pname=fileName.replace(".txt",'');
                            Pname=Pname.replace("_complete",'');
                            fileName="./projects/"+Pname+"/"+fileName;
                            readTextFile(fileName);
                            if(i==localProjectNamesArray.length-1){
                                //console.log(localDataArray);
                                this.setState({localProjectsData: localDataArray,CompleteProjectData: projectCompleteData});
                            }   
                  }

            }.bind(this),
            error: function(xhr, status, err) {
              //window.location.href="/"+this.props.curTab;
              //console.error("/save", status, err.toString());
            }.bind(this)
    });    
       
  },
  getInitialState: function() {
    return {startProject: false,project: [],localProjectNames: '',localProjectsData: [],CompleteProjectData: [],currentProjectData:'',tutorialMode: 'false',ProjectSelected: false,curTab: 'local'};
  }, 
  switchTo: function (tab) {
    this.setState({
      curTab: tab
    });
  },
  startNewProject: function(e){
      e.preventDefault();
      var uuid_generated=uuid.v4();
      var AppUrl="#!/App/"+uuid_generated;
      window.location.href=AppUrl;
      window.location.reload();
  },
  searchProject: function(){
      document.getElementById('srctext').value='';
  },
  render: function() {
    const { curTab } = this.state;
    var maindata;
    var currentHead='',currentDesc='';
    var LocalprojectDetails=[
            {"projectId": "ff44afe7-5565-427e-9c64-42e6ad3acb26","projectType":"local","name":"My local Program","desc":"This is a local program ","biboxType":"Bibox Ultra","componentsUsed":"led,battery","imgsource":"images/newbisoft-screens-15.png"},
            {"projectId": "ff44afe7-5565-427e-9c64-42e6ad3acb88","projectType":"local","name":"Local Project 2","desc":"This is my cloud project","biboxType":"Bibox Ultra","componentsUsed":"led,battery","imgsource":"images/newbisoft-screens-15.png"},
            {"projectId": "ff44afe7-5565-427e-9c64-42e6ad3acb96","projectType":"local","name":"Local program - LED ","desc":"This is a program to blink LED","biboxType":"Bibox Ultra","componentsUsed":"led,battery","imgsource":"images/newbisoft-screens-15.png"},
            {"projectId": "ff44afe7-5565-427e-9c64-42e6ad3abb86","projectType":"local","name":"On Off Multiple Output","desc":"In this program, all output components will","biboxType":"Bibox Ultra","componentsUsed":"led,battery","imgsource":"images/newbisoft-screens-15.png"},
            {"projectId": "ff44afe7-5565-427e-9c64-42e6ad3acc16","projectType":"local","name":"On Off Multiple Output","desc":"In this program, all output components will","biboxType":"Bibox Ultra","componentsUsed":"No components","imgsource":"images/newbisoft-screens-15.png"},
            {"projectId": "ff44afe7-5565-427e-9c64-42e6ad3acb86","projectType":"local","name":"On Off Multiple Output","desc":"In this program, all output components will","biboxType":"Bibox Ultra","componentsUsed":"No components","imgsource":"images/newbisoft-screens-15.png"},
            {"projectId": "ff44afe7-5565-427e-9c64-42e6ad3acb84","projectType":"local","name":"On Off Multiple Output","desc":"In this program, all output components will","biboxType":"Bibox Ultra","componentsUsed":"No components","imgsource":"images/newbisoft-screens-15.png"},
            {"projectId": "ff44afe7-5565-427e-9c64-42e6ad3acb16","projectType":"local","name":"On Off Multiple Output","desc":"In this program, all output components will","biboxType":"Bibox Ultra","componentsUsed":"No components","imgsource":"images/newbisoft-screens-15.png"},
            {"projectId": "ff44afe7-5565-427e-9c64-42e6ad3acb46","projectType":"local","name":"On Off Multiple Output","desc":"In this program, all output components will","biboxType":"Bibox Ultra","componentsUsed":"led,battery","imgsource":"images/newbisoft-screens-15.png"},
            {"projectId": "ff44afe7-5565-427e-9c64-42e6ad3ack26","projectType":"local","name":"On Off Multiple Output","desc":"In this program, all output components will","biboxType":"Bibox Ultra","componentsUsed":"led,battery","imgsource":"images/newbisoft-screens-15.png"},
    ];
    var CloudprojectDetails=[
            {"projectId": "ff44afe7-5565-427e-9c64-42e6ad3acb18","projectType":"cloud","name":"My Program","desc":"This is a cloud program ","biboxType":"Bibox Ultra","componentsUsed":"led,battery","imgsource":"images/newbisoft-screens-15.png"},
            {"projectId": "ff44afe7-5565-427e-9c64-42e6ad3aca26","projectType":"cloud","name":"Cloud Project","desc":"This is my cloud project","biboxType":"Bibox Ultra","componentsUsed":"led,battery","imgsource":"images/newbisoft-screens-15.png"},
            {"projectId": "ff44afe7-5565-427e-9c64-42e6ad3acd44","projectType":"cloud","name":"Cloud Project 2","desc":"This is my cloud project 2","biboxType":"Bibox Ultra","componentsUsed":"led,battery","imgsource":"images/newbisoft-screens-15.png"},
            {"projectId": "ff44afe7-5565-427e-9c64-42e6ad3acj86","projectType":"cloud","name":"Cloud Project 3","desc":"This is my cloud project 3","biboxType":"Bibox Ultra","componentsUsed":"led,battery","imgsource":"images/newbisoft-screens-15.png"},
            {"projectId": "ff44afe7-5565-427e-9c64-42e6ad3ace56","projectType":"cloud","name":"Cloud program - LED","desc":"Cloud program to blink LED","biboxType":"Bibox Ultra","componentsUsed":"led,battery","imgsource":"images/newbisoft-screens-15.png"},
    ];
    var TutorialprojectDetails=[
            {"projectId": "ff44afe7-5565-427e-9c64-42e6ad3acf66","projectType":"tutorial","name":"Tutorial - LED ","desc":"This is a program to blink LED","biboxType":"Bibox Ultra","componentsUsed":"led,battery","imgsource":"images/newbisoft-screens-15.png"},
            {"projectId": "ff44afe7-5565-427e-9c64-42e6ad3acb82","projectType":"tutorial","name":"Tutorial Project","desc":"This is my cloud project","biboxType":"Bibox Ultra","componentsUsed":"led,battery","imgsource":"images/newbisoft-screens-15.png"},        
    ];
    var uuid_generated=uuid.v4();
    var AppUrl="/App/"+uuid_generated;
    var tutorialModeStatus=this.state.tutorialMode;
    if (curTab === 'local'){
        //this.state.project=LocalprojectDetails;
        this.state.project=this.state.localProjectsData;
    }else if (curTab === 'cloud'){
        this.state.project=CloudprojectDetails;
    }else if (curTab === 'tutorials'){
        this.state.project=TutorialprojectDetails;
    }else if (curTab === 'project'){
        var urlSplit=page.current.split('/');
        var currentProjectId,currentProjectData;
        currentProjectId=urlSplit[urlSplit.length-1];
        for(var project in this.state.localProjectsData){
            if(this.state.localProjectsData[project]["projectId"]==currentProjectId){
              currentProjectData=this.state.localProjectsData[project];
              var ProjectDataJson=JSON.stringify(currentProjectData);
            }
        }
        return(
            <Project editable='false' curTab={curTab} data={currentProjectData}/>
        );
    }else if (curTab === 'App'){
        var urlSplit=page.current.split('/');
        var currentProjectId,currentProjectData;
        currentProjectId=urlSplit[urlSplit.length-1];
        for(var project in this.state.project){
            if(this.state.project[project]["projectId"]==currentProjectId){
                  currentProjectData=this.state.project[project];
            }
            if(this.state.project[project]["projectType"]=="tutorial"){
              //hard coding false always to remove tutorials
                tutorialModeStatus="false";
            }else{
                tutorialModeStatus="false";
            }
        }
        return(
            <App ExploreProject='false' tutorialMode={tutorialModeStatus} currentProjectData={this.state.CompleteProjectData}/>
        );
    }
    else if (curTab === 'project-save'){
        var urlSplit=page.current.split('/');
        var currentProjectId;
        var currentProjectData=this.state;
        var currentProjectCompleteData;
        var editStatus="true";
        if(this.props.currentProjectData){
          currentProjectData=this.props.currentProjectData;
        }
        currentProjectId=urlSplit[urlSplit.length-2];
        for(var project in this.state.localProjectsData){
            if(this.state.localProjectsData[project]["projectId"]==currentProjectId){
              currentProjectData=this.state.localProjectsData[project];
            }
        } 
            return(
                <Project editable='true' curTab={curTab} data={currentProjectData}/>
            );              
    } 
    else if (curTab === 'project-saveAs'){
        var urlSplit=page.current.split('/');
        var currentProjectId;
        var currentProjectData=this.state;
        var editStatus="true";
        if(this.props.currentProjectData){
          currentProjectData=this.props.currentProjectData;
        }
        currentProjectId=urlSplit[urlSplit.length-2];
        for(var project in this.state.project){
            if(this.state.project[project]["projectId"]==currentProjectId){
              currentProjectData=this.state.project[project];
              //editStatus="false";
            }
        }
        return(
            <Project editable={editStatus} curTab={curTab} data={currentProjectData}/>
        );
    }
    return (
        <div id="main" className="home">
            <header id="header" style={{maxHeight: '71px'}}>
                <div className="logo">
                    <a href="#"><img src="./src/ProjectManager/images/logo.png" alt="Bisoft"/></a>
                </div>
                <div className="setting">
                    <a href="#"><img src="./src/ProjectManager/images/setting.png" alt="setting"/></a>
                </div>
                <nav className="menu">
                    <img src="./src/ProjectManager/images/menu.png" alt="menu" className="toggle-menu"/>
                    <ul style={{maxHeight: '71px'}}>
                        <li><a href="/local" className={curTab === 'local' ? 'active' : ''}>Local</a></li>
                        <li><a href="/cloud" className={curTab === 'cloud' ? 'active' : ''}>Cloud</a></li>
                        <li><a href="/tutorials" className={curTab === 'tutorials' ? 'active' : ''}>Tutorials</a></li>
                    </ul> 
                    <div className="clear"></div>
                </nav> 
                <div className="clear"></div>
            </header>
            <div className="projectBody" style={{height: '100%', width: '100%',overflow: 'auto',backgroundImage: 'url(images/newbisoft-screens-15.png)',backgroundSize: 'contain',backgroundPosition:'center'}}>
                <section id="content" style={{minHeight: '80%'}}>
                    <div className="list">
                    <ul>
                        <div>    
                            {
                              this.state.project.map(function (element) {
                                  var urlUpdate='/project/'+element["projectId"];
                                  return (<li><a href={urlUpdate}><img src={element["imgsource"]} style={{width: '100%',height: '120px'}}></img><h1><span><b>{element["name"]}</b></span>{element["desc"]}</h1></a></li>)              
                              }, this)
                            }    
                        </div>
                    </ul>
                    <div className="clear"></div>   
                    </div>
                    <div className="bottomBar" style={{marginTop: '6%'}}>
                          <div className="search">
                              <form action="" method="get">
                                  <input type="text" onClick={this.searchProject} name="srctext" id="srctext" defaultValue="Search for project...."/>
                                  <button><img style={{width: '76%',height: '60%'}} src="./src/ProjectManager/images/search-btn.png" alt="search"/></button>
                              </form>
                          </div>
                          <a onClick={this.startNewProject} className="new-button">Start new project</a>
                    </div>
                    <div style={{marginTop: '4%'}} className="clear"></div> 
                </section>
            </div>
            <footer id="footer">     
            </footer>
        </div>        
    );   
  }
});

module.exports = ProjectManager;
