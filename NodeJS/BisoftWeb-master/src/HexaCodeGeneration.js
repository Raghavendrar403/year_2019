const PortConnections = require(__base + 'src/components/assembly/PortConnections');
module.exports = function(logic){
      //For generating program_code.
      function CreateNodeList(node,out){
          var nodeType,nodeDetails;
          nodeType=node.type;
          nodeDetails=node.state;
          var nodeToInsert={};
          nodeToInsert[nodeType]=nodeDetails;
          out.push(nodeToInsert);
          if(node.subprogram){
              for(var sp=0;sp<node.subprogram.length;sp++){
                  CreateNodeList(node.subprogram[sp],out); 
              }
              var endNode={};
              endNode['end'+nodeType]=nodeDetails;
              out.push(endNode);
          }
          return out;
      }

      //Assembly program
      var logicData=logic;
      var componentsConnected=PortConnections;
      var connectionsList={};
      var portsConnectedArray=[];
      for(var eachConnection in componentsConnected){
          if(componentsConnected[eachConnection]){
              portsConnectedArray.push(eachConnection);
          }
      }
      console.log(portsConnectedArray);

      if(portsConnectedArray){
        for(var n=0;n<portsConnectedArray.length;n++){
              connectionsList[portsConnectedArray[n]]=componentsConnected[portsConnectedArray[n]].type;
        }
      }
      console.log(connectionsList); 
      //logic program
      var logicProgramData=logicData.program;
      var out=[];
      for(var p=0;p<logicProgramData.length;p++){
          CreateNodeList(logicProgramData[p],out);
      }
      var endNode={};
      endNode[logicData.end.type]=logicData.end.state;
      out.push(endNode);

      var uploadData={};
      uploadData['connections']=connectionsList;
      uploadData['logic']=out;
      uploadData=JSON.stringify(uploadData);

      var Uploadprogram='';
      Uploadprogram+='RT$5$11SET';

      uploadData=JSON.parse(uploadData);
      var connectionsList={};
      connectionsList=uploadData.connections;
      var PortsConnected=[];
      var portsCode='';

      var PortsAndPortbytes={
        'A1':['A1'],
        'A2':['A2'],
        'A3':['A3'],
        'A4':['A4'],
        'A5':['A5'],
        'A6':['A6'],
        'g1':['g1'],
        'g2':['g2'],
        'f1':['f1'],
        'f2':['f2'],
        'BC':['b1','b2','b3','b4','c1','c2','c3','c4'],
        'DE':['d1','d2','d3','d4','e1','e2','e3','e4'],
        'FG':['f1','f2','f3','f4','g1','g2','g3','g4'],
        'MOTOR1':['MOTOR1'],
        'MOTOR2':['MOTOR2'],
        'Beeper':['Beeper'],

      };
      var CorrespondingPortCode={};
      CorrespondingPortCode={
        'led' : 'P',
        'geared_motor' : 'P',
        'mini_geared_motor':'P',
        'servo_extender':'S',
        'servo_motor' : 'P',
        'dc_motor' : 'P',
        '7segment_display' : 'O',
        '4_CH_relay':'O',
        'relay' : 'O',
        'mp3':'F',
        'electromagnet' : 'P',
        'led_strip' : 'O',
        'light_sensor' : 'A',
        'bend_sensor' : 'A',
        'gas_sensor' : 'A',
        'distance_sensor' : 'A',
        'sound sensor' : 'A',
        'temperature_sensor' : 'A',
        'rain_sensor' : 'A',
        'ultrasound' : 'U',
        'tact_switch' : 'I',
        'dual_switch':'I',
        'touch_sensor':'I',
        'pir_sensor':'I',
        'gesture_sensor':'G',
        'rotational_sensor' : 'A',
        'accelerometer' : 'A',
        'solar_panel' : 'A',
        'battery' : 'O',
        'joy_stick':'A',
        'gyro_sensor':'G',
        'beeper' : 'P',
      };
      var PortBytesToComponentcode={};
      for(var portname in PortsAndPortbytes){
          var comp,j;
          comp=connectionsList[portname];
          for(j=0;j<PortsAndPortbytes[portname].length;j++){
                if(comp){
                    PortBytesToComponentcode[PortsAndPortbytes[portname][j]]=CorrespondingPortCode[comp];
                }else{
                    PortBytesToComponentcode[PortsAndPortbytes[portname][j]]='O';
                }
          }  
      }
      
      console.log(PortBytesToComponentcode);
      var FinalCode='';
      var codeTemplate='A1A2A3A4A5A6b1b2b3b4c1c2c3c4d1d2d3d4e1e2e3e4f1f2f3f4g1g2g3g4MOTOR1MOTOR2Beeper';
      for(var portBytes in PortBytesToComponentcode){ 
          codeTemplate=codeTemplate.replace(portBytes,PortBytesToComponentcode[portBytes]);
      }
      FinalCode=codeTemplate;
      console.log(FinalCode);
      Uploadprogram+=FinalCode;
      Uploadprogram+='00000000000000000000000000'; 

      var PortByteNumericalValues={
        'A1':'1',
        'A2':'2',
        'A3':'3',
        'A4':'4',
        'A5':'5',
        'A6':'6',
        'b1':'7',
        'b2':'8',
        'b3':'9',
        'b4':'10',
        'c1':'11',
        'c2':'12',
        'c3':'13',
        'c4':'14',
        'd1':'15',
        'd2':'16',
        'd3':'17',
        'd4':'18',
        'e1':'19',
        'e2':'20',
        'e3':'21',
        'e4':'22',
        'f1':'23',
        'f2':'24',
        'f3':'25',
        'f4':'26',
        'g1':'27',
        'g2':'28',
        'g3':'29',
        'g4':'30',
        'MOTOR1':'31',
        'MOTOR2':'32',
        'Beeper':'33',
        'reserved for future':'34',
        'Bicounter1 - increment':'35',
        'Bicounter2 - increment':'36',
        'Bicounter3 - increment':'37',
        'Bicounter1 - decrement':'38',
        'Bicounter2 - decrement':'39',
        'Bicounter3 - decrement':'40',
        'Bicounter1 - assign':'50',
        'Bicounter2 - assign':'51',
        'Bicounter3 - assign':'52',
        'Biflag1':'53',
        'Biflag2':'54',
        'Biflag3':'55',
        'Bidata1':'56',  
        'Bidata2':'57',  
        'Bidata3':'58',  
        'reserved':'59',
        'reserved':'60',
        'reserved':'61',
        'Btremote':'75',
        'IRdata':'76',
        'Mp3':'98',
        "mp3":'78'
      };

      var nodeDefaultCodes={
        "wait":"w",
        "if":"d00",
        "endif":"0-,",
        "loop":"l00",
        "endloop":"0-L",
        "output":"o{",
        "end":"RST",

      };

      function codeForNodes(type,nodeDetails){
            var codeForCurrentNode;
            if(type=="wait"){
                var minutes=0,hours=0,milliseconds=0,seconds=0;
                if(nodeDetails.h){
                    hours=nodeDetails.h;
                }
                if(nodeDetails.m){
                    minutes=nodeDetails.m;
                }
                if(nodeDetails.s){
                    seconds=nodeDetails.s;
                }
                if(nodeDetails.ms){
                    milliseconds=nodeDetails.ms;
                }
                var timeToWait=(hours*60*60*1000)+(minutes*60*1000)+(seconds*1000)+(milliseconds);
                codeForCurrentNode=nodeDefaultCodes[type]+timeToWait;
            }else if(type=="if"){
                var nodePort;
                var value;
                var decimalValue='';
                if(nodeDetails.source){ 
                    nodePort=nodeDetails.source;
                    var portCode=PortByteNumericalValues[nodePort];
                    value=nodeDetails.value; 
                    if(!value){
                      value=0;
                    }
                    var binary=value.toString(2);
                    var lb=binary.slice(-8);
                    if(!lb){
                       lb=0;
                    }
                    var hb=binary.replace(lb,'');
                    if(!hb){
                       hb=0;
                    }
                    var hbDec=parseInt(hb, 2);
                    var lbDec=parseInt(lb, 2); 
                    
                    decimalValue+=hbDec;
                    decimalValue+=lbDec;
                    var ifCondition;
                    if(nodeDetails.condition){
                        if(nodeDetails.condition=="lt"){
                          ifCondition="<";
                        }else if(nodeDetails.condition=="gt"){
                          ifCondition=">";
                        }else if(nodeDetails.condition=="eq"){
                          ifCondition="=";
                        }else{
                          ifCondition="!";
                        }
                    }else{
                      ifCondition="<";
                    }
                }else{
                    portCode=' ';
                    decimalValue='0';
                    ifCondition='<'; 
                }
                codeForCurrentNode=nodeDefaultCodes[type]+portCode+decimalValue+ifCondition;
            }else if(type=="endif"){
                codeForCurrentNode=nodeDefaultCodes[type];
            }else if(type=="loop"){
                var nodeValue=nodeDetails.times;
                codeForCurrentNode=nodeDefaultCodes[type]+nodeValue;
            }else if(type=="endloop"){
                codeForCurrentNode=nodeDefaultCodes[type];
            }else if(type=="end"){
                codeForCurrentNode=nodeDefaultCodes[type];
            }else if(type=="output"){
                var completePortCode='';
                for(var eachItemInDetails in nodeDetails)
                {
                    if(eachItemInDetails.indexOf("assign")>=0){
                        if(nodeDetails[eachItemInDetails]){
                            var CurrentPort=eachItemInDetails.replace("assign",'');
                            var currentPortBytes=PortsAndPortbytes[CurrentPort];
                            var i;
              if(currentPortBytes){
                for(i=0;i<currentPortBytes.length;i++){
                  var portByteSelected=currentPortBytes[i];
                  var currentPortCode=PortByteNumericalValues[portByteSelected];
                  var portValue=nodeDetails["value"+portByteSelected];
                  if(!portValue){
                    portValue=0;
                  }
                  var binary=portValue.toString(2);
                  var lb=binary.slice(-8);
                    if(!lb){
                      lb=0;
                    }
                  var hb=binary.replace(lb,'');
                  if(!hb){
                    hb=0;
                  }
                  var hbDec=parseInt(hb, 2);
                  var lbDec=parseInt(lb, 2); 
                  var decimalValue='';
                  decimalValue+=hbDec;
                  decimalValue+=lbDec;
                  completePortCode+=currentPortCode+decimalValue; 
                }
              }
                             
                        }
                    } 
                }
                if(completePortCode){
                    completePortCode=completePortCode.replace(new RegExp("true", 'g'), "1");
                    completePortCode=completePortCode.replace(new RegExp("false", 'g'), "0");
                }
                codeForCurrentNode=nodeDefaultCodes[type]+completePortCode+'}';
            }else{
                return '';
            }
      return codeForCurrentNode;
      }
     
      var UserProgram=uploadData.logic;
      var k;
    var completeLogicProgram='';
      for(k=0;k<UserProgram.length;k++){
          for(var eachNode in UserProgram[k]){
              //console.log(eachNode);
        completeLogicProgram+=codeForNodes(eachNode,UserProgram[k][eachNode]); 
          }
      }
    //console.log("completeLogicProgram",completeLogicProgram);
     
    Uploadprogram+=completeLogicProgram;
    //console.log(Uploadprogram);

    return Uploadprogram;

};