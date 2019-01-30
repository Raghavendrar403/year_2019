var React = require('react');
var PropTypes = React.PropTypes;
const Colors = require('../../Colors');

var Select = React.createClass({
  onChange: function(e) {
    this.props.onChange(e.target.value);
  },
  render: function() {
    var style = {
      //border: '3px solid ' + this.props.color,
      color: '#000',
      background: '#FFF',
      margin: '0 0.5em',
      padding: '4px',
      ...this.props.style
    };
    if (this.props.disabled) style.background = Colors.disabledgrey;
    return (
      <select onChange={this.onChange} style={style} value={this.props.selected} disabled={this.props.disabled}>
        {this.props.order ? this.props.order.map((value, index) => (
          <option key={index} value={value}>{this.props.options[value] || value}</option>
        )) : Object.keys(this.props.options).map((value, index) => (
          <option key={index} value={value}>{this.props.options[value]}</option>
        ))}
      </select>
    );
  }

});

module.exports = Select;
