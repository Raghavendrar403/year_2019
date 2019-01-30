var React = require('react');
var PropTypes = React.PropTypes;
const Colors = require('../../Colors')

var InputText = React.createClass({
  onChange: function(e) {
    var value = e.target.value;
    const { onChange, min, max, port } = this.props;
    onChange(port, value);
  },
  render: function() {
    const { disabled, value, min, max } = this.props;
    var style = {
      width: '7%',
      display: 'inline-block',
      textAlign: 'center',
      background: '#1A1A1A',
      borderBottom: '0.125em solid #FFF',
      marginRight: '10%',
      marginLeft: '2.5%',
      color: 'white',
      borderTop: '0px!important',
      borderLeft: '0px!important',
      borderRight: '0px!important',
      paddingBottom: '1%',
      outline: 'none',
   
    };
    if (disabled) style.borderBottom = '0.140em solid #B8B8B8';
    return (
      <input maxLength="1" style={style} type='text' value={value} min={min} max={max}
        disabled={disabled} onChange={this.onChange}/>
    );
  }

});

module.exports = InputText;
