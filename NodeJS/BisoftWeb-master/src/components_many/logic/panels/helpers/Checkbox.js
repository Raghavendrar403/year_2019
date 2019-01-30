var React = require('react');
var PropTypes = React.PropTypes;
const Colors = require('../../Colors')

var Checkbox = React.createClass({
  render: function() {
    const { checked, onChange, label, disabled } = this.props;
    var style = {
      width: '1.5em',
      height: '1.5em',
      display: 'inline-block',
      borderRadius: '20px',
      marginRight: '0.40em',
      backgroundColor: '#1A1A1A',
      border: '2px solid #00AAD9'
    };
    if (checked) {
      style.boxShadow = 'inset 0 0 0 0em #FFF';
      style.backgroundColor = '#00aad9';
    }
    return (
      <label style={{display: 'inline-block'}}>
        <input type="checkbox" checked={checked} style={{display: 'none'}}
               onChange={()=>onChange(!checked)} disabled={disabled}/>
        <span style={style}/>
        <span style={{position: 'relative', top: '-0.25em'}}>{label}</span>
      </label>
    );
  }
});

module.exports = Checkbox;
