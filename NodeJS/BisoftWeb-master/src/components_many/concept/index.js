/**
 * This module is the main module of the concept tab and is a dumb component
 * @see module:components/concept/Coverflow
 * @module components/concept/
 */

var React = require('react');
var PropTypes = React.PropTypes;
var Coverflow = require('./Coverflow.js');
var Sidebar = require('./Sidebar.js');
var Tutorials = require('../../tutorials/tutorials');
var Content = React.createClass({

  render: function() {
    var App=this.props.app;
    return (
      <div className="pure-g" style={{height: '100%', width: '100%',backgroundImage: 'url(images/newbisoft-screens-15.png)',backgroundSize: 'contain',backgroundPosition:'center'}}>      
        <Tutorials ref='tutorial' step={this.props.step} projId={this.props.projId} currentTab={this.props.currentTab} tutorialMode={this.props.tutorialMode} app={App}/>
        <div className="pure-u-4-5" style={{}}>
          {this.props.sidebarContents.length === this.props.components.length ? (
            <div style={{display: 'table', width: '100%', height: '100%'}}>
              <div style={{
                  height: '100%',
                  width: '100%',
                  display: 'table-cell',
                  textAlign: 'center',
                  verticalAlign: 'middle',
                  fontSize: 'x-large',
                  fontWeight: 'bold',
                  color: '#656768',
                }}>
                All Components have been selected
              </div>
            </div>
          ) : (
            <div style={{display: 'table', width: '100%', height: '100%'}}>
              <div style={{display: 'table-row',
                        color: '#656768',
                        textAlign: 'center',
                        height: '15%',
                        fontWeight: 'normal',
                        fontSize: '30',
                      }}>
                <div style={{display: 'table-cell',textAlign: 'left',color: '#423D3D', paddingLeft: '10%', paddingBottom: '2%', verticalAlign: 'bottom'}}>
                  Select components:
                </div>
              </div>
              
              <div style={{display: 'table-row', height: '65%',zIndex: '100'}}>
                <div className="compos" style={{display: 'table-cell', verticalAlign: 'middle'}}>
                  <Coverflow components={this.props.components}
                      select={this.props.select}
                      active={this.props.coverflowActive}
                      onChange={this.props.onCoverflowChange}
                  />
                </div>
              </div>
              <img src="images/description_hand.png" style={{ height: '80px',width:'80px',position:'absolute',marginLeft:'2%'}}/>
              <div style={{display: 'table-row',
                        color: '#000',
                        textAlign: 'center',
                        height: '20%',
                        fontWeight: 'bold',
                        fontSize: '20px',
                      }}>
                <div className="desc" style={{padding: '5px', paddingTop: '2%',paddingBottom: '2%', verticalAlign: 'top',width: '80%', marginLeft: '10%',border: '2px solid #000',borderRadius: '16px'}}>
                  {(this.props.components[this.props.coverflowActive]) ?
                      this.props.components[this.props.coverflowActive].description : ''}
                </div>
              </div>
            </div>

          )}
        </div>
        <div className="pure-u-1-5" style={{zIndex: '1000'}}>
          <Sidebar appState={App.state} components={this.props.components} sidebarContents={this.props.sidebarContents} remove={this.props.remove} projId={this.props.projId}/>
        </div>
      </div>

    );
  }

});

module.exports = Content;
