var React = require('react');
var PropTypes = React.PropTypes;
var PureRenderMixin = require('react-addons-pure-render-mixin');

const Sizes = require('./Sizes');
const Arrow = require('./Arrow');

var ArrowConnect = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    const { hex1r, hex1c, hex2r, hex2c, color } = this.props;
    var list = [];
    if (hex1r === hex2r) {
      // Its guaranteed that hex1c < hex2c
      var cx = (hex1c+1)*Sizes.xdiff + Sizes.r*0.1*Math.sqrt(3)/2;
      const cy = hex1r*Sizes.ydiff;
      for (let i = 0; i <= 3*(hex2c - hex1c - 1); cx += 34, i++)
        list.push(<Arrow cx={cx} cy={cy} color={color} key={i}/>)
    } else if (hex1c == hex2c) {
      var cy = hex1r*Sizes.ydiff;
      const maxy = (hex2r-1)*Sizes.ydiff, cx=(hex1c+0.5)*Sizes.xdiff;
      for (let i = 0; cy <= maxy; cy += 34, i++)
        list.push(<Arrow cx={cx} cy={cy+51} color={color} rotated key={i}/>)
    } else console.log('Error in ArrowConnect : Passed wrong/diagonal props');
    return (
      <g>
        {list}
      </g>
    )
  }

});

module.exports = ArrowConnect;
