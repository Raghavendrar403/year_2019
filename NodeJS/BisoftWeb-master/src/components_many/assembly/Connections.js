/**
 * This module is responsible for drawing the connection curves and the port circles
 * and also for highlighting them when a component is being dragged.
 * @module components/assembly/Connections
 */

var React = require('react');
var PropTypes = React.PropTypes;
var Ports = require('./Ports.js');
var ItemTypes = require('./ItemTypes');
var ImageSizes = require('./ImageSizes');
var PortTypes = require('./PortTypes');
var Ports = require('./Ports');
const AllowedPortTypes = require('./AllowedPortTypes');
const PortConnections = require('./PortConnections');
var DraggingInfo = require('./DraggingInfo');

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
var Curve = React.createClass({
  render: function () {
    const { bibox, component,components} = this.props;
    const { connectedTo, left, top } = component;
    var Left,Top;
    var LeftF,TopF;
    var LeftO, TopO;
    var LeftB,TopB;
    var LeftC,TopC;
    var LeftCL,TopCL;
    var LeftBL,TopBL;
    var LeftG,TopG;
    var cx2, cy2;
    if(connectedTo=="A1" || connectedTo=="A2"){

       Object.keys(components).map(dual_splitter => {
                    if(dual_splitter=="dual_splitter"){
                       components[dual_splitter].map((component, index) => {
                          if(component.connectedTo=="PA"){
                          LeftF = component.left;
                          TopF  = component.top;
                          
                          }


                       })

                   } 
                 })
      
    cx2 = LeftF + Ports[connectedTo][0];
    cy2 = TopF + Ports[connectedTo][1];
    cx2 += Ports[connectedTo][0] - ImageSizes[ItemTypes.COMPONENT][0]/2;
    cy2 += Ports[connectedTo][1] - ImageSizes[ItemTypes.COMPONENT][1]/2;
       return (
      <path d={'M ' + (left + ImageSizes[ItemTypes.COMPONENT][0]/2) +
                ',' + (top) +
                ' C ' + (left + ImageSizes[ItemTypes.COMPONENT][0]/2) +
                ',' + (top - 2*ImageSizes[ItemTypes.COMPONENT][1]) +
                ' ' + cx2 +
                ',' + cy2 +
                ' ' + (LeftF + Ports[connectedTo][0]) +
                ',' + (TopF + Ports[connectedTo][1])}/>
    
    );
    }
     else if(connectedTo=="G1" || connectedTo=="G2"){

       Object.keys(components).map(dual_splitter => {
                    if(dual_splitter=="dual_splitter"){
                       components[dual_splitter].map((component, index) => {
                          if(component.connectedTo=="G"){
                          LeftG = component.left;
                          TopG  = component.top;
                          
                          }


                       })

                   } 
                 })
      
    cx2 = LeftG + Ports[connectedTo][0];
    cy2 = TopG + Ports[connectedTo][1];
    cx2 += Ports[connectedTo][0] - ImageSizes[ItemTypes.COMPONENT][0]/2;
    cy2 += Ports[connectedTo][1] - ImageSizes[ItemTypes.COMPONENT][1]/2;
       return (
      <path d={'M ' + (left + ImageSizes[ItemTypes.COMPONENT][0]/2) +
                ',' + (top) +
                ' C ' + (left + ImageSizes[ItemTypes.COMPONENT][0]/2) +
                ',' + (top - 2*ImageSizes[ItemTypes.COMPONENT][1]) +
                ' ' + cx2 +
                ',' + cy2 +
                ' ' + (LeftG + Ports[connectedTo][0]) +
                ',' + (TopG + Ports[connectedTo][1])}/>
    
    );
    }
   
    else if(connectedTo=="A3" || connectedTo=="A4" ){

       Object.keys(components).map(dual_splitter => {
                     if(dual_splitter=="dual_splitter"){
                       components[dual_splitter].map((component, index) => {
                          if(component.connectedTo=="PC"){
                          LeftBL = component.left;
                          TopBL = component.top;
                          
                          }

                     
                       })
                    }
                    
                 })
      
    cx2 = LeftBL + Ports[connectedTo][0];
    cy2 = TopBL + Ports[connectedTo][1];
    cx2 += Ports[connectedTo][0] - ImageSizes[ItemTypes.COMPONENT][0]/2;
    cy2 += Ports[connectedTo][1] - ImageSizes[ItemTypes.COMPONENT][1]/2;
       return (
      <path d={'M ' + (left + ImageSizes[ItemTypes.COMPONENT][0]/2) +
                ',' + (top) +
                ' C ' + (left + ImageSizes[ItemTypes.COMPONENT][0]/2) +
                ',' + (top - 2*ImageSizes[ItemTypes.COMPONENT][1]) +
                ' ' + cx2 +
                ',' + cy2 +
                ' ' + (LeftBL + Ports[connectedTo][0]) +
                ',' + (TopBL + Ports[connectedTo][1])}/>
    
    );
    }
    else if(connectedTo=="F1" || connectedTo=="F2" ){

       Object.keys(components).map(dual_splitter => {
                     if(dual_splitter=="dual_splitter"){
                       components[dual_splitter].map((component, index) => {
                          if(component.connectedTo=="F"){
                          LeftB = component.left;
                          TopB = component.top;
                          
                          }

                     
                       })
                    }
                    
                 })
      
    cx2 = LeftB + Ports[connectedTo][0];
    cy2 = TopB + Ports[connectedTo][1];
    cx2 += Ports[connectedTo][0] - ImageSizes[ItemTypes.COMPONENT][0]/2;
    cy2 += Ports[connectedTo][1] - ImageSizes[ItemTypes.COMPONENT][1]/2;
       return (
      <path d={'M ' + (left + ImageSizes[ItemTypes.COMPONENT][0]/2) +
                ',' + (top) +
                ' C ' + (left + ImageSizes[ItemTypes.COMPONENT][0]/2) +
                ',' + (top - 2*ImageSizes[ItemTypes.COMPONENT][1]) +
                ' ' + cx2 +
                ',' + cy2 +
                ' ' + (LeftB + Ports[connectedTo][0]) +
                ',' + (TopB + Ports[connectedTo][1])}/>
    
    );
    }
    
    else{
    Top=bibox.top;
    Left=bibox.left;
    cx2 = Left + Ports[connectedTo][0];
    cy2 = Top + Ports[connectedTo][1];
    cx2 += Ports[connectedTo][0] - ImageSizes[ItemTypes.BIBOX][0]/2;
    cy2 += Ports[connectedTo][1] - ImageSizes[ItemTypes.BIBOX][1]/2;
     return (
      <path d={'M ' + (left + ImageSizes[ItemTypes.COMPONENT][0]/2) +
                ',' + (top) +
                ' C ' + (left + ImageSizes[ItemTypes.COMPONENT][0]/2) +
                ',' + (top - 2*ImageSizes[ItemTypes.COMPONENT][1]) +
                ' ' + cx2 +
                ',' + cy2 +
                ' ' + (Left + Ports[connectedTo][0]) +
                ',' + (Top + Ports[connectedTo][1])}/>
    
    );
    }
   
   
 
  }
});
}

else{
  var Curve = React.createClass({
  render: function () {
    const { bibox, component,components} = this.props;
    const { connectedTo, left, top } = component;
    var Left,Top;
    var LeftF,TopF;
    var LeftO, TopO;
    var LeftB,TopB;
    var LeftC,TopC;
    var LeftCL,TopCL;
    var LeftBL,TopBL;
    var LeftG,TopG;
    var cx2, cy2;
    if(connectedTo=="F1" || connectedTo=="F2"){

       Object.keys(components).map(dual_splitter => {
                    if(dual_splitter=="dual_splitter"){
                       components[dual_splitter].map((component, index) => {
                          if(component.connectedTo=="F"){
                          LeftF = component.left;
                          TopF  = component.top;
                          
                          }


                       })

                   } 
                 })
      
    cx2 = LeftF + Ports[connectedTo][0];
    cy2 = TopF + Ports[connectedTo][1];
    cx2 += Ports[connectedTo][0] - ImageSizes[ItemTypes.COMPONENT][0]/2;
    cy2 += Ports[connectedTo][1] - ImageSizes[ItemTypes.COMPONENT][1]/2;
       return (
      <path d={'M ' + (left + ImageSizes[ItemTypes.COMPONENT][0]/2) +
                ',' + (top) +
                ' C ' + (left + ImageSizes[ItemTypes.COMPONENT][0]/2) +
                ',' + (top - 2*ImageSizes[ItemTypes.COMPONENT][1]) +
                ' ' + cx2 +
                ',' + cy2 +
                ' ' + (LeftF + Ports[connectedTo][0]) +
                ',' + (TopF + Ports[connectedTo][1])}/>
    
    );
    }
     else if(connectedTo=="G1" || connectedTo=="G2"){

       Object.keys(components).map(dual_splitter => {
                    if(dual_splitter=="dual_splitter"){
                       components[dual_splitter].map((component, index) => {
                          if(component.connectedTo=="G"){
                          LeftG = component.left;
                          TopG  = component.top;
                          
                          }


                       })

                   } 
                 })
      
    cx2 = LeftG + Ports[connectedTo][0];
    cy2 = TopG + Ports[connectedTo][1];
    cx2 += Ports[connectedTo][0] - ImageSizes[ItemTypes.COMPONENT][0]/2;
    cy2 += Ports[connectedTo][1] - ImageSizes[ItemTypes.COMPONENT][1]/2;
       return (
      <path d={'M ' + (left + ImageSizes[ItemTypes.COMPONENT][0]/2) +
                ',' + (top) +
                ' C ' + (left + ImageSizes[ItemTypes.COMPONENT][0]/2) +
                ',' + (top - 2*ImageSizes[ItemTypes.COMPONENT][1]) +
                ' ' + cx2 +
                ',' + cy2 +
                ' ' + (LeftG + Ports[connectedTo][0]) +
                ',' + (TopG + Ports[connectedTo][1])}/>
    
    );
    }
    else if(connectedTo=="B12" || connectedTo=="B34" || connectedTo=="C12" || connectedTo=="C34"){

       Object.keys(components).map(octa_splitter => {
                     if(octa_splitter=="octa_splitter"){
                       components[octa_splitter].map((component, index) => {
                          if(component.connectedTo=="B"){
                          LeftO = component.left;
                          TopO = component.top;
                          
                          }

                     
                       })
                    }
                    
                 })
      
    cx2 = LeftO + Ports[connectedTo][0];
    cy2 = TopO + Ports[connectedTo][1];
    cx2 += Ports[connectedTo][0] - ImageSizes[ItemTypes.COMPONENT][0]/2;
    cy2 += Ports[connectedTo][1] - ImageSizes[ItemTypes.COMPONENT][1]/2;
       return (
      <path d={'M ' + (left + ImageSizes[ItemTypes.COMPONENT][0]/2) +
                ',' + (top) +
                ' C ' + (left + ImageSizes[ItemTypes.COMPONENT][0]/2) +
                ',' + (top - 2*ImageSizes[ItemTypes.COMPONENT][1]) +
                ' ' + cx2 +
                ',' + cy2 +
                ' ' + (LeftO + Ports[connectedTo][0]) +
                ',' + (TopO + Ports[connectedTo][1])}/>
    
    );
    }
    else if(connectedTo=="B1" || connectedTo=="B2" ){

       Object.keys(components).map(dual_splitter => {
                     if(dual_splitter=="dual_splitter"){
                       components[dual_splitter].map((component, index) => {
                          if(component.connectedTo=="B12"){
                          LeftBL = component.left;
                          TopBL = component.top;
                          
                          }

                     
                       })
                    }
                    
                 })
      
    cx2 = LeftBL + Ports[connectedTo][0];
    cy2 = TopBL + Ports[connectedTo][1];
    cx2 += Ports[connectedTo][0] - ImageSizes[ItemTypes.COMPONENT][0]/2;
    cy2 += Ports[connectedTo][1] - ImageSizes[ItemTypes.COMPONENT][1]/2;
       return (
      <path d={'M ' + (left + ImageSizes[ItemTypes.COMPONENT][0]/2) +
                ',' + (top) +
                ' C ' + (left + ImageSizes[ItemTypes.COMPONENT][0]/2) +
                ',' + (top - 2*ImageSizes[ItemTypes.COMPONENT][1]) +
                ' ' + cx2 +
                ',' + cy2 +
                ' ' + (LeftBL + Ports[connectedTo][0]) +
                ',' + (TopBL + Ports[connectedTo][1])}/>
    
    );
    }
    else if(connectedTo=="B3" || connectedTo=="B4" ){

       Object.keys(components).map(dual_splitter => {
                     if(dual_splitter=="dual_splitter"){
                       components[dual_splitter].map((component, index) => {
                          if(component.connectedTo=="B34"){
                          LeftB = component.left;
                          TopB = component.top;
                          
                          }

                     
                       })
                    }
                    
                 })
      
    cx2 = LeftB + Ports[connectedTo][0];
    cy2 = TopB + Ports[connectedTo][1];
    cx2 += Ports[connectedTo][0] - ImageSizes[ItemTypes.COMPONENT][0]/2;
    cy2 += Ports[connectedTo][1] - ImageSizes[ItemTypes.COMPONENT][1]/2;
       return (
      <path d={'M ' + (left + ImageSizes[ItemTypes.COMPONENT][0]/2) +
                ',' + (top) +
                ' C ' + (left + ImageSizes[ItemTypes.COMPONENT][0]/2) +
                ',' + (top - 2*ImageSizes[ItemTypes.COMPONENT][1]) +
                ' ' + cx2 +
                ',' + cy2 +
                ' ' + (LeftB + Ports[connectedTo][0]) +
                ',' + (TopB + Ports[connectedTo][1])}/>
    
    );
    }
    else if(connectedTo=="C1" || connectedTo=="C2" ){

       Object.keys(components).map(dual_splitter => {
                     if(dual_splitter=="dual_splitter"){
                       components[dual_splitter].map((component, index) => {
                          if(component.connectedTo=="C12"){
                          LeftC = component.left;
                          TopC = component.top;
                          
                          }

                     
                       })
                    }
                    
                 })
      
    cx2 = LeftC + Ports[connectedTo][0];
    cy2 = TopC + Ports[connectedTo][1];
    cx2 += Ports[connectedTo][0] - ImageSizes[ItemTypes.COMPONENT][0]/2;
    cy2 += Ports[connectedTo][1] - ImageSizes[ItemTypes.COMPONENT][1]/2;
       return (
      <path d={'M ' + (left + ImageSizes[ItemTypes.COMPONENT][0]/2) +
                ',' + (top) +
                ' C ' + (left + ImageSizes[ItemTypes.COMPONENT][0]/2) +
                ',' + (top - 2*ImageSizes[ItemTypes.COMPONENT][1]) +
                ' ' + cx2 +
                ',' + cy2 +
                ' ' + (LeftC + Ports[connectedTo][0]) +
                ',' + (TopC + Ports[connectedTo][1])}/>
    
    );
    }
    else if(connectedTo=="C3" || connectedTo=="C4" ){

       Object.keys(components).map(dual_splitter => {
                     if(dual_splitter=="dual_splitter"){
                       components[dual_splitter].map((component, index) => {
                          if(component.connectedTo=="C34"){
                          LeftCL = component.left;
                          TopCL = component.top;
                          
                          }

                     
                       })
                    }
                    
                 })
      
    cx2 = LeftCL + Ports[connectedTo][0];
    cy2 = TopCL + Ports[connectedTo][1];
    cx2 += Ports[connectedTo][0] - ImageSizes[ItemTypes.COMPONENT][0]/2;
    cy2 += Ports[connectedTo][1] - ImageSizes[ItemTypes.COMPONENT][1]/2;
       return (
      <path d={'M ' + (left + ImageSizes[ItemTypes.COMPONENT][0]/2) +
                ',' + (top) +
                ' C ' + (left + ImageSizes[ItemTypes.COMPONENT][0]/2) +
                ',' + (top - 2*ImageSizes[ItemTypes.COMPONENT][1]) +
                ' ' + cx2 +
                ',' + cy2 +
                ' ' + (LeftCL + Ports[connectedTo][0]) +
                ',' + (TopCL + Ports[connectedTo][1])}/>
    
    );
    }
    else{
    Top=bibox.top;
    Left=bibox.left;
    cx2 = Left + Ports[connectedTo][0];
    cy2 = Top + Ports[connectedTo][1];
    cx2 += Ports[connectedTo][0] - ImageSizes[ItemTypes.BIBOX][0]/2;
    cy2 += Ports[connectedTo][1] - ImageSizes[ItemTypes.BIBOX][1]/2;
     return (
      <path d={'M ' + (left + ImageSizes[ItemTypes.COMPONENT][0]/2) +
                ',' + (top) +
                ' C ' + (left + ImageSizes[ItemTypes.COMPONENT][0]/2) +
                ',' + (top - 2*ImageSizes[ItemTypes.COMPONENT][1]) +
                ' ' + cx2 +
                ',' + cy2 +
                ' ' + (Left + Ports[connectedTo][0]) +
                ',' + (Top + Ports[connectedTo][1])}/>
    
    );
    }
   
   
 
  }
});

}

var PortCircle = React.createClass({
  render: function () {
    return <circle cx={this.props.left} cy ={this.props.top}
              r={ImageSizes[ItemTypes.PORT_CIRCLE][0]/(this.props.highlighted ? 1.4 :24)}/>
  }
});

var ComponentPort = React.createClass({
  render: function () {
    var {left, top} = this.props.component;
    left += ImageSizes[ItemTypes.COMPONENT][0]/2;
    return <PortCircle left={left} top={top}/>
  }
});
var imageUrl;
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
var Connections = React.createClass({

  render: function() {
    const { bibox, components, extraComponent, Camera } = this.props;
    var positionCircleRight;
    var positionCircleLeft;
    var biboxType;
    var componentConnected;
    var Left;
    var Top;
    components;
    var dual_splitter;
    var connectedTo;
    var connections = [];
    var portCircles = [];
    Object.keys(components).map(key => {
      components[key].map((component, index) => {

        //const component2 = components[];
        const { connectedTo } = component;
        if (connectedTo) {
          connections.push(
            <Curve bibox={bibox} component={component} components={components} key={connections.length}/>
          );
        };
        if (!(DraggingInfo.isDragging && DraggingInfo.draggingComponentOld &&
              key == DraggingInfo.draggingComponentOld.type &&
              index === DraggingInfo.draggingComponentOld.index )){
                portCircles.push(
                  <ComponentPort component={component} key={portCircles.length}/>
                );
              
              }

      });
    });
    if (extraComponent) {
      if (extraComponent.connectedTo) {
        connections.push(
          <Curve bibox={bibox} component={extraComponent} components={components} key={connections.length}/>
        )
      }
      portCircles.push(
        <ComponentPort component={extraComponent} key={portCircles.length}/>
      )
    }
    return (
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: 2,
        pointerEvents: 'none',

      }}>
        <svg height='100%' width='100%'>
          <g transform={'matrix(' +
            (Camera.scale) + ' ' +
            '0 0 ' +
            (Camera.scale) + ' ' +
            (Camera.offset.left * Camera.scale) + ' ' +
            (Camera.offset.top * Camera.scale) +
          ')'}>
            <g stroke='#4d4d4d' strokeWidth='4px' fill='none'>
              {connections}
            </g>
            <g stroke='black' strokeWidth='4px' fill='white'>
              {portCircles}
            </g>
            {Object.keys(PortTypes).map(key => {
              var highlighted = false;
              if (!(DraggingInfo.draggingComponentOld && DraggingInfo.newComponentPort) && extraComponent && AllowedPortTypes[extraComponent.type].indexOf(key) > -1)
                highlighted = true;
              if (key=="BC" || key=="B"){
                if(PortConnections["B"] || PortConnections["BC"]){
                    highlighted = false;
                }
              }
             
              if((key=="A1"||key=="A2") && highlighted){

                 
                 if(components){
                    highlighted = false;
                   Object.keys(components).map(dual_splitter => {
                    if(dual_splitter=="dual_splitter"){
                       components[dual_splitter].map((component, index) => {
                          if(component.connectedTo=="PA"){
                           Left = component.left;
                           Top = component.top;
                            highlighted=true;
                          }

                   
                       })
                 }
                    
                 })
              }
              }

              else if((key=="A3"||key=="A4") && highlighted){

                 
                 if(components){
                    highlighted = false;
                   Object.keys(components).map(dual_splitter => {
                    if(dual_splitter=="dual_splitter"){
                       components[dual_splitter].map((component, index) => {
                          if(component.connectedTo=="PC"){
                           Left = component.left;
                           Top = component.top;
                            highlighted=true;
                          }

                   
                       })
                 }
                    
                 })
              }
              }
              else if((key=="G1" || key=="G2" ) && highlighted){

                 
                 if(components){
                    highlighted = false;
                   Object.keys(components).map(dual_splitter => {
                    if(dual_splitter=="dual_splitter"){
                       components[dual_splitter].map((component, index) => {
                          if(component.connectedTo=="G"){
                           Left = component.left;
                           Top= component.top;
                             highlighted=true;
                          }

                   
                       })
                 }
                    
                 })
              }
              }
              else if((key=="F1" || key=="F2" ) && highlighted){

                 
                 if(components){
                    highlighted = false;
                   Object.keys(components).map(dual_splitter => {
                    if(dual_splitter=="dual_splitter"){
                       components[dual_splitter].map((component, index) => {
                          if(component.connectedTo=="F"){
                           Left = component.left;
                           Top= component.top;
                             highlighted=true;
                          }

                   
                       })
                 }
                    
                 })
              }
              }
              
              else{
                  Top=bibox.top;
                  Left=bibox.left;
              }
              return (
              <g key={key} stroke="white" strokeWidth="2" fill={PortTypes[key].color}>
                {PortTypes[key].ports.map(port => (
                  <PortCircle
                    left={Left+ Ports[port][0]} top={Top + Ports[port][1]}
                    key={port} highlighted={!PortConnections[port] && highlighted}/>

                ))}
              </g>
              

              )
              
              
            })}
          </g>
        </svg>
      </div>
    );
  }

});

}

else{
  var Connections = React.createClass({

  render: function() {
    const { bibox, components, extraComponent, Camera } = this.props;
    var positionCircleRight;
    var positionCircleLeft;
    var biboxType;
    var componentConnected;
    var Left;
    var Top;
    components;
    var dual_splitter;
    var connectedTo;
    var connections = [];
    var portCircles = [];
    Object.keys(components).map(key => {
      components[key].map((component, index) => {

        //const component2 = components[];
        const { connectedTo } = component;
        if (connectedTo) {
          connections.push(
            <Curve bibox={bibox} component={component} components={components} key={connections.length}/>
          );
        };
        if (!(DraggingInfo.isDragging && DraggingInfo.draggingComponentOld &&
              key == DraggingInfo.draggingComponentOld.type &&
              index === DraggingInfo.draggingComponentOld.index )){
                portCircles.push(
                  <ComponentPort component={component} key={portCircles.length}/>
                );
              
              }

      });
    });
    if (extraComponent) {
      if (extraComponent.connectedTo) {
        connections.push(
          <Curve bibox={bibox} component={extraComponent} components={components} key={connections.length}/>
        )
      }
      portCircles.push(
        <ComponentPort component={extraComponent} key={portCircles.length}/>
      )
    }
    return (
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: 2,
        pointerEvents: 'none',

      }}>
        <svg height='100%' width='100%'>
          <g transform={'matrix(' +
            (Camera.scale) + ' ' +
            '0 0 ' +
            (Camera.scale) + ' ' +
            (Camera.offset.left * Camera.scale) + ' ' +
            (Camera.offset.top * Camera.scale) +
          ')'}>
            <g stroke='#4d4d4d' strokeWidth='4px' fill='none'>
              {connections}
            </g>
            <g stroke='black' strokeWidth='4px' fill='white'>
              {portCircles}
            </g>
            {Object.keys(PortTypes).map(key => {
              var highlighted = false;
              if (!(DraggingInfo.draggingComponentOld && DraggingInfo.newComponentPort) && extraComponent && AllowedPortTypes[extraComponent.type].indexOf(key) > -1)
                highlighted = true;
              if (key=="BC" || key=="B"){
                if(PortConnections["B"] || PortConnections["BC"]){
                    highlighted = false;
                }
              }
             
              if((key=="F1"||key=="F2") && highlighted){

                 
                 if(components){
                    highlighted = false;
                   Object.keys(components).map(dual_splitter => {
                    if(dual_splitter=="dual_splitter"){
                       components[dual_splitter].map((component, index) => {
                          if(component.connectedTo=="F"){
                           Left = component.left;
                           Top = component.top;
                            highlighted=true;
                          }

                   
                       })
                 }
                    
                 })
              }
              }

              else if((key=="G1"||key=="G2") && highlighted){

                 
                 if(components){
                    highlighted = false;
                   Object.keys(components).map(dual_splitter => {
                    if(dual_splitter=="dual_splitter"){
                       components[dual_splitter].map((component, index) => {
                          if(component.connectedTo=="G"){
                           Left = component.left;
                           Top = component.top;
                            highlighted=true;
                          }

                   
                       })
                 }
                    
                 })
              }
              }
              else if((key=="B12" || key=="B34" || key=="C12" ||key=="C34" ) && highlighted){

                 
                 if(components){
                    highlighted = false;
                   Object.keys(components).map(octa_splitter => {
                    if(octa_splitter=="octa_splitter"){
                       components[octa_splitter].map((component, index) => {
                          if(component.connectedTo=="B"){
                           Left = component.left;
                           Top= component.top;
                             highlighted=true;
                          }

                   
                       })
                 }
                    
                 })
              }
              }
              else if((key=="B1" || key=="B2" ) && highlighted){

                 
                 if(components){
                    highlighted = false;
                   Object.keys(components).map(dual_splitter => {
                    if(dual_splitter=="dual_splitter"){
                       components[dual_splitter].map((component, index) => {
                          if(component.connectedTo=="B12"){
                           Left = component.left;
                           Top= component.top;
                             highlighted=true;
                          }

                   
                       })
                 }
                    
                 })
              }
              }
              else if((key=="B3" || key=="B4" ) && highlighted){

                 
                 if(components){
                    highlighted = false;
                   Object.keys(components).map(dual_splitter => {
                    if(dual_splitter=="dual_splitter"){
                       components[dual_splitter].map((component, index) => {
                          if(component.connectedTo=="B34"){
                           Left = component.left;
                           Top= component.top;
                             highlighted=true;
                          }

                   
                       })
                 }
                    
                 })
              }
              }
               else if((key=="C1" || key=="C2" ) && highlighted){

                 
                 if(components){
                    highlighted = false;
                   Object.keys(components).map(dual_splitter => {
                    if(dual_splitter=="dual_splitter"){
                       components[dual_splitter].map((component, index) => {
                          if(component.connectedTo=="C12"){
                           Left = component.left;
                           Top= component.top;
                             highlighted=true;
                          }

                   
                       })
                 }
                    
                 })
              }
              }
               else if((key=="C3" || key=="C4" ) && highlighted){

                 
                 if(components){
                    highlighted = false;
                   Object.keys(components).map(dual_splitter => {
                    if(dual_splitter=="dual_splitter"){
                       components[dual_splitter].map((component, index) => {
                          if(component.connectedTo=="C34"){
                           Left = component.left;
                           Top= component.top;
                             highlighted=true;
                          }

                   
                       })
                 }
                    
                 })
              }
              }
              else{
                  Top=bibox.top;
                  Left=bibox.left;
              }
              return (
              <g key={key} stroke="white" strokeWidth="2" fill={PortTypes[key].color}>
                {PortTypes[key].ports.map(port => (
                  <PortCircle
                    left={Left+ Ports[port][0]} top={Top + Ports[port][1]}
                    key={port} highlighted={!PortConnections[port] && highlighted}/>

                ))}
              </g>
              

              )
              
              
            })}
          </g>
        </svg>
      </div>
    );
  }

});

}

module.exports = Connections;
