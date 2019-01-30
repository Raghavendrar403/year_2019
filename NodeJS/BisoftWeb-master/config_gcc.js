

var PORT					= 51822;
var EMBEDDED_PATH 			= '/nrfgcctest/';
var INCLUDE_PATH 			= EMBEDDED_PATH+'sdk6withdisplay/nrf51822/';
var DEFAULT_PATH 			= INCLUDE_PATH+'Board/nrf6310/s110/bibox_hornbill/app_uart_library_example_with_ble/';
var RUN_FROM_PATH 			= DEFAULT_PATH+'gcc';
var WRITE_TO_PATH			= DEFAULT_PATH;
var READ_FROM_PATH			= DEFAULT_PATH+'gcc/_build/';

//'/nrfgcctest/sdk6withdisplay/nrf51822/Board/nrf6310/s110/bibox_hornbill/app_uart_library_example_with_ble/gcc/_build/'

exports.EMBEDDED_PATH		= EMBEDDED_PATH;
exports.INCLUDE_PATH 		= INCLUDE_PATH;
exports.DEFAULT_PATH 		= DEFAULT_PATH;
exports.RUN_FROM_PATH 		= RUN_FROM_PATH;
exports.WRITE_TO_PATH 		= WRITE_TO_PATH;
exports.READ_FROM_PATH 		= READ_FROM_PATH;
exports.PORT 				= PORT;
