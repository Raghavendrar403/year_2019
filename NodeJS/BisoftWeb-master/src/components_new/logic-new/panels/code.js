var React = require('react');
var PropTypes = React.PropTypes;

const InputNumber = require('./helpers/InputNumber');

var CodePanel = React.createClass({
  onChange: function (value) {
    if (value < 1) value = 1;
    else if (value > 255) value = 255;
    this.props.onChange({times: value});
  },
  render: function() {
    const { state } = this.props;
    return (
      <div style={{
          textAlign: 'center',
          fontWeight: 'bold',
          paddingTop: '0.5em',
        }}>
        Code 
        <textarea rows="4" cols="50">
            
        </textarea>
      </div>
    );
  }

});

module.exports = CodePanel;
