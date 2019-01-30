/**
 * This module exports an object with key as component type and value as
 * an array of port types the component can connect to.
 * @module components/assembly/AllowedPortTypes
 */

 var componentType = localStorage.getItem('biboxTypes');

 if(componentType=="*STA#"){

  module.exports = {
  'led': ['A1','A2','A3','A4','F1','F2','G1','G2',],
  'servo_motor': ['A3','A4',],
  'servo_extender':['A3','A4',],
  'beeper':['A1','A2','A3','A4','F1','F2','G1','G2',],
  'laser': ['A1','A2','A3','A4','F1','F2','G1','G2',],
  'mp3':['F'],
  'dual_splitter':['PA','G','PC','F'],
  'humidity_sensor' : ['A1','A2','A3','A4',],
  'metal_detector' : ['A1','A2','A3','A4',],
  'color_sensor' : ['F'],
  'heartbeat_sensor' : ['A1','A2','A3','A4',],
  'ultrasonic_sensor' : ['F', 'G'],
  'hall_sensor' : ['A1','A2','A3','A4',],
  'light_sensor': ['A1','A2','A3','A4',],
  'bend_sensor': ['A1','A2','A3','A4',],
  'gas_sensor': ['A1','A2','A3','A4',],
  'distance_sensor': ['A1','A2','A3','A4',],
  'sound_sensor': ['A1','A2','A3','A4',],
  'temperature_sensor': ['A1','A2','A3','A4',],
  'rain_sensor': ['A1','A2','A3','A4',],
  'tact_switch': ['A1','A2','A3','A4','F1','F2','G1','G2',],
  'dual_switch':['A1','A2','A3','A4','F'],
  'touch_sensor':['A1','A2','A3','A4',],
  'pir_sensor':['A1','A2','A3','A4',],
  'gesture_sensor':['G'],
  'rotational_sensor': ['A1','A2','A3','A4',],
  'solar_panel': ['A1','A2','A3','A4',],
}
}
else{

  module.exports = {
  'led': ['A', 'A23','F1','F2','B1','B2','B3','B4','C1','C2','C3','C4','G1','G2'],
  'geared_motor': ['MOTOR'],
  'mini_geared_motor':['MOTOR'],
  'stepper_motor':['B34'],
  'servo_motor': ['A22','A33'],
  'servo_extender':['A23'],
  'beeper':['A','A23','F1','F2','G1','G2','B1','B2','B3','B4','C1','C2','C3','C4','G1','G2'],
  'laser': ['A', 'A23','F1','F2','G1','G2','B1','B2','B3','B4','C1','C2','C3','C4','G1','G2'],
  'dot_matrix': ['B34'],
  'mp3':['F'],
  'dual_splitter':['F','G','B12','B34','C12','C34'],
  'octa_splitter':['B'],
  'humidity_sensor' : ['A', 'A23','B2','B3','B4'],
  'metal_detector' : ['A', 'A23'],
  'color_sensor' : ['F'],
  'heartbeat_sensor' : ['A', 'A23'],
  'ultrasonic_sensor' : ['F', 'G'],
  'hall_sensor' : ['A', 'A23'],
  'rfid' : ['B34'],
  'dc_motor': ['MOTOR'],
  '7segment_display': ['BC'],
  'relay': ['MOTOR'],
  '4_CH_relay':['B34','C12'],
  'electromagnet': ['MOTOR'],
  'led_strip': ['BC'],
  'light_sensor': ['A', 'A23','B2','B3','B4'],
  'bend_sensor': ['A', 'A23','B2','B3','B4'],
  'gas_sensor': ['A', 'A23','B2','B3','B4'],
  'distance_sensor': ['A', 'A23','B2','B3','B4'],
  'sound_sensor': ['A', 'A23','B2','B3','B4'],
  'temperature_sensor': ['A', 'A23','B2','B3','B4'],
  'rain_sensor': ['A', 'A23','B2','B3','B4'],
  'tact_switch': ['A', 'A23','F1','F2','G1','G2','B1','B2','B3','B4','C1','C2','C3','C4',],
  'dual_switch':['A','A23','F'],
  'touch_sensor':['A','A23'],
  'pir_sensor':['A','A23'],
  'joystick':['B34'],
  'gesture_sensor':['G'],
  'gyro_sensor':['G'],
  'compass':['G'],
  'rotational_sensor': ['A', 'A23'],
  'accelerometer': ['G'],
  'solar_panel': ['A', 'A23'],
  'battery': ['BATTERY']
}

}