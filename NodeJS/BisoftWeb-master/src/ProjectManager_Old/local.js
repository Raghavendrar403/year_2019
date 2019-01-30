var React = require('react');
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory } from 'react-router';
var PropTypes = React.PropTypes;
var Utils = require(__base+'./src/utils');
var Imagepath=Utils.getImagePath();
var Overlay = require('react-overlays');

let rand = ()=> (Math.floor(Math.random() * 20) - 10);

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
    padding: 20
  };
};

var CloseProjectButton = React.createClass({
  close: function(){
    this.setState({ showModal: false });
  },
  open: function(){
    this.setState({ showModal: true });
  },
  getInitialState: function(){
    return { showModal: false };
  },
  deleteProject: function(){
    var currentProjectId=this.props.projectId;
    var hostUrl=Utils.getHostUrl();
    $.ajax({
            url: hostUrl+"/web_bisoft/deleteproject/"+currentProjectId,
            type: 'POST',
            success: function(data) {
              console.log(data);
              if(data.status=="success"){
                //window.location.reload();
                this.close();
              }
            }.bind(this),
            error: function(xhr, status, err) {
              //console.error("/save", status, err.toString());
            }.bind(this)
    });
  },
  render: function(){
    var Modal=Overlay.Modal;
    return(<div className='modal-example'>
          <button style={{backgroundColor: 'transparent',border: 'none',outline: 'none',overflow: 'visible',position: 'absolute',marginLeft: '80%',marginTop: '5px'}} onClick={this.open}>
            <img src={Imagepath+"btn_close1.png"} style={{height: '24px',width: '24px',borderRadius: '20px', backgroundColor: 'transparent'}}/>
          </button>
          <Modal
            aria-labelledby='modal-label'
            style={modalStyle}
            backdropStyle={backdropStyle}
            show={this.state.showModal}
            onHide={this.close}>
            <div style={dialogStyle()} >
              <p style={{textAlign: 'center'}}>Do you want to permanently delete this project?</p>
              <div style={{marginLeft: '30%',marginTop: '8px'}}>
              <button className='YesNobutton' onClick={this.deleteProject} style={{marginRight: '5px'}}>Yes</button>
              <button className='YesNobutton' onClick={this.close} style={{marginLeft: '5px'}}>No</button>
              </div>
            </div>
          </Modal>
        </div>);
  },
});

const Local = React.createClass({
  getInitialState: function() {
      return {startProject: false,project: [],showModal: false ,ProjectsData: [],showloading: true,currentProjectId:'',tutorialMode: 'false',ProjectSelected: false,curTab: 'local'};
  },
  componentDidMount: function() {
    var ProjectDataArray=[];
    var hostUrl=Utils.getHostUrl();
    $.ajax({
            url: hostUrl+"/web_bisoft/projects",
            type: 'GET',
            success: function(data) {
                  ProjectDataArray=data.projects;
                  this.setState({showloading: false,ProjectsData: ProjectDataArray});
            }.bind(this),
            error: function(xhr, status, err) {
              //window.location.href="/"+this.props.curTab;
              //console.error("/save", status, err.toString());
            }.bind(this)
    });
  },
  componentDidUpdate: function() {
    var ProjectDataArray=[];
    var hostUrl=Utils.getHostUrl();
    $.ajax({
            url: hostUrl+"/web_bisoft/projects",
            type: 'GET',
            success: function(data) {
                  ProjectDataArray=data.projects;
                  this.setState({showloading: false,ProjectsData: ProjectDataArray});
            }.bind(this),
            error: function(xhr, status, err) {
              //window.location.href="/"+this.props.curTab;
              //console.error("/save", status, err.toString());
            }.bind(this)
    });
  },
  render: function() {
    sessionStorage.setItem("currentTab",'local');
        if(this.state.showloading==true){
            return(<div className="left-area"><div className="loading" style={{backgroundColor: 'transparent'}}><img style={{height: '30%',marginLeft: '38%'}} src={Imagepath+"loading2.gif"} alt="loading"/></div></div>);
        }else{
          if(this.state.ProjectsData.length>0){
            return(<div> 
            {   
              this.state.ProjectsData.map(function (element) {
                  var urlUpdate='project/'+element["projectId"];
                  this.state.currentProjectId=element["projectId"];
                  return (<li style={{position: 'relative'}} className="eachProject"><CloseProjectButton projectId={this.state.currentProjectId}/><Link to={urlUpdate}><img src={element["imgsource"]} style={{width: '100%',height: '120px'}}/><h1><span><b>{element["name"]}</b></span>{element["desc"]}</h1></Link></li>)              
              }, this)
            }  
            </div>);
          }else{
            return(<div style={{fontSize: '21px',color: 'black',marginLeft: '38%'}}>No projects found....</div>
            );
          }
        } 
  },
});
module.exports = Local;