const CardTypes = require('./CardTypes');
const PortTypes = require('./PortTypes');
const Colors = require('./Colors');

var data = {
  [CardTypes.CARD_IF]: {image: 'if', color: Colors.yellowif, ports: PortTypes._4PORT},
  [CardTypes.CARD_OUTPUT]: {image: 'output', color: Colors.greenishblue, ports: PortTypes._2PORT},
  [CardTypes.CARD_LOOP]: {image: 'loop', color: Colors.lightblue, ports: PortTypes._3PORT},
  [CardTypes.CARD_START]: {image: 'start', color: Colors.blackshade, ports: PortTypes._1PORT},
  [CardTypes.CARD_WAIT]: {image: 'wait', color: Colors.purple, ports: PortTypes._2PORT},
  [CardTypes.CARD_INSERT]: {image: 'code', color: Colors.brown, ports: PortTypes._2PORT},
  [CardTypes.CARD_END]: {image: 'end', color: Colors.blackshade, ports: PortTypes._0PORT},
  order: [/*CardTypes.CARD_START,*/CardTypes.CARD_IF, CardTypes.CARD_OUTPUT, CardTypes.CARD_LOOP, CardTypes.CARD_INSERT, CardTypes.CARD_WAIT, CardTypes.CARD_END],
}

Object.keys(data).map(type => {
  var item = data[type];
  const imgPathPrefix = 'images/ic_logicflow_';
  const imgPathPostfix = '.png';
  if (item.image) item.image = imgPathPrefix + item.image + imgPathPostfix;
});

module.exports = data;
