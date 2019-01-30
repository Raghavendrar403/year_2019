var React = require('react');
var PropTypes = React.PropTypes;

const Sizes = require('./Sizes');
const Hexagon = require('./Hexagon');
const HexTypes = require('./HexTypes');
const Colors = require('./Colors')
const ArrowConnect = require('./ArrowConnect');

var HexBoard = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return nextProps.drawing.updated;
  },
  render: function() {
    const { drawing, onClick } = this.props;
    return (
        <g transform={'translate(0,' + Sizes.r / 2 + ')'}>
        {drawing.board.map((row, rIndex) => {
          var xoff = 0;
          if (rIndex % 2 == 1) xoff += Sizes.xdiff/2;
          return (
            <g transform={'translate(' + xoff + ',' + (rIndex*Sizes.ydiff) + ')'} key={rIndex}>
              {row.map((cell, cIndex) => {
                return <Hexagon cx={cIndex * Sizes.xdiff} hextype={cell.type}
                                highlighted={cell.highlighted}
                                onClick={cell.onClick ? cell.onClick : ()=>onClick(rIndex, cIndex)}
                                key={cIndex}/>
              })}
            </g>
          )
        })}
        <g>
          {drawing.connections.map((connection, key) =>{
            return (
              <ArrowConnect hex1r={connection.from[0]} hex1c={connection.from[1]}
                            hex2r={connection.to[0]} hex2c={connection.to[1]}
                            color={HexTypes[drawing.board[connection.from[0]][connection.from[1]].type].color}
                            key={key}/>
            )
          })}
        </g>
      </g>
    );
  }

});

module.exports = HexBoard;
