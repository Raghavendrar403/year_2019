/* this module is for plotter*/

var React = require('react');
import ReactDOM from 'react-dom';
var PropTypes = React.PropTypes;
import { hashHistory, browserHistory } from 'react-router';
var Utils = require(__base+'./src/utils');
var Imagepath=Utils.getImagePath();

                                       

const PlotterInput = React.createClass({
    
    getInitialState(){
        console.log("input");
        var input = this.props.state;
        return {
            iotVariables    : input.iotVariables,
            interval        : input.interval,
            plot_data       : input.plot_data
            // portsAvailable  : this.props.state.portsAvailable,
            // input           :   {
            //                     }
        };
    },
    componentDidUpdate() {
        document.getElementById('readInterval').value = this.state.interval;
    },
    componentDidMount() {
        document.getElementById('readInterval').value = this.state.interval;
        console.log("componentDidMount ");
    },
    _updateState(state) {
        this.props._updateState(state);
    },
    _switchChange(idValue){
        // var input = this.state.input;
        var iotVariables = this.state.iotVariables;
        if(iotVariables['IOT_'+idValue]){
            iotVariables['IOT_'+idValue].switches = !iotVariables['IOT_'+idValue].switches;
            // input.iotVariables = iotVariables;
            // this.setState({ iotVariables : iotVariables });
            var input = this.state;
            input.iotVariables = iotVariables;
            this._updateState(input);
        }
    },
    addIOtSwitch(){
        var startValue = Number(document.getElementsByClassName("selectiot").IOT.value);
        // this.props.addIOtSwitch(startValue, this.state.iotSwitches, this.state.iotSwitchKeys);
        // var input = this.state.input;
        var iotVariables = this.state.iotVariables;
        // var portsAvailable = this.state.portsAvailable;
        var temp = {
            id          : startValue,
            switches    : false,
            value       : 'NIL'
        };
        if(!iotVariables['IOT_'+startValue]){
            iotVariables['IOT_'+startValue] = temp;
            // delete portsAvailable[startValue];
            // input.iotVariables = iotVariables;
            // this.setState({ iotVariables : iotVariables });
            this.props.removePortsAvailable(startValue);
            var input = this.state;
            input.iotVariables = iotVariables;
            this._updateState(input);
        }
        // console.log("hello");
    },
    removeIOtSwitch(idValue){
        // var input = this.state.input;
        var iotVariables = this.state.iotVariables;
        // var portsAvailable = this.state.portsAvailable;
        delete iotVariables['IOT_'+idValue]
        // portsAvailable[idValue] = idValue;
        // input.iotVariables = iotVariables;
        this.props. addPortsAvailable(idValue);
        // this.setState({ iotVariables : iotVariables });
        var input = this.state;
        input.iotVariables = iotVariables;
        this._updateState(input);
    },
    writeFile(){
        console.log(this.state.file.content);
    },
    downloadFile(){
        this.props.downloadFile();
    },
    readInterval(){
        // var input = this.state.input;
        var interval = this.state.interval;
        var readInterval = document.getElementById('readInterval');
        if(readInterval.value && Number(readInterval.value)){
            if(Number(readInterval.value) < 100){
                readInterval.value = 100;
            }
        }
        interval = Number(readInterval.value);
        // input.interval = interval;
        // this.setState({interval: interval});
        var input = this.state;
        input.interval = interval;
        this._updateState(input);
        // this.props.saveReadInterval(Number(readInterval.value));
        // console.log(readInterval.value);
    },
    getSwitches(idValue,newSwitches) {
        newSwitches.push(
            <div className="inputiot" id={idValue} key={idValue}>
                <div className="iottext">
                   <p>IOT {idValue}</p>
                </div>
                <div className="iotbutton">
                    <label className="switch">
                        <input className="switch-input" id={"switch-input"+idValue} type="checkbox"  
                        defaultChecked={ this.state.iotVariables['IOT_'+idValue].switches } onClick={ this._switchChange.bind(this,idValue) }/>
                        <span className="switch-label" data-on="On" data-off="Off"></span> 
                        <span className="switch-handle"></span> 
                    </label>
                </div>
                <div className="iotnil">
                    <input type="text" id={"switch-input-text"+idValue} placeholder="NIL" disabled/> 
                </div>
                <div className="iotdelete">
                    <button onClick={this.removeIOtSwitch.bind(this,idValue)}><img src="images/cross.png" className="crossimg" /></button>
                </div>
            </div>
            //<button onClick={this.removeIOtSwitch.bind(this,idValue,newSwitchesKeys)} id={idValue} key={idValue}>IOT {idValue}</button>
        );
        return newSwitches;
    },
    render() {
        //console.log("PlotterInput ",this.state);
        var iotOptions = [], newSwitches = [];
        for (var iotPorts in this.props.getPortsAvailable()) {
          iotOptions.push(<option key={iotPorts} value={""+iotPorts}>IOT {iotPorts}</option>);
        }
        for (var iotVar in this.state.iotVariables) {
          newSwitches = this.getSwitches(this.state.iotVariables[iotVar].id,newSwitches);
        }
        return(
               
               <div className="inputcontainer">
                     <div className="portcontainer">
                        <div className="port">
                            <p>Port</p>
                        </div>
                        <div className="iot">
                            <select name="IOT" className="selectiot">
                                 {iotOptions}
                            </select>
                        </div>
                        <div className="add">
                             <button onClick={this.addIOtSwitch}><img  className="addi" src="images/add.png" alt="add" /></button>
                        </div>
                      </div>
                    <div className="bodycontainer">
                        {newSwitches}
                       
                    </div>
                    <div className="bottomleftbottomcontainer">
                        <div className="bottominputdisplay">
                            <div className="inputvaluetop">
                                <p className="inputp">read interval</p>
                                <span  className="inputl"><input id="readInterval" type="number" min="100" onChange={this.readInterval}/> <label>ms</label></span>
                            </div>
                            <div className="inputvaluebottom">
                                <p className="inputs">save to file</p>
                                <button type="button" id='locationb' className="locationb" style={{}} onClick={this.downloadFile} >Download</button>
                            </div>  
                        </div>
                    </div>
                   
                </div>
            );
        }
});


module.exports = PlotterInput;