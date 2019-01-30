/**
 * This module is the sidebar component of logic-new tab.
 * This is a drop target.
 * This also maintains its UI state of scrollTop.
 * @module components/assembly/Sidebar
 */

var React = require('react');
var PropTypes = React.PropTypes;
var ReactDOM = require('react-dom');
var ItemTypes = require('./ItemTypes');
var DraggableSidebarCard =  require('./DraggableSidebarCard.js');

var DropTarget = require('react-dnd').DropTarget;
var DraggingInfo = require('./DraggingInfo');

const data = require('./data')
const Colors = require('./Colors')

const sidebarTarget = {
  drop: function (props, monitor) {
    DraggingInfo.isDragging = false;
    const item = monitor.getItem();
    if (DraggingInfo.draggingCardOld !== -1) props.removeFromDropspace(item.index);
  }
};


var Sidebar = React.createClass({
  render: function() {
    return this.props.connectDropTarget(
      <div style={{height: '100%', backgroundColor: '#396C7A'}} className='noselect'>
        &nbsp;
        {
          data.order.map(type => (
            <DraggableSidebarCard type={type} key={type}
                url={data[type].image} color={data[type].color}
                height={(this.props.height/1.5/data.order.length)}/>
          ))
        }
      </div>
    );
  }

});

module.exports = DropTarget(ItemTypes.CARD, sidebarTarget, connect => ({
    connectDropTarget: connect.dropTarget()
}))(Sidebar);
