/**
 * This module is the main module of the concept tab and is a dumb component
 * @see module:components/concept/Coverflow
 * @module components/concept/
 */

var React = require('react');
var PropTypes = React.PropTypes;
var Coverflow = require('./Coverflow.js');
import { hashHistory, browserHistory } from 'react-router';
var Tutorials = require('../../tutorials/tutorials');
var Content = React.createClass({
  addBibox: function(){
    var AppUrl='/#/connectivity';
    browserHistory.push(AppUrl);
    window.location.reload();
  },
  selected_bibox: function(_this) {
    console.log('selected_bibox',_this.props.biboxes[_this.props.coverflowActive]);
    return _this.props.biboxes[_this.props.coverflowActive].description.toUpperCase() ;
  },
  render: function() {
    var App=this.props.app;
    return (
      <div className="pure-g" style={{height: '100%', width: '100%',backgroundImage: 'url(images/newbisoft-screens-15.png)',backgroundSize: 'contain',backgroundPosition:'center'}}>      
        <Tutorials step={this.props.step} projId={this.props.projId} currentTab={this.props.currentTab} tutorialMode={this.props.tutorialMode} app={App}/>
        <div className="pure-u-4-5" style={{width: '100%'}}>
            <div style={{display: 'table', width: '100%', height: '100%'}}>
              <div style={{display: 'table-row',
                        color: '#656768',
                        textAlign: 'center',
                        height: '15%',
                        fontWeight: 'normal',
                        fontSize: '30',
                      }}>
                <div style={{display: 'table-cell',textAlign: 'left',color: '#423D3D', paddingLeft: '10%',paddingTop: '2%', paddingBottom: '2%', verticalAlign: 'bottom'}}>
                  Select your Bibox
                </div>
              </div> 
              
              <div style={{display: 'table-row', height: '40%',zIndex: '100'}}>
                <div className="compos" style={{display: 'table-cell', verticalAlign: 'middle'}}>
                  <Coverflow biboxes={this.props.biboxes} components={this.props.components}
                      select={this.props.select}
                      active={this.props.coverflowActive}
                      onChange={this.props.onCoverflowChange}
                  />
                </div>
              </div>
              <div style={{display: 'table-row',
                        color: '#656768',
                        textAlign: 'center',
                        height: '20%',
                        fontWeight: 'bold',
                        fontSize: '20px',
                      }}>
                <div className="desc" style={{padding: '5px', paddingTop: '%',paddingBottom: '2%', verticalAlign: 'top',width: '80%', marginLeft: '10%'}}>
                  {(this.props.biboxes[this.props.coverflowActive]) ?
                      this.selected_bibox(this) : ''}
                </div>         
		<img onClick={this.addBibox} style={{backgroundColor: 'black', borderRadius: '32px', cursor: 'pointer'}} onClick={this.addBibox} src="./images/Plus.png" />
		<h4>Add your Bibox</h4>
		
              </div>
            </div>
        </div>
      </div>

    );
  }

});

module.exports = Content;
