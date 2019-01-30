var React = require('react');
var PropTypes = React.PropTypes;

const Checkbox = require('../helpers/Checkbox');
const InputNumber = require('../helpers/InputNumber');
const Switch = require('../helpers/Switch');

const logicVariables = require('../../logicVariables');

var CountRow = React.createClass({

  onSwitchStateChanged: function(key,value) {
    console.log('onSwitchStateChanged',key,value);
    this.props.onChange('assignCount'+key, value);
    if(value){
      this.props.onChange('valueNumCount'+key, '1');
    }
  },
  
  render: function() {
    const { assign, value, valueNum, name, onChange } = this.props;
    return (
      <tr style={{verticalAlign: 'middle', color: '#FFF', borderBottom: '2px solid grey',height: '72px'}}>
        <td style={{padding: '0.5em 0', fontWeight: 'bold'}}>
          <Checkbox checked={assign || false} onChange={(value) => this.onSwitchStateChanged(name, value)} label={logicVariables[name].replace('Counter', 'Count')}/>
        </td>
        <td/>
        <td colSpan={3}>
          <Switch disabled={!assign} value={value || false} onChange={(value) => onChange('valueCount'+name, value)}
              on='Add (+)' off='Sub (-)'/>
        </td>
        <td>
          <InputNumber disabled={!assign} value={valueNum || 1} min={0} max={255}
            style={{padding: '0.25em 0', border: '0.25em solid #FFF',float:'right'}}
            onChange={(value) => onChange('valueNumCount'+name, value)}/>
        </td>
      </tr>
    );
  }

});

module.exports = CountRow;
