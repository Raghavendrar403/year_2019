var React = require('react');
var PropTypes = React.PropTypes;
import { Router, Route, Link, hashHistory, browserHistory } from 'react-router';
var ComponentsSelected = require('../components/concept/ComponentsSelected');
var Overlay = require('react-overlays');
var Sidebar = require('../components/assembly/Sidebar');
var Utils = require(__base+'./src/utils');
var App = require('../App'); 

// Styles Mostly from Bootstrap
const TooltipStyle = {
  position: 'absolute',
  padding: '0 5px',
  backgroundColor: 'white',

};

const TooltipInnerStyle = {
  padding: '8px 5px',
  color: '#000',
  textAlign: 'center',
  borderRadius: 3,
  backgroundColor: '#fff',
  opacity: '.75',
  minWidth: '240px',
  minHeight: '120px',
};

const TooltipArrowStyle = {
  position: 'absolute',
  width: 0,
  height: 0,
  borderRightColor: 'transparent',
  borderLeftColor: 'transparent',
  borderTopColor: 'transparent',
  borderBottomColor: 'transparent',
  borderStyle: 'solid',
  opacity: .75
};

const PlacementStyles = {
  left: {
    tooltip: { marginLeft: -10, marginTop: 140,padding: '0 5px' },
    arrow: { position: 'relative',right: '-255px',bottom: -80, top: '70px',opacity: 1, borderWidth: '5px 0 5px 5px', borderLeftColor: '#FFF' }
  },
  right: {
    tooltip: { marginRight: 0,marginLeft: 3, marginTop: 100,bottom: -228, padding: '0 5px' },
    arrow: { position: 'relative',marginLeft: -10,bottom: -260,top: 102,opacity: 1, borderWidth: '5px 5px 5px 0', borderRightColor: '#FFF' }
  },
  right2: {
    tooltip: { marginRight: 0,marginLeft: 0, marginTop: 5, padding: '0 5px' },
    arrow: { position: 'relative',marginLeft: -10,bottom: -80,top: 102,opacity: 1, borderWidth: '5px 5px 5px 0', borderRightColor: '#FFF' }
  },
  top: {
    tooltip: { top: -80,left: -40,marginTop: 0, padding: '5px 0' },
    arrow: { position: 'relative',bottom: '-146px', marginLeft: '12%',    opacity: 1, borderWidth: '5px 5px 0', borderTopColor: '#FFF' }
  },
  bottom: {
    tooltip: { marginBottom: 3, padding: '5px 0' },
    arrow: { position: 'relative',top: 0, marginLeft: -5,opacity: 1, borderWidth: '0 5px 5px', borderBottomColor: '#FFF' }
  }
};

var ToolTip = React.createClass({
    render: function(){
    var placementStyle = PlacementStyles[this.props.placement];
    var {
      style,
      arrowOffsetLeft: left = placementStyle.arrow.left,
      arrowOffsetTop: top = placementStyle.arrow.top,
      ...props } = this.props;

    return (
      <div style={{...TooltipStyle, ...placementStyle.tooltip, ...style}}>
        <div className="tooltipArrow" style={{...TooltipArrowStyle, ...placementStyle.arrow, left, top }}/>
        <div className="boxToShow" style={TooltipInnerStyle}>
          { props.children }
        </div>
      </div>
    );
  }
});

const OverlayExample = React.createClass({
  nextStep: function(){   
      var show = this.state.show;
      var placements = ['left', 'top', 'bottom', 'right2', 'right'];
      var placement = this.state.placement;
      placement = placements[placements.indexOf(placement) + 1];    
      if (!show) {
        show = true;
        placement = placements[0];
      }
      else if (!placement) {
        show = false;
      }
      return this.setState({ show, placement});
  },
  getInitialState: function() {
    return {
      ProjectData: {},
      currentProjectData:'',
      tutorialMode: 'false',
      requiredComponentsList:{
        'LED' : true
      },
      curTab: 'local',
      show: false,
      step: 1
    };
  },
  componentDidMount: function() {
    var ProjectDataArray=[];
    var hostUrl=Utils.getHostUrl();
    var projectId=this.props.projId;
    if(this.props.tutorialMode=="true"){
      $.ajax({
              url: hostUrl+"/web_bisoft/tutorial/"+projectId,
              type: 'GET',
              success: function(data) {
                    ProjectDataArray=data.project;
                    this.setState({ProjectData: ProjectDataArray,show: true});
              }.bind(this),
              error: function(xhr, status, err) {
                //window.location.href="/"+this.props.curTab;
                //console.error("/save", status, err.toString());
              }.bind(this)
      });
      if((this.state.step==1)&&(this.props.tutorialMode=="true")&&(this.props.currentTab=='concept')){
          this.startTutorials();
      }
    }
  },
  workspaceUpdate:function(index, componentsList){
    //console.log('workspaceUpdate', index, componentsList);
    var counter = 0;
    for(var component in this.state.requiredComponentsList){
      for(var componentIndex in componentsList){
        if( componentsList[componentIndex].name == component){
          if(componentsList && componentsList[componentIndex] && componentsList[componentIndex].selected){
            counter++;
          }
        }
      }
    }
    var comp_num = document.getElementById("Nextbutton");
    var requiredComponentsListLength = Object.keys(this.state.requiredComponentsList).length;
    if(requiredComponentsListLength == counter){
      console.log("array ",document.getElementById("Nextbutton"));
      document.getElementById("Nextbutton").style.display = 'inline-block';
    }else{
      document.getElementById("Nextbutton").style.display = 'none';
    }
  },
  componentDidUpdate: function(){  
    var comp_num = document.getElementsByClassName("Nextbutton").length-1;
    if(comp_num>-1){
      if(this.state.step==1){
        //this.props.app.state.components
        //this.props.app.state.sidebarContents
        //this.props.app.state.components[0].selected
        if(this.props.app.state.components[0].selected==true){ //for LED
          if(document.getElementsByClassName("disabled")[comp_num]){
              document.getElementsByClassName("disabled")[comp_num].disabled = false;
              document.getElementsByClassName("disabled")[comp_num].className="btn";
              // document.getElementsByClassName("Nextbutton")[0].disabled = true;
          }  
        }else{
            if(document.getElementsByClassName("btn")[comp_num]){
                document.getElementsByClassName("btn")[comp_num].className="disabled";
                document.getElementsByClassName("disabled")[comp_num].disabled = true;
              // document.getElementsByClassName("Nextbutton")[0].disabled = true;
            }
        }
      }else if(this.state.step==4){
        if(document.getElementsByClassName("disabled")[comp_num]){
           document.getElementsByClassName("disabled")[comp_num].disabled = true;
        }
      }else{
          if(document.getElementsByClassName("disabled")[comp_num]){
              document.getElementsByClassName("disabled")[comp_num].disabled = false;
              //document.getElementsByClassName("disabled")[0].className="btn";
          } 
      } 
      if((this.state.step==3) && (this.props.currentTab=='assembly')){
        document.getElementsByClassName("disabled")[comp_num].className="btn";
        document.getElementsByClassName("overlay-example")[comp_num].style.marginLeft='20%';
        document.getElementsByClassName("overlay-example")[comp_num].style.marginTop='0%';
        document.getElementsByClassName("img")[comp_num].style.display='block';
        document.getElementsByClassName("boxToShow")[comp_num].style.width='800px';
        document.getElementsByClassName("boxToShow")[comp_num].style.height='600px';
        document.getElementsByClassName("boxToShow")[comp_num].style.boxShadow='0 0 0 9999px rgba(0,0,0,0.9)';  
        document.getElementsByClassName("boxToShow")[comp_num].style.opacity='1'; 
      }
      var App=this.props.app;
      var componentsConnected=[];
      var componentsKey=Object.keys(App.state.workspace.components);
      if(App.state.workspace.components["led"]){
        var componentlength=App.state.workspace.components["led"].length;
      }
      for(var i=0;i<componentsKey.length;i++){
        componentsConnected.push(componentsKey[i]);
      }
      if((this.props.currentTab=='logic')&&(this.state.step==5)){
              //this.nextStep();
		if(document.getElementsByClassName("activeHex")[comp_num]){
			document.getElementsByClassName("activeHex")[comp_num].style.boxShadow='0 0 0 9999px rgba(0,0,0,0.9)';
			document.getElementsByClassName("activeHex")[comp_num].style.stroke="yellow";
			for(var i=0;i<10;i++){
				document.getElementsByClassName("activeHex")[comp_num].style.strokeWidth="40px"; 
				setInterval(function () {
        				document.getElementsByClassName("activeHex")[comp_num].style.strokeWidth="20px";
    				}, 1000); 
			}
		}
		if(document.getElementsByClassName("disabled")[0]){
                      document.getElementsByClassName("disabled")[comp_num].disabled = false;
                      document.getElementsByClassName("disabled")[comp_num].className="btn";
                }
      }
      if((this.props.currentTab=='logic')&&(this.state.step==6)){
	document.getElementsByClassName("bottomPanel")[comp_num]
		document.getElementsByClassName("bottomPanel")[comp_num].style.boxShadow='0 0 0 9999px rgba(0,0,0,0.9)';
		if(document.getElementsByClassName("disabled")[comp_num]){
                      document.getElementsByClassName("disabled")[comp_num].disabled = false;
                      document.getElementsByClassName("disabled")[comp_num].className="btn";
                }

      }
      if((this.props.currentTab=='logic')&&(this.state.step==7)){
		if(document.getElementsByClassName("setting")[comp_num]){
			document.getElementsByClassName("bottomPanel")[comp_num].style.boxShadow='none';
			document.getElementsByClassName("UploadDivision")[comp_num].style.boxShadow='0 0 0 9999px rgba(0,0,0,0.9)';
		}
		if(document.getElementsByClassName("disabled")[comp_num]){
                      document.getElementsByClassName("disabled")[comp_num].disabled = false;
                      document.getElementsByClassName("disabled")[comp_num].className="btn";
                }

      }
      if((this.state.step==4) && (this.props.currentTab=='assembly')){ 
          //document.getElementsByClassName("btn")[0].className="disabled";
          document.getElementsByClassName("img")[comp_num].style.display='none';
          document.getElementsByClassName("boxToShow")[comp_num].style.width='240px';
          document.getElementsByClassName("boxToShow")[comp_num].style.height='auto';
          document.getElementsByClassName("boxToShow")[comp_num].style.boxShadow='none';  
          document.getElementsByClassName("boxToShow")[comp_num].style.opacity='0.75';
          document.getElementsByClassName("enlargeButton")[comp_num].style.display='block';

          if(componentsKey){
            if(componentsConnected.indexOf("led")<0){
              if(document.getElementsByClassName("btn")[comp_num]){
                document.getElementsByClassName("btn")[comp_num].className="disabled";
                document.getElementsByClassName("disabled")[comp_num].disabled = true; 
              }   
            }else{
              if(componentlength==0){
                  if(document.getElementsByClassName("btn")[comp_num]){
                    document.getElementsByClassName("btn")[comp_num].className="disabled";
                    document.getElementsByClassName("disabled")[comp_num].disabled = true;
                  }
              }else{
                  if(document.getElementsByClassName("disabled")[comp_num]){
                      document.getElementsByClassName("disabled")[comp_num].disabled = false;
                      document.getElementsByClassName("disabled")[comp_num].className="btn";
                  }
              }
            }
          }
      }
    }
  },
  startTutorials: function(){  
      document.getElementsByClassName("componentGrid")[0].className="highlightArea";
      document.getElementsByClassName("desc")[0].style.boxShadow="0 0 0 9999px rgba(0,0,0,0.85)";
      //this.nextStep();      
  },
  enlargeHint: function(){
      if(document.getElementsByClassName("img")[0].style.display=='none'){
          if(this.state.step==4){
              document.getElementsByClassName("overlay-example")[0].style.marginLeft='20%';
              document.getElementsByClassName("overlay-example")[0].style.marginTop='0%';
              document.getElementsByClassName("img")[0].style.display='block';
              document.getElementsByClassName("boxToShow")[0].style.width='800px';
              document.getElementsByClassName("boxToShow")[0].style.height='600px';
              document.getElementsByClassName("boxToShow")[0].style.boxShadow='0 0 0 9999px rgba(0,0,0,0.9)';  
              document.getElementsByClassName("boxToShow")[0].style.opacity='1';
              document.getElementsByClassName("enlargeButton")[0].value="-";
              document.getElementsByClassName("primary")[0].style.display='none';  
          }
      }else{  
          document.getElementsByClassName("enlargeButton")[0].value="+"; 
          document.getElementsByClassName("img")[0].style.display='none';
          document.getElementsByClassName("boxToShow")[0].style.width='240px';
          document.getElementsByClassName("boxToShow")[0].style.height='auto';
          document.getElementsByClassName("boxToShow")[0].style.boxShadow='none';  
          document.getElementsByClassName("boxToShow")[0].style.opacity='0.75'; 
          document.getElementsByClassName("primary")[0].style.display='inline-block';
      }
  },
  render: function(){
    var step=this.props.step;
	console.log("it is:",this.props.tutorialMode);
    if(this.props.tutorialMode=="true"){
      if(this.state.show==false){
        return(<div style={{display: 'none'}}></div>);
      }else{
          this.state.step=this.props.step;
          var App=this.props.app;
          var OnlyOverlay=Overlay.Overlay;
          console.log(this.state.ProjectData);      
          var next_btn_display = 'none';
          if(this.state.step>=1){
              var StepData=this.state.ProjectData['steps'][step];
              var CurrentPlacement=StepData['placement'];  
              var CurrentClassname=StepData['targetClass'];
              var classElement=document.getElementsByClassName(CurrentClassname)[0];
              var message=StepData['message'];
              var buttonText=StepData['buttonText'];
              var currentTab=StepData['tab'];
          }
          if(this.state.step>1){
              next_btn_display = 'inline-block';
          }
          if((this.state.step==2)&&(this.props.currentTab=='concept')){
              document.getElementsByClassName("highlightArea")[0].className="componentGrid";
              document.getElementsByClassName("sidebarGrid")[0].className="highlightSidebar";
          }     
          console.log("this: ",this,"StepData: ",StepData);
          var ButtonForLink;
          var UrlForTutorialStep="/App/tutorial/"+this.props.projId;
          ButtonForLink=(<Link to={{pathname: UrlForTutorialStep, query: { step: Number(this.state.step)+1,tab: currentTab }}}><button id='Nextbutton' className='Nextbutton disabled' style={{color: '#fff',backgroundColor: 'rgb(10, 103, 185)',borderColor: '#2e6da4',
                    display: next_btn_display,padding: '6px 12px',marginBottom: '0', fontSize: '14px'}} onClick={this.nextStep}>
                    {buttonText}</button></Link>);
          return (        
            <div className='overlay-example' style={{position: 'absolute',zIndex:'10000',marginLeft: '33%'}}>
              <br></br>
              <OnlyOverlay show={this.state.show} onHide={() => this.setState({ show: false })}
                placement={CurrentPlacement} container={this} target={ props => classElement }>
                <ToolTip>
                  <input className="enlargeButton" type='button' value='+' onClick={this.enlargeHint} style={{overflow: 'hidden',position:'absolute',right: '6px',marginLeft: '95%',top: '4px',fontSize: '19px',overflow: 'hidden',display:'none',backgroundColor: 'transparent',border: 'none',fontWeight: 'bold',outline: 'none'}}></input>         
                  <br></br>{message}<br></br><br></br>
                  <div className="img" style={{display: 'none',marginBottom: '20px',marginTop: '20px'}}>
                    <img style={{width: '100%',height: '80%'}} src="../../images/gifassembly.gif"></img>
                  </div>
                  {ButtonForLink}
                </ToolTip>
              </OnlyOverlay>
            </div>    
          );
      }
    }else{
        return(<div style={{display: 'none'}}></div>);
    } 
  }
});

module.exports = OverlayExample;