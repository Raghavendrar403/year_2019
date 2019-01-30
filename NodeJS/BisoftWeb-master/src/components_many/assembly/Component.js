/**
 * This module exports a draggable Component which is drawn in Workspace
 * @module components/assembly/Component
 */

var React = require('react');
var PropTypes = React.PropTypes;
var ItemTypes = require('./ItemTypes');
var ImageSizes = require('./ImageSizes');
var DragSource = require('react-dnd').DragSource;
var DraggingInfo = require('./DraggingInfo');

var clickStartTimestamp = undefined; // Posible as only one component can be clicked at a particular time

const style={
  position: 'absolute',
  cursor: 'move',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'contain',
  zIndex: 3
};

const componentSource = {
  beginDrag: function(props) {
    DraggingInfo.isDragging = true;
    const { type, index, left, top, connectedTo } = props;
    props.removeConnection({type, index});
    DraggingInfo.newComponentPort = connectedTo;
    DraggingInfo.draggingComponentOld = {type, index};
    return { type, index, left, top, connectedTo };
  },
  endDrag: () => {
    clickStartTimestamp = undefined;
    DraggingInfo.isDragging = false;
    DraggingInfo.draggingComponentOld = null;
    DraggingInfo.newComponentPort = null;
  }
};

var Component = React.createClass({
  checkForLongPress: function() {
    if (!clickStartTimestamp) return;
    else if (Date.now() - clickStartTimestamp > 1000) {
      this.removeComponent();
    }
    clickStartTimestamp = undefined;
  },
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
  removeComponent: function() {
      const { type, index } = this.props;
      var prop = this.props.prop;
      if(sessionStorage.getItem("AppDetails-" + prop.projId)){
        var prev_data = JSON.parse(sessionStorage.getItem("AppDetails-" + prop.projId));
        var port = this.props.connectedTo;
        var updated_prog = this.ParseNodeList(prev_data.logic.program,port,type);
        var updated_flow_prog1 = this.ParseNodeList(prev_data.logicNew.cardConnections,port,type);
        var updated_flow_prog2 = this.ParseNodeList(prev_data.logicNew.cards,port,type);
        prev_data.logic.program = updated_prog;
        prev_data.logicNew.cardConnections = updated_flow_prog1;
        prev_data.logicNew.cards = updated_flow_prog2;
        prev_data.PortConnections[port] = null;
        sessionStorage.setItem("AppDetails-" + prop.projId,JSON.stringify(prev_data));
        this.props.appState.PortConnections = prev_data.PortConnections;
        this.props.appState.logic = prev_data.logic;
        this.props.appState.logicNew = prev_data.logicNew;
      }
      this.props.removeFromWorkspace({type, index});
  },
  render: function() {
      const { type, left, top, scale, connectDragSource, isDragging, children } = this.props;
      if (isDragging) {
        return null;
      }

      const height = ImageSizes[ItemTypes.COMPONENT][1] * scale;
      const width = ImageSizes[ItemTypes.COMPONENT][0] * scale;

      return connectDragSource(
        <div style={{ ...style, left, top, backgroundImage: 'url(images/component_' + type + '.png)', height, width}}
          onMouseDown={()=>{clickStartTimestamp = Date.now()}}
          onMouseUp={this.checkForLongPress} onDoubleClick={this.removeComponent}/>
      );
    }

});

module.exports = DragSource(ItemTypes.COMPONENT, componentSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(Component);
