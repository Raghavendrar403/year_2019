var React = require('react');
var PropTypes = React.PropTypes;
import ReactDOM from 'react-dom';
var App = require('../App'); 
var Mainpage = React.createClass({

    render: function() {
        var currentProject=this.props.project[1]; 
        var Ph=currentProject["head"];
        var Pd=currentProject["desc"];

        return (
            <div>
                <li>
                    <a href="#">
                        <h1><span>{Ph}</span>{Pd}</h1>
                    </a>
                </li> 
                <li>
                    <a href="#">
                        <h1><span>{Ph}</span>{Pd}</h1>
                    </a>
                </li> 
                <li>
                    <a href="#">
                        <h1><span>{Ph}</span>{Pd}</h1>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <h1><span>{Ph}</span>{Pd}</h1>
                    </a>
                </li> 
                <li>
                    <a href="#">
                        <h1><span>{Ph}</span>{Pd}</h1>
                    </a>
                </li>    
                <li>
                    <a href="#">
                        <h1><span>{Ph}</span>{Pd}</h1>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <h1><span>{Ph}</span>{Pd}</h1>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <h1><span>{Ph}</span>{Pd}</h1>
                    </a>
                </li>
            </div>
        );
    }
});
module.exports = Mainpage;

   /*
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="images/favicon.png">

    <link type="text/css" rel="stylesheet" href="css/style.css"/>
    <link type="text/css" rel="stylesheet" href="css/responsive.css"/>
    
    <script language="javascript" src="js/jquery-1.11.0.min.js"></script>
    <link href="js/bowser.js" type="text/javascript" />
    */