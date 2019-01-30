/**
 * This module exports the ImageSizes as an object with keys as ItemTypes
 * and values as an array of [width, height]
 * @module components/assembly/ImageSizes
 */

var ItemTypes = require('./ItemTypes');

module.exports = {
  [ItemTypes.COMPONENT]: [100, 100],
  [ItemTypes.BIBOX]: [379, 420],
  [ItemTypes.PORT_CIRCLE]: [10, 10]
}
