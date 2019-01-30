var React = require('react');
import ReactDOM from 'react-dom';
var PropTypes = React.PropTypes;
var Utils = require(__base+'./src/utils');
var Imagepath=Utils.getImagePath();
var Cloud= React.createClass({
	getInitialState: function() {
 		return {showloading: true,tutorialMode: 'false'};
  	},
	componentDidMount: function(){
		this.setState({showloading: false});
	},
	render: function() {
    sessionStorage.setItem("currentTab",'cloud');
		if(this.state.showloading==true){
        	return(<div className="left-area"><div className="loading" style={{backgroundColor: 'transparent'}}><img style={{height: '30%',marginLeft: '20%'}} src={Imagepath+"loading2.gif"} alt="loading"/></div></div>);
    	}else{
        	return(<div style={{position: 'relative'}}>  
           		<h1>Hello Cloud</h1>
            </div>);
    	}
	}
});
module.exports = Cloud;