/**
 * This module is another representation of state with key as port and null or component connected to as value
 * @module components/assembly/PortConnections
 */

 var componentType = localStorage.getItem('biboxTypes');

 if(componentType=="*STA#"){

  module.exports = {
  'PA':null,
  'PC':null,
  'A1': null,
  'A2': null,
  'A3': null,
  'A4': null,
  'MOTOR1': null,
  'MOTOR2': null,
  'BC': null,
  'B': null,
  'C': null,
  'DE': null,
  'F': null,
  'G': null,
  'A5': null,
  'A6': null,
  'F1':null,
  'F2':null,
  'B12':null,
  'B34':null,
  'C12':null,
  'C34':null,
  'B1':null,
  'B2':null,
  'B3':null,
  'B4':null,
  'C1':null,
  'C2':null,
  'C3':null,
  'C4':null,
  'G1':null,
  'G2':null
}
}
else{
module.exports = {
  'A1': null,
  'A2': null,
  'A3': null,
  'A4': null,
  'MOTOR1': null,
  'MOTOR2': null,
  'BC': null,
  'B': null,
  'C': null,
  'DE': null,
  'F': null,
  'G': null,
  'A5': null,
  'A6': null,
  'F1':null,
  'F2':null,
  'B12':null,
  'B34':null,
  'C12':null,
  'C34':null,
  'B1':null,
  'B2':null,
  'B3':null,
  'B4':null,
  'C1':null,
  'C2':null,
  'C3':null,
  'C4':null,
  'A22':null,
  'A33':null
}
}