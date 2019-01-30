var React = require('react');

const Checkbox = require('../helpers/Checkbox');
const Slider = require('../helpers/Slider');
const SliderRow = React.createClass({
  render: function() {

    const { name, assign, port, value, onChange } = this.props;
    var min = this.props.min || 0;
    var max = this.props.max || 255;
    var outputStyle;
    /*if(port=="A1" || port=="A4") max = 1;
    else if(port=="MOTOR1" || port=="MOTOR2"){
      min=-20;
      max=20;
    }
    else max = this.props.max || 255;*/
    if(name=="DUAL SPLITTER" || name=="SERVO EXTENDER"){
      outputStyle={
        verticalAlign: 'middle', 
        color: '#FFF', 
        borderBottom: '2px solid grey',
        height: '72px',
        display:'none'
      }
    }
    else{
      outputStyle={
        verticalAlign: 'middle', 
        color: '#FFF', 
        borderBottom: '2px solid grey',
        height: '72px',
        }
    }
    return (
      <tr className="hide" style={outputStyle}>
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
