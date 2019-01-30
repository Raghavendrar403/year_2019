/**
 * This module is responsible for drawing the connection curves and the port circles
 * and also for highlighting them when a component is being dragged.
 * @module components/assembly/Connections
 */

var React = require('react');
var PropTypes = React.PropTypes;
var ItemTypes = require('./ItemTypes');
var ImageSizes = require('./ImageSizes');
const data = require('./data');
// const PortConnections = require('./PortConnections');
var DraggingInfo = require('./DraggingInfo');

const portPosition = require('./helpers').portPosition

var Curve = React.createClass({
  render: function () {
    const { card1, card2, port1, port2, remove } = this.props;
    var cx1 = card1.left + ImageSizes[ItemTypes.CARD][0]/2,
        cy1 = card1.top + ImageSizes[ItemTypes.CARD][0]/2,
        cx2 = card2.left + ImageSizes[ItemTypes.CARD][0]/2,
        cy2 = card2.top + ImageSizes[ItemTypes.CARD][0]/2;
    const p1 = portPosition(card1, port1);
    const p2 = portPosition(card2, port2);
    return (
      <path d={'M ' + (p1.left) +
                ',' + (p1.top) +
                ' C ' + (p1.left + 3*(p1.left - cx1)) +
                ',' + (p1.top + 3*(p1.top - cy1)) +
                ' ' + (p2.left + 3*(p2.left - cx2)) +
                ',' + (p2.top + 3*(p2.top - cy2)) +
                ' ' + (p2.left) +
                ',' + (p2.top)} onClick={remove}/>
    );
  }
});

var PortCircle = React.createClass({
  render: function () {
    const size = ImageSizes[ItemTypes.PORT_CIRCLE][0]
    return <rect x={this.props.left - size/2} y ={this.props.top - size/2}
                 width={size} height={size}/>
  }
});

var CardPorts = React.createClass({
  render: function () {
    var {left, top, type} = this.props.card;
    var size = ImageSizes[ItemTypes.CARD][0]/2;
    left += size;
    top += size;
    size += ImageSizes[ItemTypes.PORT_CIRCLE][0]/3 // To make the squares a little more distant
    const ANGLE_TO_SUBTRACT = Math.PI / 2;
    return (
      <g>
        {data[type].ports.map((angle, index) => (
          <PortCircle left={left+size*Math.cos(angle - ANGLE_TO_SUBTRACT)}
                      top={top+size*Math.sin(angle - ANGLE_TO_SUBTRACT)} key={index}/>
        ))}
      </g>
    )
  }
});

var Connections = React.createClass({

  render: function() {
    const { cards, extraCard, Camera, removeConnection } = this.props;
    var curves = [];
    var portCircles = [];
    cards.map((card, index) => {
      if (card.invalid) return;
      const { connections } = card;
      connections.map((connection, portIndex) => {
        if (connection.to > index) curves.push(
          <Curve card1={card} card2={cards[connection.to]}
                 port1={portIndex} port2={connection.toPort}
                 remove={() => removeConnection(index, portIndex, connection.to, connection.toPort)}
                 key={curves.length}/>
        );
      });
      if (!(DraggingInfo.isDragging && DraggingInfo.draggingCardOld === index))
        portCircles.push(
          <CardPorts card={card} key={portCircles.length}/>
        );
    });
    if (extraCard) {
      extraCard.connections.map((connection, portIndex) => {
        if (connection.to != DraggingInfo.draggingCardOld) curves.push(
          <Curve card1={extraCard} card2={cards[connection.to]}
                 port1={portIndex} port2={connection.toPort}
                 key={curves.length}/>
        )
      })
      portCircles.push(
        <CardPorts card={extraCard} key={portCircles.length}/>
      )
    }
    return (
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: 2,
      }}>
        <svg height='100%' width='100%'>
          <g transform={'matrix(' +
            (Camera.scale) + ' ' +
            '0 0 ' +
            (Camera.scale) + ' ' +
            (Camera.offset.left * Camera.scale) + ' ' +
            (Camera.offset.top * Camera.scale) +
          ')'}>
            <g stroke='black' strokeWidth='8px' strokeDasharray='' fill='none'>
              {curves}
            </g>
            <g stroke='black' strokeWidth='1px' fill='black'>
              {portCircles}
            </g>
          </g>
        </svg>
      </div>
    );
  }

});

module.exports = Connections;
