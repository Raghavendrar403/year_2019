/**
 * This module exports a draggable Component which is drawn in Workspace
 * @module components/logic-new/Card
 */

var React = require('react');
var PropTypes = React.PropTypes;
var ItemTypes = require('./ItemTypes');
var ImageSizes = require('./ImageSizes');
var DragSource = require('react-dnd').DragSource;
var DraggingInfo = require('./DraggingInfo');

const data = require('./data')

var clickStartTimestamp = undefined; // Posible as only one card can be clicked at a particular time

const style={
  position: 'absolute',
  cursor: 'move',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'contain',
  zIndex: 3
};

const cardSource = {
  beginDrag: function(props) {
    DraggingInfo.isDragging = true;
    const { index, type, left, top, connections } = props;
    DraggingInfo.extraCardConnections = connections.map(connection => ({
      to: connection.to, toPort: connection.toPort
    }))
    if (connections[0].to != index) DraggingInfo.alreadyConnected = true;
    props.removeCardConnections(index);
    DraggingInfo.draggingCardOld = index;
    return { index, type, left, top };
  },
  endDrag: () => {
    clickStartTimestamp = undefined;
    DraggingInfo.isDragging = false;
    DraggingInfo.draggingCardOld = -1;
    DraggingInfo.alreadyConnected = false;
    // DraggingInfo.newCardPort = null;
  }
};

var Card = React.createClass({
  checkForLongPress: function() {

    if (!clickStartTimestamp) return;
    else if (Date.now() - clickStartTimestamp > 1000) {
      this.removeCard();
    }
    clickStartTimestamp = undefined;
  },
  showBottomPanel: function(){
      var { nodeSelected, cardState, index } = this.props;
      nodeSelected(cardState,index);
      //makeCurrentNode(cardState,index);
      //this.setState({highlighted: true});
  },
  removeCard: function() {
    const { index } = this.props;
    this.props.removeFromDropspace(index)
  },
  render: function() {
    const { type, left, top, scale, connectDragSource, highlighted, isDragging } = this.props;
    if (isDragging) {
      return null;
    }
    const height = ImageSizes[ItemTypes.CARD][1] * scale-10;
    const width = ImageSizes[ItemTypes.CARD][0] * scale-10;
    var selectedColorBorder;
    if(highlighted==true){
      selectedColorBorder='3px solid rgb(252, 217, 40)';
    }else{
      selectedColorBorder='3px solid white';
    }
    return connectDragSource(
      <div style={{...style, left, top, height, width,
          borderRadius: (height / 2)+5,
          backgroundSize: '50% 50%',
          border: selectedColorBorder,
          backgroundColor: data[type].color,
          backgroundImage: 'url(' + data[type].image + ')',
        }} onClick={this.showBottomPanel}
        onMouseDown={()=>{clickStartTimestamp = Date.now()}}
        onMouseUp={this.checkForLongPress}
        onDoubleClick={this.removeCard}/>
    );
  }
});

module.exports = DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(Card);
