var React = require('react');

var FileInput = React.createClass({
  getInitialState: function() {
    return {
      value: 'Open',
      styles: {
        parent: {
          position: 'relative',
		  backgroundColor: '#495355',
        cursor: 'pointer'
        },
        file: {
		  position: 'absolute',
          top: 0,
          left: 0,
          opacity: 0,
          width: '100%',
          zIndex: 1,
		  backgroundColor: '#495355',
      cursor: 'pointer'
        },
        text: {
          zIndex: 1,
		  border: 'none',
		  color: 'white',
		  backgroundColor: '#495355',
		  minWidth: '72px',
		  padding: '8px',
		  zIndex: '999',
      maxWidth: '124px',
		  left: '0',
      cursor: 'pointer'
        }
      }
    };
  },

  handleChange: function(e) {
    
    if (this.props.onChange) this.props.onChange(e);
  },

  render: function() {
    return React.DOM.div({
        style: this.state.styles.parent
      },

      // Actual file input
      React.DOM.input({
        type: 'file',
        name: this.props.name,
        className: this.props.className,
        onChange: this.handleChange,
        disabled: this.props.disabled,
        accept: this.props.accept,
        style: this.state.styles.file
      }),
		// Emulated file input
      React.DOM.input({
        type: 'text',
        tabIndex: -1,
        name: this.props.name + '_filename',
        value: this.state.value,
        className: this.props.className,
        onChange: function() {},
        placeholder: this.props.placeholder,
        disabled: this.props.disabled,
        readOnly: true,
        style: this.state.styles.text
      }));
  }
});

module.exports = FileInput;
