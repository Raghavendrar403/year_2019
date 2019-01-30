var React = require('react');
var PropTypes = React.PropTypes;
const Colors = require('../../Colors')

var Input = React.createClass({
  onChange: function(e) {
    var value = e.target.value;
    const { onChange, min, max } = this.props;
    if (value < min) value = min;
    else if (value > max) value = max;
    onChange(value);
  },
  render: function() {
    const { disabled, value, min, max } = this.props;
    var style = {
      width: '5em',
      display: 'inline-block',
      textAlign: 'center',
      background: '#1A1A1A',
      borderBottom: '0.125em solid #FFF',
      marginRight: '0.25em',
      color: 'white',
      borderTop: '0px!important',
      borderLeft: '0px!important',
      borderRight: '0px!important',
      paddingBottom: '1%',
      ...this.props.style
    };
    if (disabled) style.borderBottom = '0.140em solid #B8B8B8';
    return (
      <input style={style} type='number' inputMode='numeric'
        value={value} min={min} max={max}
        disabled={disabled} onChange={this.onChange}/>
    );
  }

});

module.exports = Input;
