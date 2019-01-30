var React = require('react');

const Select = require('../helpers/Select');
const Checkbox = require('../helpers/Checkbox');
const InputNumber = require('../helpers/InputNumber');
const Colors = require('../../Colors');

const logicVariables = require('../../logicVariables');

const AssignRow = React.createClass({
  render: function() {
    const { name, assign, value, valuenum, onChange, SelectOptionsOrder } = this.props;
    return (
      <tr style={{verticalAlign: 'middle', color: '#FFF', borderBottom: '2px solid grey'}}>
        <td style={{padding: '0.5em 0', fontWeight: 'bold'}}>
          <Checkbox checked={assign || false} onChange={(value) => onChange('assign'+name, value)} label='ASSIGN'/>
        </td>
        <td/>
        <td>
          <span style={{
              display: 'inline-block',
              margin: '0 5%',
              border: '3px solid #FFF',
              padding: '0.25em 0',
              backgroundColor: Colors.blueshade,
              width: '90%',
              fontWeight: 'bold',
              textAlign: 'center',
            }}>{logicVariables[name]}</span>
        </td>
        <td style={{textAlign: 'center'}}> = </td>
        <td>
          <Select disabled={!assign} options={logicVariables} order={SelectOptionsOrder}
            onChange={(value) => onChange('value'+name, value)} color='#FFF'
            style={{
              margin: '0 5%',
              color: 'black',
              padding: '0.25em 0',
              fontWeight: 'bold',
              width: '90%',
              background: 'white',
              textAlign: 'center',
            }}/>
        </td>
        <td>
          {(!value || value === 'edt') ? (
            <InputNumber disabled={!assign} value={valuenum || 0} onChange={(value) => onChange('valuenum'+name, value)}
              max={255} min={0} style={{padding: '0.25em 0', border: '3px solid #FFF'}}/>
            ) : null}
        </td>
      </tr>
    );
  }
});

module.exports = AssignRow;
