const Colors = require('./Colors')

var HexTypes = {
  '': {color: Colors.blue},
  'start': {color: Colors.black},
  'end': {color: Colors.black},
  'repeat': {color: Colors.black, image: 'end'},
  'output': {color: Colors.green},
  'wait': {color: Colors.violet},
  'if': {color: Colors.yellow},
  'code': {color: '#883902' },
  'end_if': {color: Colors.yellow, name: 'END IF', image: 'end'},
  'loop': {color: Colors.blue},
  'end_loop': {color: Colors.blue, name: 'END LOOP', image: 'end'},
  'hand': {color: Colors.grey, name: ''},
  'active_hand': {color: Colors.flash_yellow, name: '', image: 'hand'},
  'highlighted_hand': {color: Colors.cyan, name: '', image: 'hand'},
  'blank': {color: Colors.white, name: ''},
  'insert': {color: Colors.insert, image: 'insert'},
  'delete': {color: Colors.delete, image: 'delete'},
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
