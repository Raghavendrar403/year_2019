/**
 * This module exports a draggable Bibox which is drawn in Workspace
 * @module components/assembly/Bibox
 */

var React = require('react');
var PropTypes = React.PropTypes;
var ItemTypes = require('./ItemTypes');
var ImageSizes = require('./ImageSizes');

var DragSource = require('react-dnd').DragSource;
var DraggingInfo = require('./DraggingInfo');

var starData = localStorage.getItem('biboxTypes');
var biboxImg;
if(starData=="*STA#"){
      biboxImg = 'url(images/starling.png)'
}
else if(starData=="*HOR#"){
      biboxImg = 'url(images/hornbill.png)';
}
else{
       biboxImg = 'url(images/hornbill.png)';
}
const style={
  position: 'absolute',
  cursor: 'move',
  backgroundImage:biboxImg,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'contain',
  maxWidth:'100%',
  height:'auto',
  width:'auto',
  zIndex: 1,
  
};

const biboxSource = {
  beginDrag: function(props) {
    DraggingInfo.isDragging = true;
    const { left, top } = props;
    return { left, top };
  },
  endDrag: () => DraggingInfo.isDragging = false
};

var Bibox = React.createClass({

  render: function() {
      const { left, top, scale, connectDragSource, isDragging, workspaceConnect } = this.props;
      if (isDragging) {
        return null;
      }

      const height = ImageSizes[ItemTypes.BIBOX][1] * scale;
      const width = ImageSizes[ItemTypes.BIBOX][0] * scale;

      return connectDragSource(
        <div style={{ ...style, left, top, height, width }}/>
      );
    }

});

module.exports = DragSource(ItemTypes.BIBOX, biboxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(Bibox);
