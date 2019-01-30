var React = require('react');
var PropTypes = React.PropTypes;


const DragDropContext = require('react-dnd').DragDropContext;
const TouchBackend = require('react-dnd-touch-backend').default;

const CustomDragLayer = require('./CustomDragLayer')
const Sidebar = require('./Sidebar')
const Dropspace = require('./Dropspace')
const RightPanel = require('./RightPanel');
const Hammer = require('react-hammerjs');

var oldDeltaX, oldDeltaY, panning;
var zooming;

var LogicNew = React.createClass({
  componentDidMount: function() {
    // Reset panning and pinching variables
    this.panEnd();
    this.pinchEnd();
  },
  removeCardConnections: function (index) {
    var { logicNew } = this.props;
    logicNew.cards[index].connections.map((connection, portIndex) => {
      logicNew.cards[connection.to].connections[connection.toPort].to = connection.to
      logicNew.cards[connection.to].connections[connection.toPort].toPort = connection.toPort
      connection.to = index
      connection.toPort = portIndex
    })
    this.props.update(logicNew)
  },
  removeFromDropspace: function (index) {
    var { logicNew } = this.props;
    this.removeCardConnections(index);
    logicNew.cards[index].invalid = true;
    this.props.update(logicNew)
  },
  removeConnection: function (from, fromPort, to, toPort) {
    var { logicNew } = this.props;
    logicNew.cards[from].connections[fromPort] = {to: from, toPort: fromPort};
    logicNew.cards[to].connections[toPort] = {to: to, toPort: toPort};
    this.props.update(logicNew)
  },
  /**
   * Pan event handler with throttling
   */
  pan: function(e) {
    if (panning) return;
    panning = true;
    var {logicNew} = this.props;
    logicNew.offset.left += (e.deltaX - oldDeltaX) / logicNew.scale;
    logicNew.offset.top += (e.deltaY - oldDeltaY) / logicNew.scale;
    oldDeltaX = e.deltaX;
    oldDeltaY = e.deltaY;
    this.props.update(logicNew, () => {
      panning = false
    });
  },
  /**
   * Reset pan variables
   */
  panEnd: function() {
    panning = false;
    oldDeltaX = 0;
    oldDeltaY = 0;
  },
  /**
   * Zoom function with throttling
   * @param  {number} scale   The new scale
   * @param  {number} clientX The clientX (center of pinch or cursor position on wheel)
   * @param  {number} clientY The clientY (center of pinch or cursor position on wheel)
   */
  zoom: function(scale, clientX, clientY) {
    if (zooming) return;
    var {logicNew, height, width} = this.props;
    if ( (logicNew.scale < 0.25 && scale < 1) ||
         (logicNew.scale > 2  && scale > 1)    ) return;
    zooming = true;
    clientX -= width * 0.2;
    clientY -= document.body.clientHeight - height;
    // client = (offset + x/y) * scale
    // client of oldx/y = client of newx/y (current mouse position)
    // oldx/y = client / scale - offset
    // (newoffset + oldx/y) * newscale = (oldOffset + oldx/y) * oldscale
    const oldX = clientX / logicNew.scale - logicNew.offset.left;
    const oldY = clientY / logicNew.scale - logicNew.offset.top;
    logicNew.offset.left = (logicNew.offset.left + oldX) / scale - oldX;
    logicNew.offset.top = (logicNew.offset.top + oldY) / scale - oldY;
    logicNew.scale *= scale;
    this.props.update(logicNew, () => {
      zooming = false
    });
  },
  /**
   * Pinch Out event handler
   */
  pinchOut: function(e) {
    this.zoom(12/11, e.center.x, e.center.y);
    e.preventDefault();
    return false;
  },
  toggleBottomPanel: function() {
    if (this.state.bottomPanel === 'show') this.setState({bottomPanel:'border'});
    else this.setState({bottomPanel:'show'});    
  },
  /**
   * Pinch In event handler
   */
  pinchIn: function(e) {
    this.zoom(11/12, e.center.x, e.center.y);
    e.preventDefault();
    return false;
  },
  /**
   * Reset pinch variables
   */
  pinchEnd: function() {
    zooming = false;
  },
  /**
   * Wheel event handler
   */
  wheel: function(e) {
    const { clientX, clientY, deltaY } = e;
    if (deltaY > 0) this.zoom(5/6, clientX, clientY);
    else this.zoom(6/5, clientX, clientY);
    e.preventDefault();
    return false;
  },
  getInitialState: function() {
    return {bottomPanel: 'border'};
  },
  render: function() {
    const {height, width, logicNew, update} = this.props;
    var bottomPanel = this.state.bottomPanel;
    return (
      <div className="pure-g">
        <div className="pure-u-1-6">
          <Sidebar height={this.props.height}
                   removeFromDropspace={this.removeFromDropspace}/>
        </div>
        <div className="pure-u-5-6">
          <div style={{
              position: 'relative',
              width: '100%',
              height: '100%',
            }} onWheel={this.wheel}>
            <Hammer onPan={this.pan} onPanEnd={this.panEnd} onPinchIn={this.pinchIn}
              onPinchOut={this.pinchOut} options={{
                 recognizers:{
                    pinch : { enable:true }
                 }
              }}>
              <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: 1
                }}/>
            </Hammer>
            <Dropspace logicNew={logicNew} update={update}
                       removeCardConnections={this.removeCardConnections}
                       removeFromDropspace={this.removeFromDropspace}
                       height={height} width={width*5/6}/>
          </div>
        </div>
        <CustomDragLayer height={height} width={width} sidebarWidth={width*1/6}
                         logicNew={logicNew} removeConnection={this.removeConnection}/>
        <RightPanel show={bottomPanel} /*value={respVal} state={drawing.activeRef.state} 
        onChange={this.bottomPanelChange} startState={program[0].state}*/ toggle={this.toggleBottomPanel} current={'editorPanel'}/>
      </div>
    );
  }

});

module.exports = DragDropContext(TouchBackend({ enableMouseEvents: true }))(LogicNew);
