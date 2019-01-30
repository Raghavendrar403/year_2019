const update = function (width, height) {
  Sizes.height = height;
  Sizes.width = width;
  Sizes.navHeight = document.getElementById('header') && document.getElementById('header').scrollHeight;
  Sizes.mainHeight = height - Sizes.navHeight;
  Sizes.mainWidth = width * 0.8;
  Sizes.sidebarWidth = width * 0.2;
  Sizes.scale = width/1366;
}

var Sizes = {
  'height': 0,
  'width': 0,
  'navHeight': 0,
  'mainHeight': 0,
  'mainWidth': 0,
  'sidebarWidth': 0,
  'scale': 1,
  _update: update,
}

update(document.body.clientWidth, document.body.clientHeight);

module.exports = Sizes;
