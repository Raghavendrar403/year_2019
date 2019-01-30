var React = require('react');
var PropTypes = React.PropTypes;

const Colors = require('./Colors');
const HexTypes = require('./HexTypes');

const Sizes = {
  Button: 30,
  Border: 5,
  OneRow: 68,
};

const Button = React.createClass({
  render: function() {
    return (<div onClick={this.props.onClick} style={{
        position: 'absolute',
        right: '5%',
        padding: 5,
        backgroundColor: '#00AAD9'/*this.props.color*/,
        top: -Sizes.Button+5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        cursor: 'pointer',
        width: '50px',
        height: '20px'
      }}>
      <div style={{
          backgroundImage: 'url(images/bottompanel.png)',
          backgroundSize: 'contain',
          height: Sizes.Button - 10,
          width: Sizes.Button + 20,
        }}/>
    </div>);
  }
});

var BottomPanel = React.createClass({
  render: function() {
    const {value, show, toggle, current,PortConnections, state, onChange} = this.props;
    var Panel = require('./panels/')(current);
    var Color;
    if (show === 'none') Color = Colors.white;
    else if (current === 'editorPanel') Color = Colors.blueshade;
    else Color = HexTypes[current].color;
    var up, height;
    {/*if (show === 'border') {up = 0; height = Sizes.OneRow;}*/}
    if (show === 'border') {up = 0; height = 0;}
    else if (show === 'none') {up = -(Sizes.Border+Sizes.Button); height = 0;}
    else {up = 0; height = '50%';}
    var startState = null;
    if (current === 'output' || current === 'if') startState = this.props.startState;
    return (
      <div style={{
        position: 'fixed',
        bottom: up,
        left: 0,
        width: '100%',
        height: height,
        backgroundColor: '#1a1a1a',
        color: '#FFF',
        zIndex: 9999
      }}>
        <Button color={Color} onClick={toggle}/>
        <div style={{
            width: '100%',
            backgroundColor: '#00AAD9'/*Color*/,
            height: Sizes.Border+2,
          }}/>
        <div className="bottomPanel" style={{
            height: '100%',
            overflowY: 'auto',
            padding: Sizes.Border,
          }}>
          <Panel value={value} PortConnections={PortConnections} state={state} onChange={onChange} 
          current={current} startState={startState} bottomPanelDeleteKey={this.props.bottomPanelDeleteKey}/>
        <div style={{height: Sizes.Border}}/>
        </div>
      </div>
    );
  }

});

module.exports = BottomPanel;
