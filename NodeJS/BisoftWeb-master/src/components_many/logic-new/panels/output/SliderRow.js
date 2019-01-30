var React = require('react');

const Checkbox = require('../helpers/Checkbox');
const Slider = require('../helpers/Slider');

const SliderRow = React.createClass({
  render: function() {

    const { name, assign, port, value, onChange } = this.props;
    //console.log("slider row render:"+value);
    const min = this.props.min || 0;
    const max = this.props.max || 255;
    return (
      <tr style={{verticalAlign: 'middle', color: '#FFF', borderBottom: '2px solid grey'}}>
        <td style={{padding: '0.5em 0', fontWeight: 'bold'}}>
          <Checkbox checked={assign || false} onChange={(value) => onChange('assign'+port, value)} label={name}/>
        </td>
        <td>
          <span style={{
              fontWeight: 'bold',
              fontSize: '0.9em',
            }}>-{port}</span>
        </td>
        <td colSpan={4} style={{
            width: '80%'
          }}>
          <Slider disabled={!assign} value={value || 0} min={min} max={max} onChange={(value) => onChange('value'+port, value)}/>
        </td>
      </tr>
    );
  }
});

module.exports = SliderRow;
