/**
 * This module is the sidebar component of assembly tab and is a dumb component.
 * @module components/concept/Sidebar
 */

var React = require('react');
var PropTypes = React.PropTypes;
var SidebarCard =  require('./SidebarCard.js');
const Sizes = require('../../helpers/Sizes');
var ComponentsSelected = require('./ComponentsSelected');
var Sidebar = React.createClass({
  render: function() { 
      var leng=Object.keys(this.props.sidebarContents).length;
      for(var i=0;i<leng;i++){
          ComponentsSelected[this.props.components[this.props.sidebarContents[i]].name]="true";
      }  
    return (
      <div className="sidebarGrid" style={{height: Sizes.mainHeight-14, overflowY: 'auto', wordWrap: 'break-word',backgroundColor: '#353535',border: '2px solid rgb(64, 61, 61)', overflowX: 'hidden',marginRight: '3%',marginTop: '2%',marginBottom: '2%'}}>
        {
          this.props.sidebarContents.map(function (element, index) {

            return <SidebarCard height={150}
                name={this.props.components[element].name}
                url={this.props.components[element].url}
                remove={this.props.remove}
                index={index}
                key={index}
                projId={this.props.projId}
                appState={this.props.appState}
              />
          }, this)
        }
      </div>
    );
  }

});

module.exports = Sidebar;
