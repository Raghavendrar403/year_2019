var React = require('react');
const HexTypes = require('../HexTypes');
const Select = require('./helpers/Select')
const Slider = require('./helpers/Slider')
var PropTypes = React.PropTypes;

const componentProps = require(__base + 'src/componentProps');
const PortConnections = require(__base + 'src/components/assembly/PortConnections');
const IOComponents = require('../IOComponents');
const logicVariables = require('../logicVariables');
var PortValuesRangeMapping = require('../PortValuesRangeMapping');
const hours = {
  "0":0,"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,
  "11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17,"18":18,"19":19,"20":20,
  "21":21,"22":22,"23":23
};
const minutes = {
  "0":0,"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,
  "11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17,"18":18,"19":19,"20":20,
  "21":21,"22":22,"23":23,"24":24,"25":25,"26":26,"27":27,"28":28,"29":29,"30":30,
  "31":31,"32":32,"33":33,"34":34,"35":35,"36":36,"37":37,"38":38,"39":39,"40":40,
  "41":41,"42":42,"43":43,"44":44,"45":45,"46":46,"47":47,"48":48,"49":49,"50":50,
  "51":51,"52":52,"53":53,"54":54,"55":55,"56":56,"57":57,"58":58,"59":59
};
var IfPanel = React.createClass({
  getInitialState: function() {
    const { state, onChange } = this.props;
    if(Object.keys(state).length<=0){
        state['source']='slider';
        state['value']=0;
        state['value2']=0;
        state['hour']=0;
        state['hour2']=0;
        state['minute']=0;
        state['minute2']=0;
    }
    onChange(state);
    return{state};
  },  
  onChange: function(key, value) {
    const { state, onChange } = this.props;
    state[key] = value;
    if(key == 'source'){
      state['condition'] = 'gt';
    }
    onChange(state);
  },
  render: function() {
    const { state, startState } = this.props;
    var sourceOptionsOrder = [], sourceOptions = {};
    Object.keys(PortConnections).forEach((port) => {
      if (!PortConnections[port]) return;
      var type = PortConnections[port].type
      if(type=="color_sensor"){
          var colourPorts=['_R','_G','_B'];
          for(var i=0;i<colourPorts.length;i++){
              sourceOptionsOrder.push(colourPorts[i]);
              sourceOptions[colourPorts[i]] = componentProps[type].name + ' \u2192 ' + colourPorts[i];
          } 
      }else if(type=="accelerometer"){
          var accPorts=['B2','B3','B4'];
          for(var i=0;i<accPorts.length;i++){
              sourceOptionsOrder.push(accPorts[i]);
              sourceOptions[accPorts[i]] = componentProps[type].name + ' \u2192 ' + accPorts[i];
          }
      }else if(type=="joystick"){
          var accPorts=['B3','B4'];
          for(var i=0;i<accPorts.length;i++){
              sourceOptionsOrder.push(accPorts[i]);
              sourceOptions[accPorts[i]] = componentProps[type].name + ' \u2192 ' + accPorts[i];
          }
      }
      else if(type=="gyro_sensor"){
          var positionPorts=['x','y','z'];
          for(var i=0;i<positionPorts.length;i++){
              sourceOptionsOrder.push(positionPorts[i]);
              sourceOptions[positionPorts[i]] = componentProps[type].name + ' \u2192 ' + positionPorts[i];
          }
      }else{
        if (IOComponents[type].input) {
          sourceOptionsOrder.push(port);
          sourceOptions[port] = componentProps[type].name + ' \u2192 ' + port;
        }
      }   
    });
    //sourceOptionsOrder.push('irr');
    //sourceOptions.irr = 'IR Remote \u2192 IR';
    Object.keys(startState).forEach((name) => {
      if (!startState[name] || name === 'bmp3') return;
      sourceOptionsOrder.push(name);
      sourceOptions[name] = logicVariables[name];
    })
    sourceOptionsOrder.push('slider');
    sourceOptions.slider = 'BT Slider';
    sourceOptionsOrder.push('remote');
    sourceOptions.remote = 'BT Remote';
    sourceOptionsOrder.push('battery');
    sourceOptions.battery = 'Battery %';
    sourceOptionsOrder.push('timeElapsed');
    sourceOptions.timeElapsed = 'Time elapsed(sec)';
    sourceOptionsOrder.push('time');
    sourceOptions.time = 'Time';
    if(this.props.startState && this.props.startState.iot){
      for(var i=1;i<=10;i++){
        sourceOptionsOrder.push('IOT'+i);
        sourceOptions['IOT'+i] = 'IOT'+i;
      }
    }
    var conditions, max, min=0, source = state.source || 'slider';
    conditions = {
      lt: 'Less than',
      gt: 'Greater than',
      eq: 'Equal to',
      ne: 'Not equal to'
    };
    if(source != 'timeElapsed'){
      conditions['bw']='In between';
      //conditions['nbw']='Not in between';
    }
    if (sourceOptionsOrder.indexOf(source) < 0) source = 'slider';
    if (source === 'irr' || source.startsWith('bic') || source.startsWith('bid') || source.startsWith('IOT')) max = 65535;
    else if (source === 'slider' || source === 'remote'|| source === 'time') max = 255;
    else if (source === 'timeElapsed') max = 2147483;
    else if (source === 'battery') max = 100;
    else if (source.startsWith('bif')) max = 1; 
    else{
      var Originalport;
      if(source=="_R" || source=="_G" || source=="_B") Originalport="F";
      else if(source=="B2" || source=="B3" || source=="B4") Originalport="B";
      else if(source=="x" || source=="y" || source=="z") Originalport="G";
      else Originalport=source;
      var comp = PortConnections[Originalport].type;
      var compName=comp.toLowerCase();
      var range=PortValuesRangeMapping[Originalport][compName](Originalport);
      min=range.min;
      max=range.max;
    }
    if (state.value > max) state.value = max;
    var ifOutputRow1 =(
      <div style={{height: '50px', width: '90%', marginLeft:'30px',marginTop:'20px'}}>    
        <Slider value={state.value || 0} onChange={(value) => this.onChange('value', value)} max={max} min={min}/>
      </div>
    ), ifOutputRow2 = '', display = 'inline-block';
    var defaultCssStyle = {
      height: '50px', width: '90%', marginLeft:'20%'
    };
    if(state.condition == 'bw' || state.condition == 'nbw'){
      ifOutputRow2 =(   
        <div style={{height: '5px', width: '90%', marginLeft:'30px'}}>    
          <Slider value={state.value2 || 0} onChange={(value) => this.onChange('value2', value)} max={max} min={min}/>
        </div>
      );
    }else{
      ifOutputRow2 = '';
    }
    if(source == 'time'){
      if(state.condition == 'bw' || state.condition == 'nbw'){
        ifOutputRow2 = '';
      }else{
        display = 'none';
        defaultCssStyle = {
          height: '50px', width: '90%', marginLeft:'40%'
        };
      }
      ifOutputRow1 =(
        <div style={defaultCssStyle}>    
            <span style={{
                color: 'white',
                fontWeight: 'bold'
              }}>{"Hours"}</span>
            <Select onChange={(value) => this.onChange('hour', value)} color={HexTypes['if'].color}
              options={hours} selected={state.hour}/>
            <span style={{
                color: 'white',
                fontWeight: 'bold'
              }}>{"Min"}</span>
            <Select onChange={(value) => this.onChange('minute', value)} color={HexTypes['if'].color}
              options={minutes} selected={state.minute}/>


            <span style={{
                  marginLeft:'20%',
                  color: 'white',
                  fontWeight: 'bold',
                  display: display
                }}>{"Hours"}</span>
              <Select style={{display: display}} onChange={(value) => this.onChange('hour2', value)} color={HexTypes['if'].color}
                options={hours} selected={state.hour2}/>
              <span style={{
                  color: 'white',
                  fontWeight: 'bold',
                  display: display
                }}>{"Min"}</span>
              <Select style={{display: display}} onChange={(value) => this.onChange('minute2', value)} color={HexTypes['if'].color}
                options={minutes} selected={state.minute2}/>
        </div>
      );
    }
    return (
      <div>
      <table width='100%'>
        <tbody>
          <tr style={{height: '72px'}}>
            <td width='10%'>
              <Select onChange={(value) => this.onChange('source', value)} color={HexTypes['if'].color}
                options={sourceOptions} order={sourceOptionsOrder} selected={source}/>
            </td>
            <td width='10%'>
              <Select onChange={(value) => this.onChange('condition', value)} color={HexTypes['if'].color}
                options={conditions} selected={state.condition || 'gt'}/>
            </td>
            <td>
             {ifOutputRow1}
             {ifOutputRow2}
            </td>
          </tr>
        </tbody>
      </table>
      </div>
    );
    
  }

});

module.exports = IfPanel;
