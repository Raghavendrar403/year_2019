/**
 * @typedef WorkspaceComponentsData
 * @type object
 * @property {number} top   The top offset
 * @property {number} left   The left offset
 * @property {string} connectedTo   The port to which it is connected. It does not exist if not connected to any port
 */

/**
 * It has keys as component types for eg led
 * @example
 * {
 * 	 "led": [{top: 20, left: 80, connectedTo: 'A1'}, ...], ...
 * }
 * @typedef WorkspaceComponents
 * @type object
 * @property {WorkspaceComponentsData[]} ComponentType An array describing components of "ComponentType"
 */

/**
 * Describes a component in workspace. The last 3 properties may or may not be present.
 * (Different from {@link WorkspaceComponents})
 * @typedef AssemblyComponent
 * @type object
 * @property {string} type Type of the component
 * @property {?number} index Index of component in {@link WorkspaceComponents} if old component
 * @property {?number} left The left offset
 * @property {?number} top  The top offset
 * @property {?string} connectedTo Port connected to
 */

/**
 * This module is the workspace component of assembly tab and contains many functions for manipulation of the workspace object
 * This is a drop target.
 * @module components/assembly/Workspace
 */

var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = React.PropTypes;
var ItemTypes = require('./ItemTypes');
const ImageSizes = require('./ImageSizes');
var BiboxSize = require('./ImageSizes')[ItemTypes.BIBOX];

var DropTarget = require('react-dnd').DropTarget;
var DraggingInfo = require('./DraggingInfo');

var cumulativeOffset = require(__base + 'src/helpers/cumulativeOffset');

var Bibox = require('./Bibox');
var Component = require('./Component');
var PortConnections = require('./PortConnections');

const workspaceTarget = {
  drop: function (props, monitor, component) {
    const { offset, scale } = props.workspace;
    const { width, height } = props;
    DraggingInfo.isDragging = false;
    const type = monitor.getItemType();
    const item = monitor.getItem();
    var currentOffset;
    if (monitor.getItemType() === ItemTypes.COMPONENT && !DraggingInfo.draggingComponentOld) {
      currentOffset = monitor.getClientOffset();
    }
    else currentOffset = monitor.getSourceClientOffset();
    currentOffset.x -= document.body.clientWidth - width;
    currentOffset.y -= document.body.clientHeight - height;
    currentOffset.x = currentOffset.x / scale - offset.left;
    currentOffset.y = currentOffset.y / scale - offset.top;
    if (type === ItemTypes.COMPONENT && !DraggingInfo.draggingComponentOld) {
      component.newComponent(item.type, currentOffset.x, currentOffset.y);
    } else {
      if (type === ItemTypes.BIBOX) component.moveBibox(currentOffset.x, currentOffset.y);
      else component.updateOldComponent(currentOffset.x, currentOffset.y);
    }
  }
};

var Workspace = React.createClass({
  componentDidMount: function() {
    const {height, width} = this.props;
    // Move Bibox to center
    this.moveBibox(width/2 - BiboxSize[0]/2, height/2 - BiboxSize[1]/2);
  },
  componentDidUpdate: function(prevProps, prevState) {
    // Update the PortConnections module
    var { components, scale, offset } = this.props.workspace;
    Object.keys(PortConnections).map(port => PortConnections[port] = null);
    Object.keys(components).map(type => {
      components[type].map((component, index) => {
        if (component.connectedTo) PortConnections[component.connectedTo] = {type, index};
      });
    });
  },
  /**
   * Move the bibox to a new position
   * @param  {number} left The new left
   * @param  {number} top  The new top
   */
  moveBibox: function (left, top) {
    var { workspace } = this.props;
    workspace.bibox.left = left;
    workspace.bibox.top = top;
    this.props.update(workspace);
  },
  /**
   * Update the position of an old component
   * @param  {number} left The new left
   * @param  {number} top  The new top
   */
  updateOldComponent: function (left, top) {
    var { workspace } = this.props;
    var item = DraggingInfo.draggingComponentOld;
    workspace.components[item.type][item.index].top = top;
    workspace.components[item.type][item.index].left = left;
    workspace.components[item.type][item.index].connectedTo = DraggingInfo.newComponentPort;
    this.props.update(workspace)
  },
  /**
   * Add a new component to workspace. Also if DraggingInfo.newComponentPort is
   * defined connect the new component to that port.
   * @param  {string} type The type of the component
   * @param  {number} left The left offset
   * @param  {number} top  The top offset
   */
  newComponent: function (type, left, top) {
    var { workspace } = this.props;
    if (!workspace.components[type]) workspace.components[type] = [];
    var component = {left: left, top: top};
    if (DraggingInfo.newComponentPort) {
      component.connectedTo = DraggingInfo.newComponentPort;
      DraggingInfo.newComponentPort = null;
    }
    workspace.components[type].push(component);
    this.props.update(workspace)
  },
  /**
   * Connect a old component to a port in workspace (on drop)
   * @param  {AssemblyComponent} item
   * @param  {string} port The port
   */
  workspaceConnect: function (item, port) {
    var { workspace } = this.props;
    workspace.components[item.type][item.index].connectedTo = port;
    this.props.update(workspace);
  },
  /**
   * Remove connection of old component
   * @param  {AssemblyComponent} item
   */
  removeConnection: function(item) {
    var { workspace } = this.props;
    if (workspace.components[item.type][item.index].connectedTo) {
      var obj = workspace.components[item.type][item.index]
      delete obj.connectedTo;
    }
    this.props.update(workspace);
  },
  render: function() {
    const { connectDropTarget, removeFromWorkspace } = this.props;
    const { bibox, components, offset, scale } = this.props.workspace;
    return connectDropTarget(
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        
      }}>
        <Bibox left={(bibox.left + offset.left) * scale} top={(bibox.top + offset.top) * scale}
          scale={scale} workspaceConnect={this.workspaceConnect}/>
        {Object.keys(components).map(key => {
          return (
            <div key={key}>
              {components[key].map((component, index) => {
                const { left, top, connectedTo } = component;
                return <Component key={index} type={key} index={index} prop = {this.props.prop}
                    left={(offset.left + left) * scale} top={(offset.top + top) * scale}
                    scale={scale} connectedTo={connectedTo} appState={this.props.appState}
                    removeFromWorkspace={removeFromWorkspace} removeConnection={this.removeConnection}/>
              })}
            </div>
          );
        })}
      </div>
    );
  }

});

module.exports = DropTarget([ItemTypes.BIBOX, ItemTypes.COMPONENT], workspaceTarget, connect => ({
    connectDropTarget: connect.dropTarget()
}))(Workspace);
