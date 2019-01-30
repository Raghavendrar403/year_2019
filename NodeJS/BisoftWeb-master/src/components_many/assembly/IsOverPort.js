/**
 * This module  is a function that returns the port over which the component is
 * currently, if that port is already not oocupied and of an allowable type or
 * returns false otherwise
 * @module components/assembly/IsOverPort
 */

var ItemTypes = require('./ItemTypes');
var ImageSizes = require('./ImageSizes');
var Ports = require('./Ports');
var PortTypes = require('./PortTypes');
var PortConnections= require('./PortConnections');
const AllowedPortTypes = require('./AllowedPortTypes')

// Returns false or the port to which the component is connected
var connectivityType= localStorage.getItem('connectivity-type');                                          
if(connectivityType=="USB"){
    localStorage.setItem('selectbibox','Dummy Bibox;00:00:00:00:00:00');
    var biboxType = localStorage.getItem("selectbibox");
    var selectedBiboxSplit = biboxType.split(';');
    var selectedBibox = selectedBiboxSplit[0];
}
else if(connectivityType=="Bluetooth"){
    localStorage.setItem('biboxSelected','Dummy Bibox;00:00:00:00:00:00');
    var biboxType = localStorage.getItem("selectbibox");
    var selectedBiboxSplit = biboxType.split(';');
    var selectedBiboxes = selectedBiboxSplit[0];
}
else{
  selectedBiboxes ="BIBOX Starling"
}
if(selectedBiboxes=="BIBOX Starling"){
module.exports = function (component, bibox,componentConnected) {
  var portName = false;
  var LeftPort, TopPort;
  var LeftOcta,TopOcta;
  var LeftB,TopB;
  var LeftC,TopC;
  var LeftCL,TopCL;
  var TopBF,LeftBF;
  var LeftG,TopG;
  // console.log("connectedComponents" ,componentConnected);
  AllowedPortTypes[component.type].some(portType => {
    return PortTypes[portType].ports.some(port => {
      if (PortConnections[port]) return false;
      if (port=="BC" || port=="B"){
          if(PortConnections["B"] || PortConnections["BC"]){
              return false;
          }
      }
  
      else if(port=="A1" || port=="A2"){
          Object.keys(componentConnected).map(dual_splitter => {
               if(dual_splitter=="dual_splitter"){
                       componentConnected[dual_splitter].map((componentConnected, index) => {
                          if(componentConnected.connectedTo=="PA"){
                          LeftBF = componentConnected.left;
                          TopBF  = componentConnected.top;
                          

                        l = Ports[port][0] +LeftBF,
         
                        t = Ports[port][1] + TopBF;

                          }

                       })
                  }
                    
                 })

      }
      else if(port=="A3" || port=="A4"){
          Object.keys(componentConnected).map(dual_splitter => {
               if(dual_splitter=="dual_splitter"){
                       componentConnected[dual_splitter].map((componentConnected, index) => {
                          if(componentConnected.connectedTo=="PC"){
                          LeftB = componentConnected.left;
                          TopB  = componentConnected.top;
                          

                        l = Ports[port][0] +LeftB,
         
                        t = Ports[port][1] + TopB;

                          }

                       })
                  }
                    
                 })

      }
      else if(port=="G1" || port=="G2"){
          Object.keys(componentConnected).map(dual_splitter => {
               if(dual_splitter=="dual_splitter"){
                       componentConnected[dual_splitter].map((componentConnected, index) => {
                          if(componentConnected.connectedTo=="G"){
                          LeftC = componentConnected.left;
                          TopC  = componentConnected.top;
                          

                        l = Ports[port][0] +LeftC,
         
                        t = Ports[port][1] + TopC;

                          }

                       })
                  }
                    
                 })

      }
      else if(port=="F1" || port=="F2"){
          Object.keys(componentConnected).map(dual_splitter => {
               if(dual_splitter=="dual_splitter"){
                       componentConnected[dual_splitter].map((componentConnected, index) => {
                          if(componentConnected.connectedTo=="F"){
                          LeftCL = componentConnected.left;
                          TopCL  = componentConnected.top;
                          

                        l = Ports[port][0] +LeftCL,
         
                        t = Ports[port][1] + TopCL;

                          }

                       })
                  }
                    
                 })

      }
      

      else{
          var l = Ports[port][0] + bibox.left,
          t = Ports[port][1] + bibox.top;
      }
     
      if (component.left < l && l < component.left + ImageSizes[ItemTypes.COMPONENT][0] &&
          component.top < t && t < component.top + ImageSizes[ItemTypes.COMPONENT][1]) {
          portName = port;
          return true;
      }
    });
  });
  return portName;
}
}

else{
  module.exports = function (component, bibox,componentConnected) {
  var portName = false;
  var LeftPort, TopPort;
  var LeftOcta,TopOcta;
  var LeftB,TopB;
  var LeftC,TopC;
  var LeftCL,TopCL;
  var TopBF,LeftBF;
  var LeftG,TopG;
  // console.log("connectedComponents" ,componentConnected);
  AllowedPortTypes[component.type].some(portType => {
    return PortTypes[portType].ports.some(port => {
      if (PortConnections[port]) return false;
      if (port=="BC" || port=="B"){
          if(PortConnections["B"] || PortConnections["BC"]){
              return false;
          }
      }
      if(port=="F1" || port=="F2"){
          Object.keys(componentConnected).map(dual_splitter => {
               if(dual_splitter=="dual_splitter"){
                       componentConnected[dual_splitter].map((componentConnected, index) => {
                          if(componentConnected.connectedTo=="F"){
                          LeftPort = componentConnected.left;
                          TopPort  = componentConnected.top;
                          

                       l = Ports[port][0] +LeftPort,
         
                        t = Ports[port][1] + TopPort;

                          }

                       })
                  }
                    
                 })

      }
      else if(port=="G1" || port=="G2"){
          Object.keys(componentConnected).map(dual_splitter => {
               if(dual_splitter=="dual_splitter"){
                       componentConnected[dual_splitter].map((componentConnected, index) => {
                          if(componentConnected.connectedTo=="G"){
                          LeftG = componentConnected.left;
                          TopG  = componentConnected.top;
                          

                       l = Ports[port][0] +LeftG,
         
                        t = Ports[port][1] + TopG;

                          }

                       })
                  }
                    
                 })

      }
      else if(port=="B12" || port=="B34" || port=="C12" || port=="C34"){
          Object.keys(componentConnected).map(octa_splitter => {
               if(octa_splitter=="octa_splitter"){
                       componentConnected[octa_splitter].map((componentConnected, index) => {
                          if(componentConnected.connectedTo=="B"){
                          LeftOcta = componentConnected.left;
                          TopOcta  = componentConnected.top;
                          

                       l = Ports[port][0] +LeftOcta,
         
                        t = Ports[port][1] + TopOcta;

                          }

                       })
                  }
                    
                 })

      }
      else if(port=="B1" || port=="B2"){
          Object.keys(componentConnected).map(dual_splitter => {
               if(dual_splitter=="dual_splitter"){
                       componentConnected[dual_splitter].map((componentConnected, index) => {
                          if(componentConnected.connectedTo=="B12"){
                          LeftBF = componentConnected.left;
                          TopBF  = componentConnected.top;
                          

                        l = Ports[port][0] +LeftBF,
         
                        t = Ports[port][1] + TopBF;

                          }

                       })
                  }
                    
                 })

      }
      else if(port=="B3" || port=="B4"){
          Object.keys(componentConnected).map(dual_splitter => {
               if(dual_splitter=="dual_splitter"){
                       componentConnected[dual_splitter].map((componentConnected, index) => {
                          if(componentConnected.connectedTo=="B34"){
                          LeftB = componentConnected.left;
                          TopB  = componentConnected.top;
                          

                        l = Ports[port][0] +LeftB,
         
                        t = Ports[port][1] + TopB;

                          }

                       })
                  }
                    
                 })

      }
      else if(port=="C1" || port=="C2"){
          Object.keys(componentConnected).map(dual_splitter => {
               if(dual_splitter=="dual_splitter"){
                       componentConnected[dual_splitter].map((componentConnected, index) => {
                          if(componentConnected.connectedTo=="C12"){
                          LeftC = componentConnected.left;
                          TopC  = componentConnected.top;
                          

                        l = Ports[port][0] +LeftC,
         
                        t = Ports[port][1] + TopC;

                          }

                       })
                  }
                    
                 })

      }
      else if(port=="C3" || port=="C4"){
          Object.keys(componentConnected).map(dual_splitter => {
               if(dual_splitter=="dual_splitter"){
                       componentConnected[dual_splitter].map((componentConnected, index) => {
                          if(componentConnected.connectedTo=="C34"){
                          LeftCL = componentConnected.left;
                          TopCL  = componentConnected.top;
                          

                        l = Ports[port][0] +LeftCL,
         
                        t = Ports[port][1] + TopCL;

                          }

                       })
                  }
                    
                 })

      }
      

      else{
          var l = Ports[port][0] + bibox.left,
          t = Ports[port][1] + bibox.top;
      }
     
      if (component.left < l && l < component.left + ImageSizes[ItemTypes.COMPONENT][0] &&
          component.top < t && t < component.top + ImageSizes[ItemTypes.COMPONENT][1]) {
          portName = port;
          return true;
      }
    });
  });
  return portName;
}

}