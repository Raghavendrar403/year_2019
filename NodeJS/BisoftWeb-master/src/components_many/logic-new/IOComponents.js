const IOComponents = {
  'led' : { output: true, input: false },
  'geared_motor' : { output: true, input: false },
  'servo_motor' : { output: true, input: false },
  'dc_motor' : { output: true, input: false },
  '7segment_display' : { output: true, input: false },
  'relay' : { output: true, input: false },
  'electromagnet' : { output: true, input: false },
  'led_strip' : { output: true, input: false },
  'light_sensor' : { output: false, input: true },
  'bend_sensor' : { output: false, input: true },
  'gas_sensor' : { output: false, input: true },
  'distance_sensor' : { output: false, input: true },
  'sound_sensor' : { output: false, input: true },
  'temperature_sensor' : { output: false, input: true },
  'rain_sensor' : { output: false, input: true },
  'switch' : { output: false, input: true },
  'rotational_sensor' : { output: false, input: true },
  'accelerometer' : { output: false, input: true },
  'solar_panel' : { output: false, input: true },
  'battery' : { output: false, input: false },
};

module.exports = IOComponents;
