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

var Connections = require('./Connections');
var IsOverPort = require('./IsOverPort');
const Sizes = require(__base + 'src/helpers/Sizes');

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
  if (monitor.getItemType() === ItemTypes.COMPONENT && !DraggingInfo.draggingComponentOld) {
    const delta = monitor.getDifferenceFromInitialOffset();
    if (delta) {
      if (delta.x > 20) { // Drag
        currentOffset = monitor.getClientOffset();
        if (currentOffset) {
          currentOffset.x -= (ImageSizes[ItemTypes.COMPONENT][0] * Camera.scale)/2;
          currentOffset.y -= (ImageSizes[ItemTypes.COMPONENT][1] * Camera.scale)/2;
        }
      } else if (!DraggingInfo.scrollingSidebar) { // Scroll
        DraggingInfo.scrollingSidebar = true; // Throttling
        DraggingInfo.setSidebarScroll(delta.y, () => {
          DraggingInfo.scrollingSidebar = false
          DraggingInfo.sidebarOldOffset = delta.y;
        });
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

  renderItem: function (type, item) {
    var imageUrl;
    var biboxType = localStorage.getItem("selectbibox");
    var selectedBiboxSplit = biboxType.split(';');
    console.log('selectedBibox',selectedBiboxSplit);
    var selectedBibox = selectedBiboxSplit[0];
    if(selectedBibox=="BIBOX Starling"){
      imageUrl ='images/starling.png';
    }
    else{
      imageUrl ='images/hornbill.png';
    }  
    var url;
    const { scale } = this.props.workspace;
    if (type === ItemTypes.BIBOX) url =imageUrl;
    else url = 'images/component_' + item.type + '.png';
    return <img src={url} width={ImageSizes[type][0] * scale} height={ImageSizes[type][1] * scale} />;
  },

  render: function () {
    const item = this.props.item;
    const itemType = this.props.itemType;
    const isDragging = Boolean(DraggingInfo.isDragging && item);
    const { components } = this.props.workspace;
    const { left, top } = this.props.workspace.bibox;
    Camera = {
      offset: this.props.workspace.offset,
      scale: this.props.workspace.scale,
    }

    var bibox = {
      left: left,
      top: top
    }
    var extraComponent, connectedTo;
    if (this.props.currentOffset && isDragging) {
      var { x, y } = this.props.currentOffset;
      if (itemType === ItemTypes.BIBOX) {
        bibox.left = (x - Sizes.sidebarWidth) / Camera.scale - Camera.offset.left;
        bibox.top = (y - Sizes.navHeight) / Camera.scale - Camera.offset.top;
      } else if (itemType === ItemTypes.COMPONENT) {
        extraComponent = {
          left: (x - Sizes.sidebarWidth) / Camera.scale - Camera.offset.left,
          top: (y - Sizes.navHeight) / Camera.scale - Camera.offset.top,
          type: item.type
        }
        if (item.connectedTo)
          connectedTo = extraComponent.connectedTo = item.connectedTo;
        else {
          connectedTo = IsOverPort(extraComponent, bibox, components) || DraggingInfo.newComponentPort;
          if (connectedTo)
            extraComponent.connectedTo = DraggingInfo.newComponentPort = connectedTo;
        }
      }
    }

    var zIndex;
    if (itemType === ItemTypes.BIBOX) zIndex = 1;
    else zIndex = 3;

    return (
      <div>
        <div style={{
            position: 'absolute',
            top: Sizes.navHeight,
            left: Sizes.sidebarWidth,
            height: Sizes.mainHeight,
            width: Sizes.mainWidth
          }}>
          <Connections bibox={bibox} components={components} Camera={Camera}
            extraComponent={itemType === ItemTypes.COMPONENT ? extraComponent : null}/>
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
