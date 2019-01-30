/**
 * This module exports the custom drag layer.
 * This also requires and renders the connections and the port circles
 * Also responsible for updating DraggingInfo.newComponentPort.
 * Also responsible for scrolling sidebar using DraggingInfo.setSidebarScroll.
 * @see module:components/assembly/DraggingInfo
 * @see module:components/assembly/Sidebar
 * @module components/assembly/CustomDragLayer
 */

var React = require('react');
var PropTypes = React.PropTypes;
var ItemTypes = require('./ItemTypes');
var ImageSizes = require('./ImageSizes');
var DragLayer = require('react-dnd').DragLayer;
var DraggingInfo = require('./DraggingInfo');
const IsOverPort = require('./IsOverPort')

var Connections = require('./Connections');
// var IsOverPort = require('./IsOverPort');
const Sizes = require(__base + 'src/helpers/Sizes');
const data = require('./data.js')
var Camera; // This means that the collect function relies on the old Camera object before drag begins
            // but this works as scale or offset cannot be changed when a drag is in progress

var layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%'
};

function getItemStyles(props) {
  var currentOffset = props.currentOffset;
  if (!currentOffset) {
    return {
      display: 'none'
    };
  }

  var x = currentOffset.x;
  var y = currentOffset.y;
  const transform = 'translate(' + x + 'px, ' + y + 'px)';
  return {
    transform: transform,
    WebkitTransform: transform
  };
}

function collect(monitor) {
  var currentOffset;
  if (DraggingInfo.draggingCardOld === -1) {
    const delta = monitor.getDifferenceFromInitialOffset();
    if (delta) {
      currentOffset = monitor.getClientOffset();
      if (currentOffset) {
        currentOffset.x -= (ImageSizes[ItemTypes.CARD][0] * Camera.scale)/2;
        currentOffset.y -= (ImageSizes[ItemTypes.CARD][1] * Camera.scale)/2;
      }
    }
  }
  else currentOffset = monitor.getSourceClientOffset();
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: currentOffset,
  };
}

var CustomDragLayer = React.createClass({
  propTypes: {
    item: PropTypes.object,
    itemType: PropTypes.string,
    currentOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }),
  },
  renderItem: function (itemType, item) {
    if (itemType != ItemTypes.CARD) return;
    const { scale } = this.props.logicNew;
    const { type } = item;
    const height = ImageSizes[ItemTypes.CARD][0] * Camera.scale-10;
    return (<div style={{
              height, width: height,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: '50% 50%',
              border: '3px solid white',
              borderRadius: (height / 2)+5,
              backgroundColor: data[type].color,
              backgroundImage: 'url(' + data[type].image + ')',
            }}/>
    )
  },

  render: function () {
    const item = this.props.item;
    const itemType = this.props.itemType;
    const isDragging = Boolean(DraggingInfo.isDragging && item);
    const { cards } = this.props.logicNew;
    Camera = {
      offset: this.props.logicNew.offset,
      scale: this.props.logicNew.scale,
    }
    
    var extraCard, connectedTo;
    if (this.props.currentOffset && isDragging) {
      var { x, y } = this.props.currentOffset;
      if (itemType === ItemTypes.CARD) {
        extraCard = {
          index: DraggingInfo.draggingCardOld,
          left: (x - this.props.sidebarWidth) / Camera.scale - Camera.offset.left,
          top: (y - Sizes.navHeight) / Camera.scale - Camera.offset.top,
          type: item.type,
          state: {'value': 0},
          connections: DraggingInfo.extraCardConnections

        }
        if (!DraggingInfo.alreadyConnected) {
         
          
          DraggingInfo.extraCardConnections[0] = IsOverPort(extraCard, cards)
          extraCard.connections[0] = DraggingInfo.extraCardConnections[0]
        }
        // if (item.connectedTo)
        //   connectedTo = extraCard.connectedTo = item.connectedTo;
        // else {
        //   connectedTo = IsOverPort(extraCard, bibox) || DraggingInfo.newComponentPort;
        //   if (connectedTo)
        //     extraCard.connectedTo = DraggingInfo.newComponentPort = connectedTo;
        // }
      }
    }
    var zIndex = 3;
    return (
      <div>
        <div style={{
            position: 'absolute',
            top: Sizes.navHeight,
            left: this.props.sidebarWidth,
            height: Sizes.mainHeight,
            width: Sizes.width - this.props.sidebarWidth
          }}>
          <Connections cards={cards} Camera={Camera}
                       extraCard={extraCard}
                       removeConnection={this.props.removeConnection}/>
        </div>
        {isDragging && <div style={{...layerStyles, zIndex}}>
          <div style={getItemStyles(this.props)}>
            {this.renderItem(itemType, item)}
          </div>
        </div>}
      </div>
    );
  }
});

module.exports = DragLayer(collect)(CustomDragLayer);
