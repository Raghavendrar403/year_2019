var React = require('react');
var PropTypes = React.PropTypes;

const Select = require('./helpers/Select');
const HexTypes = require('../HexTypes');
const Slider = require('./helpers/Slider');
var _0to60 = {}, _0to24 = {}, _0to1000 = {};
for (let i = 0; i < 24; i++) _0to24[i] = i;
for (let i = 0; i < 60; i++) _0to60[i] = i;
for (let i = 0; i < 1000; i+=50) _0to1000[i] = i;

var WaitPanel = React.createClass({
  getInitialState: function(){
    return {value: 0};
  },
  onChange: function(key, value) {
    const { state,onChange } = this.props;
    state[key] = value;
    onChange(state);
  },
  render: function() {
    const min = this.props.min || 0;
    const max = this.props.max || 255;
    const { name, assign, value, port, state, onChange } = this.props;
    var timeDelays=["Milliseconds","Seconds","Minutes","Hours"];
    return (
      <div>
        <table width='100%' height= '80%' style={{color: '#FFF'}}>
          <tbody>
            <tr style={{verticalAlign: 'middle', color: '#FFF',height: '72px'}}>
              <td style={{padding: '0.5em 0',textAlign: 'center'}}>
              Milliseconds
              </td>
              <td colSpan={4} style={{width: '90%'}}>
                <Slider name='milliseconds' options={_0to1000} value={state["ms"] || 0} min={0} max={950} onChange={(value) => this.onChange('ms',value)}/>
              </td>
            </tr> 
            <tr style={{verticalAlign: 'middle', color: '#FFF',height: '72px'}}>
              <td style={{padding: '0.5em 0',textAlign: 'center'}}>
              Seconds
              </td>
              <td colSpan={4} style={{width: '90%'}}>
                <Slider name='seconds' value={state["s"] || 0} options={_0to60} min={0} max={59} onChange={(value) => this.onChange('s',value)}/>      
              </td>
            </tr> 
            <tr style={{verticalAlign: 'middle', color: '#FFF',height: '72px'}}>
              <td style={{padding: '0.5em 0',textAlign: 'center'}}>
              Minutes
              </td>
              <td colSpan={4} style={{width: '90%'}}>
                <Slider name='minutes' value={state["m"] || 0} options={_0to60} min={0} max={59} onChange={(value) => this.onChange('m',value)}/>
              </td>
            </tr>
            <tr style={{verticalAlign: 'middle', color: '#FFF',height: '72px'}}>
              <td style={{padding: '0.5em 0',textAlign: 'center'}}>
              Hours
              </td>
              <td colSpan={4} style={{width: '90%'}}>
                <Slider name='hours' value={state["h"] || 0} options={_0to24} max={23} min={0} onChange={(value) => this.onChange('h', value)}/>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
});
module.exports = WaitPanel;

            /*<tr>
              <td><Select options={_0to24} onChange={(value)=>this.onChange('h',value)} color={HexTypes['wait'].color} selected={h || 0}/> Hours</td>
              <td><Select options={_0to60} onChange={(value)=>this.onChange('m',value)} color={HexTypes['wait'].color} selected={m || 0}/> Minutes</td>
              <td><Select options={_0to60} onChange={(value)=>this.onChange('s',value)} color={HexTypes['wait'].color} selected={s || 0}/> Seconds</td>
              <td><Select options={_0to1000} onChange={(value)=>this.onChange('ms',value)} color={HexTypes['wait'].color} selected={ms || 0}/> Milliseconds</td>
            </tr>*/
         
