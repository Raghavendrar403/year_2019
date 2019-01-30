var React = require('react');
var PropTypes = React.PropTypes;

var EditorPanel = React.createClass({

  render: function() {
    var value=this.props.value;
    //value="Successful compilation";
    var value2="Running...";
    return (
      <div style={{
          textAlign: 'center',
          fontWeight: 'bold',
          paddingTop: '0.5em',
          paddingLeft: '2%'
        }}>
        Property Panel<br/>
        <div id="editor" style={{overflow:"hidden"}}>{value}<br/></div>
      </div>
    );
  }

});

module.exports = EditorPanel;
