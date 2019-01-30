/**
 * This module is the sidebar component of assembly tab.
 * This is a drop target.
 * This also maintains its UI state of scrollTop.
 * @module components/assembly/Sidebar
 */

var React = require('react');
var PropTypes = React.PropTypes;
var ReactDOM = require('react-dom');
var ItemTypes = require('./ItemTypes');
var DraggableSidebarCard =  require('./DraggableSidebarCard.js');
const Sizes = require('../../helpers/Sizes');
var DropTarget = require('react-dnd').DropTarget;
var DraggingInfo = require('./DraggingInfo');

const sidebarTarget = {
  drop: function (props, monitor) {
    DraggingInfo.isDragging = false;
    const item = monitor.getItem();
    if (DraggingInfo.draggingComponentOld) props.removeFromWorkspace(item);
    else DraggingInfo.sidebarOldOffset = 0;
  }
};

/**
 * A boolean which is turned to false which is turned true when a function
 * doesnot want to force a rerender
 * @type {Boolean}
 */
var shouldNotUpdate = false;

var scrolling = false, scrollingTimeoutId;

var Sidebar = React.createClass({
  getInitialState: function() {
    DraggingInfo.setSidebarScroll = this.setScroll;
    return {
      scrollTop: 0
    };
  },
  /**
   * Updates the DOM element's scrollTop as scrollTop attribute not supported
   * by React.
   */
  componentDidUpdate: function(prevProps, prevState) {
    ReactDOM.findDOMNode(this).scrollTop = this.state.scrollTop;
  },
  /**
   * Returns false or true depending on shouldNotUpdate
   */
  shouldComponentUpdate: function(nextProps, nextState) {
    return !shouldNotUpdate;
  },
  /**
   * Updates the sidebar scroll with the given offset
   * @param {number}   offset The offset to add
   * @param {Function} cb     Callback
   */
  setScroll: function (offset, cb) {
    offset -=  DraggingInfo.sidebarOldOffset;
    this.setState({
      scrollTop: this.state.scrollTop - offset
    }, cb);
  },
  /**
   * Updates the state scrollTop without triggering a state update
   */
  onScroll: function () {
    if (scrolling) {
      window.clearTimeout(scrollingTimeoutId);
    } else scrolling = true;
    scrollingTimeoutId = window.setTimeout(() => {
      shouldNotUpdate = true;
      this.setState({
        scrollTop: ReactDOM.findDOMNode(this).scrollTop
      }, () => {
        shouldNotUpdate = false;
        scrolling = false;
        scrollingTimeoutId = null;
      });
    }, 100);
  },
  render: function() {
    //console.log('from sidebar props', this.props);
    return this.props.connectDropTarget(
      <div className="noselect assemblySidebar" style={{height: Sizes.mainHeight-14, overflowY: 'auto',backgroundColor: '#353535',border: '2px solid rgb(64, 61, 61)', wordWrap: 'break-word', overflowX: 'hidden',marginTop: '2%',marginBottom: '2%',marginLeft: '3%'}} 
        onScroll={this.onScroll}>
        {
          this.props.sidebarContents.map(function (element, index) {
            return <DraggableSidebarCard height='150'
                type={this.props.components[element].type}
                name={this.props.components[element].name}
                url={this.props.components[element].url}
                index={index}
                key={index}
              />
          }, this)
        }
      </div>
    );
  }

});

module.exports = DropTarget(ItemTypes.COMPONENT, sidebarTarget, connect => ({
    connectDropTarget: connect.dropTarget()
}))(Sidebar);
