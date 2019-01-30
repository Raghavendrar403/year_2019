var React = require('react');
var PropTypes = React.PropTypes;

const Colors = require('./Colors');
const HexTypes = require('./HexTypes');

const Sizes = {
  Button: 30,
  Border: 5,
  OneRow: 45,
};

const Button = React.createClass({
  render: function() {
    var panelButtonRight=this.props.panelButtonRight;
    var Panelstyle;
    if((this.props.show=='border')||(this.props.show=='none')){
        Panelstyle={
            position: 'absolute',
            right: '100%',
            padding: 3,
            backgroundColor: '#00AAD9',
            top: '70%',
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
            cursor: 'pointer', 
        }
    }else{
        Panelstyle={
            position: 'absolute', 
            padding: 3,
            backgroundColor: '#00AAD9',
            top: '70%',
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
            cursor: 'pointer', 
        }
    }
    return (<div onClick={this.props.onClick} style={Panelstyle}>
      <div style={{
          backgroundImage: 'url(images/sidepanel.png)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          height: Sizes.Button + 22,
          width: Sizes.Button - 12,
        }}/>
    </div>);
  }
});

var RightPanel = React.createClass({
  render: function() {
    const {value, show, toggle, current, state, onChange} = this.props;
    var Panel = require('./panels/')(current);
    var Color;
    if (show === 'none') Color = Colors.white;
    else if (current === 'editorPanel') Color = Colors.blueshade;
    else Color = HexTypes[current].color;
    var up, height,width,panelButtonRight;
    if (show === 'border') {up = 0; width = Sizes.OneRow;panelButtonRight = '100%';}
    else if (show === 'none') {up = -(Sizes.Border+Sizes.Button); width = 0;panelButtonRight = '100%';}
    else {up = 0; width = '30%';panelButtonRight = '93%';}
    var startState = null;
    if (current === 'output' || current === 'if') startState = this.props.startState;
    return (
      <div className="completePanel" style={{
        position: 'fixed',
        right: up-35,
        bottom: 0,
        width: width,
        height: '80%',
        backgroundColor: '#1a1a1a',
        color: '#FFF',
        zIndex: 9999
      }}>
        <Button show={show} panelButtonRight={panelButtonRight} color={Color} onClick={toggle}/>
        <div style={{
            width: Sizes.Border,
            backgroundColor: Color,
          }}/>
        <div className="bottomPanel" style={{
            height: '100%',
            padding: Sizes.Border,
            borderLeft: '5px solid #00AAD9',  
          }}>
          <Panel value={value} state={state} onChange={onChange} current={current} startState={startState}/>
        <div style={{height: Sizes.Border}}/>
        </div>
      </div>
    );
  }

});

module.exports = RightPanel;
