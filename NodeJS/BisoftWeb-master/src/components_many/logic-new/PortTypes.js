/**
 * This module describes the portTypes of the cards :
 * _4PORT is a card with 4 ports and
 * _2PORT is a card with 2 ports
 * The values correspond to angle in radians (CW) wrt
 * a standard clock's 12 o'clock as 0
 * @module components/logic-new/PortTypes
 */

const PI = Math.PI;

module.exports = {
  _4PORT: [0, PI/4, 3*PI/4, PI],
  _3PORT: [0, PI/2, PI],
  _2PORT: [0, PI],
  _1PORT: [PI],
  _0PORT: [0],
}
