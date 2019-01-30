var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = React.PropTypes;

const Colors = require('./Colors');
const Sizes = require('./Sizes');
const HexTypes = require('./HexTypes');
var Hexagon = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    const { onClick, hextype, highlighted } = this.props;
    const { nonClick, nhextype, nhighlighted } = nextProps;
    if (nonClick || onClick) return true;
    else if (hextype !== nhextype || highliighted != nhighlighted) return true;
    return false;
  },
  componentDidMount: function() {
    const children = ReactDOM.findDOMNode(this).firstChild.children;
    for (var i = 0; i < children.length; i++)
      children[i].setAttribute('stroke-linejoin', 'round');
  },
  render: function() {
    var points = [], innerpoints = [], degree = 0;
    const { cx, onClick, hextype, highlighted } = this.props;
    const r = Sizes.r;
    for (degree = 0; degree < 360; degree += 60) {
      points.push( (cx + r * 0.8 * Math.sin((Math.PI * degree) / 180)) + ',' +
                   (r * 0.8 * Math.cos((Math.PI * degree) / 180)));
      innerpoints.push( (cx + r * 0.8 * 0.9 * Math.sin((Math.PI * degree) / 180)) + ',' +
                        (r * 0.8 * 0.9 * Math.cos((Math.PI * degree) / 180)));
      
    }
    var classNamevar='';
    if(highlighted)
      classNamevar="activeHex";
    return (
      <g onClick={onClick}>
     
        <g>
         <polygon className={classNamevar} points={points.join(' ')} strokeWidth={r * 0.4}
            stroke={highlighted ? Colors.flash_yellow : Colors.white}
            fill={highlighted ? Colors.flash_yellow : Colors.white}/>
          <polygon points={innerpoints.join(' ')} strokeWidth={r * 0.4 * 0.9}
            stroke={HexTypes[hextype].color} fill={HexTypes[hextype].color}/>
        </g>

        <image xlinkHref={HexTypes[hextype].image} x={cx - r/3} y={(-r/3)-6} width={2*r/3} height={2*r/3}
               style={{pointerEvents: 'none'}}/>
        <text x={cx} y={r/3 + r/8 + r/12} fontSize={r/4} textAnchor='middle' style={{
          letterSpacing: '-0.05em',
        }} fill='white'>
          {HexTypes[hextype].name}
        </text>
      </g>
       
    );
  }

});

module.exports = Hexagon;
