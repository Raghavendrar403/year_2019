/**
 * @typedef Offset
 * @type object
 * @property {number} left The left offset
 * @property {number} top The top offset
 */

/**
 * This module is a function that helps to find an element's offset wrt document
 * @param {HTMLElement} element The element
 * @returns {COffset}
 * @module helpers/cumulativeOffset
 */

module.exports = function(element) {
  var top = 0, left = 0;
  do {
    top += element.offsetTop  || 0;
    left += element.offsetLeft || 0;
    element = element.offsetParent;
  } while(element);

  return {
    top: top,
    left: left
  };
};
