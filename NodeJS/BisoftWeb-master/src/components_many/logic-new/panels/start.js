var React = require('react');
var PropTypes = React.PropTypes;

const Colors = require('../Colors')
const Checkbox = require('./helpers/Checkbox');
const InputNumber = require('./helpers/InputNumber');

const cellstyle = {borderRight: '0.125em solid ' + Colors.bordergrey, padding: '0.5em'};
const padding = {padding: '0.5em'};
const paddingNoRight = {padding: '0.5em', paddingRight: 0};
const paddingNoLeft = {paddingLeft: 0};
const blank = {height: '0.5em'};

var StartPanel = React.createClass({
  onChange: function(key, value) {
    const { state, onChange } = this.props;
    state[key] = value;
    onChange(state);
  },
  render: function() {
    const { state } = this.props;
    return (
      <table style={{
          color: '#FFF',
          padding: '0.5em',
          fontWeight: 'bold',
        }}>
        <tbody>
          <tr>
            <td style={cellstyle} colSpan={2}>BICOUNTER 1</td>
            <td style={cellstyle} colSpan={2}>BICOUNTER 2</td>
            <td style={padding} colSpan={2}>BICOUNTER 3</td>
          </tr>
          <tr>
            <td style={paddingNoRight}>
              <Checkbox checked={state.bic1 || false} onChange={(value) => this.onChange('bic1', value)}/>
            </td>
            <td style={{...cellstyle,...paddingNoLeft}}>
              <InputNumber value={0} disabled/>
            </td>
            <td style={paddingNoRight}>
              <Checkbox checked={state.bic2 || false} onChange={(value) => this.onChange('bic2', value)}/>
            </td>
            <td style={{...cellstyle,...paddingNoLeft}}>
              <InputNumber value={0} disabled/>
            </td>
            <td style={paddingNoRight}>
              <Checkbox checked={state.bic3 || false} onChange={(value) => this.onChange('bic3', value)}/>
            </td>
            <td style={{...padding, ...paddingNoLeft}}>
              <InputNumber value={0} disabled/>
            </td>
          </tr>
          <tr><td style={blank} colSpan={6}/></tr>
          <tr>
            <td style={cellstyle} colSpan={2}>BIFLAG 1</td>
            <td style={cellstyle} colSpan={2}>BIFLAG 2</td>
            <td style={padding} colSpan={2}>BIFLAG 3</td>
          </tr>
          <tr>
            <td style={paddingNoRight}>
              <Checkbox checked={state.bif1 || false} onChange={(value) => this.onChange('bif1', value)}/>
            </td>
            <td style={{...cellstyle,...paddingNoLeft}}>
              <InputNumber value={0} disabled/>
            </td>
            <td style={paddingNoRight}>
              <Checkbox checked={state.bif2 || false} onChange={(value) => this.onChange('bif2', value)}/>
            </td>
            <td style={{...cellstyle,...paddingNoLeft}}>
              <InputNumber value={0} disabled/>
            </td>
            <td style={paddingNoRight}>
              <Checkbox checked={state.bif3 || false} onChange={(value) => this.onChange('bif3', value)}/>
            </td>
            <td style={{...padding,...paddingNoLeft}}>
              <InputNumber value={0} disabled/>
            </td>
          </tr>
          <tr><td style={blank} colSpan={6}/></tr>
          <tr>
            <td style={cellstyle} colSpan={2}>BI DATA 1</td>
            <td style={cellstyle} colSpan={2}>BI DATA 2</td>
            <td style={padding} colSpan={2}>BI DATA 3</td>
          </tr>
          <tr>
            <td style={paddingNoRight}>
              <Checkbox checked={state.bid1 || false} onChange={(value) => this.onChange('bid1', value)}/>
            </td>
            <td style={{...cellstyle,...paddingNoLeft}}>
              <InputNumber value={0} disabled/>
            </td>
            <td style={paddingNoRight}>
              <Checkbox checked={state.bid2 || false} onChange={(value) => this.onChange('bid2', value)}/>
            </td>
            <td style={{...cellstyle,...paddingNoLeft}}>
              <InputNumber value={0} disabled/>
            </td>
            <td style={paddingNoRight}>
              <Checkbox checked={state.bid3 || false} onChange={(value) => this.onChange('bid3', value)}/>
            </td>
            <td style={{...padding, ...paddingNoLeft}}>
              <InputNumber value={0} disabled/>
            </td>
          </tr>
          <tr><td style={blank} colSpan={6}/></tr>
          <tr><td style={cellstyle} colSpan={2}>Bluetooth MP3</td></tr>
          <tr>
            <td style={paddingNoRight}>
              <Checkbox checked={state.bmp3 || false} onChange={(value) => this.onChange('bmp3', value)}/>
            </td>
            <td style={{...cellstyle,...paddingNoLeft}}>
              <InputNumber value={0} disabled/>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

});

module.exports = StartPanel;
