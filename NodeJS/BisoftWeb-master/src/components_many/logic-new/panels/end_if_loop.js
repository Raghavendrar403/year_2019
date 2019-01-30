var React = require('react');
var PropTypes = React.PropTypes;

var EndIfLoop = React.createClass({

  render: function() {
    return (
      <div style={{
          textAlign: 'center',
          textTransform: 'uppercase',
          fontWeight: 'bold',
          paddingTop: '0.5em',
        }}>
        END OF {this.props.current.substr('end_'.length)}
      </div>
    );
  }

});

module.exports = EndIfLoop;
