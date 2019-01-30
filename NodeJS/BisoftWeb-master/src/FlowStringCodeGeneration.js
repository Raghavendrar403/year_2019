var CodeGenerationRangeValues = require('./CodeGenerationRangeValues.js');
var CodeGenerationConstants = require('./CodeGenerationConstants.js');
module.exports = function(logicNew, PortConnections){
    
    var NUMOFBITS = 16;
    var NUMOFBYTES = 2;
    
    function getDecimalValue(Hexa,numOfBytes){
      var len=Hexa.length;
      numOfBytes = numOfBytes*2;
      var loopLimit = numOfBytes-len;
      // loop for adding extra zeros to hexa value.
      for(var counter=1;counter<=loopLimit;counter++){
        Hexa='0'+Hexa;
      }
      var tempHexa='';var startingIndex=0;Hexa+="";
      //loop for seperating bytes with ':'.
      for(var currentIndex=0;   currentIndex<numOfBytes;   currentIndex=currentIndex+2){
        tempHexa += parseInt(Hexa.substring(startingIndex, currentIndex+2), 16);
        if(currentIndex != (numOfBytes-2))
          tempHexa += ':';
        startingIndex = currentIndex+2;
      }
      var decimalValue=tempHexa;
      return decimalValue;
    }

    function CreateNodeList(node,out){
        var nodeType,nodeDetails;
        nodeType=node.type;
        nodeDetails=node.state;
        var nodeToInsert={};
        nodeToInsert[nodeType]=nodeDetails;
        out.push(nodeToInsert);
        if(node.subprogram){
            for(var sp=0;sp<node.subprogram.length;sp++){
              if(!node.subprogram[sp].invalid)
                CreateNodeList(node.subprogram[sp],out);
              else if(node.subprogram[sp].invalid == undefined)
                CreateNodeList(node.subprogram[sp],out); 
            }
            var endNode={};
            endNode['end'+nodeType]=nodeDetails;
            out.push(endNode);
        }
        return out;
    }

    // Flow code cards object evaluation functions
    function hassubProgram(node){
        if((node=="if")||(node=="loop")){
          return true;
        }else{
          return false;
        }
    }

    function getSubnode(node,nodeNumber){
        var subnodeIndex;
        if((node.type=='if')||(node.type=='loop')){
            if(nodeNumber==2){  //for else condition           
              subnodeIndex=node.connections[2].to;
            }else{
              subnodeIndex=node.connections[1].to;
            }
            if(subnodeIndex==node.cardId){
                return null;
            }else{
                return cardConnections[subnodeIndex];
            }
        }else{
            return null;
        }
    }

    function getNextnode(node){
        var nextnodeIndex;
        if(node.type=='if'){
            nextnodeIndex = node.connections[3].to;
        }else if(node.type=='loop'){
            nextnodeIndex = node.connections[2].to;       
        }else if(node.type=='start'){
            nextnodeIndex = node.connections[0].to;    
        }else{
            nextnodeIndex = node.connections[1].to;
        }
        if(nextnodeIndex==node.cardId){
            return null;
        }else{
            return cardConnections[nextnodeIndex];
        }
    }

    function makeProgram(prog,node){
        if((!node) || (node.type=='end') || (node.length<=0))
            return prog;
        else{
            if(hassubProgram(node.type)){
                var subProgramIndex=node.connections[0].to;
                if(node.type=="if"){
                    var nodeElse = jQuery.extend(true, {}, node);

                    var subprogram=makeProgram([],getSubnode(node));
                    node['subprogram']=subprogram;

                    var subprogramElse = makeProgram([],getSubnode(nodeElse,2)); //for else,one more node is created
                    nodeElse['subprogram']=subprogramElse;
                    nodeElse.type="else";

                    prog.push(node);
                    prog.push(nodeElse);
                }else{
                    var subprogram=makeProgram([],getSubnode(node));
                    node['subprogram']=subprogram;
                    prog.push(node);
                }  
            }else{
                prog.push(node);
            } 
            return makeProgram(prog,getNextnode(node));

        }
    }

    // Assembly program
    var logicData=logicNew;
    var componentsConnected=PortConnections;

    var connectionsList={};
    var portsConnectedArray=[];
    for(var eachConnection in componentsConnected){
          if(componentsConnected[eachConnection]){
              portsConnectedArray.push(eachConnection);
          }
    }
    if(portsConnectedArray){
        for(var n=0;n<portsConnectedArray.length;n++){
            connectionsList[portsConnectedArray[n]]=componentsConnected[portsConnectedArray[n]].type;
        }
    }
    var logicProgramData;

    //New Logic
    var NewlogicCards=logicData.cards;
    var cardConnections=logicData.cardConnections;
    var prog=[];
    logicProgramData=makeProgram(prog,cardConnections[0]);
    console.log("program: "+logicProgramData);
    // New Logic ends

    //logic program
    var out=[];
    for(var p=0;p<logicProgramData.length;p++){
      if(!logicProgramData[p].invalid)
        CreateNodeList(logicProgramData[p],out);
      else if(logicProgramData[p].invalid == undefined)
        CreateNodeList(logicProgramData[p],out);
    }
    var endNode={};
    endNode[logicData.end.type]=logicData.end.state;
    out.push(endNode);

    var uploadData={};
    uploadData['connections']=connectionsList;
    uploadData['logic']=out;


      uploadData=JSON.stringify(uploadData);

      uploadData=JSON.parse(uploadData);
      var connectionsList={};
      connectionsList=uploadData.connections;

      var Uploadprogram = '11SET';
      var PortsAndPortbytes             = CodeGenerationConstants.PortsAndPortbytes;
      var CorrespondingPortCode         = CodeGenerationConstants.CorrespondingPortCode;
      var PortByteValuesIf              = CodeGenerationConstants.PortByteValuesIf;
      var PortByteNumericalValuesIf     = CodeGenerationConstants.PortByteNumericalValuesIf;
      var PortByteNumericalValuesOutput = CodeGenerationConstants.PortByteNumericalValuesOutput;
      var BiDataValuesOutput            = CodeGenerationConstants.BiDataValuesOutput;
      var nodeDefaultCodes              = CodeGenerationConstants.nodeDefaultCodes;

      var PortBytesToComponentcode={};
      for(var portname in PortsAndPortbytes){
        var comp,j;
        comp=connectionsList[portname];
        for(j=0;j<PortsAndPortbytes[portname].length;j++){
          if(comp){
            if(comp=="led" || comp=="laser"){
              if(portname=="A1" || portname=="A4" || portname=="G1" || portname=="G2" || portname=="F1" || portname =="F2"){
                PortBytesToComponentcode[PortsAndPortbytes[portname][j]]='O';
              }else{
                PortBytesToComponentcode[PortsAndPortbytes[portname][j]]=CorrespondingPortCode[comp];
              }
            }
            else{
              PortBytesToComponentcode[PortsAndPortbytes[portname][j]]=CorrespondingPortCode[comp];
            }
          }else{
              PortBytesToComponentcode[PortsAndPortbytes[portname][j]]='O';
          }
        }  
      }
      var FinalCode='';
      var codeTemplate='A1A2A3A4A5A6B1B2B3B4C1C2C3C4D1D2D3D4E1E2E3E4F1F2F3F4G1G2G3G4MOTOR1MOTOR2Beeper';
      for(var portBytes in PortBytesToComponentcode){ 
          codeTemplate=codeTemplate.replace(portBytes,PortBytesToComponentcode[portBytes]);
      }
      FinalCode=codeTemplate;
      Uploadprogram+=FinalCode;
      var codeLen=codeTemplate.length;
      for(var i=codeLen;i<=60;i++){
         Uploadprogram+='0'; 
      }
      Uploadprogram+=';'

    

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
                var timeToWait=parseInt(hours*60*60*1000)+parseInt(minutes*60*1000)+parseInt(seconds*1000)+parseInt(milliseconds);
              timeToWait=parseInt(timeToWait).toString(16);
              timeToWait+="";
              var len=timeToWait.length;        
              for(var i=1;i<=8-len;i++){
                timeToWait='0'+timeToWait;
              }
              var tempTimeToWait=":";var w=0;timeToWait+="";
              for(var j=0;j<8;j=j+2){
                tempTimeToWait+=parseInt(timeToWait.substring(w,j+2),16);
                if(j!=6)
                  tempTimeToWait+=':';
                w=j+2;
              }
              timeToWait=tempTimeToWait+';';
            codeForCurrentNode=nodeDefaultCodes[type]+timeToWait;
            }else if(type=="if" || type == 'else'){
              var nodePort;
              var value;
              var decimalValue = '';
              if(nodeDetails.source){ 
                nodePort=nodeDetails.source;
                if(PortByteNumericalValuesIf[nodePort] == undefined){
                  console.log("nodePort = "+nodePort);
                  if(PortByteValuesIf[nodePort]){
                    nodePort = PortByteValuesIf[nodePort];
                  }
                }
                var portCode=PortByteNumericalValuesIf[nodePort];
                value=nodeDetails.value; 
                if(!value){
                  value=0;
                }
                if(CodeGenerationRangeValues && CodeGenerationRangeValues[nodePort] && CodeGenerationRangeValues[nodePort][compName]   && nodePort != "Btremote"){
                  value=CodeGenerationRangeValues[nodePort][compName](value);
                }
                if(nodePort=="_R" || nodePort=="_G" || nodePort=="_B") {
                  nodePort="F";
                }
                else if(nodePort=="B2" || nodePort=="B3" || nodePort=="B4")
                  nodePort="B";
                else if(nodePort == "timeElapsed"){
                  NUMOFBYTES = 4;
                  value *= 1000;  // converting to mili secs
                }
                var compName=connectionsList[nodePort];
                if(compName == "rfid"){
                  portCode=PortByteNumericalValuesIf[compName];
                }
                if(nodeDetails.condition  && type == 'else'){
                  if(nodeDetails.condition=="ne"){
                    ifCondition="61";           // '='
                  }else if(nodeDetails.condition=="lt"){
                    ifCondition="62"; --value;  // '>'
                  }else if(nodeDetails.condition=="eq"){
                    ifCondition="33";           // '!'
                  }else if(nodeDetails.condition=="gt"){
                    ifCondition="60"; ++value;  // '<'
                  }else if(nodeDetails.condition=="bw"){
                    ifCondition="64";           // '@'
                  }else if(nodeDetails.condition=="nbw"){
                    ifCondition="63";           // '?'
                  }
                }else if(type == 'else'){
                  ifCondition="60"; ++value;    // '<'
                }
                var Hexa='';
                if(nodePort != 'time'){
                  Hexa=''+value.toString(NUMOFBITS);
                  decimalValue+=getDecimalValue(Hexa,NUMOFBYTES);
                  if(nodeDetails.condition == "bw" || nodeDetails.condition == "nbw"){
                    Hexa=''+(nodeDetails.value2).toString(NUMOFBITS);
                    decimalValue+=':'+getDecimalValue(Hexa,NUMOFBYTES);
                  }
                }else{
                  Hexa=''+(parseInt(nodeDetails.hour*60*60*1000)+parseInt(nodeDetails.minute*60*1000)).toString(NUMOFBITS);
                  decimalValue+=getDecimalValue(Hexa,NUMOFBYTES);
                  if(nodeDetails.condition == "bw" || nodeDetails.condition == "nbw"){
                    Hexa=''+(parseInt(nodeDetails.hour2*60*60*1000)+parseInt(nodeDetails.minute2*60*1000)).toString(NUMOFBITS);
                    decimalValue+=':'+getDecimalValue(Hexa,NUMOFBYTES);
                  }
                }
                  
              }else{
                portCode='39';
                // decimalValue=':00;:00;';
                // ifCondition='<'; 
              }
              var ifCondition;
              if(nodeDetails.condition  && type == 'if'){
                if(nodeDetails.condition=="ne"){
                  ifCondition="33";   // '!'
                }else if(nodeDetails.condition=="lt"){
                  ifCondition="60";   // '<'
                }else if(nodeDetails.condition=="eq"){
                  ifCondition="61";   // '='
                }else if(nodeDetails.condition=="gt"){
                  ifCondition="62";   // '>'
                }else if(nodeDetails.condition=="bw"){
                  ifCondition="63";   // '?'
                }else if(nodeDetails.condition=="nbw"){
                  ifCondition="64";   // '@'
                }
              }else if(type == 'if'){
                ifCondition="62";     // '>'
              }
              // if(nodePort == 'F'){
                // portCode = '2D';
              // }
              if(decimalValue.split(':').length < 4){
                codeForCurrentNode=nodeDefaultCodes[type]+':0:0:'+portCode+':'+decimalValue+':'+ifCondition+';';
              }else if(decimalValue.split(':').length >= 4){
                decimalValueArray = decimalValue.split(':');
                codeForCurrentNode=nodeDefaultCodes[type]+':'+decimalValueArray[0]+':'+decimalValueArray[1]+':'+portCode+':'+decimalValueArray[2]+':'+decimalValueArray[3]+':'+ifCondition+';';
              }
            }else if(type=="endif" || type == 'endelse'){
                codeForCurrentNode=nodeDefaultCodes[type]+';';
            }else if(type=="loop"){
                if(nodeDetails.times){
                  var nodeValue=nodeDetails.times;
                }else{
                  var nodeValue=1;
                }
                codeForCurrentNode=nodeDefaultCodes[type]+':'+nodeValue+';';
            }else if(type=="endloop"){
                codeForCurrentNode=nodeDefaultCodes[type]+';';
            }else if(type=="end"){
                if(nodeDetails){
                   codeForCurrentNode=nodeDefaultCodes[nodeDetails];
                }else{
                   codeForCurrentNode=nodeDefaultCodes["end"];
                }
            // }else if(type=="repeat"){
                // codeForCurrentNode=nodeDefaultCodes[type];
            }else if(type=="output"){
                var completePortCode='';
                for(var eachItemInDetails in nodeDetails){
                  if(eachItemInDetails.indexOf("assign")>=0){
                    if(nodeDetails[eachItemInDetails]){     
                        var CurrentPort=eachItemInDetails.replace("assign",'');  
                        var compName=connectionsList[CurrentPort];
                        var currentPortBytes;
                        if(CurrentPort=="B" || CurrentPort=="BC"){
                            if(compName=="dot_matrix") 
                              currentPortBytes=PortsAndPortbytes["dot_matrix"];
                            else 
                              currentPortBytes=PortsAndPortbytes[CurrentPort];
                            var i;
                            if(currentPortBytes){ 
                              for(i=0;i<currentPortBytes.length;i++){
                                var portByteSelected=currentPortBytes[i];
                                var currentPortCode=PortByteNumericalValuesOutput[portByteSelected];
                                var portValue;
                                if(compName=="dot_matrix") {
                          if(nodeDetails[portByteSelected]){
                            portValue=nodeDetails[portByteSelected].charCodeAt(0);
                          }else{
                            portValue = " ".charCodeAt(0);
                          }
                        }else{
                                    portValue=nodeDetails["value"+portByteSelected];
                                    portValue=CodeGenerationRangeValues[CurrentPort][compName](portValue);
                                } 
                                if(portValue==true){
                                  portValue=1;
                                }
                                if(portValue==false){
                                  portValue=0;
                                }
                                if(!portValue){
                                  portValue=0;
                                }
                                var binary=portValue.toString(2);
                                var lb=binary.slice(-8);
                                if(!lb){
                                  lb=0;
                                }
                                var hb=binary.slice(0,binary.lastIndexOf(lb));
                                if(!hb){
                                  hb=0;
                                }
                                var hbDec=parseInt(hb, 2).toString(16);
                                var lbDec=parseInt(lb, 2).toString(16); 
                                var decimalValue='';
                                decimalValue+=':'+hbDec+';';
                                decimalValue+=':'+lbDec+';';
                                completePortCode+=':'+currentPortCode+';'+decimalValue; 
                              }
                            }
                        }
                        else if(CurrentPort.includes("bi") || CurrentPort.includes("btr")){
                            currentPortBytes=PortsAndPortbytes[CurrentPort];
                            var i;
                            var decimalValue='';
                            var currentPortCode;
                            if(currentPortBytes){ 
                              for(i=0;i<currentPortBytes.length;i++){
                                var portByteSelected=currentPortBytes[i];
                                if(CurrentPort.includes("Countbic") && !portByteSelected.includes("assign")){
                                  if(nodeDetails["value"+CurrentPort]){
                                    currentPortCode=PortByteNumericalValuesOutput[portByteSelected+"increment"];
                                  }else{
                                    currentPortCode=PortByteNumericalValuesOutput[portByteSelected+"decrement"];
                                  }
                                }else{
                                  currentPortCode=PortByteNumericalValuesOutput[portByteSelected];
                                }
                                var portValue = 0;
                                if(CurrentPort.includes("Countbic")){
                                  portValue=nodeDetails["valueNum"+CurrentPort];
                                }
                                else if(CurrentPort.includes("bic")){
                                  portValue=nodeDetails["valuenum"+CurrentPort];
                                }
                                else if(CurrentPort.includes("bif")){
                                  portValue=nodeDetails["value"+CurrentPort];
                                }
                                else{
                                  if(Number(nodeDetails["valuenum"+CurrentPort])){
                                    portValue=nodeDetails["valuenum"+CurrentPort];                    
                                  }
                                }
                                if(portValue==true){
                                  portValue=1;
                                }
                                if(portValue==false){
                                  portValue=0;
                                }
                                if(!portValue){
                                  portValue=0;
                                }
                                portValue = Number(portValue);
                                var binary=portValue.toString(2);
                                var lb=binary.slice(-8);
                                if(!lb){
                                  lb=0;
                                }
                                var hb=binary.slice(0,binary.lastIndexOf(lb));
                                if(!hb){
                                  hb=0;
                                }
                                var hbDec=parseInt(hb, 2).toString(16);
                                var lbDec=parseInt(lb, 2).toString(16); 
                                
                                decimalValue+=''+parseInt(hbDec,16);
                                decimalValue+=':'+parseInt(lbDec,16);
                              }
                            }
                            completePortCode+=':'+currentPortCode+':'+decimalValue; 
                            if(CurrentPort.includes("bid")){
                              if(nodeDetails["value"+CurrentPort]){
                                completePortCode+=':'+BiDataValuesOutput[nodeDetails["value"+CurrentPort]];
                              }
                              else{
                                completePortCode+=':0';
                              }
                            }
                        }
                        else{
                            currentPortBytes=PortsAndPortbytes[CurrentPort];
                            var i;
                            var decimalValue='';
                            if(currentPortBytes){ 
                              for(i=0;i<currentPortBytes.length;i++){
                                var portByteSelected=currentPortBytes[i];
                                var currentPortCode=PortByteNumericalValuesOutput[portByteSelected];
                                var portValue;
                                portValue=nodeDetails["value"+portByteSelected]||0;
                                if(portValue==true){
                                  portValue=1;
                                }
                                if(portValue==false){
                                  portValue=0;
                                }
                                if(!portValue){
                                  portValue=0;
                                }
                                var compName=connectionsList[portByteSelected];
                                if(CodeGenerationRangeValues && CodeGenerationRangeValues[portByteSelected] && CodeGenerationRangeValues[portByteSelected][compName]){
                                  portValue=CodeGenerationRangeValues[portByteSelected][compName](portValue);
                                  var binary=portValue.toString(2);
                                  var lb=binary.slice(-8);
                                  if(!lb){
                                    lb=0;
                                  }
                                  var hb=binary.slice(0,binary.lastIndexOf(lb));
                                  if(!hb){
                                    hb=0;
                                  }
                                  var hbDec=parseInt(hb, 2).toString(16);
                                  var lbDec=parseInt(lb, 2).toString(16); 
                                  
                                  decimalValue+=''+parseInt(hbDec,16);
                                  decimalValue+=':'+parseInt(lbDec,16);
                                }
                              }
                            }
                            completePortCode+=':'+currentPortCode+':'+decimalValue; 
                        }
                    }
                }
            }
            if(completePortCode){
                    completePortCode=completePortCode.replace(new RegExp("true", 'g'), "1");
                    completePortCode=completePortCode.replace(new RegExp("false", 'g'), "0");
            }
            codeForCurrentNode=nodeDefaultCodes[type]+completePortCode+':};';
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
          completeLogicProgram+=codeForNodes(eachNode,UserProgram[k][eachNode]); 
        }
    }

    Uploadprogram+=completeLogicProgram;
    return Uploadprogram;
};
