const PortConnections = require(__base + 'src/components/assembly/PortConnections');
var initCode = require('./initCode.js');
var generateCodeMapping = require('./generateCodeMapping.js');
var CodeGenerationRangeValues = require('./CodeGenerationRangeValues.js');
module.exports = function(logicNew){
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

    var NewlogicData=logicNew;
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

    //New Logic
    var NewlogicCards=NewlogicData.cards;
    var codeStack=[];
    var previousNodeIndex=0;
    var removedNodes=0;

    var cardConnections=NewlogicData.cardConnections;

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
    var prog=[];
    
    var finalProgram=makeProgram(prog,cardConnections[0]);
    console.log("program: "+finalProgram);

    /*var out=[];
    for(var p=0;p<finalProgram.length;p++){
        CreateNodeList(finalProgram[p],out);
    }*/
    /*var endNode={};
    endNode[NewlogicData.end.type]=NewlogicData.end.state;
    out.push(endNode);*/

    var uploadData={};
    uploadData['connections']=connectionsList;
    uploadData['logic']=finalProgram;

    //C program code
    var cprogram='';
    var initialization='';
    var mainCode='';

    for(var connection in connectionsList){
      var currentComponent=connectionsList[connection].toLowerCase();
      if(currentComponent){ 
          var compInitCode=initCode[currentComponent](connection);
          initialization+=compInitCode;
      }
    }
    if((initialization.indexOf('SET_AS_IN')>=0)&&(initialization.indexOf('ADC_ENABLE();')<0)){
            initialization+='ADC_ENABLE();';
    }

    function codeForEachNode(type,nodeDetails){
          var codeForCurrentNode='';
          if(type=="wait"){
              var minutes=0,hours=0,milliseconds=0,seconds=0;
              if(nodeDetails.state.h){
                  hours=nodeDetails.state.h;
              }
              if(nodeDetails.state.m){
                  minutes=nodeDetails.state.m;
              }
              if(nodeDetails.state.s){
                  seconds=nodeDetails.state.s;
              }
              if(nodeDetails.state.ms){
                  milliseconds=nodeDetails.state.ms;
              }
              codeForCurrentNode='DELAY('+0+','+hours+','+minutes+','+seconds+','+milliseconds+');';
          }else if(type=="if"){
              var nodePort;
              var value=0;
              if(nodeDetails.state.source){ 
                  nodePort=nodeDetails.state.source;
                  value=nodeDetails.state.value;
                  var compName=connectionsList[nodePort];
                  value=CodeGenerationRangeValues[nodePort][compName](value);
                  var ifCondition;
                  if(nodeDetails.state.condition){
                      if(nodeDetails.state.condition=="lt"){
                        ifCondition="<";
                      }else if(nodeDetails.state.condition=="gt"){
                        ifCondition=">";
                      }else if(nodeDetails.state.condition=="eq"){
                        ifCondition="=";
                      }else{
                        ifCondition="!";
                      }
                  }else{
                    ifCondition="<";
                  }
              }else{
                  ifCondition='<'; 
              }

              var CurrentComponent=connectionsList[nodePort];
              if(CurrentComponent){
                codeForCurrentNode+=generateCodeMapping[nodePort][CurrentComponent](value);
              }
              codeForCurrentNode+='if('+nodePort+' '+ifCondition+ ' '+value+')';
              codeForCurrentNode+="{";
              if(nodeDetails.subprogram){
                  for(var i=0;i<nodeDetails.subprogram.length;i++){
                      codeForCurrentNode+=codeForEachNode(nodeDetails.subprogram[i].type,nodeDetails.subprogram[i]);
                  }
              }
              codeForCurrentNode+="}";
          }else if(type=="else"){
              codeForCurrentNode+='else{';
              if(nodeDetails.subprogram){
                  for(var i=0;i<nodeDetails.subprogram.length;i++){
                      codeForCurrentNode+=codeForEachNode(nodeDetails.subprogram[i].type,nodeDetails.subprogram[i]);
                  }
              }
              codeForCurrentNode+="}";
          }else if(type=="loop"){
              var nodeValue=nodeDetails.state.times;
              codeForCurrentNode='int i=0;for(i=0;i<'+nodeValue+';i++)';
              codeForCurrentNode+="{";
              if(nodeDetails.subprogram){
                  for(var i=0;i<nodeDetails.subprogram.length;i++){
                      codeForCurrentNode+=codeForEachNode(nodeDetails.subprogram[i].type,nodeDetails.subprogram[i]);
                  }
              }
              codeForCurrentNode+="}";
          }else if(type=="code"){
               var nodeCode=nodeDetails.state.code; 
               codeForCurrentNode=nodeCode;
          }else if(type=="end"){
              codeForCurrentNode='';
          }else if(type=="output"){
              var completePortCode='';
              for(var eachItemInDetails in nodeDetails.state)
              {
                if(eachItemInDetails.indexOf("assign")>=0){
                    if(nodeDetails.state[eachItemInDetails]){
                        var CurrentPort=eachItemInDetails.replace("assign",''); 
                        var CurrentValue={};
                        for(var eachValue in nodeDetails.state){
                            if(eachValue.indexOf("value")>=0){
                                var valPort=eachValue.replace("value",'');
                                var value=nodeDetails.state[eachValue];
                                var compName=connectionsList[valPort];
                                CurrentValue[valPort]=CodeGenerationRangeValues[valPort][compName](value);
                            }
                        }
                        var CurrentComponent=connectionsList[CurrentPort];  
                        if(CurrentComponent){
                            var CurrentCompCode = generateCodeMapping[CurrentPort][CurrentComponent](CurrentValue);
                            completePortCode+=CurrentCompCode;
                        }
                        if(CurrentCompCode.indexOf('READ_ADC')>=0){
                            completePortCode+=CurrentPort+'='+CurrentValue[CurrentPort]+';';
                        }
                    }            
                } 
              }
              if(completePortCode){
                  completePortCode=completePortCode.replace(new RegExp("true", 'g'), "HIGH");
                  completePortCode=completePortCode.replace(new RegExp("false", 'g'), "LOW");
              }
              codeForCurrentNode=completePortCode;
          }else{
              return '';
          }
        return codeForCurrentNode;
    }

    var codeForNodes='';

    var UserProgram=uploadData.logic;
    var k;
    for(k=0;k<UserProgram.length;k++){
      codeForNodes+=codeForEachNode(UserProgram[k].type,UserProgram[k]); 
    }

    console.log("codeForNodes  "+codeForNodes);
    mainCode+=codeForNodes;
    console.log("c program code: "+cprogram);
    cprogram=initialization+mainCode;
    var code={};
    code['init'] = initialization;
    code['main'] = mainCode;
    
    return code;
};
