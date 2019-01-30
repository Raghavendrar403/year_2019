/**
 * This module exports the sidebar card in which the image is draggable
 * @module components/assembly/DraggableSideCard
 */

var React = require('react');
var PropTypes = React.PropTypes;
var ItemTypes = require('./ItemTypes');
var DragSource = require('react-dnd').DragSource;
var DraggingInfo = require('./DraggingInfo');
var Data = require('../../data.js');

const cardSource = {
  beginDrag: function(props) {
    DraggingInfo.isDragging = true;
    return {type: props.type};
  },
  endDrag: () => {
    DraggingInfo.isDragging = false;
    DraggingInfo.newComponentPort = null;
  }
};

var DraggableImage = DragSource(ItemTypes.COMPONENT, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(React.createClass({
  render: function () {
    var colorofComponent;
    for(var i=0;i<Data.length;i++){
        if(Data[i].type==this.props.type){
          colorofComponent=Data[i].color;
        }
    }
    return this.props.connectDragSource(
      <div>
       <div style={{background: colorofComponent, 
                     minHeight: this.props.height+20,
                     width: this.props.height+10, 
                     borderRadius: '12px',
                     margin:'0 auto'}}>
            <div style={{
                height: '1px',
            }}/>
      <div style={{
          backgroundImage: 'url(' + this.props.url + ')',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          height: this.props.height-14,
          width: this.props.height-4,
          backgroundPosition: 'center',
          backgroundColor: 'rgba(245, 244, 244, 0.98)',
          marginTop: '5%',
          marginLeft: '5%',
          marginRight: '5%',
          marginBottom: '3%',
          borderRadius: '12px 12px 12px 12px',
        }}/>

        <div style={{textAlign: 'center',color: 'white',fontSize: '14px',fontWeight: '600'}}>
          {this.props.name}
          </div>

        </div>
      </div>
    )
  }
}))

var DraggableSideCard = React.createClass({

  render: function() {
      const { height, type, name, url } = this.props;

      return (
        <div style={{fontSize: '18',minHeight: '150px', backgroundColor: '#353535',backgroundRepeat: 'no-repeat',backgroundSize:'contain',backgroundPosition: 'center'}}>
          <DraggableImage name={name} height={height - 24} url={url} type={type}/>    
        </div>
      );
    }

});

module.exports = DraggableSideCard;
