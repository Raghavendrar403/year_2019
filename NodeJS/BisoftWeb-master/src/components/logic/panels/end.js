var React = require('react');
var PropTypes = React.PropTypes;

var End = React.createClass({

  render: function() {
    const { state, onChange } = this.props;
    return (
      <div style={{
          textAlign: 'center'
        }}>
        <label><input type='radio' onChange={()=>onChange('repeat')} name='logicEndPanelRadio' checked={state === 'repeat'}/> Repeat</label>&nbsp;
        <label><input type='radio' onChange={()=>onChange('end')} name='logicEndPanelRadio' checked={state === 'end'}/> End</label>
      </div>
    );
  }

});

module.exports = End;
