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
      <tr style={{verticalAlign: 'middle', color: '#FFF', borderBottom: '2px solid grey',height: '72px'}}>
        <td style={{padding: '0.5em 0', fontWeight: 'bold'}}>
          <Checkbox checked={assign || false} onChange={(value) => onChange('assign'+name, value)} label='ASSIGN'/>
        </td>
        <td/>
        <td>
          <span style={{
              display: 'inline-block',
              margin: '0',
              border: '3px solid #FFF',
              padding: '0.25em 0',
              backgroundColor: Colors.blueshade,
              width: '90%',
              fontWeight: 'bold',
              textAlign: 'center',
            }}>{logicVariables[name]}</span>
        </td>
        <td style={{textAlign: 'center'}}><span className='comp_lgc_pnl_out_equal' style={{width:'100%', margin:'0px 30px 0px 20px'}}> = </span></td>
        <td>
          <Select disabled={!assign} options={logicVariables} order={SelectOptionsOrder} selected={value}
            onChange={(value) => onChange('value'+name, value)} color='#FFF'
            style={{
              margin: '0 15%',
              color: 'black',
              padding: '0.25em 0',
              fontWeight: 'bold',
              width: '100%',
              background: 'white',
              textAlign: 'center',
            }}/>
        </td>
        <td>
          {(!value || value === 'edt') ? (
            <InputNumber disabled={!assign} value={valuenum || 0} onChange={(value) => onChange('valuenum'+name, value)}
              max={65535} min={0} style={{padding: '0.25em 0',float:'right'}}/>
            ) : null}
        </td>
      </tr>
    );
  }
});

module.exports = AssignRow;
