var React = require('react');
const HexTypes = require('../HexTypes');
const Select = require('./helpers/Select')
const Slider = require('./helpers/Slider')
var PropTypes = React.PropTypes;

const componentProps = require(__base + 'src/componentProps');
const PortConnections = require(__base + 'src/components/assembly/PortConnections');
const IOComponents = require('../IOComponents');
const logicVariables = require('../logicVariables');

var IfPanel = React.createClass({
  onChange: function(key, value) {
    const { state, onChange } = this.props;
    state[key] = value;
    onChange(state);
  },
  render: function() {
    const { state, startState } = this.props;
    var sourceOptionsOrder = [], sourceOptions = {};
    Object.keys(PortConnections).forEach((port) => {
      if (!PortConnections[port]) return;
      var type = PortConnections[port].type
      if (IOComponents[type].input) {
        sourceOptionsOrder.push(port);
        sourceOptions[port] = componentProps[type].name + ' \u2192 ' + port;
      }
    });
    sourceOptionsOrder.push('irr');
    sourceOptions.irr = 'IR Remote \u2192 IR';
    Object.keys(startState).forEach((name) => {
      if (!startState[name] || name === 'bmp3') return;
      sourceOptionsOrder.push(name);
      sourceOptions[name] = logicVariables[name];
    })
    sourceOptionsOrder.push('slider');
    sourceOptions.slider = 'BT Slider';
    sourceOptionsOrder.push('remote');
    sourceOptions.remote = 'BT Remote';
    var max = 1024, source = state.source || 'irr';
    if (sourceOptionsOrder.indexOf(source) < 0) source = 'irr';
    if (source === 'irr' || source.startsWith('bic') || source.startsWith('bid')) max = 65535;
    else if (source === 'slider' || source === 'remote') max = 255;
    else if (source.startsWith('bif')) max = 1;
    if (state.value > max) state.value = max;
    return (
      <table width='100%'>
        <tbody>
          <tr>
            <td width='10%'>
              <Select onChange={(value) => this.onChange('source', value)} color={HexTypes['if'].color}
                options={sourceOptions} order={sourceOptionsOrder} selected={source}/>
            </td>
            <td width='10%'>
              <Select onChange={(value) => this.onChange('condition', value)} color={HexTypes['if'].color}
                options={{
                  lt: 'Less than',
                  gt: 'Greater than',
                  eq: 'Equal to',
                  ne: 'Not equal to'
                }} selected={state.condition || 'lt'}/>
            </td>
            <td>
              <Slider value={state.value || 0} onChange={(value) => this.onChange('value', value)} max={max} min={0}/>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

});

module.exports = IfPanel;
