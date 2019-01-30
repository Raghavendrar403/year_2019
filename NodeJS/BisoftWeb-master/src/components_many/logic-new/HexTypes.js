const Colors = require('./Colors')

var HexTypes = {
  'start': {color: Colors.green},
  'end': {color: Colors.green},
  'repeat': {color: Colors.green, image: 'end'},
  'output': {color: Colors.blue},
  'wait': {color: Colors.teal},
  'if': {color: Colors.pink},
  'end_if': {color: Colors.pink, name: 'END IF', image: 'end'},
  'loop': {color: Colors.purple},
  'end_loop': {color: Colors.purple, name: 'END LOOP', image: 'end'},
  'hand': {color: Colors.grey, name: ''},
  'active_hand': {color: Colors.yellow, name: '', image: 'hand'},
  'highlighted_hand': {color: Colors.cyan, name: '', image: 'hand'},
  'blank': {color: Colors.white, name: ''},
  'insert': {color: Colors.pink, image: 'launcher'},
  'delete': {color: Colors.purple, image: 'launcher'},
};

Object.keys(HexTypes).map(hextype => {
  var data = HexTypes[hextype];
  if (data.name == undefined) data.name = hextype.toUpperCase();
  const imgPathPrefix = 'images/ic_logicflow_';
  const imgPathPostfix = '.png';
  if (data.image) data.image = imgPathPrefix + data.image + imgPathPostfix;
  else data.image = imgPathPrefix + hextype + imgPathPostfix;
});

HexTypes.blank.image = '';

module.exports = HexTypes;
