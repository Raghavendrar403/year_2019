/**
 * This module is the main module for assembly tab and contains some functions for manipulation of the workspace object
 * @module components/assembly/
 * @see module:components/assembly/Workspace
 * @see module:components/assembly/CustomDragLayer
 */

var React = require('react');
var PropTypes = React.PropTypes;
var Sidebar = require('./Sidebar');
var Workspace = require('./Workspace');
var CustomDragLayer = require('./CustomDragLayer');
var DragDropContext = require('react-dnd').DragDropContext;
var TouchBackend = require('react-dnd-touch-backend').default;
var Hammer = require('react-hammerjs');
var domtoimage= require('dom-to-image');
var oldDeltaX, oldDeltaY, panning;
var zooming;
var Tutorials = require('../../tutorials/tutorials');
var snap=false;
var html2canvas = require ('../../html2canvas/html2canvas');
var Assembly = React.createClass({
  componentDidMount: function() {
    // Reset panning and pinching variables
    this.panEnd();
    this.pinchEnd();
  },
  /**
   * Remove a component from workspace
   * @param  {WorkspaceComponent} item
   */
  ParseNodeList: function(node,port,type){
    for(var nodeKey in node){
      var obj = node[nodeKey].state;
      if(obj["source"] == port){
        delete node[nodeKey].state["source"];
        delete node[nodeKey].state["value"];
        delete node[nodeKey].state["value2"];
        delete node[nodeKey].state["condition"];
        delete node[nodeKey].state["hour"];
        delete node[nodeKey].state["hour2"];
        delete node[nodeKey].state["minute"];
        delete node[nodeKey].state["minute2"];
      }
      if(node[nodeKey].type == 'output'){
        if(obj["assign"+port]){
          delete node[nodeKey].state["assign"+port];
        }
        if(obj["value"+port]){
          delete node[nodeKey].state["value"+port];
        }
        if(type == "dot_matrix"){
          for(var key in obj){
            if(key.startsWith('dot_matrix')){
              delete node[nodeKey].state[key];
            }
          }
        }
        if(type == "7segment_display"){
          for(var key in obj){
            if(key.includes('valueB') || key.includes('valueC')){
              delete node[nodeKey].state[key];
            }
          }
        }
        
      }
      if(node[nodeKey].subprogram ){
        this.ParseNodeList(node[nodeKey].subprogram,port,type)
      }
    }
    return node;
  },
  removeFromWorkspace: function (item) {
    var AppState = this.props.app.state;
    var projIdFromProps=  this.props.app.props.projId;
    if(sessionStorage.getItem("AppDetails-" + projIdFromProps)){
        var prev_data = JSON.parse(sessionStorage.getItem("AppDetails-" + projIdFromProps));
        var port = item.connectedTo;
        var updated_prog = this.ParseNodeList(prev_data.logic.program,port,item.type);
        var updated_flow_prog1 = this.ParseNodeList(prev_data.logicNew.cardConnections,port,item.type);
        var updated_flow_prog2 = this.ParseNodeList(prev_data.logicNew.cards,port,item.type);
        prev_data.logic.program = updated_prog;
        prev_data.logicNew.cardConnections = updated_flow_prog1;
        prev_data.logicNew.cards = updated_flow_prog2;
        prev_data.PortConnections[item.connectedTo] = null;
        sessionStorage.setItem("AppDetails-" + projIdFromProps,JSON.stringify(prev_data));
        AppState.PortConnections = prev_data.PortConnections;
        AppState.logic = prev_data.logic;
        AppState.logicNew = prev_data.logicNew;
    }
    var {workspace} = this.props;
    workspace.components[item.type].splice(item.index, 1);
    this.props.update(workspace);
    
  },
  /**
   * Pan event handler with throttling
   */
  pan: function(e) {
    if (panning) return;
    panning = true;
    var {workspace} = this.props;
    workspace.offset.left += (e.deltaX - oldDeltaX) / workspace.scale;
    workspace.offset.top += (e.deltaY - oldDeltaY) / workspace.scale;
    oldDeltaX = e.deltaX;
    oldDeltaY = e.deltaY;
    this.props.update(workspace, () => {
      panning = false
    });
  },
  /**
   * Reset pan variables
   */
  panEnd: function() {
    panning = false;
    oldDeltaX = 0;
    oldDeltaY = 0;
  },
  /**
   * Zoom function with throttling
   * @param  {number} scale   The new scale
   * @param  {number} clientX The clientX (center of pinch or cursor position on wheel)
   * @param  {number} clientY The clientY (center of pinch or cursor position on wheel)
   */
  zoom: function(scale, clientX, clientY) {
    if (zooming) return;
    var {workspace, height, width} = this.props;
    if ( (workspace.scale < 0.25 && scale < 1) ||
         (workspace.scale > 2  && scale > 1)    ) return;
    zooming = true;
    clientX -= width * 0.2;
    clientY -= document.body.clientHeight - height;
    // client = (offset + x/y) * scale
    // client of oldx/y = client of newx/y (current mouse position)
    // oldx/y = client / scale - offset
    // (newoffset + oldx/y) * newscale = (oldOffset + oldx/y) * oldscale
    const oldX = clientX / workspace.scale - workspace.offset.left;
    const oldY = clientY / workspace.scale - workspace.offset.top;
    workspace.offset.left = (workspace.offset.left + oldX) / scale - oldX;
    workspace.offset.top = (workspace.offset.top + oldY) / scale - oldY;
    workspace.scale *= scale;
    this.props.update(workspace, () => {
      zooming = false
    });
  },
  /**
   * Pinch Out event handler
   */
  pinchOut: function(e) {
    this.zoom(12/11, e.center.x, e.center.y);
    e.preventDefault();
    return false;
  },
  /**
   * Pinch In event handler
   */
  pinchIn: function(e) {
    this.zoom(11/12, e.center.x, e.center.y);
    e.preventDefault();
    return false;
  },
  /**
   * Reset pinch variables
   */
  pinchEnd: function() {
    zooming = false;
  },
  /**
   * Wheel event handler
   */
  wheel: function(e) {
    const { clientX, clientY, deltaY } = e;
    if (deltaY > 0) this.zoom(5/6, clientX, clientY);
    else this.zoom(6/5, clientX, clientY);
    e.preventDefault();
    return false;
  },
  componentWillUnmount: function(){
    this.screenshotInitiate();
  },
  screenshotInitiate: function(){
    console.log("comp unmount!!");
    var URL,BLOB;
    (function (exports) {
    function urlsToAbsolute(nodeList) {
        if (!nodeList.length) {
            return [];
        }
        var attrName = 'href';
        if (nodeList[0].__proto__ === HTMLImageElement.prototype
        || nodeList[0].__proto__ === HTMLScriptElement.prototype) {
            attrName = 'src';
        }
        nodeList = [].map.call(nodeList, function (el, i) {
            var attr = el.getAttribute(attrName);
            if (!attr) {
                return;
            }
            var absURL = /^(https?|data):/i.test(attr);
            if (absURL) {
                return el;
            } else {
                return el;
            }
        });
        return nodeList;
    }

    function screenshotPage() {
        urlsToAbsolute(document.images);
        urlsToAbsolute(document.querySelectorAll("link[rel='stylesheet']"));
        var screenshot = document.getElementById('assemblyscreenid').cloneNode(true);

        screenshot.getElementsByClassName("assemblySidebar")[0].innerHTML="";
        $(screenshot).find('.assemblySidebar').css("background-color","transparent");
        $(screenshot).find('.assemblySidebar').css("border","none");
        //screenshot.getElementsByClassName("assemblyScreen")[0].style.backgroundImage='';
        $(screenshot).find('.assemblyScreen').css("background-color","black");
        $(screenshot).find('.assemblyScreen').css("background-image","none");

        var b = document.createElement('base');
        b.href = document.location.protocol + '//' + location.host;
        var head = screenshot.querySelector('head');
        // head.insertBefore(b, head.firstChild);
        screenshot.style.pointerEvents = 'none';
        screenshot.style.overflow = 'hidden';
        screenshot.style.webkitUserSelect = 'none';
        screenshot.style.mozUserSelect = 'none';
        screenshot.style.msUserSelect = 'none';
        screenshot.style.oUserSelect = 'none';
        screenshot.style.userSelect = 'none';
        screenshot.dataset.scrollX = window.scrollX;
        screenshot.dataset.scrollY = window.scrollY;
        var script = document.createElement('script');
        script.textContent = '(' + addOnPageLoad_.toString() + ')();';
        // screenshot.querySelector('body').appendChild(script);

        var blob = new Blob([screenshot.outerHTML], {
            type: 'text/html'
        });
        //screenshot.getElementsByClassName("pure-u-1-5")[0].style.display='none';
        URL=screenshot.outerHTML;
        return blob;
    }
    function addOnPageLoad_() {
        window.addEventListener('DOMContentLoaded', function (e) {
            var scrollX = document.documentElement.dataset.scrollX || 0;
            var scrollY = document.documentElement.dataset.scrollY || 0;
            window.scrollTo(scrollX, scrollY);
        });
    }
    function generate() {
        window.URL = window.URL || window.webkitURL;
        BLOB= screenshotPage();
        // window.open(window.URL.createObjectURL(screenshotPage()));
    }
    exports.screenshotPage = screenshotPage;
    exports.generate = generate;
    })(window);
    generate();
    //var div=document.createElement("div");
    // you need to create an empty div element with some id and use that id here.
    var div=document.getElementById('assemblyShot');
    div.innerHTML=URL;
    sessionStorage.setItem("assempblyImageHTML",URL);
    html2canvas(div, {
      onrendered: function(canvas) {
        div.innerHTML="";
        var img = canvas.toDataURL("image/png");
        //console.log(img);
        sessionStorage.setItem("assempblyImageURI",img);
      }
    });
  },
  render: function() {
    snap=true;
    var App=this.props.app;
    return (
      <div>
        <div id="assemblyscreenid" className="pure-g assemblyScreen" style={{width: '100%',height: '100%',overflow: 'hidden',backgroundImage:'url(images/newbisoft-screens-15.png)', backgroundSize:'contain'}}>
        <Tutorials step={this.props.step} projId={this.props.projId} currentTab={this.props.currentTab} tutorialMode={this.props.tutorialMode} app={App}/>
          <div className="pure-u-1-5">
            <Sidebar components={this.props.components} sidebarContents={this.props.sidebarContents}
                removeFromWorkspace={this.removeFromWorkspace}/>
          </div>
          <div id="screenshotid" className="pure-u-4-5">
            <div id="assemblyConnections" style={{
                position: 'relative',
                width: '100%',
                height: '100%',
              }} onWheel={this.wheel}>
              <Hammer onPan={this.pan} onPanEnd={this.panEnd} onPinchIn={this.pinchIn}
                onPinchOut={this.pinchOut} options={{
                   recognizers:{
                      pinch : { enable:true }
                   }
                }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 1
                  }}/>
              </Hammer>
              <Workspace workspace={this.props.workspace} update={this.props.update} appState={App.state}
                height={this.props.height} width={this.props.width*0.8} prop={this.props}
                removeFromWorkspace={this.removeFromWorkspace}/>
            </div>
          </div>
        </div>
        <CustomDragLayer height={this.props.height} width={this.props.width} workspace={this.props.workspace}/>
        <div id="assemblyShot"></div>
      </div>
    );
  }
});

module.exports = DragDropContext(TouchBackend({ enableMouseEvents: true }))(Assembly);
