/**
 * This module exports the sidebar card with button to remove component
 * @module components/concept/SidebarCard
 */

var React = require('react');
var PropTypes = React.PropTypes;
var Data = require('../../data.js');
var SidebarCard = React.createClass({
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
  remove: function(_this){
      //()=>this.props.remove(this.props.index)
      if(sessionStorage.getItem("AppDetails-" + _this.props.projId)){
        var prev_data = JSON.parse(sessionStorage.getItem("AppDetails-" + _this.props.projId));
        var type = prev_data.components[prev_data.sidebarContents[_this.props.index]].type;
        if(Object.keys(prev_data.workspace.components).length>0 && prev_data.workspace.components[type] && prev_data.workspace.components[type].length>0){
          for(var i=0; i<prev_data.workspace.components[type].length; i++){
            var port = prev_data.workspace.components[type][i].connectedTo;
            var updated_prog = this.ParseNodeList(prev_data.logic.program,port,type);
            var updated_flow_prog1 = this.ParseNodeList(prev_data.logicNew.cardConnections,port,type);
            var updated_flow_prog2 = this.ParseNodeList(prev_data.logicNew.cards,port,type);
            prev_data.logic.program = updated_prog;
            prev_data.logicNew.cardConnections = updated_flow_prog1;
            prev_data.logicNew.cards = updated_flow_prog2;
            prev_data.PortConnections[port] = null;
          }
          sessionStorage.setItem("AppDetails-" + _this.props.projId,JSON.stringify(prev_data));
          _this.props.appState.PortConnections = prev_data.PortConnections;
          _this.props.appState.logic = prev_data.logic;
          _this.props.appState.logicNew = prev_data.logicNew;
          //_this.props.appState.workspace = prev_data.workspace;
        }
      }
      return _this.props.remove(_this.props.index);
    },
  render: function() {
    var colorofComponent;
    for(var i=0;i<Data.length;i++){
        if(Data[i].name==this.props.name){
          colorofComponent=Data[i].color;
        }
    }
    
    return (
      <div style={{textAlign: 'center', position: 'relative', fontSize: '20', backgroundColor: '#353535',marginBottom: '3px'}}>
        <img style={{position: 'absolute', top: '0px', left: '2px', height: '29px', width: '30px',backgroundColor: 'transparent'}}
             src='images/btn_close1.png'
             onClick={()=>this.remove(this)}/>
     
        <div style={{background: colorofComponent, 
                     height: this.props.height,
                     width: this.props.height-10, 
                     borderRadius: '12px',
                     margin:'0 auto'}}>
            <div style={{
                height: '1px',
            }}/>
            <div style={{
                  backgroundImage: 'url("'+this.props.url+'")',
                  backgroundRepeat: 'no-repeat',
                  height: this.props.height-14,
                  width: this.props.height-24,
                  backgroundPosition: 'center',
                  backgroundSize: 'contain',
                  backgroundColor: 'rgba(245, 244, 244, 0.98)',
                  marginTop: '5%',
                  marginLeft: '5%',
                  marginRight: '5%',
                  marginBottom: '2%',
                  borderRadius: '16px 16px 16px 16px',
                }} />
        </div>

      
      </div>
    );
  }

});

module.exports = SidebarCard;
