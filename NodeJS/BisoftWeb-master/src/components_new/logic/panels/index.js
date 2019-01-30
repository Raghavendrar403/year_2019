module.exports = function (panel) {
  switch (panel) {
    case 'editorPanel':
      return require('./editorPanel');
    case 'start':
      return require('./start');
    case 'if':
      return require('./if');
    case 'loop':
      return require('./loop');  
    case 'code':
      return require('./code');     
    case 'output':
      return require('./output/');
    case 'wait':
      return require('./wait');
    case 'end_if':
    case 'end_loop':
      return require('./end_if_loop');
    case 'repeat':
    case 'end':
      return require('./end');

    default:
      return require('./empty');
  }
}
