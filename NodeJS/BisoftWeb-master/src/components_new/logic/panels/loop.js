var React = require('react');
var PropTypes = React.PropTypes;

const InputNumber = require('./helpers/InputNumber');

var LoopPanel = React.createClass({
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
          height: '72px',
        }}>
        Loop for <InputNumber value={state.times || 1} min={1} max={255}
                      onChange={this.onChange}/> times
      </div>
    );
  }

});

module.exports = LoopPanel;
