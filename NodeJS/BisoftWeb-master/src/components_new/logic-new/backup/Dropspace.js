/**
 * @typedef WorkspaceComponentsData
 * @type object
 * @property {number} top   The top offset
 * @property {number} left   The left offset
 * @property {string} connectedTo   The port to which it is connected. It does not exist if not connected to any port
 */

/**
 * It has keys as component types for eg led
 * @example
 * {
 * 	 "led": [{top: 20, left: 80, connectedTo: 'A1'}, ...], ...
 * }
 * @typedef WorkspaceComponents
 * @type object
 * @property {WorkspaceComponentsData[]} ComponentType An array describing components of "ComponentType"
 */

/**
 * Describes a component in workspace. The last 3 properties may or may not be present.
 * (Different from {@link WorkspaceComponents})
 * @typedef AssemblyComponent
 * @type object
 * @property {string} type Type of the component
 * @property {?number} index Index of component in {@link WorkspaceComponents} if old component
 * @property {?number} left The left offset
 * @property {?number} top  The top offset
 * @property {?string} connectedTo Port connected to
 */

/**
 * This module is the workspace component of assembly tab and contains many functions for manipulation of the workspace object
 * This is a drop target.
 * @module components/assembly/Workspace
 */

var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = React.PropTypes;
var ItemTypes = require('./ItemTypes');
const ImageSizes = require('./ImageSizes');
const data = require('./data');

var DropTarget = require('react-dnd').DropTarget;
var DraggingInfo = require('./DraggingInfo');

var Card = require('./Card');
// var PortConnections = require('./PortConnections');
const workspaceTarget = {
  drop: function (props, monitor, component) {
    const { offset, scale } = props.logicNew;
    const { width, height } = props;
    DraggingInfo.isDragging = false;
    const item = monitor.getItem();
    var currentOffset;
    if (DraggingInfo.draggingCardOld === -1) {
      currentOffset = monitor.getClientOffset();
    }
    else currentOffset = monitor.getSourceClientOffset();
    currentOffset.x -= document.body.clientWidth - width;
    currentOffset.y -= document.body.clientHeight - height;
    currentOffset.x = currentOffset.x / scale - offset.left;
    currentOffset.y = currentOffset.y / scale - offset.top;
    if (DraggingInfo.draggingCardOld === -1) {
      var stateNew={};
      component.newCard(item.type, currentOffset.x, currentOffset.y,stateNew);
    } else {
      var stateOld=props.logicNew.cards[DraggingInfo.draggingCardOld].state;
      component.updateOldCard(DraggingInfo.draggingCardOld, currentOffset.x, currentOffset.y,stateOld);
    }
  }
};

var Workspace = React.createClass({
  getInitialState: function(){
    return {highlightedCard: ''};
  },
  updateConnections: function (index, connections) {
    var { makeCurrentNode } = this.props;
    var { logicNew } = this.props;
    logicNew.cards[index].connections = connections;
    var parentCard=DraggingInfo.existingCard;
    var childCard=DraggingInfo.extraCard;
    var parentCardId=parentCard.cardId;
    var childCardId=childCard.cardId;
    if(!childCardId){
      childCardId=logicNew.cardConnections[index].cardId;
    }
    var ParenttoPort = childCard.connections[0].toPort;
    var p = parentCard.connections[ParenttoPort].toPort;

    logicNew.cardConnections[parentCardId].connections[p].to = childCardId;
    logicNew.cardConnections[parentCardId].connections[p].toPort = 0;
    logicNew.cardConnections[childCardId].connections[0].to = parentCardId;

    connections.map((connection, portIndex) => {
      var otherPort = logicNew.cards[connection.to].connections[connection.toPort]
      otherPort.to = index
      otherPort.toPort = portIndex
    })
    makeCurrentNode(logicNew.cards[index],index);
    this.props.update(logicNew)
  },
  /**
   * Update the position of an old component
   * @param  {number} index The index of the card
   * @param  {number} left  The new left
   * @param  {number} top   The new top
   */
  updateOldCard: function (index, left, top, state) {
    var { logicNew } = this.props;
    this.state.highlightedCard=logicNew.cards[index];
    logicNew.cards[index].top = top;
    logicNew.cards[index].left = left;
    logicNew.cards[index].state = state;
    //logicNew.cards[index].cardId = logicNew.nodeCount;
    this.updateConnections(index, DraggingInfo.extraCardConnections)
    //logicNew.cardConnections[index]=logicNew.cards[index];
    //logicNew.cardConnections[logicNew.nodeCount].nodeIndex=logicNew.nodeCount;
    DraggingInfo.extraCardConnections = [];
    this.props.update(logicNew)
  },
  /**
   * Add a new component to workspace. Also if DraggingInfo.newComponentPort is
   * defined connect the new component to that port.
   * @param  {string} type The type of the component
   * @param  {number} left The left offset
   * @param  {number} top  The top offset
   */
  newCard: function (type, left, top,state) {
    var { logicNew, insertCard } = this.props;
    var index = logicNew.cards.length;
    var connections = DraggingInfo.extraCardConnections.map(connection => {
      if (connection.to == -1) return {to: index, toPort: connection.toPort}
      else return connection;
    })
    var card = {type, left, top, state, invalid: false, cardId: logicNew.nodeCount};
    insertCard(card);
    logicNew.nodeCount=logicNew.nodeCount+1;
    logicNew.cards.push(card); 
    this.state.highlightedCard=card;
    this.updateConnections(index, connections); 
    DraggingInfo.extraCardConnections = [];
    this.props.update(logicNew)
  },
  nodeSelected: function(card,index){
    var { makeCurrentNode} = this.props;
    makeCurrentNode(card,index);
    this.setState({highlightedCard:card});
  },
  render: function() {
    const { connectDropTarget, removeFromDropspace, removeCardConnections } = this.props;
    const { cards, offset, scale } = this.props.logicNew;
    var { makeCurrentNode } = this.props;
    return connectDropTarget(
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: '#A6D1E1',
      }}>
        {cards.map((card, index) => {
          if (card.invalid) return;
          const { left, top, type, connections } = card;
          var high;
          if(this.state.highlightedCard==card){
            high=true;
          }else{
            high=false;
          }
          return (
            <Card key={index} nodeSelected={this.nodeSelected} cardState={card} makeCurrentNode={makeCurrentNode} type={type} highlighted={high} index={index} connections={connections}
                left={(offset.left + left) * scale} top={(offset.top + top) * scale}
                scale={scale} removeFromDropspace={removeFromDropspace}
                removeCardConnections={removeCardConnections}/>
          )}
        )}
      </div>
    );
  }

});

module.exports = DropTarget(ItemTypes.CARD, workspaceTarget, connect => ({
    connectDropTarget: connect.dropTarget()
}))(Workspace);
