var ItemTypes = require('./ItemTypes');
var ImageSizes = require('./ImageSizes');
const data = require('./data');

function portPosition(card, port) {
  var {left, top, type} = card;
  var size = ImageSizes[ItemTypes.CARD][0]/2;
  left += size;
  top += size;
  size += ImageSizes[ItemTypes.PORT_CIRCLE][0]/3 // To make the squares a little more distant
  const ANGLE_TO_SUBTRACT = Math.PI / 2;
  const angle = data[type].ports[port];
  return {
    left: left+size*Math.cos(angle - ANGLE_TO_SUBTRACT),
    top: top+size*Math.sin(angle - ANGLE_TO_SUBTRACT)
  }
}

module.exports = {
  portPosition: portPosition
}
