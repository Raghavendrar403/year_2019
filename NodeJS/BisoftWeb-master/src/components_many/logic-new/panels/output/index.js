var React = require('react');

const SliderRow = require('./SliderRow');
const AssignRow = require('./AssignRow');
const FlagRow = require('./FlagRow');
const CountRow = require('./CountRow');
const SwitchesRow = require('./SwitchesRow');

const startStateOrder = ['bid1', 'bid2', 'bid3', 'bif1', 'bif2', 'bif3', 'bic1', 'bic2', 'bic3'];
var SelectOptions, SelectOptionsOrder;

const componentProps = require(__base + 'src/componentProps');
const PortConnections = require(__base + 'src/components/assembly/PortConnections');
const IOComponents = require('../../IOComponents');

const OutputPanel = React.createClass({
  onChange: function(key, value) {
    const { state, onChange } = this.props;
    state[key] = value;
    onChange(state);
  },
  render: function() {
    const { state, startState } = this.props;
    SelectOptionsOrder = ['edt', 'bpr', 'irr', 'btr', 'bts'];
    startStateOrder.forEach((name) => {
      if (startState[name]) SelectOptionsOrder.push(name);
    });
    Object.keys(PortConnections).forEach((port) => {
      if (PortConnections[port]) {
        if (port === 'BC' || port === 'DE') {
          port.split('').forEach((char) => {
            [1,2,3,4].forEach((number) => {
              SelectOptionsOrder.push(char+number);
            })
          })
        } else  if (port === 'MOTOR1') {
          SelectOptionsOrder.push('M1');
          SelectOptionsOrder.push('M2');
        } else  if (port === 'MOTOR2') {
          SelectOptionsOrder.push('M3');
          SelectOptionsOrder.push('M4');
        } else SelectOptionsOrder.push(port);
      }
    })
    return (
      <table width='100%'>
        <tbody>
          {Object.keys(PortConnections).map((port) => {
            if (!PortConnections[port]) return null;
            var type = PortConnections[port].type
            if (IOComponents[type].output) {
              if (port === 'BC' || port === 'DE') return (
                <SwitchesRow name={componentProps[type].name} port={port} state={state}
                  key={port} assign={state['assign'+port]} onChange={this.onChange}/>);
              else return (
                <SliderRow name={componentProps[type].name} port={port} value={state['value'+port]}
                        key={port} assign={state['assign'+port]} onChange={this.onChange}/>)
            } else return null;
          })}
          <SliderRow name='BEEPER' port='Beeper' value={state['valueBeeper']} assign={state['assignBeeper']} onChange={this.onChange} max={65535}/>
          {startState.bmp3 && <SliderRow name='BTMp3' port='BTMp3' value={state['valueBTMp3']} assign={state['assignBTMp3']} onChange={this.onChange} max={65535}/>}
          {startStateOrder.map((name) => {
            if (name.startsWith('bif')) return null;
            if (startState[name])
              return (
                <AssignRow name={name} key={name} assign={state['assign'+name]} value={state['value'+name]}
                  valuenum={state['valuenum'+name]} onChange={this.onChange} SelectOptionsOrder={SelectOptionsOrder}/>
              );
            else return null;
          })}
          <AssignRow name={'btr'} key={'btr'} assign={state['assignbtr']} value={state['valuebtr']}
             valuenum={state['valuenumbtr']} onChange={this.onChange} SelectOptionsOrder={SelectOptionsOrder}/>
          <AssignRow name={'irr'} key={'irr'} assign={state['assignirr']} value={state['valueirr']}
             valuenum={state['valuenumirr']} onChange={this.onChange} SelectOptionsOrder={SelectOptionsOrder}/>
          {startStateOrder.map((name) => {
            if (!name.startsWith('bic')) return null;
            if (startState[name])
            return (
              <CountRow name={name} key={name} assign={state['assignCount'+name]}
                value={state['valueCount'+name]} valueNum={state['valueNumCount'+name]}
                onChange={this.onChange}/>
            );
            else return null;
          })}
          {startStateOrder.map((name) => {
            if (!name.startsWith('bif')) return null;
            if (startState[name])
              return (
                <FlagRow name={name} key={name} assign={state['assign'+name]} value={state['value'+name]}
                  onChange={this.onChange}/>
              );
            else return null;
          })}
        </tbody>
      </table>
    );
  }

});

module.exports = OutputPanel;
