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
var SelectBibox = require('./components/selectbibox/');
var Concept = require('./components/concept/');
var Assembly = require('./components/assembly/');
var Logic = require('./components/logic/');
var page = require('page');
var BUNDLE = require('./build_exe_config');
import { Router, Route, Link, hashHistory, browserHistory } from 'react-router';
const PortConnections = require(__base + 'src/components/assembly/PortConnections');
var Project = require('./ProjectManager/Project');
var FileInput = require('./fileinput');
const Sizes = require('./helpers/Sizes');
//var uuid = require('node-uuid');
var Data = require('./data.js');
//var FileSaver = require('./FileSaver.js');
var CodeGenerationRangeValues = require('./CodeGenerationRangeValues.js');

var initCode = require('./initCode.js');
var FlowCodeGeneration = require('./FlowCodeGeneration.js');
var FlowStringCodeGeneration = require('./FlowStringCodeGeneration.js');
var HexaCodeGeneration = require('./HexaCodeGeneration.js');

var Utils = require(__base+'./src/utils');
var hostUrl=Utils.getHostUrl();
var Overlay = require('react-overlays');
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
let rand = ()=> (Math.floor(Math.random() * 20) - 10);

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
    paddingLeft: 20,
    paddingBottom: 20,
    paddingRight: 2,
    paddingTop: '4px',
  };
};

var App = React.createClass({
  componentDidMount: function() {
		var host="http://localhost:9009"; 
		var imgobjectappStatus=new Image(1,1);
            	imgobjectappStatus.onload= function(){
              		//changeAppstate('newtabModal');
			var socket = io.connect("http://localhost:9009"); 
			socket.emit('/disconnect');
			socket.on('_disconnect', function (data) {
				console.log(data.status);
				socket.emit('close');
			});
            	};
            	imgobjectappStatus.onerror= function(){
              		console.log("server not up");
            	};
            	var currTime=Date.now();
            	imgobjectappStatus.src=host+"/uptime/?b="+currTime;

    // Initiate pagejs and define the routes
    // page('/', ()=>this.switchTo('concept'));
    // page('/concept', ()=>this.switchTo('concept'));
    // page('/assembly', ()=>this.switchTo('assembly'));
    // page('/logic', ()=>this.switchTo('logic'));
    // page({
    //   hashbang: true
    // });
    window.dispatchEvent(new Event('resize'));
  },
  getInitialState: function() {
      //localStorage.setItem('selectbibox','Dummy Bibox;00:00:00:00:00:00');
      var editable='false';
      var components = require('./data.js');
      var biboxes = require('./selectbibox.js');	  
      var componentProps = require('./componentProps');
      components.forEach(function (component) {
        component.selected = false;
        component.name = component.type.replace(/_/g, ' ').toUpperCase();
        component.url = 'images/component_' + component.type + '.png';
        componentProps[component.type] = component;
        // component.url = require('../' + component.url);
      });
      biboxes.forEach(function (bibox) {
        bibox.selected = false;
        bibox.name = bibox.type.replace(/_/g, ' ').toUpperCase();
        var imageUrl;
        var biboxType = localStorage.getItem("selectbibox");
        var selectedBiboxSplit = biboxType.split(';');
        var selectedBibox = selectedBiboxSplit[0];
        if(selectedBibox=="BIBOX Starling"){
          imageUrl ='images/starling.png';
        }
        else{
          imageUrl ='images/hornbill.png';
        }  
        bibox.url =imageUrl;
        componentProps[bibox.type] = bibox;
        // component.url = require('../' + component.url);
      });
      var bibox_data = localStorage.getItem('biboxes')||"{}";
      bibox_data = JSON.parse(bibox_data);
      if(Object.keys(bibox_data).length>0){
        biboxes = bibox_data;
      }else{
        localStorage.setItem('biboxes',JSON.stringify(biboxes));
      }
      window.addEventListener('resize', (e)=>{
        const height = document.body.clientHeight;
        const width  = document.body.clientWidth;
        Sizes._update(width, height);
        this.setState({
          height: height,
          width: width
        })
      });
      Sizes._update(document.body.clientWidth, document.body.clientHeight);
      /**
       * @member {object}    state         The main and only state object.
       * @property {string}  curTab        The current tab.
       * @property {number}  height The height of the App
       * @property {number}  width  The width of the App
       * @property {ComponentData[]}  components    The array of component data.
       * @property {number[]}  sidebarContents      Array of entries into sidebar with each entry as index wrt ComponentData
       * @property {number}  coverflowActive The current active element in Coverflow (index wrt ComponentData)
       * @property {object}  workspace The workspace object
       * @property {Offset} workspace.bibox The offset of the bibox
       * @property {WorkspaceComponents} workspace.components The data of the workspace representing components
       * @property {Offset} workspace.offset The offset of the workspace (the panning thing)
       * @property {number} workspace.scale The scale of the workspcae (zoom)
       */
     if(sessionStorage.getItem("AppDetails-"+this.props.projId) && sessionStorage.getItem("AppDetails-"+this.props.projId)!="undefined" ){
            var localData=(JSON.parse(sessionStorage.getItem("AppDetails-"+this.props.projId)));
            // if(Object.keys(bibox_data).length>0){
            //   localData.biboxes = bibox_data;
            // }
            return {
              curTab: localData.curTab,
              editable: 'false',
              show: false,
              devices: [],
              currentDevice: '',
              showModalToggle: false,
              ExploreProject: 'false',
              uploadModal: '',
              sidebarContents: localData.sidebarContents,
              components: localData.components,
	      // biboxes: localData.biboxes,		 
              coverflowActive: 0,
              workspace: localData.workspace,
              logic: localData.logic,
              logicEditor:localData.logicEditor,
              curState:localData.curState,
              logicNew: localData.logicNew,
              height: document.body.clientHeight,
              width: document.body.clientWidth,
              logicEditorPanelUpdate:this.logicEditorPanelUpdate
            };

     }else{
          return {
              logicEditorPanelUpdate:this.logicEditorPanelUpdate,
              curTab: 'concept',
              editable: 'false',
              ExploreProject: 'false',
              sidebarContents: [],
              show: false,
              devices: [],
              currentDevice: '',
              uploadModal: '',
              showModalToggle: false,
              components: components,
	      // biboxes: biboxes,		
              coverflowActive: 0,
              workspace: {
                bibox: { top: 20, left: 80 },
                components: {
                  // Other components come here
                  // eg. "led": [{top: 20, left: 80, connectedTo: 'A1'}, ...], ...
                },
                offset: { top: 0, left: 0 },
                scale: 1,
              },
              logic: {
                program: [
                  {'type': 'start','state':{'bic1':false,'bic2':false,'bic3':false,'bid2':false,'bif1':false,'bif2':false,'bif3':false,'bid3':false,'bid1':false,'bmp3':false}}
                  // The program does not have closing tags like end_if/end_loop or repeat
                  // example program
                  // {type: 'start'},
                  // {type: 'if', subprogram: [
                  //   {type: 'output'},
                  //   {type: 'if', subprogram: [
                  //     {type: 'wait'}
                  //   ]}
                  // ]},
                  // {type: 'loop', subprogram: [
                  //   {type: 'output'},
                  //   {type: 'if', subprogram: [
                  //     {type: 'wait'}
                  //   ]}
                  // ]},
                ],
                end: {type: 'end', state: 'repeat'},
                offset: { left: 0, top: 0 },
                scale: 1,
                currentProgramGuide: 0, // -1 when program completed or the level of nesting
                active: [-1, -1], // The currently clicked box, [-1, -1] if nothing or improper clicked
                bottomPanel: 'border',
              },
              logicNew: {
                cards: [
                  {'type': 'start','cardId': 0,'connections': [{'to':0, 'toPort':0}], 'left':346, 'top': 100, 'invalid': false,'state':{'bic1':false,'bic2':false,'bic3':false,'bid2':false,'bif1':false,'bif2':false,'bif3':false,'bid3':false,'bid1':false,'bmp3':false}}
                  // {type, connections: [{to, toPort}], left, top, invalid <bool>}
                  // {type: 'if', left: 25, top: 125, connections: [{to: 0, toPort: 0}, {to: 1, toPort: 0}, {to: 0, toPort: 2}, {to: 0, toPort: 3}], invalid: false},
                  // {type: 'if', left: 225, top: 225, connections: [{to: 0, toPort: 1}, {to: 1, toPort: 1}, {to: 1, toPort: 2}, {to: 1, toPort: 3}], invalid: false}
                ],
                nodeCount: 1,
                cardConnections: {
                  "0": {'type': 'start','cardId': 0, 'connections': [{'to':0, 'toPort':0}], 'left':346, 'top': 100, 'invalid': false,'state':{'bic1':false,'bic2':false,'bic3':false,'bid2':false,'bif1':false,'bif2':false,'bif3':false,'bid3':false,'bid1':false,'bmp3':false}}

                },
                end: {type: 'end', state: 'repeat'},
                offset: { left: 0, top: 0 },
                scale: 1,
                bottomPanel: 'border',
              },
              logicEditor: {
                code: '',
              },
              height: document.body.clientHeight,
              width: document.body.clientWidth
          };  
     }
  },
  logicEditorPanelUpdate:function(){
      return;
  },
  /**
   * Switch to a tab
   * @param  {string} tab tab name (concept/assembly)
   */
  switchTo: function (tab) {
    this.setState({
      curTab: tab
    });
  },
  /**
   * Selects a component from project (Selection means addition to sidebar)
   * @param  {number} index           The index (wrt data) of the component to select
   * @param  {number} coverflowActive The next coverflowActive
   * @see module:components/concept/Coverflow~select
   */
  select: function (index, coverflowActive) {
    var sidebarContents = this.state.sidebarContents;
    sidebarContents.push(index);
    var components = this.state.components;
    components[index].selected = true;
    if(this.props.tutorialMode == "true"){
      this.refs.concept.refs.tutorial.workspaceUpdate(index,components);
    }
    this.setState({
      coverflowActive: coverflowActive,
      sidebarContents: sidebarContents,
      components: components
    });
  },
  /**
   * Remove a component from project (Remove mean removal from sidebar)
   * @param  {number} index Index wrt sidebar
   */
  remove: function (index) {
    var { sidebarContents, components, workspace, coverflowActive } = this.state;
    var removeIndex = sidebarContents[index];
    if (sidebarContents.length === components.length) coverflowActive = removeIndex;
    sidebarContents.splice(index, 1);
    components[removeIndex].selected = false;
    delete workspace.components[components[removeIndex].type];
    if(this.props.tutorialMode == "true"){
      this.refs.concept.refs.tutorial.workspaceUpdate(index,components);
    }
    this.setState({
      sidebarContents: sidebarContents,
      components: components,
      workspace: workspace,
      coverflowActive: coverflowActive
    });
  },
  /**
   * Changes the active element of the coverflow in concept tab
   * @param  {number} coverflowActive
   * @see module:components/concept/Coverflow~onChange
   */
  changeCoverflowActive: function (coverflowActive) {
    this.setState({
      coverflowActive: coverflowActive
    });
  },
  /**
   * Update the workspace object of state
   * @param  {object}   workspace The new object
   * @param  {?Function} callback  An optional callback
   */
  workspaceStateUpdate: function (workspace, callback) {
    this.setState({
      workspace: workspace
    }, callback);
  },
  /**
   * Update the logic object of state
   * @param  {object}   logic The new object
   * @param  {?Function} callback  An optional callback
   */
  logicStateUpdate: function (logic, callback) {
    var logicType=logic.type;
    if(logicType=="hexa"){
      this.setState({
        logic: logic.state
      }, callback);
    }else if(logicType=="flow"){
      this.setState({
        logicNew: logic.state
      }, callback);
    }else{
      this.setState({
        logicEditor: logic.state
      }, callback);
    }
  },
  shouldComponentUpdate: function(nextProps,nextState) {
      if(this.props.curTab == "assembly"){
        nextState["PortConnections"] = PortConnections;
      }
      if(nextState["PortConnections"]==undefined){
        if(sessionStorage.getItem("AppDetails-" + this.props.projId)){
          var prev_data = JSON.parse(sessionStorage.getItem("AppDetails-" + this.props.projId));
          if(prev_data["PortConnections"]){
            nextState["PortConnections"] = prev_data["PortConnections"];
          }
        }else{
          nextState["PortConnections"] = PortConnections;
        }
      }
      var data=JSON.stringify(nextState);
      this.state.curTab = this.props.curTab;
      //console.log("data: "+nextState.sidebarContents);
      var obj={"app" : nextState , "project" : this.state.projDetails}
      sessionStorage.setItem("AppDetails-"+this.props.projId,data);
      //console.log('dataFromApp',data);
      return true;
  },
  saveFile: function(e){
      e.preventDefault();
      var img = Utils.biboxImg;
      if(this.props.curTab=='assembly'){
        this.refs.assembly.refs.child.screenshotInitiate();
      }
      else if(this.props.curTab=='concept'){
        sessionStorage.setItem("assempblyImageHTML",'')
        sessionStorage.setItem("assempblyImageURI",img);
      }
      else if(this.props.curTab=='logic'){
        if(sessionStorage.getItem("assempblyImageURI")==undefined){
          sessionStorage.setItem("assempblyImageHTML",'');
          sessionStorage.setItem("assempblyImageURI",img);
        }
      }
      document.getElementsByClassName('dropdown-content-save')[0].style.display='none';
      var draft=this.props.Draft; 
      //uuid.v4()
      if((this.props.projId)!="new"){
        var project_Id=this.props.projId;
          var ProjectDataGet;
          var componentsListAsString='';
          if(this.state.sidebarContents){
              var componentsList=this.state.sidebarContents;
              for(var i=0;i<componentsList.length;i++){
                componentsListAsString+=Data[componentsList[i]].name;
                if(i==componentsList.length-1){
                  componentsListAsString+="."
                }else{
                  componentsListAsString+=","
                }
              }
              componentsListAsString=componentsListAsString.toLowerCase();
          }

	 var dataApp=JSON.stringify(this.state);
	 var file = new File([dataApp], "app.txt", {type: "text/plain;charset=utf-8"}); 

	 var formData = new FormData();
	 formData.append( 'text', file );
	 //console.log(formData['text']);
	 if(file){
		 $.ajax({
			url: hostUrl+"/web_bisoft/save/app/"+project_Id,
			type: 'POST',
			data: formData,
			async: false,
			contentType: false,
			processData: false,
			success: function() {
              			sessionStorage.setItem(("AppDetails-"+project_Id),(dataApp));
                		//var urlArray=this.props.path.split('/');
                		//var currentTab=urlArray[urlArray.length-1];
                		var AppUrl='#/App/'+project_Id+"/"+"concept";
                		browserHistory.push(AppUrl);
                		window.location.reload();
           		}.bind(this),
            		error: function(xhr, status, err) {
              			console.log("error");
            		}.bind(this)
          	 });
	 }    	

          $.ajax({
            url: hostUrl+"/web_bisoft/project/"+project_Id,
            type: 'GET',
            async: false,
            dataType: "json",
            success: function(data) {
              console.log("Get project success");
              ProjectDataGet=data.project;
              ProjectDataGet["componentsUsed"]=componentsListAsString;
              ProjectDataGet["modifiedTime"]=Date.now();
            }.bind(this),
            error: function(xhr, status, err) {
              
            }.bind(this)
          });
     
	  var data=JSON.stringify(ProjectDataGet);
	  var fileProject = new File([data], "project.txt", {type: "text/plain;charset=utf-8"});

	  var formDataProject = new FormData();
	  formDataProject.append( 'text', fileProject);
	  //console.log(formDataProject['text']);
	  if(fileProject){
		    $.ajax({
			url: hostUrl+"/web_bisoft/save/project/"+project_Id,
			type: 'POST',
			data: formDataProject,
			async: false,
			contentType: false,
			processData: false,
			success: function() {
              			console.log("Post project success");
                		var currentTab=this.props.curTab;
                		var AppUrl='#/App/'+project_Id+"/"+currentTab;
                		browserHistory.push(AppUrl);
                		window.location.reload();           		
			}.bind(this),
            		error: function(xhr, status, err) {
              			console.log("error");
            		}.bind(this)
          	   }); 
	   }
      }else{
          // var PageArray=page.current.split('/');
          var currentProjectId=this.props.projId;
          //console.log("projid_new"+currentProjectId);
          // var currentProjectId=uuid.v4();
          sessionStorage.setItem(("AppDetails-"+"new"),JSON.stringify(this.state));
          var urlUpdateSave="#/project/new/save";
          browserHistory.push(urlUpdateSave);
          // window.location.href=urlUpdateSave;
          window.location.reload();
      }     
  },
  saveAsFile: function(e){
      e.preventDefault();
      var img = Utils.biboxImg;
      if(this.props.curTab=='assembly'){
        this.refs.assembly.refs.child.screenshotInitiate();
      }
      else if(this.props.curTab=='concept'){
        sessionStorage.setItem("assempblyImageHTML",'')
        sessionStorage.setItem("assempblyImageURI",img);
      }
      else if(this.props.curTab=='logic'){
        if(sessionStorage.getItem("assempblyImageURI")==undefined){
          sessionStorage.setItem("assempblyImageHTML",'');
          sessionStorage.setItem("assempblyImageURI",img);
        }
      }
      document.getElementsByClassName('dropdown-content-save')[0].style.display='none';
      sessionStorage.setItem(("AppDetails-"+"new"),JSON.stringify(this.state));
      var urlUpdateSaveAs="#/project/new/saveAs";
      browserHistory.push(urlUpdateSaveAs);
      // window.location.href=urlUpdateSaveAs;
      window.location.reload();
  },
  openFile: function(event){ 
      var contentsFromFile,fileName,AppData;
      document.getElementsByClassName('dropdown-content-save')[0].style.display='none';
      var urlUpdateOpen="#/bisoft/tutorials";//"#/App/tutorial/"+this.props.projId;
      browserHistory.push(urlUpdateOpen);
      window.location.reload();
      /*
      function readTextFile(file)
      {
          var rawFile = new XMLHttpRequest();
          rawFile.open("GET", file, false);
          rawFile.onreadystatechange = function ()
          {
              if(rawFile.readyState === 4)
              {
                  if(rawFile.status === 200 || rawFile.status == 0)
                  {
                      contentsFromFile = rawFile.responseText;
                      AppData=JSON.parse(contentsFromFile);
                      return(AppData);
                  }
              }
          }
          rawFile.send(null);       
      }
      fileName=event.target.files[0].name;
      var projectId=fileName.replace("_app.txt","");
      var path="./projects/"+projectId+"/"+fileName;
      readTextFile(path);
      if(AppData){
          document.getElementsByClassName('dropdown-content')[0].style.display='none';
          this.state=AppData;
          sessionStorage.setItem(("AppDetails-"+projectId),JSON.stringify(this.state));
          browserHistory.push('#/App/'+projectId+'/concept');
          // this.setState({AppData});
          window.location.reload();
      } */   
  },
  showDropdownSetting: function(){
      var dropdownStatus=document.getElementsByClassName('dropdown-content-setting')[0].style.display;
       document.getElementsByClassName('update-style')[0].style.display="none";
      if(dropdownStatus=='block'){
        document.getElementsByClassName('dropdown-content-setting')[0].style.display='none';
      }else{
        document.getElementsByClassName('dropdown-content-setting')[0].style.display='block';
      }          
  },
  showDropdownSave: function(){
      var dropdownStatus=document.getElementsByClassName('dropdown-content-save')[0].style.display;
      if(dropdownStatus=='block'){
        document.getElementsByClassName('dropdown-content-save')[0].style.display='none';
      }else{
        document.getElementsByClassName('dropdown-content-save')[0].style.display='block';
      }          
  },
  mouseLeave: function(){
	if(document.getElementsByClassName('dropdown-content-save')[0])
      		document.getElementsByClassName('dropdown-content-save')[0].style.display='none';
      //this.state.show=false;
	if(document.getElementsByClassName('dropdown-content-setting')[0])
      		document.getElementsByClassName('dropdown-content-setting')[0].style.display='none'; 
  }, 

  uploadToSelectedDevice: function(){
    var CurrentLogicScreen;
    var Appstate=this;
    var imgobjectappStatus=new Image(1,1);
    if(sessionStorage.getItem("CurrentLogicScreen")){
      CurrentLogicScreen=sessionStorage.getItem("CurrentLogicScreen");
    }else{
      CurrentLogicScreen='hexa';
    }
    var host="http://localhost:9009";
    if(CurrentLogicScreen=='hexa' || CurrentLogicScreen=='flow'){
        var imgObj=new Image(1,1);
        console.log("upload");
        // var params={"logic":{"program":[{"type":"start","state":{"bic1":false,"bic2":false,"bic3":false,"bid2":false,"bif1":false,"bif2":false,"bif3":false,"bid3":false,"bid1":false,"bmp3":false}},{"type":"output","state":{"assignA1":true,"valueA1":190}}],"end":{"type":"end","state":"end"},"offset":{"left":0,"top":0},"scale":1,"currentProgramGuide":-1,"active":[1,3],"bottomPanel":"border","insertState":false},"components":{"A1":{"type":"led","index":0},"A2":null,"A3":null,"A4":null,"MOTOR1":null,"MOTOR2":null,"BC":null,"DE":null,"F":null,"G":null,"A5":null,"A6":null,"BATTERY":{"type":"battery","index":0}}};
        var logicData=this.state.logic;
        var params={"screen":CurrentLogicScreen,"logic":logicData,"components":PortConnections};
        if(CurrentLogicScreen=='flow')
          params={"screen":CurrentLogicScreen,"logic":this.state.logicNew,"components":PortConnections};
        //var Bytecode=this.uploadCall(params);
        var Bytecode=JSON.stringify({"code":params});
        console.log("code params" , params);
        //console.log("code: ",Bytecode);
        var changeAppstate= function(status){
          //alert("inside state");
          Appstate.setState({showModalToggle: true,uploadModal: status});
        };
      	try{
              imgobjectappStatus.onload= function(){
                        		//changeAppstate('newtabModal');
            			var socket = io.connect("http://localhost:9009");
                  var selectbibox;
                  if(localStorage.getItem("selectbibox") == null){
                    selectbibox ='Dummy Bibox;00:00:00:00:00:00';
                    var mac = selectbibox.split(";")[1]||"";
                  }
                  else{
                    var mac = (localStorage.getItem("selectbibox")).split(";")[1]||"";
                  }
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
              					socket.on('_upload', function (data,err) {
              						if(data.success)
              							console.log(data.success);
              						else
              							console.log("false" ,data.status);
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
        /*imgObj.onload= function(){
          //alert("onload");
          changeAppstate('uploadingModal');
        };
        imgObj.onerror= function(){
            //alert("onerror");
            var imgobjectappStatus=new Image(1,1);
            imgobjectappStatus.onload= function(){
              //alert("onload");
              changeAppstate('newtabModal');
            };
            imgobjectappStatus.onerror= function(){
              //alert("onerror");
              changeAppstate('downloadModal');
            };
            var currTime=Date.now();
            imgobjectappStatus.src=host+"/uptime/?b="+currTime;
        };
        var currTime=Date.now();
        //console.log("date: "+ currDate);
        imgObj.src=host+"/upload/?a="+Bytecode+"&b="+currTime;*/
    }else if(CurrentLogicScreen=='flow'){
        //var dataToPass=FlowCodeGeneration(this.state.logicNew, this.state.PortConnections);
        var dataToPass=FlowStringCodeGeneration(this.state.logicNew, this.state.PortConnections);
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
        //console.log("dataToPass",dataToPass);
        /*$.ajax({
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
        });*/
      try{
            var Appstate=this;
            var socket = io.connect("http://localhost:9009"); 
            socket.emit('upload/editor_code', { code: dataToPass });
            socket.on('_upload/editor_code', function (data) {
              var respVal=data.result+'';
              console.log(respVal);
              socket.emit('close');
             
              Appstate.state.logicEditorPanelUpdate(data.gcc_compile_output);
            });
          var currTime=Date.now();
          imgobjectappStatus.src=host+"/uptime/?b="+currTime; 
        
        }catch(e){
          console.log("failed",e);
          console.log('server not up');
        }
    }  
  }, 
  uploadHexFile: function(hex_data){
    var host="http://localhost:9009";
    var imgObj=new Image(1,1);
    console.log("upload");
    imgObj.onload= function(){
      alert("onload");
      // changeAppstate('uploadingModal');
    };
    imgObj.onerror= function(){
        alert("onerror");
    };
    var currTime=Date.now();
    imgObj.src=host+"/upload/hex_file/?a="+hex_data+"&b="+currTime+"&c=./bibox.hex";
  },
  uploadDropdown: function(){
    //this.state.devices=[];
    if(this.state.show==true){
      this.state.show=false;
      document.getElementsByClassName('dropdown-content-upload')[0].style.display='none';
    }else{
      this.state.show=true;
      document.getElementsByClassName('dropdown-content-upload')[0].style.display='block';
      /*$.ajax({
        url: "http://localhost:9009/devices",
        type: 'GET',
        dataType: "json",
        success: function(data) {
            console.log("devices:",data.devices); 
            this.state.devices=data.devices;
            if(this.state.devices.length<=0){
              document.getElementsByClassName('nodevices')[0].style.display='block';
            }
            this.setState();           
        }.bind(this),
        error: function(xhr, status, err) {
            console.log("error");
            document.getElementsByClassName('searching')[0].style.display='none';
            document.getElementsByClassName('scan')[0].style.display='block';
            document.getElementsByClassName('nodevices')[0].style.display='block';
        }.bind(this),
        timeout:10000
      }); */
    } 
  },
  downloadButton: function(){
    if (navigator.userAgent.indexOf("WOW64") != -1 || navigator.userAgent.indexOf("Win64") != -1 ){
      // alert("This is a 64 bit OS");
      var dl = document.createElement('a');
      dl.setAttribute('href','./BisoftConnectivity_x64.exe');
      dl.setAttribute('download', 'BisoftConnectivity_x64.exe');
      dl.click();
    } else {
      var dl = document.createElement('a');
      dl.setAttribute('href','./BisoftConnectivity_x86.exe');
      dl.setAttribute('download', 'BisoftConnectivity_x86.exe');
      dl.click();
      // alert("Not a 64 bit OS");
    }
    this.setState({showModalToggle: false});
  },
  downloadApp: function(){
      //link to download app.
      this.setState({showModalToggle: false});
  },
  openBTremote: function(){
  var AppUrl='/#/BTremote';
        browserHistory.push(AppUrl);
      window.location.reload();
  },
  openPlotter: function(){
	var AppUrl='/#/Plotter';
      	browserHistory.push(AppUrl);
    	window.location.reload();
  },
  openFirmware:function(){
   var AppUrl='/#/Firmware';
        browserHistory.push(AppUrl);
      window.location.reload();
  },
  openPictureUpload:function(){
    var AppUrl='/#/PictureUpload';
        browserHistory.push(AppUrl);
      window.location.reload();
  },
  openUpdate:function(){
     //alert("update clicked");
      var updateStatus = document.getElementsByClassName('dropdown-content-update')[0].style.display;
      var updateStyle = document.getElementsByClassName('update-style')[0].style.display;
      if(updateStyle=="none"){
        document.getElementsByClassName('update-style')[0].style.display="block";
      }
      else{
        document.getElementsByClassName('update-style')[0].style.display="none";
      }
     
  },
  firmwareUpdate:function(){
    alert("firmwareUpdate clicked");
  },
  btUpdate:function(){
    alert("bupdate clicked");
  },
  openAppInNewTab: function(){
    var AppUrl='/#/connectivity';
    browserHistory.push(AppUrl);
    window.location.reload();

    /*var host="http://localhost:9009";
   var windowObjectReference;

    windowObjectReference = window.open(
      host,
      "DescriptiveWindowName",
      "resizable,left=200px,top=100px,height=400,scrollbars,status"
    );*/
    //window.open(host,'_blank');
    this.setState({showModalToggle: false});
  },
  closeModal: function(){
    this.setState({showModalToggle: false});
  },
  hideDropdown: function(){
    console.log("onBlur");
    if(this.state.show==true){
      this.state.show=false;
      document.getElementsByClassName('dropdown-content-upload')[0].style.display='none';
    }
  },
  logicNewStateUpdate: function (logicNew, callback) {
    this.setState({
      logicNew: logicNew
    }, callback);
  },

  render: function() {
    var connectivityType = localStorage.getItem('connectivity-type');
    console.log('connectivityType', connectivityType);
    if(connectivityType=="USB"){
    var btRemoteStyle;
    var save_dropdown_styles = "inline-block";
    var show_dropdown_styles_for_select_bibox = "none";
    var route_to = "/";
    var stateval;
    if(false && sessionStorage.getItem("AppDetails-"+this.props.projId)){
        var localData=JSON.parse(sessionStorage.getItem("AppDetails-"+this.props.projId));
        stateval = localData;
    }else{
        stateval = this.state;
    } 
    if(BUNDLE.BUNDLE_TYPE=="USB"){
       //console.log("usb");
       var bundle_style={
        cursor: 'pointer',
        maxWidth: '140px', 
        display: 'none',
        background: '#495355',
        color: 'white', 
        zIndex: '999'
      }

     }
    else{
      //console.log("ble");
       var bundle_style={
        cursor: 'pointer',
        maxWidth: '140px', 
        display: 'inline-flex',
        background: '#495355',
        color: 'white', 
        zIndex: '999'
      }
    }
     var ble = require('./build_exe_config');
    if(ble.BUNDLE_TYPE=='USB'){
      btRemoteStyle={
        display: 'none'
        
      }
    }
    else{
       btRemoteStyle={
        cursor: 'pointer',
        maxWidth: '140px', 
        display: 'inline-block',
        background: '#495355',
        color: 'white', 
        zIndex: '999'
      }
    }
    //stateval = this.state;
    var currentProjectData=this.props.currentProjectData;
    const {  components, sidebarContents, workspace, logic, logicNew, logicEditor, coverflowActive, height, width } = stateval;
    const biboxes = JSON.parse(localStorage.getItem('biboxes'));
    var currentUrl=window.location.href;
    var currentProjectId=this.props.projId;
    var urlUpdateSave="/project/"+currentProjectId+"/save";
    var urlUpdateSaveAs="/project/"+currentProjectId+"/saveAs";
    var tutorialMode=this.props.tutorialMode;
    //this is to remove tutorial mode from bibox project
    tutorialMode=false;
    var curTab=this.props.curTab;
    // console.log(curTab+'screen: '+this.props.routeParams.screen);
    if(this.props.ExploreProject){
        this.state.ExploreProject=this.props.ExploreProject;
    }
    var main;
    var Modal=Overlay.Modal;
    var navTabsDiv=(<nav id="nav" className="menu">
                  <img src="./src/ProjectManager/images/menu.png" alt="menu" className="toggle-menu"/>
                    <ul>
                        <li><Link to={'App/'+this.props.projId+'/concept'} className={curTab === 'concept' ? 'active' : ''}>CONCEPT</Link></li>
                        <li><Link to={'App/'+this.props.projId+'/assembly'} className={curTab === 'assembly' ? 'active' : ''}>ASSEMBLY</Link></li>
                        <li><Link to={'App/'+this.props.projId+'/logic'} className={curTab === 'logic' ? 'active' : ''}>LOGIC FLOW</Link></li>
                    </ul>
                </nav>);
    if (curTab === 'selectbibox'){
      sessionStorage.removeItem('currentTab');
      show_dropdown_styles_for_select_bibox = save_dropdown_styles;
      save_dropdown_styles = "none";
      route_to = "/";//"bisoft/tutorials";
    	navTabsDiv='';  
      main = (
        <SelectBibox biboxes={biboxes} step={this.props.step} tutorialMode={tutorialMode} currentTab={curTab} projId={currentProjectId} app={this} components={components} sidebarContents={sidebarContents}
               coverflowActive={localStorage.getItem("selectbiboxindex")||0} onCoverflowChange={this.changeCoverflowActive}
               select={this.select} remove={this.remove}/>
      );
    } 
    else if (curTab === 'concept') main = (
      <Concept ref='concept' step={this.props.step} msgAt={this.props.msgAt} tutorialMode={tutorialMode} currentTab={curTab} projId={currentProjectId} app={this} components={components} sidebarContents={sidebarContents}
               coverflowActive={coverflowActive} onCoverflowChange={this.changeCoverflowActive}
               select={this.select} remove={this.remove}/>
    );
    else if (curTab === 'assembly') main = (
      <Assembly ref='assembly' step={this.props.step} msgAt={this.props.msgAt} tutorialMode={tutorialMode} currentTab={curTab} projId={currentProjectId} app={this} components={components} sidebarContents={sidebarContents}
          workspace={workspace} update={this.workspaceStateUpdate}
          height={Sizes.mainHeight} width={Sizes.width}/>
    );
    else if (curTab === 'logic') main = (
      <Logic step={this.props.step} tutorialMode={tutorialMode} msgAt={this.props.msgAt} logicNew={logicNew} currentTab={curTab} projId={currentProjectId} app={this} height={Sizes.mainHeight} width={Sizes.width} workspace={workspace} logic={logic}
             logicEditor={logicEditor} update={this.logicStateUpdate}/>
    );
    var modalData;
    if(this.state.uploadModal=='newtabModal'){
        modalData=(<div style={dialogStyle()}>
                      <button style={{backgroundColor: 'transparent',border: 'none',outline: 'none',overflow: 'visible',position: 'relative',marginLeft: '90%',marginTop: '2px',marginBottom: '8px'}} onClick={this.closeModal}>
                          <img src="images/btn_close1.png" style={{height: '24px',width: '24px',borderRadius: '20px', backgroundColor: 'transparent'}}/>
                        </button>
                      <p style={{textAlign: 'center'}}>Please open connectivity app.</p>
                      <div style={{marginLeft: '40%',marginTop: '8px'}}>
                      <button className='YesNobutton' onClick={this.openAppInNewTab} style={{marginRight: '5px'}}>Open</button>
                      </div>
                    </div>);
    }else if(this.state.uploadModal=='downloadModal'){
        modalData=(<div style={dialogStyle()}>
                      <button style={{backgroundColor: 'transparent',border: 'none',outline: 'none',overflow: 'visible',position: 'relative',marginLeft: '90%',marginTop: '2px',marginBottom: '8px'}} onClick={this.closeModal}>
                          <img src="images/btn_close1.png" style={{height: '24px',width: '24px',borderRadius: '20px', backgroundColor: 'transparent'}}/>
                      </button>
                      <p style={{textAlign: 'center'}}>Please download the connectivity app and install it.</p>
                      <div style={{marginLeft: '40%',marginTop: '8px'}}>
                      <button className='YesNobutton' onClick={this.downloadButton} style={{marginRight: '5px'}}><a style={{color: 'white'}} /*href="bisoft.exe"*/ download>Download</a></button>
                      </div>
                    </div>);   
    }else{
        modalData=(<div style={dialogStyle()}>
                      <button style={{backgroundColor: 'transparent',border: 'none',outline: 'none',overflow: 'visible',position: 'relative',marginLeft: '90%',marginTop: '2px',marginBottom: '8px'}} onClick={this.closeModal}>
                          <img src="images/btn_close1.png" style={{height: '24px',width: '24px',borderRadius: '20px', backgroundColor: 'transparent'}}/>
                      </button>
                      <p style={{textAlign: 'center'}}>Uploading to the connected device....</p>
                      <div style={{marginLeft: '40%',marginTop: '8px'}}>
                      <button className='YesNobutton' onClick={this.downloadApp} style={{marginRight: '5px'}}>Okay</button>
                      </div>
                    </div>);
        var Appstate=this;
        if(this.state.showModalToggle){
          setTimeout(function(){
            Appstate.setState({showModalToggle: false});
          }, 2000);
        }  
    }
    if (curTab === 'logic') {
    return (
        <div id="appComponent">
              
              <div className='modal-example' style={{position: 'fixed',display: 'none'}}>
                    <Modal aria-labelledby='modal-label' style={modalStyle}
                      backdropStyle={backdropStyle} show={this.state.showModalToggle} onHide={this.close}>    
                      {modalData}
                    </Modal>
              </div>

          <div id="main" className="home">
            <header id="header" style={{height: '71px'}}>
                <div className="logo">
                    <Link to={route_to}><img src="./src/ProjectManager/images/logo.png" alt="Bisoft"/></Link>
                </div>
		 <div className="dropdown setting" onMouseLeave={this.mouseLeave}>
                  <button onClick={this.showDropdownSetting} className="dropbtn" style={{outline: 'none'}}><img style={{height: '40px',width: '40px'}} src="images/setting.png" alt="setting"/></button>
                  <div className="dropdown-content-setting" style={{zIndex: '10000',maxWidth: '180px',marginLeft: '-90px',background: '#495355',marginRight: '2px',position: 'fixed'}}>
                   
                   
		    <div className="dropdown-content-option" style={{cursor: 'pointer',maxWidth: '140px', display: 'inline-block',background: '#495355',color: 'white', zIndex: '999'}}>
                      <img onClick={this.openPlotter} style={{padding: '4px',position: 'relative',float: 'left'}} height="24px" width="24px" className="loadingdevices" src="images/actionbar_profiler.png"></img>  <a className="savestyle" onClick={this.openPlotter} style={{padding: '4px',color: 'white',width:'140px'}}>Plotter</a>
                    
                    </div>
                    <div className="dropdown-content-option" style={{cursor: 'pointer',maxWidth: '140px', display: save_dropdown_styles,background: '#495355',color: 'white', zIndex: '999'}}>
                      <a className="savestyle" onClick={this.openUpdate} style={{padding: '4px',color: 'white',width:'140px'}}>Update</a>
                      <div className="dropdown-content-update" style={{display:'block',minWidth:'0px'}}>
                         <div className="dropdown-content-option" className="update-style" style={{cursor: 'pointer',maxWidth: '140px', display: save_dropdown_styles,background: '#495355',color: 'white', zIndex: '999',marginLeft:'-140px',display:'none',marginTop:'-25px'}}>
                             <div  onMouseLeave={this.mouseLeave}>
                            <a className="savestyle" onClick={this.openFirmware} style={{padding: '4px',color: 'white',width:'130px'}}>Firmware Update</a>
                            {/*<a className="savestyle" onClick={this.openPictureUpload} style={{padding: '4px',color: 'white',width:'130px'}}>Picture Update</a>*/}
                            </div>
                         </div>
                      </div>
                    </div>

		    </div>
                </div> 
                          
                <div className="dropdown setting" onMouseLeave={this.mouseLeave}>
                  <button onClick={this.showDropdownSave} className="dropbtn" style={{outline: 'none'}}><img style={{height: '40px',width: '40px'}} src="images/ic_save.png" alt="setting"/></button>          
                  <div className="dropdown-content-save" style={{zIndex: '10000',maxWidth: '160px',marginLeft: '-30px',marginRight: '5px', position: 'fixed'}}>             
                    <div className="dropdown-content-option" style={{scursor: 'pointer',maxWidth: '140px', display: 'inline-flex',background: '#495355',color: 'white', zIndex: '999'}}>
                      <img  onClick={this.saveFile} style={{padding: '4px',position: 'relative',float: 'left'}} height="28px" width="28px" className="loadingdevices" src="images/save.png"></img><a className="savestyle" onClick={this.saveFile} style={{padding: '4px',color: 'white',width:"160px"}}>Save</a>
                      
                    </div>
                    <div className="dropdown-content-option" style={{cursor: 'pointer',maxWidth: '140px', display: 'inline-block',background: '#495355',color: 'white', zIndex: '999'}}>
                      <img onClick={this.saveAsFile} style={{padding: '4px',position: 'relative',float: 'left'}} height="28px" width="28px" className="loadingdevices" src="images/saveas.png"></img><a className="saveasstyle" onClick={this.saveAsFile} style={{padding: '4px',color: 'white',width:"160px"}}>Save As</a>
                      
                    </div>
                    <div className="dropdown-content-option" style={{cursor: 'pointer',maxWidth: '140px', display: 'inline-block',background: '#495355',color: 'white', zIndex: '999'}}>
                      <img onClick={this.openFile} style={{padding: '4px',position: 'relative',float: 'left'}} height="28px" width="28px" className="loadingdevices" src="images/open.png"></img> <a className="openstyle" onClick={this.openFile} style={{padding: '4px',color: 'white',width:"160px"}}>Open</a>
                     
                    </div>
                  </div>
                </div>
                
                <div className="setting">
                    <div className="UploadDivision">
                      <a className="uploadButton" onClick={this.uploadToSelectedDevice}><img title="Upload Program" src="images/upload.png" alt="Upload"/></a>
                    </div>
                </div>
				
		{navTabsDiv}                      
            </header>
          </div>
          <div style={{height: Sizes.mainHeight}}>
            {main}
          </div>
        </div>
    );
  }
  
else{
  
      return (
          <div id="appComponent">
                
                <div className='modal-example' style={{position: 'fixed',display: 'none'}}>
                      <Modal aria-labelledby='modal-label' style={modalStyle}
                        backdropStyle={backdropStyle} show={this.state.showModalToggle} onHide={this.close}>    
                        {modalData}
                      </Modal>
                </div>

            <div id="main" className="home">
              <header id="header" style={{height: '71px'}}>
                  <div className="logo">
                      <Link to={route_to}><img src="./src/ProjectManager/images/logo.png" alt="Bisoft"/></Link>
                  </div>
       <div className="dropdown setting" onMouseLeave={this.mouseLeave}>
                    <button onClick={this.showDropdownSetting} className="dropbtn" style={{outline: 'none'}}><img style={{height: '40px',width: '40px'}} src="images/setting.png" alt="setting"/></button>
                    <div className="dropdown-content-setting" style={{zIndex: '10000',maxWidth: '180px',marginLeft: '-90px',background: '#495355',marginRight: '2px',position: 'fixed'}}>
                     
                     
          <div className="dropdown-content-option" style={{cursor: 'pointer',maxWidth: '140px', display: save_dropdown_styles,background: '#495355',color: 'white', zIndex: '999'}}>
                      <img  onClick={this.openPlotter} style={{padding: '4px',position: 'relative',float: 'left'}} height="24px" width="24px" className="loadingdevices" src="images/actionbar_profiler.png"></img> <a className="savestyle" onClick={this.openPlotter} style={{padding: '4px',color: 'white',width:'140px'}}>Plotter</a>
                     
                    </div>
                    <div className="dropdown-content-option" style={{cursor: 'pointer',maxWidth: '140px', display: save_dropdown_styles,background: '#495355',color: 'white', zIndex: '999'}}>
                      <a className="savestyle" onClick={this.openUpdate} style={{padding: '4px',color: 'white',width:'140px'}}>Update</a>
                      <div className="dropdown-content-update" style={{display:'block',minWidth:'0px'}}>
                         <div className="dropdown-content-option" className="update-style" style={{cursor: 'pointer',maxWidth: '140px', display: save_dropdown_styles,background: '#495355',color: 'white', zIndex: '999',marginLeft:'-140px',display:'none',marginTop:'-25px'}}>
                             <div  onMouseLeave={this.mouseLeave}>
                            <a className="savestyle" onClick={this.openFirmware} style={{padding: '4px',color: 'white',width:'130px'}}>Firmware Update</a>
                            {/*<a className="savestyle" onClick={this.openPictureUpload} style={{padding: '4px',color: 'white',width:'130px'}}>Picture Update</a>*/}
                            </div>
                         </div>
                      </div>
                    </div>

          <div className="dropdown-content-option" style={{cursor: 'pointer',maxWidth: '140px', display: show_dropdown_styles_for_select_bibox,background: '#495355',color: 'white', zIndex: '999'}}>
                        
                        <a className="savestyle" style={{minWidth: '90px',verticalAlign: 'center',position: 'relative',float: 'left', padding: '4px',background: '#495355',color: 'white', zIndex: '999', left: '0',paddingTop: '10px'}}>Logout</a>
                      </div>
        </div>
                  </div> 
                            
                  <div className="dropdown setting" onMouseLeave={this.mouseLeave} style = {{display:save_dropdown_styles}}>
                    <button onClick={this.showDropdownSave} className="dropbtn" style={{outline: 'none'}}><img style={{height: '40px',width: '40px'}} src="images/ic_save.png" alt="setting"/></button>          
                    <div className="dropdown-content-save" style={{zIndex: '10000',maxWidth: '160px',marginLeft: '-30px',marginRight: '5px', position: 'fixed'}}>             
                      <div className="dropdown-content-option" style={{cursor: 'pointer',maxWidth: '140px', display: 'inline-block',background: '#495355',color: 'white', zIndex: '999'}}>
                        <img onClick={this.saveFile} style={{padding: '4px',position: 'relative',float: 'left'}} height="28px" width="28px" className="loadingdevices" src="images/save.png"></img><a className="savestyle" onClick={this.saveFile} style={{padding: '4px',color: 'white',width:'132px'}}>Save</a>
                        
                      </div>
                      <div className="dropdown-content-option" style={{cursor: 'pointer',maxWidth: '140px', display: 'inline-block',background: '#495355',color: 'white', zIndex: '999'}}>
                        <img onClick={this.saveAsFile} style={{padding: '4px',position: 'relative',float: 'left'}} height="28px" width="28px" className="loadingdevices" src="images/saveas.png"></img> <a className="saveasstyle" onClick={this.saveAsFile} style={{padding: '4px',color: 'white',width:'132px'}}>Save As</a>
                       
                      </div>
                      <div className="dropdown-content-option" style={{cursor: 'pointer',maxWidth: '140px', display: 'inline-block',background: '#495355',color: 'white', zIndex: '999'}}>
                        <img onClick={this.openFile} style={{padding: '4px',position: 'relative',float: 'left'}} height="28px" width="28px" className="loadingdevices" src="images/open.png"></img> <a className="openstyle" onClick={this.openFile} style={{padding: '4px',color: 'white',width:'132px'}}>Open</a>
                       
                      </div>
                    </div>
                  </div>
   
                  <div className="setting">
                      <div className="UploadDivision">
                        </div>
                  </div>
      {navTabsDiv}                      
              </header>
            </div>
            <div style={{height: Sizes.mainHeight}}>
              {main}
            </div>
          </div>
      );
    }
    }
    else{
       var btRemoteStyle;
    var save_dropdown_styles = "inline-block";
    var show_dropdown_styles_for_select_bibox = "none";
    var route_to = "/";
    var stateval;
    if(false && sessionStorage.getItem("AppDetails-"+this.props.projId)){
        var localData=JSON.parse(sessionStorage.getItem("AppDetails-"+this.props.projId));
        stateval = localData;
    }else{
        stateval = this.state;
    } 
    if(BUNDLE.BUNDLE_TYPE=="USB"){
       //console.log("usb");
       var bundle_style={
        cursor: 'pointer',
        maxWidth: '140px', 
        display: 'none',
        background: '#495355',
        color: 'white', 
        zIndex: '999'
      }

     }
    else{
      //console.log("ble");
       var bundle_style={
        cursor: 'pointer',
        maxWidth: '140px', 
        display: 'inline-flex',
        background: '#495355',
        color: 'white', 
        zIndex: '999'
      }
    }
     var ble = require('./build_exe_config');
    if(ble.BUNDLE_TYPE=='USB'){
      btRemoteStyle={
        display: 'none'
        
      }
    }
    else{
       btRemoteStyle={
        cursor: 'pointer',
        maxWidth: '140px', 
        display: 'inline-block',
        background: '#495355',
        color: 'white', 
        zIndex: '999'
      }
    }
    //stateval = this.state;
    var currentProjectData=this.props.currentProjectData;
    const {  components, sidebarContents, workspace, logic, logicNew, logicEditor, coverflowActive, height, width } = stateval;
    const biboxes = JSON.parse(localStorage.getItem('biboxes'));
    var currentUrl=window.location.href;
    var currentProjectId=this.props.projId;
    var urlUpdateSave="/project/"+currentProjectId+"/save";
    var urlUpdateSaveAs="/project/"+currentProjectId+"/saveAs";
    var tutorialMode=this.props.tutorialMode;
    //this is to remove tutorial mode from bibox project
    tutorialMode=false;
    var curTab=this.props.curTab;
    // console.log(curTab+'screen: '+this.props.routeParams.screen);
    if(this.props.ExploreProject){
        this.state.ExploreProject=this.props.ExploreProject;
    }
    var main;
    var Modal=Overlay.Modal;
    var navTabsDiv=(<nav id="nav" className="menu">
                  <img src="./src/ProjectManager/images/menu.png" alt="menu" className="toggle-menu"/>
                    <ul>
                        <li><Link to={'App/'+this.props.projId+'/concept'} className={curTab === 'concept' ? 'active' : ''}>CONCEPT</Link></li>
                        <li><Link to={'App/'+this.props.projId+'/assembly'} className={curTab === 'assembly' ? 'active' : ''}>ASSEMBLY</Link></li>
                        <li><Link to={'App/'+this.props.projId+'/logic'} className={curTab === 'logic' ? 'active' : ''}>LOGIC FLOW</Link></li>
                    </ul>
                </nav>);
    if (curTab === 'selectbibox'){
      sessionStorage.removeItem('currentTab');
      show_dropdown_styles_for_select_bibox = save_dropdown_styles;
      save_dropdown_styles = "none";
      route_to = "/";//"bisoft/tutorials";
      navTabsDiv='';  
      main = (
        <SelectBibox biboxes={biboxes} step={this.props.step} tutorialMode={tutorialMode} currentTab={curTab} projId={currentProjectId} app={this} components={components} sidebarContents={sidebarContents}
               coverflowActive={localStorage.getItem("selectbiboxindex")||0} onCoverflowChange={this.changeCoverflowActive}
               select={this.select} remove={this.remove}/>
      );
    } 
    else if (curTab === 'concept') main = (
      <Concept ref='concept' step={this.props.step} msgAt={this.props.msgAt} tutorialMode={tutorialMode} currentTab={curTab} projId={currentProjectId} app={this} components={components} sidebarContents={sidebarContents}
               coverflowActive={coverflowActive} onCoverflowChange={this.changeCoverflowActive}
               select={this.select} remove={this.remove}/>
    );
    else if (curTab === 'assembly') main = (
      <Assembly ref='assembly' step={this.props.step} msgAt={this.props.msgAt} tutorialMode={tutorialMode} currentTab={curTab} projId={currentProjectId} app={this} components={components} sidebarContents={sidebarContents}
          workspace={workspace} update={this.workspaceStateUpdate}
          height={Sizes.mainHeight} width={Sizes.width}/>
    );
    else if (curTab === 'logic') main = (
      <Logic step={this.props.step} tutorialMode={tutorialMode} msgAt={this.props.msgAt} logicNew={logicNew} currentTab={curTab} projId={currentProjectId} app={this} height={Sizes.mainHeight} width={Sizes.width} workspace={workspace} logic={logic}
             logicEditor={logicEditor} update={this.logicStateUpdate}/>
    );
    var modalData;
    if(this.state.uploadModal=='newtabModal'){
        modalData=(<div style={dialogStyle()}>
                      <button style={{backgroundColor: 'transparent',border: 'none',outline: 'none',overflow: 'visible',position: 'relative',marginLeft: '90%',marginTop: '2px',marginBottom: '8px'}} onClick={this.closeModal}>
                          <img src="images/btn_close1.png" style={{height: '24px',width: '24px',borderRadius: '20px', backgroundColor: 'transparent'}}/>
                        </button>
                      <p style={{textAlign: 'center'}}>Please open connectivity app.</p>
                      <div style={{marginLeft: '40%',marginTop: '8px'}}>
                      <button className='YesNobutton' onClick={this.openAppInNewTab} style={{marginRight: '5px'}}>Open</button>
                      </div>
                    </div>);
    }else if(this.state.uploadModal=='downloadModal'){
        modalData=(<div style={dialogStyle()}>
                      <button style={{backgroundColor: 'transparent',border: 'none',outline: 'none',overflow: 'visible',position: 'relative',marginLeft: '90%',marginTop: '2px',marginBottom: '8px'}} onClick={this.closeModal}>
                          <img src="images/btn_close1.png" style={{height: '24px',width: '24px',borderRadius: '20px', backgroundColor: 'transparent'}}/>
                      </button>
                      <p style={{textAlign: 'center'}}>Please download the connectivity app and install it.</p>
                      <div style={{marginLeft: '40%',marginTop: '8px'}}>
                      <button className='YesNobutton' onClick={this.downloadButton} style={{marginRight: '5px'}}><a style={{color: 'white'}} /*href="bisoft.exe"*/ download>Download</a></button>
                      </div>
                    </div>);   
    }else{
        modalData=(<div style={dialogStyle()}>
                      <button style={{backgroundColor: 'transparent',border: 'none',outline: 'none',overflow: 'visible',position: 'relative',marginLeft: '90%',marginTop: '2px',marginBottom: '8px'}} onClick={this.closeModal}>
                          <img src="images/btn_close1.png" style={{height: '24px',width: '24px',borderRadius: '20px', backgroundColor: 'transparent'}}/>
                      </button>
                      <p style={{textAlign: 'center'}}>Uploading to the connected device....</p>
                      <div style={{marginLeft: '40%',marginTop: '8px'}}>
                      <button className='YesNobutton' onClick={this.downloadApp} style={{marginRight: '5px'}}>Okay</button>
                      </div>
                    </div>);
        var Appstate=this;
        if(this.state.showModalToggle){
          setTimeout(function(){
            Appstate.setState({showModalToggle: false});
          }, 2000);
        }  
    }
    if (curTab === 'logic') {
    return (
        <div id="appComponent">
              
              <div className='modal-example' style={{position: 'fixed',display: 'none'}}>
                    <Modal aria-labelledby='modal-label' style={modalStyle}
                      backdropStyle={backdropStyle} show={this.state.showModalToggle} onHide={this.close}>    
                      {modalData}
                    </Modal>
              </div>

          <div id="main" className="home">
            <header id="header" style={{height: '71px'}}>
                <div className="logo">
                    <Link to={route_to}><img src="./src/ProjectManager/images/logo.png" alt="Bisoft"/></Link>
                </div>
     <div className="dropdown setting" onMouseLeave={this.mouseLeave}>
                  <button onClick={this.showDropdownSetting} className="dropbtn" style={{outline: 'none'}}><img style={{height: '40px',width: '40px'}} src="images/setting.png" alt="setting"/></button>
                  <div className="dropdown-content-setting" style={{zIndex: '10000',maxWidth: '180px',marginLeft: '-90px',background: '#495355',marginRight: '2px',position: 'fixed'}}>
                    <div className="dropdown-content-option build_type" style={bundle_style}>
                      <img onClick={this.openAppInNewTab} style={{padding: '4px',position: 'relative',float: 'left'}} height="24px" width="24px" className="loadingdevices" src="images/connectivity.png"></img> <a className="savestyle" onClick={this.openAppInNewTab} style={{ padding: '4px',color: 'white',width:'140px'}}>Connectivity</a>
                     
                    </div>
                    <div className="dropdown-content-option" style={btRemoteStyle}>
                      <img onClick={this.openBTremote} style={{padding: '4px',position: 'relative',float: 'left'}} height="24px" width="24px" className="loadingdevices" src="images/ic_bt_remote_white.png"></img> <a className="savestyle" onClick={this.openBTremote} style={{padding: '4px',color: 'white',width:'140px'}}>BT Remote</a>
                     
                    </div>
        <div className="dropdown-content-option" style={{cursor: 'pointer',maxWidth: '140px', display: 'inline-block',background: '#495355',color: 'white', zIndex: '999'}}>
                      <img onClick={this.openPlotter} style={{padding: '4px',position: 'relative',float: 'left'}} height="24px" width="24px" className="loadingdevices" src="images/actionbar_profiler.png"></img>  <a className="savestyle" onClick={this.openPlotter} style={{padding: '4px',color: 'white',width:'140px'}}>Plotter</a>
                    
                    </div>
                    <div className="dropdown-content-option" style={{cursor: 'pointer',maxWidth: '140px', display: save_dropdown_styles,background: '#495355',color: 'white', zIndex: '999'}}>
                      <a className="savestyle" onClick={this.openUpdate} style={{padding: '4px',color: 'white',width:'140px'}}>Update</a>
                      <div className="dropdown-content-update" style={{display:'block',minWidth:'0px'}}>
                         <div className="dropdown-content-option" className="update-style" style={{cursor: 'pointer',maxWidth: '140px', display: save_dropdown_styles,background: '#495355',color: 'white', zIndex: '999',marginLeft:'-140px',display:'none',marginTop:'-25px'}}>
                             <div  onMouseLeave={this.mouseLeave}>
                            <a className="savestyle" onClick={this.openFirmware} style={{padding: '4px',color: 'white',width:'130px'}}>Firmware Update</a>
                            {/*<a className="savestyle" onClick={this.openPictureUpload} style={{padding: '4px',color: 'white',width:'130px'}}>Picture Update</a>*/}
                            </div>
                         </div>
                      </div>
                    </div>

        </div>
                </div> 
                          
                <div className="dropdown setting" onMouseLeave={this.mouseLeave}>
                  <button onClick={this.showDropdownSave} className="dropbtn" style={{outline: 'none'}}><img style={{height: '40px',width: '40px'}} src="images/ic_save.png" alt="setting"/></button>          
                  <div className="dropdown-content-save" style={{zIndex: '10000',maxWidth: '160px',marginLeft: '-30px',marginRight: '5px', position: 'fixed'}}>             
                    <div className="dropdown-content-option" style={{scursor: 'pointer',maxWidth: '140px', display: 'inline-flex',background: '#495355',color: 'white', zIndex: '999'}}>
                      <img  onClick={this.saveFile} style={{padding: '4px',position: 'relative',float: 'left'}} height="28px" width="28px" className="loadingdevices" src="images/save.png"></img><a className="savestyle" onClick={this.saveFile} style={{padding: '4px',color: 'white',width:"160px"}}>Save</a>
                      
                    </div>
                    <div className="dropdown-content-option" style={{cursor: 'pointer',maxWidth: '140px', display: 'inline-block',background: '#495355',color: 'white', zIndex: '999'}}>
                      <img onClick={this.saveAsFile} style={{padding: '4px',position: 'relative',float: 'left'}} height="28px" width="28px" className="loadingdevices" src="images/saveas.png"></img><a className="saveasstyle" onClick={this.saveAsFile} style={{padding: '4px',color: 'white',width:"160px"}}>Save As</a>
                      
                    </div>
                    <div className="dropdown-content-option" style={{cursor: 'pointer',maxWidth: '140px', display: 'inline-block',background: '#495355',color: 'white', zIndex: '999'}}>
                      <img onClick={this.openFile} style={{padding: '4px',position: 'relative',float: 'left'}} height="28px" width="28px" className="loadingdevices" src="images/open.png"></img> <a className="openstyle" onClick={this.openFile} style={{padding: '4px',color: 'white',width:"160px"}}>Open</a>
                     
                    </div>
                  </div>
                </div>
                
                <div className="setting">
                    <div className="UploadDivision">
                      <a className="uploadButton" title="upload program" onClick={this.uploadToSelectedDevice}><img src="images/upload.png" alt="Upload"/></a>
                    </div>
                </div>
        
    {navTabsDiv}                      
            </header>
          </div>
          <div style={{height: Sizes.mainHeight}}>
            {main}
          </div>
        </div>
    );
  }
  
else{
  
      return (
          <div id="appComponent">
                
                <div className='modal-example' style={{position: 'fixed',display: 'none'}}>
                      <Modal aria-labelledby='modal-label' style={modalStyle}
                        backdropStyle={backdropStyle} show={this.state.showModalToggle} onHide={this.close}>    
                        {modalData}
                      </Modal>
                </div>

            <div id="main" className="home">
              <header id="header" style={{height: '71px'}}>
                  <div className="logo">
                      <Link to={route_to}><img src="./src/ProjectManager/images/logo.png" alt="Bisoft"/></Link>
                  </div>
       <div className="dropdown setting" onMouseLeave={this.mouseLeave}>
                    <button onClick={this.showDropdownSetting} className="dropbtn" style={{outline: 'none'}}><img style={{height: '40px',width: '40px'}} src="images/setting.png" alt="setting"/></button>
                    <div className="dropdown-content-setting" style={{zIndex: '10000',maxWidth: '180px',marginLeft: '-90px',background: '#495355',marginRight: '2px',position: 'fixed'}}>
                      <div className="dropdown-content-option" style={bundle_style}>
                        <img onClick={this.openAppInNewTab}  style={{padding: '4px',position: 'relative',float: 'left'}} height="24px" width="24px" className="loadingdevices" src="images/connectivity.png"></img><a className="savestyle" onClick={this.openAppInNewTab} style={{padding: '4px',color: 'white',width:'140px'}}>Connectivity</a>
                       
                      </div>
                      <div className="dropdown-content-option" style={btRemoteStyle}>
                        <img onClick={this.openBTremote} style={{padding: '4px',position: 'relative',float: 'left'}} height="24px" width="24px" className="loadingdevices" src="images/ic_bt_remote_white.png"></img><a className="savestyle" onClick={this.openBTremote} style={{padding: '4px',color: 'white',width:'140px'}}>BT Remote</a>
                        
                      </div>
          <div className="dropdown-content-option" style={{cursor: 'pointer',maxWidth: '140px', display: save_dropdown_styles,background: '#495355',color: 'white', zIndex: '999'}}>
                      <img  onClick={this.openPlotter} style={{padding: '4px',position: 'relative',float: 'left'}} height="24px" width="24px" className="loadingdevices" src="images/actionbar_profiler.png"></img> <a className="savestyle" onClick={this.openPlotter} style={{padding: '4px',color: 'white',width:'140px'}}>Plotter</a>
                     
                    </div>
                    <div className="dropdown-content-option" style={{cursor: 'pointer',maxWidth: '140px', display: save_dropdown_styles,background: '#495355',color: 'white', zIndex: '999'}}>
                      <a className="savestyle" onClick={this.openUpdate} style={{padding: '4px',color: 'white',width:'140px'}}>Update</a>
                      <div className="dropdown-content-update" style={{display:'block',minWidth:'0px'}}>
                         <div className="dropdown-content-option" className="update-style" style={{cursor: 'pointer',maxWidth: '140px', display: save_dropdown_styles,background: '#495355',color: 'white', zIndex: '999',marginLeft:'-140px',display:'none',marginTop:'-25px'}}>
                             <div  onMouseLeave={this.mouseLeave}>
                            <a className="savestyle" onClick={this.openFirmware} style={{padding: '4px',color: 'white',width:'130px'}}>Firmware Update</a>
                            {/*<a className="savestyle" onClick={this.openPictureUpload} style={{padding: '4px',color: 'white',width:'130px'}}>Picture Update</a>*/}
                            </div>
                         </div>
                      </div>
                    </div>

          <div className="dropdown-content-option" style={{cursor: 'pointer',maxWidth: '140px', display: show_dropdown_styles_for_select_bibox,background: '#495355',color: 'white', zIndex: '999'}}>
                        
                        <a className="savestyle" style={{minWidth: '90px',verticalAlign: 'center',position: 'relative',float: 'left', padding: '4px',background: '#495355',color: 'white', zIndex: '999', left: '0',paddingTop: '10px'}}>Logout</a>
                      </div>
        </div>
                  </div> 
                            
                  <div className="dropdown setting" onMouseLeave={this.mouseLeave} style = {{display:save_dropdown_styles}}>
                    <button onClick={this.showDropdownSave} className="dropbtn" style={{outline: 'none'}}><img style={{height: '40px',width: '40px'}} src="images/ic_save.png" alt="setting"/></button>          
                    <div className="dropdown-content-save" style={{zIndex: '10000',maxWidth: '160px',marginLeft: '-30px',marginRight: '5px', position: 'fixed'}}>             
                      <div className="dropdown-content-option" style={{cursor: 'pointer',maxWidth: '140px', display: 'inline-block',background: '#495355',color: 'white', zIndex: '999'}}>
                        <img onClick={this.saveFile} style={{padding: '4px',position: 'relative',float: 'left'}} height="28px" width="28px" className="loadingdevices" src="images/save.png"></img><a className="savestyle" onClick={this.saveFile} style={{padding: '4px',color: 'white',width:'132px'}}>Save</a>
                        
                      </div>
                      <div className="dropdown-content-option" style={{cursor: 'pointer',maxWidth: '140px', display: 'inline-block',background: '#495355',color: 'white', zIndex: '999'}}>
                        <img onClick={this.saveAsFile} style={{padding: '4px',position: 'relative',float: 'left'}} height="28px" width="28px" className="loadingdevices" src="images/saveas.png"></img> <a className="saveasstyle" onClick={this.saveAsFile} style={{padding: '4px',color: 'white',width:'132px'}}>Save As</a>
                       
                      </div>
                      <div className="dropdown-content-option" style={{cursor: 'pointer',maxWidth: '140px', display: 'inline-block',background: '#495355',color: 'white', zIndex: '999'}}>
                        <img onClick={this.openFile} style={{padding: '4px',position: 'relative',float: 'left'}} height="28px" width="28px" className="loadingdevices" src="images/open.png"></img> <a className="openstyle" onClick={this.openFile} style={{padding: '4px',color: 'white',width:'132px'}}>Open</a>
                       
                      </div>
                    </div>
                  </div>
   
                  <div className="setting">
                      <div className="UploadDivision">
                        </div>
                  </div>
      {navTabsDiv}                      
              </header>
            </div>
            <div style={{height: Sizes.mainHeight}}>
              {main}
            </div>
          </div>
      );
    }
    }
  }
});

module.exports = App;
/* <FileInput className="openstyle" id="file" value="Open" readOnly onChange={this.openFile} type="file" style={{maxWidth: '124px',background: '#495355',color: 'white',zIndex: '999', left: '0'}}/>
*/
