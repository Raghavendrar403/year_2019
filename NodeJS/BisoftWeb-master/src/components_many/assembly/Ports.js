/**
 * This module describes the ports and their position wrt Bibox
 * @module components/assembly/Ports
 */
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
  module.exports = {
    'PA':[38, 270],
    'G':[194, 50],
    'PC':[348,270],
    'F':[194,484],
    'MOTOR1': [142, 495],
    'MOTOR2': [253, 495],
    'BC': [195, 65],
    'B': [195, 65],
    'C': [178, 110],
    'DE': [358, 250],
    'A5': [76, 490],
    'A6': [334, 476],
    'BATTERY': [178, 460],
    'A1':[19,79],
    'A2':[80,80],
    'A3':[19,79],
    'A4':[80,80],
    'G1':[19,79],
    'G2':[80,80],
    'F1':[19,79],
    'F2':[80,80],


  }
}

else{
  module.exports = {
  'A1': [55, 90],
  'A2': [130, 28],
  'A3': [262, 27],
  'A4': [335, 90],
  'MOTOR1': [142, 393],
  'MOTOR2': [250, 393],
  'BC': [195, 50],
  'B': [195, 50],
  'C': [178, 110],
  'DE': [358, 250],
  'F': [56, 185],
  'G': [336, 185],
  'A5': [76, 490],
  'A6': [334, 476],
  'BATTERY': [178, 460],
  'F1':[19,80],
  'F2':[85,80],
  'G1':[19,80],
  'G2':[85,80],
  'B12':[-5,80],
  'B34':[35,80],
  'C12':[70,80],
  'C34':[110,80],
  'B1':[19,79],
  'B2':[80,80],
  'B3':[19,79],
  'B4':[80,80],
  'C1':[19,79],
  'C2':[80,80],
  'C3':[19,79],
  'C4':[80,80],


}

}