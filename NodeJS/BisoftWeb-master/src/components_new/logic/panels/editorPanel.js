var React = require('react');
var PropTypes = React.PropTypes;
var socket;
var updateConsole;
var consoleLog;
var gcc_status;
var update=function(log){console.log(log);};

var EditorPanel = React.createClass({
  getInitialState:function(){
    return{
       gcc_status:""
    };
  },
  logicEditorPanelUpdate:function(gcc){
    gcc_status = gcc;
    //console.log("logic editor panel update from gcc_status",gcc_status);
     this.setState({
        gcc_status:gcc_status
      })
  },
  componentDidMount:function(){
    this.props.state.logicEditorPanelUpdate=this.logicEditorPanelUpdate;
    //console.log(this.state.logicEditorPanelUpdate);
    
  },
 
  
  render: function() {
    var value=this.props.value;
    var value2="Running...";
    return (
      <div style={{
          textAlign: 'center',
          fontWeight: 'bold',
          paddingTop: '0.5em',
          paddingLeft: '2%'
        }}>
        EditorPanel<br/>
        <br/><br/>
        <div id="editor" style={{overflow:"hidden"}}>{value}<br/></div>
        <p style={{textAlign:"left",fontWeight:'normal',paddingLeft:'0%',fontSize:'14px', wordBreak: 'break-all',width:'85%'}}>{this.state.gcc_status}</p>
      </div>
    );
  }

});

module.exports = EditorPanel;
