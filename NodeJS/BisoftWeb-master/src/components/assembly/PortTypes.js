/**
 * This module describes the port types - their ports and thier colours
 * @module components/assembly/PortTypes
 */

const blue = '#4040FF', orange = '#FF8000', white = 'white', red = 'red';

var componentType = localStorage.getItem('biboxTypes');


if(componentType=="*STA#"){
module.exports = {
  'A1': {color: red, ports: ['A1']},
  'A2': {color: red, ports: ['A2']},
  'A3': {color: red, ports: ['A3']},
  'A4': {color: red, ports: ['A4']},
  'F': {color: red, ports: ['F']},
  'G': {color: red, ports: ['G']},
  'F1':{color:red, ports:['F1']},
  'F2':{color:red, ports:['F2']},
  'G1':{color:red, ports:['G1']},
  'G2':{color:red, ports:['G2']},
  'PA':{color:red,ports:['PA']},
  'PC':{color:red,ports:['PC']},
  
}
}
else{

  module.exports = {
  'A': {color: red, ports: ['A1', 'A4']},
  'A23': {color: red, ports: ['A2', 'A3']},
  'MOTOR': {color: red, ports: ['MOTOR1', 'MOTOR2']},
  'BC': {color: red, ports: ['BC']},
  'B': {color: red, ports: ['B']},
  'C': {color: red, ports: ['C']},
  'F': {color: red, ports: ['F']},
  'G': {color: red, ports: ['G']},
  'BATTERY': {color: red, ports: ['BATTERY']},
  'F1':{color:red, ports:['F1']},
  'F2':{color:red, ports:['F2']},
  'G1':{color:red, ports:['G1']},
  'G2':{color:red, ports:['G2']},
  'B12':{color:red, ports:['B12']},  
  'B34':{color:red, ports:['B34']},
  'C12':{color:red, ports:['C12']},
  'C34':{color:red, ports:['C34']},
  'B1':{color:red,ports:['B1']},
  'B2':{color:red,ports:['B2']},
  'B3':{color:red,ports:['B3']},
  'B4':{color:red,ports:['B4']},
  'C1':{color:red,ports:['C1']},
  'C2':{color:red,ports:['C2']},
  'C3':{color:red,ports:['C3']},
  'C4':{color:red,ports:['C4']},
  'A22':{color:red,ports:['A22']},
  'A33':{color:red,ports:['A33']},
}
}