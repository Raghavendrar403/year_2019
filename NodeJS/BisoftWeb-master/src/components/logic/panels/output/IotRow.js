var React = require('react');

const Select = require('../helpers/Select');
const Checkbox = require('../helpers/Checkbox');
const InputNumber = require('../helpers/InputNumber');
const Colors = require('../../Colors');

const logicVariables = require('../../logicVariables');



const IOTRow = React.createClass({

  _updateIotArrayList: function(iotList,previousIotList){
    console.log('_updateIotArrayList',iotList,previousIotList)
    /* flushing all keys in Node state. */
    this._deleteIotArrayList(previousIotList);
      
    /* Updating all keys in Node state. */
    var keyPrefixesArr = ['assign','value','valuenum'];
    for(var iotObject in iotList){
      for(var prefix in keyPrefixesArr){
        if(keyPrefixesArr[prefix] != 'value')
          this.props.onChange(keyPrefixesArr[prefix]+iotList[iotObject].dropdown1,iotList[iotObject][keyPrefixesArr[prefix]]);
        else
          this.props.onChange(keyPrefixesArr[prefix]+iotList[iotObject].dropdown1,iotList[iotObject]['dropdown2']);
      }
    }
  },
  _deleteIotArrayList: function(iotList){
    for(var index in iotList){
      this.props.onChange('assign'+iotList[index].dropdown1,false);
      this.props.onChange('value'+iotList[index].dropdown1,'edt');
      this.props.onChange('valuenum'+iotList[index].dropdown1,'0');
    }
  },

  addIotRow: function() {
    var IOTROW  = this.props.rows_state;
    var COUNTER = IOTROW.length;
    if(COUNTER < 10){
      COUNTER++;
      console.log("added",COUNTER);
      var obj = {   
                  assign      : true,
                  dropdown1   : 'IOT1',
                  dropdown2   : 'edt',
                  valuenum    : '0',
      };
      IOTROW.push(obj);
      this.props.onChange('IOTROW', IOTROW);
      this._updateIotArrayList(IOTROW,[]);
    }
  },

  _assign: function(i,value) {
    var IOTROW  = this.props.rows_state;
    console.log(i,value,IOTROW);
    var previousIOTROW = [];
    for(var index in IOTROW){
      previousIOTROW.push(IOTROW[index]);
    }
    if(value){
      IOTROW[i-1]['assign'] = value;
      this.props.onChange('IOTROW', IOTROW);
      this._updateIotArrayList(IOTROW,previousIOTROW);
    }else{
      if(IOTROW.length>1){
        IOTROW.splice(i-1, 1);    
      }else{
        IOTROW[i-1]['assign'] = value;
        this.props.onChange('IOTROW', IOTROW);
      }
      this._updateIotArrayList(IOTROW,previousIOTROW);
    }
    
  },

  _dropdown1: function(i,value) {
    console.log(i,value);
    var IOTROW  = this.props.rows_state;
    var previousIOTROW = [];
    for(var index in IOTROW){
      previousIOTROW.push(IOTROW[index]);
    }
    IOTROW[i-1]['dropdown1'] = value;
    this.props.onChange('IOTROW', IOTROW);
    this._updateIotArrayList(IOTROW,previousIOTROW);
    
  },

  _dropdown2: function(i,value) {
    console.log(i,value);
    var IOTROW  = this.props.rows_state;
    IOTROW[i-1]['dropdown2'] = value;
    this.props.onChange('IOTROW', IOTROW);
    this._updateIotArrayList(IOTROW,IOTROW);
  },

  _valuenum: function(i,value) {
    console.log(i,value);
    var IOTROW  = this.props.rows_state;
    IOTROW[i-1]['valuenum'] = value;
    this.props.onChange('IOTROW', IOTROW);
    this._updateIotArrayList(IOTROW,IOTROW);
  },

  getIotRows: function() {

    var onChange            = this.props.onChange;
    var SelectOptions       = this.props.SelectOptions;
    var SelectOptionsOrder  = this.props.SelectOptionsOrder;
    var state  = this.props.state;
    var rows_state  = this.props.rows_state;
    var temp = [];
    var currentState = this.props.rows_state;
    console.log(currentState.length,"rows");
    currentState.map((iotrow,i) => {
      i++;
      var assignInitValue= iotrow['assign']||false;
      var iotInitValue= iotrow.dropdown1||'IOT1';
      var valueInitValue= iotrow.dropdown2||'edt';
      var valueNumInitValue= iotrow['valuenum']||0;
      temp.push(
        <tr key={'row'+i} id={'row'+i} style={{verticalAlign: 'middle', color: '#FFF', borderBottom: '2px solid grey',height: '72px'}}>
          <td style={{padding: '0.5em 0', fontWeight: 'bold'}}>
            <Checkbox key={'assign_'+i} id={'assign_'+i} checked={assignInitValue} 
            onChange={(value) => this._assign(i,value)}
            label='ASSIGN'/>
          </td>
          <td>
          </td>
          <td>
              <Select key={'iotrow'+i} id={'iotrow'+i} disabled={!assignInitValue} options={SelectOptions} 
                order={SelectOptions} selected={iotInitValue} 
                onChange={(value) => this._dropdown1(i,value)} color='#FFF'
                style={{
                  display: 'inline-block',
                  margin: '0',
                  border: '3px solid #FFF',
                  padding: '0.25em 0',
                  background: Colors.blueshade,
                  width: '93%',
                  fontWeight: 'bold',
                  textAlign: 'center',
              }}/>
          </td>
          <td style={{textAlign: 'center'}}><span className='comp_lgc_pnl_out_equal' 
            style={{width:'100%', margin:'0px 30px 0px 20px'}}> = </span></td>
          <td>
            <Select key={'valueiotrow'+i} id={'valueiotrow'+i} disabled={!assignInitValue} options={logicVariables} 
              order={SelectOptionsOrder} selected={valueInitValue}
              onChange={(value) => this._dropdown2(i,value)} color='#FFF'
              style={{
                margin: '0 15%',
                color: 'black',
                padding: '0.25em 0',
                fontWeight: 'bold',
                width: '100%',
                background: 'white',
                textAlign: 'center',
              }}/>
          </td>
          <td>
            {(!valueInitValue || valueInitValue === 'edt') ? (
              <InputNumber key={'valuenumiotrow'+i} id={'valuenumiotrow'+i} disabled={!assignInitValue} 
                value={valueNumInitValue} max={65535} min={0}
                onChange={(value) => this._valuenum(i,value)}
                style={{
                  padding: '0.25em 0',
                  float:'right'
              }}/>
            ) : null}
          </td>
        </tr>
      );
    });

    return temp;
  },
  
  render: function() {
    console.log('node specific state',this.props.state);
    const { state, onChange, rows_state, SelectOptions, SelectOptionsOrder } = this.props;
    var iotRows = this.getIotRows();
    return (
        <tbody>
        <tr id='iotTable' style={{verticalAlign: 'middle', color: '#FFF'}}>
          <td style={{padding: '0.5em 0',textAlign: 'center', fontWeight: 'bold'}}>
            <label>IOT</label>
          </td>
          <td>
          </td>
          <td>
          </td>
          <td>
            <input style={{marginLeft: '33%', padding: '0 0.5em', color: '#000'}} onClick={this.addIotRow} type='button' value='Add'/>
          </td>
        </tr>
        {iotRows}
        </tbody> 

    );
  }
});

module.exports = IOTRow;


