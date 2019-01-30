/* this module is for plotter*/

var React = require('react');
import ReactDOM from 'react-dom';
var PropTypes = React.PropTypes;
import { hashHistory, browserHistory } from 'react-router';
var Utils = require(__base+'./src/utils');
var Imagepath=Utils.getImagePath();

var FILE_CONTENT = {};

const PlotterOutput = React.createClass({
    getInitialState(){
        console.log("output");
        var output = this.props.state;
        return {
            min             : 0,
            max             : 65535,
            iotVariables    : output.iotVariables,
            interval        : output.interval,
            repeat          : output.repeat,
            plot_data       : output.plot_data
            // portsAvailable  : this.props.state.portsAvailable,
            // output          :   {
            //                     }
        };
    },
    _updateState(state) {
        this.props._updateState(state);
    },
    getFILE_CONTENT(){
        return FILE_CONTENT;
    },
    getSwitches(idValue,newSwitches) {
        var optionObject = {
            "OFF"   : 0,
            "FILE"  : 1,
            "MANUAL": 2
        };
        console.log("getSwitches ",idValue);
        var iotVariables = this.state.iotVariables, dropdown_id = 0;
        // var dropdown_id = iotVariables['IOT_'+idValue].dropdown_id;
        if(iotVariables['IOT_'+idValue]){
            dropdown_id = optionObject[iotVariables['IOT_'+idValue].type];
        }
        var optionArray = ["","",""];
        optionArray[dropdown_id] = "selected";
        var disabled = true;
        var dropdown_type = 'text';
        if(dropdown_id == 0){}else if(dropdown_id == 1){}else if(dropdown_id == 2){
            disabled = !disabled;
            dropdown_type = 'number';
        }
        newSwitches.push(
            <div className="inputiot" id={idValue} key={idValue}>
                <div className="iottext">
                   <p onClick={this.writeFile.bind(this,idValue)}>IOT {idValue}</p>
                </div>
                <div className="iotbutton">
                    <input id={"manualtext"+idValue} type={dropdown_type} min={this.state.min} max={this.state.max} placeholder = ""  
                     disabled = {disabled}
                    onChange={this.onChangeManualText.bind(this,idValue)}/>
                </div>
                <div className="iotnil">
                    <input type="file" accept="*/*" id={"writeFileLocation"+idValue} onChange={this.readFile.bind(this,idValue)} 
                    style={{display: 'none', width:'45%',outline: 'none',marginLeft: '50%',marginTop: '-5%',
                    backgroundColor: '#337AB7',border: 'none',color: 'white',padding: '10px 20px',borderRadius: '8px',
                    textAlign: 'center',textDecoration: 'none',fontSize: '16px'}} />
                    <select id={"output"+idValue} onChange={this.fileSelection.bind(this,idValue)}>
                        <option value="OFF" selected={optionArray[0]}>OFF</option>
                        <option value="FILE" selected={optionArray[1]}>FILE</option>
                        <option value="MANUAL" selected={optionArray[2]}>MANUAL</option>
                    </select>
                </div>
                <div className="iotdelete">
                    <button onClick={this.removeIOtSwitch.bind(this,idValue)}><img src="images/cross.png" className="crossimg" /></button>
                </div>
            </div>
            //<button onClick={this.removeIOtSwitch.bind(this,idValue,newSwitchesKeys)} id={idValue} key={idValue}>IOT {idValue}</button>
        );
        return newSwitches;
    },

    writeFile(idValue){
        if(this.state.iotVariables['IOT_'+idValue])
            console.log('content'+idValue,FILE_CONTENT[idValue]);
    },
    dummy(idValue){},
    onChangeManualText(idValue){
        var iotVariables = this.state.iotVariables;
        var inputElement = document.getElementById('manualtext'+idValue);
        if(Number(inputElement.value) <= this.state.max){

            if(Number(inputElement.value) < this.state.min){

                iotVariables['IOT_'+idValue].value = this.state.min;

            }else{

                iotVariables['IOT_'+idValue].value = Number(inputElement.value);

            }
        }else if(Number(inputElement.value) > this.state.max){

            iotVariables['IOT_'+idValue].value = this.state.max;

        }else{

            iotVariables['IOT_'+idValue].value = this.state.min;

        }

        inputElement.value = iotVariables['IOT_'+idValue].value;
        var output = this.state;
        output.iotVariables = iotVariables;
        this._updateState(output);
    },
    fileSelection(idValue){
        // var output = this.state.output;
        var optionObject = {
            "OFF"   : 0,
            "FILE"  : 1,
            "MANUAL": 2
        };
        console.log("in ",idValue);
        var iotVariables = this.state.iotVariables;
        var select = document.getElementById('output'+idValue);
        var inputElement = document.getElementById('manualtext'+idValue);
        select = this.getSelectedOption(select);
        var option = select.outerText;
        var dropdown_id = optionObject[option];
        // iotVariables['IOT_'+idValue].dropdown_id = dropdown_id;
        iotVariables['IOT_'+idValue].type = option;

        if(dropdown_id == 0){

            // iotVariables['IOT_'+idValue].dropdown_type = 'text';
            iotVariables['IOT_'+idValue].value = 'NIL';

        }else if(dropdown_id == 1){

            // iotVariables['IOT_'+idValue].dropdown_type = 'text';
            iotVariables['IOT_'+idValue].value = 'NIL';
            this.selectFileLocation(idValue);

        }else if(dropdown_id == 2){

            // iotVariables['IOT_'+idValue].dropdown_type = 'number';
            iotVariables['IOT_'+idValue].value = 0;

        }
        inputElement.value = iotVariables['IOT_'+idValue].value;
        // this.setState({iotVariables: iotVariables});
        var output = this.state;
        output.iotVariables = iotVariables;
        this._updateState(output);
    },
    selectFileLocation(idValue){
        var file = document.getElementById('writeFileLocation'+idValue);
        if(file)
            file.click();
    },
    getSelectedOption(select) {
        var option;
        for ( var optionCounter = 0, len = select.options.length; optionCounter < len; optionCounter++ ) {
            option = select.options[optionCounter];
            if ( option.selected === true ) {
                break;
            }
        }
        //console.log("in "+option.outerText); 
        return option;
    },

    readFile(idValue){
        // var output = this.state.output;
        var iotVariables = this.state.iotVariables;
        // var value = iotVariables['IOT_'+idValue].value;

        var fileLoc = document.getElementById('writeFileLocation'+idValue);
        var inputElement = document.getElementById('manualtext'+idValue);
        var files = fileLoc.files;
        var _this = this;
        if(files.length>0){
            console.log(inputElement,"saving "+files[0].name);
            var r = new FileReader();
            r.onload = function(e) { 
                var contents = e.target.result;
                var tmppath = URL.createObjectURL(files[0]);
                // file.output[idValue] = { 'name':files[0].name,'content':contents };
                // iotVariables['IOT_'+idValue].filename = files[0].name;
                iotVariables['IOT_'+idValue].value = files[0].name;
                FILE_CONTENT[idValue] = contents;
                inputElement.value = files[0].name;
                // if(output[idValue-1]['text']){
                    // output[idValue-1]['text'] = files[0].name;
                // }
                console.log(idValue,inputElement.value,files[0].name," contents saved "+tmppath );
                // _this.setState({iotVariables:iotVariables});
                var output = _this.state;
                output.iotVariables = iotVariables;
                _this._updateState(output);
            }
            r.readAsText(files[0]);
        }
    },
    addIOtSwitch(){
        var startValue = Number(document.getElementsByClassName("selectiot").IOT.value);
        FILE_CONTENT[startValue] = 'NIL';
        var iotVariables = this.state.iotVariables;
        var temp = {
            type            : 'OFF',
            value           : 'NIL'
        };
        if(!iotVariables['IOT_'+startValue]){
            iotVariables['IOT_'+startValue] = temp;
            this.props.removePortsAvailable(startValue);
            var output = this.state;
            output.iotVariables = iotVariables;
            this._updateState(output);
        }
    },
    _handleRepeat(){
        var output = this.state;
        output.repeat = !output.repeat;
        // this.setState({ output : output });
        this._updateState(output);
    },
    removeIOtSwitch(idValue){
        // var output = this.state.output;
        var iotVariables = this.state.iotVariables;
        // var portsAvailable = this.state.portsAvailable;
        delete iotVariables['IOT_'+idValue]
        // portsAvailable[idValue] = idValue;
        // output.iotVariables = iotVariables;
        this.props.addPortsAvailable(idValue);
        // this.setState({ iotVariables : iotVariables });
        var output = this.state;
        output.iotVariables = iotVariables;
        this._updateState(output);
    },
    componentWillMount () {
        // this.setState( { isChecked: this.props.isChecked } );
    },
    writeInterval(){
        // var output = this.state.output;
        var interval = this.state.interval;
        var writeInterval = document.getElementById('writeInterval');
        if(writeInterval.value && Number(writeInterval.value)){
            if(Number(writeInterval.value) < 100){
                writeInterval.value = 100;
            }
        }
        interval = Number(writeInterval.value);
        // output.interval = interval;
        // this.setState({interval: interval});
        var output = this.state;
        output.interval = interval;
        this._updateState(output);
        // console.log(readInterval.value);
    },
    componentDidMount() {
        console.log("componentDidMount ");
        var iotVariables = this.state.iotVariables;
        document.getElementById('writeInterval').value = this.state.interval;
        for (var iotVar in this.state.iotVariables) {
            var iot = Number(iotVar.split('_')[1]);//iotVariables[iotVar].id;
            // var value = iotVariables['IOT_'+iot].value;
            var inputElement = document.getElementById('manualtext'+iot);
            if(inputElement){
                inputElement.value = iotVariables['IOT_'+iot].value;
            }
        }
    },
    componentDidUpdate() {
        // var output = this.state.output;
        console.log("componentDidUpdate ");
        var iotVariables = this.state.iotVariables;
        document.getElementById('writeInterval').value = this.state.interval;
        for (var iotVar in this.state.iotVariables) {
            var iot = Number(iotVar.split('_')[1]);//iotVariables[iotVar].id;
            // var value = iotVariables['IOT_'+iot].value;
            var inputElement = document.getElementById('manualtext'+iot);
            if(inputElement && iotVariables['IOT_'+iot]){
                inputElement.value = iotVariables['IOT_'+iot].value;
            }else{
                inputElement.value = 'NIL';
            }
        }
    },
    render() {
        console.log("PlotterOutput ",this.state);
        var iotOptions = [], newSwitches = [];
        for (var iotPorts in this.props.getPortsAvailable()) {
          iotOptions.push(<option key={iotPorts} value={""+iotPorts}>IOT {iotPorts}</option>);
        }
        for (var iotVar in this.state.iotVariables) {
          newSwitches = this.getSwitches(Number(iotVar.split('_')[1]),newSwitches);
        }
        return(
               
               <div className="outputcontainer">
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
                              <button onClick={this.addIOtSwitch}><img className="addi" src="images/add.png" alt="add" /></button>
                        </div>
                    </div>
                    <div className="bodycontainer">
                        {newSwitches}
                    </div>
                    <div className="bottomleftbottomcontainer">
                        <div className="bottomoutputdisplay" id="outputshow">
                            <div className="outputvaluetop">
                                <p className="outputp">write interval</p>
                                <span  className="outputl"><input id="writeInterval" type="number" min="100" onChange={this.writeInterval}/> <label>ms</label></span>
                            </div>
                            <div className="outputvaluebottom">
                                <p className="outputm">repeat</p>
                                <label className="switch_output">
                                    <input className="switch-input" type="checkbox"  defaultChecked={ this.state.repeat } onClick={ this._handleRepeat }/>
                                    <span className="switch-label_o" data-on="On" data-off="Off"></span> 
                                    <span className="switch-handle_o"></span> 
                                </label>
                            </div>
                        </div>
                        
                    </div>
                    
                </div>
            );
        }
});


module.exports = PlotterOutput;