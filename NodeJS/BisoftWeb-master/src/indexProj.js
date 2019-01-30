/**
 * App module stores the main state and several methods for manipulating it
 * as well as contains the main code.
 * @module App
 * @see module:components/concept/
 * @see module:components/assembly/
 */

var React = require('react');
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory, browserHistory } from 'react-router';
var PropTypes = React.PropTypes;
var page = require('page');
const Sizes = require('./helpers/Sizes');
var components = require('./data.js');
var componentProps = require('./componentProps');
var Project = require('./ProjectManager/Project');
var uuid = require('node-uuid');
import App from './App';
var Utils = require(__base+'./src/utils');
var Imagepath=Utils.getImagePath();
var BisoftManager=React.createClass({
  newProject: function(){
    var socket = io.connect("http://localhost:9009"); 
    socket.emit('/portClose',"hello");
    socket.on('message', function (data) {
        console.log('msg',data);
        socket.emit('close');
    });
        
    // var biboxes = JSON.parse(sessionStorage.getItem('AppDetails-new')).biboxes||{};
      // biboxes = JSON.parse(biboxes);
    // if(Object.keys(biboxes).length>0){
      // localStorage.setItem('biboxes',JSON.stringify(biboxes));
    // }
    sessionStorage.removeItem('AppDetails-new');
    sessionStorage.removeItem('currentTab');
    // sessionStorage.clear();
    //var AppUrl="#/App/"+'new'+'/selectbibox';
    var AppUrl="#/App/"+'new'+'/concept';
    browserHistory.push(AppUrl);
    window.location.reload();
  }, 
  searchProject: function(){
      document.getElementById('srctext').value='';
      
  }, 
  showDropdownLogout: function(){
      var dropdownStatus=document.getElementsByClassName('dropdown-logout-setting')[0].style.display;
      if(dropdownStatus=='block'){
        document.getElementsByClassName('dropdown-logout-setting')[0].style.display='none';
      }else{
        document.getElementsByClassName('dropdown-logout-setting')[0].style.display='block';
      }          
  },

  logoutbisoft: function()
  {
	$.ajax({

            url: "/logout",
            dataType: 'json',
            type:'GET',                          
            success: function() {
                localStorage.clear();
              }.bind(this),

            error: function(xhr, status, err) {
               console.log('no logout:'+status);
             }.bind(this)
        });	 
  },
  
  render: function(){
      var currentTab;
      if(this.props.location){
        var Currentroute=this.props.location.pathname;
        var pathArray=Currentroute.split('/');
        currentTab=pathArray[pathArray.length-1];
      }
      var Clientheight=document.body.clientHeight;
      return (
        <div id="main" className="home">
            <header id="header" style={{maxHeight: '71px'}}>
                <div className="logo">
                    <Link to="/"><img src={Imagepath+"logo.png"} alt="Bisoft"/></Link>
                </div>
				
				{/*<div className="dropdown setting" onMouseLeave={this.mouseLeave}>
                  <button onClick={this.showDropdownLogout} className="logbtn" style={{outline: 'none'}}><img style={{height: '40px',width: '40px'}} src={Imagepath+"setting.png"} alt="setting"/></button>
                  <div className="dropdown-logout-setting" style={{zIndex: '10000',maxWidth: '200px',marginTop: '10px',marginLeft: '-40px'}}>
                    <a className="logout" onClick={this.logoutbisoft}  style={{minWidth: '72px',padding: '8px',zIndex: '999', left: '0', textAlign:'center'}}>Logout</a>
                  </div>
                </div>*/}

				
                <nav className="menu">
                    <img src={Imagepath+"menu.png"} alt="menu" className="toggle-menu"/>
                    <ul>
                      <li className="local"><Link to="/bisoft/local" className={currentTab === 'local' ? 'active' : ''}>LOCAL</Link></li>
                      <li className="cloud"><Link to="/bisoft/cloud" className={currentTab === 'cloud' ? 'active' : ''}>CLOUD</Link></li>
                      <li className="tutorials"><Link to="/bisoft/tutorials" className={currentTab === 'tutorials' ? 'active' : ''}>TUTORIALS</Link></li>
                    </ul>  
                    <div className="clear"></div>
                </nav> 
                <div className="clear"></div>
            </header>
            <div className="projectBody" style={{height: Clientheight-71,marginBottom: '5%', width: '100%',overflow: 'hidden',backgroundImage: 'url(images/newbisoft-screens-15.png)',backgroundSize: 'contain',backgroundPosition:'center'}}>
                <section id="content">  
                    <div style={{height: '70%', position: 'relative', overflowY: 'auto'}} className="list">
                      <ul>
                        {this.props.children} 
                      </ul>
                      <div className="clear"></div>   
                    </div>
                    <div className="bottomBar" style={{marginTop: '2%'}}>
                          {/*<div className="search">
                              <form action="" method="get">
                                  <input type="text" onClick={this.searchProject} name="srctext" id="srctext" defaultValue="Search for project...."/>
                                  <button><img style={{width: '76%',height: '60%'}} src={Imagepath+"search-btn.png"} alt="search"/></button>
                              </form>
                          </div>*/}
                          <a onClick={this.newProject} className="new-button">Start new project</a>
                    </div>
                    <div style={{marginTop: '4%'}} className="clear"></div> 
                </section>
            </div>
            <footer id="footer">     
            </footer>
        </div>        
    );
  }
  });

module.exports = BisoftManager;
