var React = require('react');
var PropTypes = React.PropTypes;
const OnlySlider = require('./OnlySlider');
const InputNumber = require('./InputNumber');

var avoidSliderUpdate = false;

var Slider = React.createClass({
  updateValue: function (value, shouldSliderNotUpdate) {
    console.log("updateValue:"+value+":"+shouldSliderNotUpdate);
    value = parseInt(value);
    if (value === this.props.value) return;
    const {min, max} = this.props;
    if (value > max) value = max;
    else if (value < min) value = min;
    if (shouldSliderNotUpdate) avoidSliderUpdate = true;
    this.props.onChange(value);
  },
  onSliderChange: function(value) {
    this.updateValue(value, true);
  },
  onInputChange: function(value) {
    this.updateValue(value);
  },
  shouldComponentUpdate: function(nextProps, nextState) {
    console.log("next:prev"+nextProps.value+":"+this.props.value);
    if (nextProps.value == this.props.value &&
        nextProps.max == this.props.max &&
        nextProps.min == this.props.min &&
        nextProps.disabled == this.props.disabled){
      console.log('don"t update slider');
          return false;
      }
    else{
      console.log('do update slider');
      return true;
    } 
  },
  render: function() {
    const {value, max, min, disabled} = this.props;
    console.log(this.props);
    const oldAvoidSliderUpdate = avoidSliderUpdate;
    avoidSliderUpdate = false;
    return (
      <div style={{display:'inline-block', width: '100%'}}>
        <table width='100%'>
          <tbody>
            <tr style={{verticalAlign: 'middle'}}>
              <td style={{width: '90%',height: '2px'}}>
                <OnlySlider value={value} onChange={this.onSliderChange}
                  onSlide={this.onSliderChange}
                  changedDueToSlider={oldAvoidSliderUpdate}
                  max={max} min={min} disabled={disabled}/>
              </td>
              <td style={{width: '20%'}}>
                <InputNumber value={value} onChange={this.onInputChange}
                  max={max} min={min} disabled={disabled}/>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

});

module.exports = Slider;
