var React = require('react');
var PropTypes = React.PropTypes;
import { Router, Route, Link, hashHistory, browserHistory } from 'react-router';
var ComponentsSelected = require('../components/concept/ComponentsSelected');
var Overlay = require('react-overlays');
var Sidebar = require('../components/assembly/Sidebar');

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
  getInitialState:function(){
      return { show: false, nextNo: 1};
  },
  nextStep: function(){   
      this.state.nextNo=Number(sessionStorage.getItem("instructionCount"))+1;
      sessionStorage.setItem("instructionCount",this.state.nextNo);
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
      if(this.state.nextNo==1){
          document.getElementsByClassName("disabled")[0].disabled = true;
      }
      if(this.state.nextNo==4){

      }
      /*
      if(this.state.nextNo==2){
        if(ComponentsSelected["LED"]=="true"){

        }else{
            this.state.nextNo=this.state.nextNo-1;
            sessionStorage.setItem("instructionCount",this.state.nextNo);        
        }
      }*/   
      return this.setState({ show, placement });
  },
  componentDidMount: function(){
      var App=this.props.app;
      var nextCount;
      if(sessionStorage.getItem("instructionCount")){
          nextCount=Number(sessionStorage.getItem("instructionCount"));
      }else{
          nextCount=1;
      }
      if((nextCount==1)&&(this.props.tutorialMode=="true")&&(this.props.currentTab=='concept')){
          this.startTutorials();
      }
      if((nextCount==3) && (this.props.currentTab=='assembly')){
          document.getElementsByClassName("overlay-example")[0].style.marginLeft='20%';
          document.getElementsByClassName("overlay-example")[0].style.marginTop='0%';
          document.getElementsByClassName("img")[0].style.display='block';
          document.getElementsByClassName("boxToShow")[0].style.width='800px';
          document.getElementsByClassName("boxToShow")[0].style.height='600px';
          document.getElementsByClassName("boxToShow")[0].style.boxShadow='0 0 0 9999px rgba(0,0,0,0.9)';  
          document.getElementsByClassName("boxToShow")[0].style.opacity='1'; 
      }   
  },
  componentDidUpdate: function(){  
      var nextCount;
      if(sessionStorage.getItem("instructionCount")){
          nextCount=Number(sessionStorage.getItem("instructionCount"));
      }else{
          nextCount=1;
      } 
      if(nextCount==1){
        if(ComponentsSelected["led"]=="true"){
          if(document.getElementsByClassName("disabled")[0]){
              document.getElementsByClassName("disabled")[0].disabled = false;
              document.getElementsByClassName("disabled")[0].className="btn";
          }  
        }
      }else if(nextCount==4){
        if(document.getElementsByClassName("disabled")[0]){
           document.getElementsByClassName("disabled")[0].disabled = true;
        }
      }else{
          if(document.getElementsByClassName("disabled")[0]){
              document.getElementsByClassName("disabled")[0].disabled = false;
              document.getElementsByClassName("disabled")[0].className="btn";
          } 
      } 
      if((nextCount==4) && (this.props.currentTab=='assembly')){ 
          document.getElementsByClassName("img")[0].style.display='none';
          document.getElementsByClassName("boxToShow")[0].style.width='240px';
          document.getElementsByClassName("boxToShow")[0].style.height='auto';
          document.getElementsByClassName("boxToShow")[0].style.boxShadow='none';  
          document.getElementsByClassName("boxToShow")[0].style.opacity='0.75';
          document.getElementsByClassName("enlargeButton")[0].style.display='block';
      } 
  },
  startTutorials: function(){  
      document.getElementsByClassName("componentGrid")[0].className="highlightArea";
      document.getElementsByClassName("desc")[0].style.boxShadow="0 0 0 9999px rgba(0,0,0,0.85)";
      this.nextStep();      
  },
  enlargeHint: function(){
      var nextCount;
      if(sessionStorage.getItem("instructionCount")){
          nextCount=Number(sessionStorage.getItem("instructionCount"));
      }else{
          nextCount=1;
      } 
      if(document.getElementsByClassName("img")[0].style.display=='none'){
          if(nextCount==4){
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
    if(this.props.tutorialMode=="true"){
      this.state.show=true;
      var App=this.props.app;
      var OnlyOverlay=Overlay.Overlay;
      //this.state.nextNo=Number(sessionStorage.getItem("instructionCount"));
      var nextCount;
      if(sessionStorage.getItem("instructionCount")){
          nextCount=Number(sessionStorage.getItem("instructionCount"));
      }else{
          nextCount=1;
      }
      var InstructionsToShow={
        "1": {"message":"These are the components available..Select LED","targetClass":"highlightArea","placement":"top","buttonText":"Next"},
        "2": {"message":"These are the components selected","targetClass":"sidebarGrid","placement":"left","buttonText":"Next"},
        "3": {"message":"Connect the components to Bibox by dragging it nearby","targetClass":"assemblySidebar","placement":"right","buttonText":"Try it"},
        "4": {"message":"Drag the components near Bibox and hold until it connects","targetClass":"highlightSidebar","placement":"right2","buttonText":"Next"},
        "5": {"message":"Drag the components near Bibox and hold until it connects","targetClass":"highlightSidebar","placement":"right2","buttonText":"Next"},
        "6": {"message":"Create the program logic using this interface. Its easy!","targetClass":"highlightSidebar","placement":"right2","buttonText":"Next"},
        "7": {"message":"Create the program logic using this interface. Its easy!","targetClass":"highlightSidebar","placement":"right","buttonText":"Next"},
        "8": {"message":"Create the program logic using this interface. Its easy!","targetClass":"highlightSidebar","placement":"right","buttonText":"Next"},
        "9": {"message":"Create the program logic using this interface. Its easy!","targetClass":"highlightSidebar","placement":"right","buttonText":"Next"},
      };      
      if(nextCount>=1){
          var CurrentPlacement=InstructionsToShow[nextCount].placement;
          var CurrentClassname=InstructionsToShow[nextCount].targetClass;
          var classElement=document.getElementsByClassName(CurrentClassname)[0];
          var message=InstructionsToShow[nextCount].message;
          var buttonText=InstructionsToShow[nextCount].buttonText;
      } 
      if((nextCount==2)&&(this.props.currentTab=='concept')){
          document.getElementsByClassName("highlightArea")[0].className="componentGrid";
          document.getElementsByClassName("sidebarGrid")[0].className="highlightSidebar";
      }   
      var componentsConnected=[];
      var componentsKey=Object.keys(App.state.workspace.components);
      for(var i=0;i<componentsKey.length;i++){
          componentsConnected.push(componentsKey[i]);
      }
      if((nextCount==4)&&(this.props.currentTab=='assembly')){
          if(componentsKey){
              if(componentsConnected.indexOf("led")<0){
                  //nextCount=nextCount-1;
                  //sessionStorage.setItem("instructionCount",nextCount);
              }      
          }else{
              if(document.getElementsByClassName("disabled")[0]){
                  document.getElementsByClassName("disabled")[0].disabled = false;
                  document.getElementsByClassName("disabled")[0].className="btn";
              }
              nextCount=nextCount+1;
              sessionStorage.setItem("instructionCount",nextCount);
          }
      }
      if((nextCount==5)&&(this.props.currentTab=='assembly')){
          if(componentsKey){
              if(componentsConnected.indexOf("led")<0){
                  //nextCount=nextCount-1;
                  //sessionStorage.setItem("instructionCount",nextCount);
              }      
          }
      }
      if((nextCount==6)&&(this.props.currentTab=='assembly')){
          if(componentsConnected.indexOf("led")<0){
              nextCount=nextCount-1;
              sessionStorage.setItem("instructionCount",nextCount);                
          }   
      }  
      if((this.props.currentTab=='logic')&&(nextCount==6)){
          this.nextStep();
      } 
      var ButtonForLink;
      ButtonForLink=(<button className='Nextbutton disabled' style={{color: '#fff',backgroundColor: 'rgb(10, 103, 185)',borderColor: '#2e6da4',
                display: 'inline-block',padding: '6px 12px',marginBottom: '0', fontSize: '14px'}} onClick={this.nextStep}>
                {buttonText}</button>);
      if((nextCount==2)&&(this.props.currentTab=='concept')){
          ButtonForLink=(<Link to={'App/'+this.props.projId+'/assembly'} className="primary .btn-info .btn" style={{color: '#fff',backgroundColor: 'rgb(10, 103, 185)',borderColor: '#2e6da4',
          display: 'inline-block',padding: '6px 12px',marginBottom: '0', fontSize: '14px'}}>{buttonText}</Link>);
          sessionStorage.setItem("instructionCount",nextCount+1);
      }
      if((nextCount==5)&&(this.props.currentTab=='assembly')){
          ButtonForLink=(<Link to={'App/'+this.props.projId+'/logic'} className="primary .btn-info .btn" style={{color: '#fff',backgroundColor: 'rgb(10, 103, 185)',borderColor: '#2e6da4',
          display: 'inline-block',padding: '6px 12px',marginBottom: '0', fontSize: '14px'}}>{buttonText}</Link>);
          //sessionStorage.setItem("instructionCount",nextCount+1);
      }
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
    }else{
      return(<div style={{display: 'none'}}></div>);
    } 
  }
});

module.exports = OverlayExample;