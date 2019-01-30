var React = require('react');
var PropTypes = React.PropTypes;

const Checkbox = require('../helpers/Checkbox');
const Switch = require('../helpers/Switch');

const logicVariables = require('../../logicVariables');

var FlagRow = React.createClass({

  render: function() {
    const { assign, value, name, onChange } = this.props;
    return (
      <tr style={{verticalAlign: 'middle', color: '#FFF', borderBottom: '2px solid grey',height: '72px'}}>
        <td style={{padding: '0.5em 0', fontWeight: 'bold'}}>
          <Checkbox checked={assign || false} onChange={(value) => onChange('assign'+name, value)} label={logicVariables[name]}/>
        </td>
        <td/>
        <td colSpan={4}>
          <Switch disabled={!assign} value={value || false} onChange={(value) => onChange('value'+name, value)}
              on='True' off='False'/>
        </td>
      </tr>
    );
  }

});

module.exports = FlagRow;
