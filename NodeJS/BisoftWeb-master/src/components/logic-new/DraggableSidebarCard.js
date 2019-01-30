/**
 * This module exports the sidebar card in which the image is draggable
 * @module components/assembly/DraggableSideCard
 */

var React = require('react');
var PropTypes = React.PropTypes;
var ItemTypes = require('./ItemTypes');
var DragSource = require('react-dnd').DragSource;
var DraggingInfo = require('./DraggingInfo');
const data = require('./data')

const cardSource = {
  beginDrag: function(props) {
    DraggingInfo.isDragging = true;
    DraggingInfo.extraCardConnections = data[props.type].ports.map((port, index) => ({
      to: -1, toPort: index
    }))
    return {type: props.type};
  },
  endDrag: () => {
    DraggingInfo.isDragging = false;
    DraggingInfo.newComponentPort = null;
  }
};

var DraggableSideCard = DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(React.createClass({
  render: function () {
    return this.props.connectDragSource(
      <div style={{
          backgroundColor: this.props.color,
          backgroundImage: 'url(' + this.props.url + ')',
          height: this.props.height+7,
          width: this.props.height+7,
          borderRadius: (this.props.height / 2)+6,
          border: '3px solid white',
          margin: (this.props.height / 4) + ' auto',
          backgroundSize: '50% 50%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}/>
    )
  }
}))

module.exports = DraggableSideCard;
