/* this module is for plotter*/
var React = require('react');
import ReactDOM from 'react-dom';
var PropTypes = React.PropTypes;
import { hashHistory, browserHistory } from 'react-router';
var Utils = require(__base+'./src/utils');
var Imagepath=Utils.getImagePath();
var PlotterInput = require('./plotterInput');
var PlotterOutput = require('./plotterOutput');
var socket;

/*-------------Flot Chart START--------------*/

var container, maximum, series, plot, data, yaxisLabel;
var xVal, series1, series2, series3, series4, series5, series6, series7, series8, series9, series10,
    plot, data, options, series11= [], plotterInputData= [];
var res = [];

// $(document).ready(function () {
function ready(){
    xVal = 0;
    for(var i =0; i<10; i++){
        series11.push({ 
                label: "IOT_"+(i+1),
                data: []
                })
    }
    series1 = { 
                label: "series 1",
                data: []
                };
    series2 = {
                label: "series 2",
                data: []
                };
    series3 = {
                label: "series 3",
                data: []
                };
    series4 = {
                label: "series 4",
                data: []
                };
    series5 = {
                label: "series 5",
                data: []
                };
    series6 = {
                label: "series 6",
                data: []
                };
    series7 = {
                label: "series 7",
                data: []
                };
    series8 = {
                label: "series 8",
                data: []
                };
    series9 = {
                label: "series 9",
                data: []
                };
    series10 = {
                label: "series 10",
                data: []
                };


    // data = [ series1, series2, series3, series4, series5, series6, series7, series8, series9, series10 ];
    data = [];
    
    options = {
        legend: { show: true, position: "nw" },
        grid:{
            borderWidth: 1,
            minBorderMargin: 20,
            labelMargin: 10,
            backgroundColor: {
                colors: ["#fff", "#e4f4f4"]
            },
            margin: {
                top: 8,
                bottom: 20,
                left: 20
            },
            // markings: function(axes) {
            //  var markings = [];
            //  var xaxis = axes.xaxis;
            //  for (var x = Math.floor(xaxis.min); x < xaxis.max; x += xaxis.tickSize * 2) {
            //      markings.push({ xaxis: { from: x, to: x + xaxis.tickSize }, color: "rgba(232, 232, 255, 0.2)" });
            //  }
            //  return markings;
            // },
            hoverable: true, 
            clickable: true 
            }                                           
        };
    plot = $.plot($("#chart5"), data, options);

}


function plott(_this,values){
    // This could be an ajax call back.
    // var val_arr = values.split(',');
    // "{\"A1\":[{\"A1\":538},{\"A2\":65535},{\"A3\":0},{\"A4\":0},{\"A5\":0},{\"A6\":0}]}"
    // var obj = JSON.parse(values.data);
    var iotData = values.data;
    console.log("val_arr : "+JSON.stringify(iotData));
    var index = 0, datum = 0;
    data = [];
    var data_obj = {};
    // Object.keys(iotData).forEach(function(datum){
    for(; datum < 10; datum++){
        // console.log('data '+iotData["IOT_"+(datum+1)],datum);
        if(iotData["IOT_"+(datum+1)]!=undefined){
            var iotVariables = _this.state[_this.state.currentPlotterTab].iotVariables['IOT_'+(datum+1)];
            if(iotVariables){
                if(iotVariables.switches){
                    data.push(series11[datum]);
                    data[index].data.push([xVal, iotData["IOT_"+(datum+1)]]);
                    document.getElementById('switch-input-text'+(datum+1)).value = iotData["IOT_"+(datum+1)];
                    // data_obj[(datum+1)] = {'label':series11[datum]['label'],'data':[xVal, iotData["IOT_"+(datum+1)]]};
                    data_obj["IOT_"+(datum+1)] = iotData["IOT_"+(datum+1)];
                    index++;
                }
            }
        }
    }
    if(Object.keys(data_obj).length>0){
        //console.log("data_obj    "+JSON.stringify(data_obj));
        plotterInputData.push(data_obj);
    }
    xVal++;
    index=0;
    Object.keys(iotData).forEach(function(datum){
        //data.push(series11[index]);
        if(data[index]){
            for (var i=0;data[index].data.length>15;i++){
                data[index].data=data[index].data.splice(1);
            }
        }   
        index++;
    });
    //data[index].data=data[index].data.splice(0,3);
    if(data.length>0){
        plot.setData(data);
        plot.setupGrid();
        plot.draw();
    }
}


/*--------------------Flot Chart END--------------------------*/



const Plotter = React.createClass({
    
    getInitialState(){
        console.log(2);//onclick={this.changeTab}
        var portsAvailable = {};
        for(var iot = 1; iot<=10; iot++){
            portsAvailable[iot] = iot;
        }
        return { 
            min:0,
            max:65535,
            currentPlotterTab:'input',
            portsAvailable : portsAvailable,
            input:{
                iotVariables:{},
                interval: 100,
                plot_data : false
            },
            output:{
                iotVariables:{},
                interval: 100,
                repeat : false,
                plot_data : false
            }
        };
    },

    _updateState(state) {
        var tempState = state;
        var currentState = this.state;
        //console.log("currentPlotterTab ",currentState.currentPlotterTab);
        currentState[currentState.currentPlotterTab] = tempState;
        this.setState(currentState);
    },
    componentDidMount () {
        // this.setState( { isChecked: false } );
        ready();
    },
    componentWillMount () {
        // this.setState( { isChecked: false } );
        // console.log("adding styles to flot");
        if(!document.getElementById('id1')) {
            var link = document.createElement('link');
            link.id = 'id1';
            link.rel = 'stylesheet';
            link.href = 'css/flot.css';
            document.head.appendChild(link);
        }
    },
    componentWillUnmount () {
        if((socket && socket.readyState === 1)){
            socket.close();
        }
        // console.log("removing styles from flot");
        $('link[rel=stylesheet][href~="css/flot.css"]').remove();
        // this.setState( { isChecked: false } );
    },
    

    changeCurrentTab(newTab){
        console.log(newTab);
        this.setState({currentPlotterTab: newTab});
    },
    getPortsAvailable(){
        return this.state.portsAvailable;
    },
    addPortsAvailable(idValue){
        var portsAvailable = this.state.portsAvailable;
        portsAvailable[idValue] = idValue;
        this.setState({portsAvailable: portsAvailable});
    },
    removePortsAvailable(idValue){
        var portsAvailable = this.state.portsAvailable;
        delete portsAvailable[idValue];
        this.setState({portsAvailable: portsAvailable});
    },
    downloadFile(){
        console.log("plot  "/*,plot.getData()*/,plotterInputData);
        var dl = document.createElement('a');
        dl.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(JSON.stringify(plotterInputData)));
        dl.setAttribute('download', "plotterData.txt");
        dl.click();
    },
    plot() {
        var tab_data = this.state;
        var _this = this;
        var optionObject = {
            "OFF"   : 0,
            "FILE"  : 1,
            "MANUAL": 2
        };
        var iot = {"IOT_1":"0","IOT_2":"0","IOT_3":"0","IOT_4":"0","IOT_5":"0","IOT_6":"0",
        "IOT_7":"0","IOT_8":"0","IOT_9":"0","IOT_10":"0"};
        if(_this.state.currentPlotterTab == 'output'){
            if(tab_data[_this.state.currentPlotterTab].iotVariables){
                for(var eachIOT in tab_data[_this.state.currentPlotterTab].iotVariables){
                    var iotVar = tab_data[_this.state.currentPlotterTab].iotVariables[eachIOT];
                    if(optionObject[iotVar.type] == 1){
                        console.log(eachIOT,this.refs.output.getFILE_CONTENT());
                        iot[eachIOT]  = (this.refs.output.getFILE_CONTENT())[Number(eachIOT.split('_')[1])];
                    }else if(optionObject[iotVar.type] == 2){
                        iot[eachIOT] = iotVar.value+'';
                    }
                }
            }
        }
        var subscriber = {
            "OP_CODE":"writeIOTData",
            'writeIOTData':iot,
            'getIOTData':'12.222,13.3333 content',
            'readInterval':this.state[this.state.currentPlotterTab].interval,
            'writeInterval':this.state[this.state.currentPlotterTab].interval
        };
        if(tab_data[_this.state.currentPlotterTab].plot_data){
            tab_data[_this.state.currentPlotterTab].plot_data = false;
            if((socket && socket.readyState === 1)){
                socket.close();
            }
            // _this.setState({plot:plot_data});
            this._updateState(tab_data[_this.state.currentPlotterTab]);
        }else{
            if(!(socket && socket.readyState === 1)){
                // socket.close();
                socket = new WebSocket('ws://localhost:9009/connectivity');
                socket.onopen = function(event) {
                    console.log("connected");
                    if(_this.state.currentPlotterTab == 'input'){
                        subscriber["OP_CODE"] = "getIOTData";
                        socket.send(JSON.stringify(subscriber));
                        tab_data[_this.state.currentPlotterTab].plot_data = true;
                        console.log("plot_data input true");
                        _this._updateState(tab_data[_this.state.currentPlotterTab]);
                        // _this.setState({plot:plot_data});
                    }else if(_this.state.currentPlotterTab == 'output'){
                        subscriber["OP_CODE"] = "writeIOTData";
                        socket.send(JSON.stringify(subscriber));
                        tab_data[_this.state.currentPlotterTab].plot_data = true;
                        _this._updateState(tab_data[_this.state.currentPlotterTab]);
                        // _this.setState({plot:plot_data});
                    }
                };
                socket.onmessage = function(iotData) {
                    var iotVariables= JSON.parse(iotData.data);
                    plott(_this,iotVariables);
                    console.log('Client received a message',(iotData.data));
                };
                socket.onclose = function(event) {
                    console.log('Client notified socket has closed',event);
                };
            }else{
                if(_this.state.currentPlotterTab == 'input' && !_this.state.fileLocation){
                    subscriber["OP_CODE"] = "getIOTData";
                    socket.send(JSON.stringify(subscriber));
                    tab_data[_this.state.currentPlotterTab].plot_data = true;
                    tab_data['output'].plot_data = false;
                    console.log("plot_data input false");
                    _this._updateState(tab_data[_this.state.currentPlotterTab]);
                    // _this.setState({plot:plot_data});
                }else if(_this.state.currentPlotterTab == 'output'){
                    subscriber["OP_CODE"] = "writeIOTData";
                    socket.send(JSON.stringify(subscriber));
                    tab_data[_this.state.currentPlotterTab].plot_data = true;
                    tab_data['input'].plot_data = false;
                    _this._updateState(tab_data[_this.state.currentPlotterTab]);
                    // _this.setState({plot:plot_data});
                }
                // ready();
            }
        }
        // if(_this.state.fileLocation){
                    
        // }
        // if(_this.state.currentPlotterTab == 'input' && _this.state.fileLocation){
        //     var data = _this.state.file.input.content;
        //     console.log(" TODO: Give File For Download from file.input "+data);
        // }
        // if(_this.state.currentPlotterTab == 'output'){
        // }
        // console.log(_this.state);
        // try{console.log(_this.state.file.output[1].content);}catch(e){}
    },
    slideClick :function(){
        this.setState( { condition : !this.state.condition } );
    },
    iotClick:function(){
        this.setState( { iotcondition: !this.state.iotcondition } );
    },
    linkTo:function(){
        var AppUrl='/#/bisoft/local';
        browserHistory.push(AppUrl);
        window.location.reload();
    },
    render() {
        //console.log("Plotter ",this.state);
        
        var selectedTabContainer, tabInStatus, tabOutStatus, plot, disabled = true;
        if(this.state[this.state.currentPlotterTab].plot_data){
            plot = "STOP PLOT";
            disabled = !disabled;
        }else{
            plot = "PLOT";
        }
        if(this.state.currentPlotterTab == 'input'){
            tabInStatus = 'bottominputcontainer activetab';
            tabOutStatus = 'bottomoutputcontainer inactivetab';
            selectedTabContainer=(
                <PlotterInput state={this.state.input} _updateState={this._updateState} downloadFile={this.downloadFile} 
                addPortsAvailable={this.addPortsAvailable} removePortsAvailable={this.removePortsAvailable} 
                getPortsAvailable={this.getPortsAvailable} />
            );
        }else{
            tabInStatus = 'bottominputcontainer inactivetab';
            tabOutStatus = 'bottomoutputcontainer activetab';
            selectedTabContainer=(
                <PlotterOutput ref='output' state={this.state.output} _updateState={this._updateState}
                addPortsAvailable={this.addPortsAvailable} removePortsAvailable={this.removePortsAvailable} 
                getPortsAvailable={this.getPortsAvailable} />
            );
        }
        return(
               
               <div>
                  <div className="container">
                        <div className="topcontainer">
                            <div className="topleftcontainer">
                                <img style={{"cursor":"pointer"}} onClick={this.linkTo} className="logo_l" src="images/logo.png" alt="logo" />
                                <p className="plotter">Plotter</p>
                                <img className="imageplotter" src="images/actionbar_profiler.png" alt="plotter" />
                            </div>
                            <div className="toprightcontainer">
                                <img className="bluetooth" src="images/v3_remote_disconnect.png" alt="bluetooth disconnect" />
                                <button onClick={this.iotClick} className={this.state.iotcondition ? "iotadd" : "iotb"} id="iotr" type="button"></button>
                            </div>
                        </div>
                        
                        <div className="bottomcontainer">
                           <div className="bottombgcontainer">
                                <div id="chart5" className="placeholder" style={{width:'98%',height:'100%',marginLeft:'2%'}}></div>
                           </div>
                           <div className={this.state.condition ? "bottomlefthide" :""}>
                            <div className="bottomleftcontainer" id="bottomlefthide">
                                <div className="bottomlefttopcontainer">
                                    {/*<div style={{"cursor":"pointer"}} className={tabOutStatus} onClick={this.changeCurrentTab.bind(this,'output')}>
                                        <button id="outputbutton"><h3 className="output">output</h3></button>
                                    </div>*/}
                                    <div className={tabInStatus} onClick={this.changeCurrentTab.bind(this,'input')}>
                                        <h3 className="input">input</h3>
                                    </div>
                                </div>
                                {selectedTabContainer}
                                <div className="plotbar">
                                  <a><div className="plotbutton" onClick={this.plot}>
                                        <h2 className="plot">{plot}</h2>
                                  </div></a>
                                </div>  
                            </div>
                           
                        </div>
                        </div>
                        <div className="bottomrightcontainer">
                            <div className={this.state.condition ? "open" :""}>
                                    <button onClick={this.slideClick}><img id="closeimg" className="close" src="images/opened.png" alt="open" /></button>
                            </div> 
                        </div> 
                    </div>
               </div>
            );
        }
});


module.exports = Plotter;