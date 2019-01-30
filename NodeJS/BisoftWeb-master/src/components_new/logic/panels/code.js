var React = require('react');
var PropTypes = React.PropTypes;

const InputNumber = require('./helpers/InputNumber');

var CodePanel = React.createClass({
  getInitialState: function() {
    const { state, onChange } = this.props;
    state['code']='';
    onChange(state);
    return{state};
  },
  onChange: function (value) {
    const { state, onChange } = this.props;
    var code= document.getElementsByTagName('textarea')[0].value;
    state['code'] = code;
    onChange(state);
  },
  render: function() {
    const { state } = this.props;
    return (
      <div style={{
          textAlign: 'center',
          fontWeight: 'bold',
          paddingTop: '0.5em',
          color: 'black',
          overflowY: 'auto'
        }}>
        <textarea onChange={(value) => this.onChange('code', value)} rows="8" cols="50">
        </textarea>
      </div>
    );
  }

});

module.exports = CodePanel;
