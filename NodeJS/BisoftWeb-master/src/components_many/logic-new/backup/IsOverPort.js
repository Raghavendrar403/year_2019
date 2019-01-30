/**
 * This module  is a function that returns the port over which the component is
 * currently, if that port is already not oocupied and of an allowable type or
 * returns false otherwise
 * @module components/assembly/IsOverPort
 */

var ItemTypes = require('./ItemTypes');
var ImageSizes = require('./ImageSizes');

var data = require('./data');
var PortTypes = require('./PortTypes');
const portPosition = require('./helpers').portPosition
const radius = ImageSizes[ItemTypes.CARD][0]/2;
var DraggingInfo = require('./DraggingInfo');

function isInExtraCardConnections(to, toPort, connections) {
  return connections.some(connection => {
    if (connection.to === to && connection.toPort === toPort) return true;
  })
}

// Returns false or the port to which the component is connected
module.exports = function (extraCard, cards) {
  var {to, toPort} = extraCard.connections[0];
  
  cards.some((card, index) => {
    if (card.invalid) return false;
    if (index === extraCard.index) return false;
    return card.connections.some((connection, port) => {
      if (connection.to != index) return false;
      if (isInExtraCardConnections(index, port, extraCard.connections)) return false
      var {left, top} = portPosition(card, port);
      DraggingInfo['existingCard']=card;
      DraggingInfo['extraCard']=extraCard;
      
      /*console.log("left,top,radius "+left+" "+top+" "+radius);*/
      if (Math.pow(left - extraCard.left - radius, 2) +
          Math.pow(top - extraCard.top - radius, 2) <= Math.pow(radius+50,2)) {
          to = index;
          toPort = port;
          return true;
      }
    });
  });
  return {to, toPort};
}
