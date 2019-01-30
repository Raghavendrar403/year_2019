var React = require('react');
var PropTypes = React.PropTypes;
var PureRenderMixin = require('react-addons-pure-render-mixin');
const Sizes = require('./Sizes');

var Arrow = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    const { cx, cy, color, rotated } = this.props;
    return (
      <g transform={
        'translate(' + cx + ',' + cy + ') ' +
        (rotated ? 'rotate(90) ' : '') +
        'translate(-17,-14)'
      } fill={color} stroke='none'>
        <polygon points='0,9 20,9 20,0 34,14 20,28 20,19 0,19'/>
        <polyline stroke='white' strokeWidth='1' fill='none' points='20,0 34,14 20,28'/>
      </g>
    );
  }

});

module.exports = Arrow;
