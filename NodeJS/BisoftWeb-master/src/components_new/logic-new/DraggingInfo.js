/**
 * This module stores the dragging info and is replacement for storing it as
 * global variable.
 * @module components/logic-new/DraggingInfo
 * @type {Object}
 * @param {boolean} isDragging Is a drag in progress?
 * @param {?LogicNewCard} draggingCardOld If an old card is being
 *                                                  dragged it contains it.
 * @param {bool} alreadyConnected If an card is alreay connected before drag.
 * @param {?string} newCardPort The new port for the card which is
 *                                   changed after the drag ends.
 */

module.exports = {
  isDragging: false,
  draggingCardOld: -1,
  alreadyConnected: false,
  extraCardConnections: [],
}
