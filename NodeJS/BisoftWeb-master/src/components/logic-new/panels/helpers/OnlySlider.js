var React = require('react');
var PropTypes = React.PropTypes;
const NoUISlider = require('./Nouislider');

var Slider = React.createClass({
  onChange: function (e) {
    this.props.onChange(parseInt(e[0]));
  },
  onSlide: function (e) {
    this.props.onSlide(parseInt(e[0]));
  },
  shouldComponentUpdate: function(nextProps, nextState) {
    if (nextProps.changedDueToSlider) return false;
    else return true;
  },
  render: function() {
    const {value, max, min, disabled} = this.props;
    return (
      <div style={{
          display: 'inline-block',
          width: '86%',
          paddingRight: '10%',
          paddingLeft: '3%',
        }}>
        <NoUISlider range={{min: min, max: max}} start={[value]} connect='lower' onChange={this.onChange} disabled={disabled} onSlide={this.onSlide}/>
    </div>
    );
  }

});

module.exports = Slider;
