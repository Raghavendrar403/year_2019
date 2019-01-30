/**
 * This module exports a dumb Card component drawn in coverflow
 * @module components/concept/Card
 */

var React = require('react');
var PropTypes = React.PropTypes;
var Data = require('../../data.js');
var Card = React.createClass({

  render: function() {
    var colorofComponent;
    for(var i=0;i<Data.length;i++){
        if(Data[i].name==this.props.name){
          colorofComponent=Data[i].color;
        }
    }
    return (
      <div style={{background: '#FFF',borderRadius: '12px'}}>
        <div style={{display: 'table', background: colorofComponent, borderRadius: '12px', height: this.props.height, width: this.props.width}}>   
            <div style={{display: 'table-row', height: '80%'}}>
              <div style={{
                height:'84%',
                backgroundImage: 'url("'+this.props.url+'")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'contain',
                backgroundColor: 'rgba(245, 244, 244, 0.98)',
                marginTop: '8%',
                marginLeft: '5%',
                marginRight: '5%',
                marginBottom: '2%',
                borderRadius: '16px 16px 0px 0px',
              }} />
            </div>
            <div style={{display: 'table-row', fontSize: '16', textAlign: 'center', color: 'white'}}>
            {this.props.name}
            </div>
        </div>
      </div>
    );
  }

});

module.exports = Card;
