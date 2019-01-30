try{
  //const electron = require('electron')
  //var usb=null;
  var Promise     = require('bluebird');
  var uuid = require('node-uuid');
  var async = require('async');
  var fs  = Promise.promisifyAll(require('fs'));
  var opener = require("opener");
  var shell = require('shelljs');
  var process = require('process');
  var request = require('request');
  var download = require('download-file');
  var EXE = require("./src/build_exe_config");
  var CONFIG_PATH = require('./config_path');
  var useExe = EXE.USE_EXE;
  var useNoble = EXE.BUNDLE_TYPE;
  var SerialPort;
  SerialPort = require("serialport");
  var COMPORT;
  presentPlatform = process.platform;
  var pathToBisoft;
  pathToBisoft = process.env.LOCALAPPDATA;
  var localAppDataLocation;
  localAppDataLocation = pathToBisoft + '//Bisoft';
  var portSerial = false;
  var portUsb =false;
  var CONFIG      = require('./config_gcc');
  var bodyParser = require('body-parser');
  var path = require('path');
  var shell = require('shelljs');
  var uploadProgram;
  var deviceId='';
  var noble = null;
  var CONFIG      = require('./config_gcc');
  var bodyParser = require('body-parser');
  var path = require('path');
  var shell = require('shelljs');
  var uploadProgram;
  var deviceId='';
  var SerialPort = require("serialport");
  var async = require('async');
  var sleep = require('sleep');
  var express = require('express')
    , app = express()
    , http = require('http')
    , server = http.createServer(app)
    , io = require('socket.io').listen(server)
    , WebSocketServer = require('ws').Server
    , wss = new WebSocketServer({ server: server, path: '/connectivity'})
    , port = 9009;
  app.use('/',express.static("./"));
  // app.use(express.static("../GCC_BLE_win"));
  var bodyParserMiddleware = bodyParser.json({limit: '50mb'});
  app.use(bodyParser.json({limit: '50mb'}));  
  //server.use(express.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '5mb',extended: true}));
  var gcc_dir,GNU_Embedded,GNU_Include,RUN_FROM_PATH,WRITE_TO_PATH,READ_FROM_PATH;
  gcc_dir = localAppDataLocation;
  //console.log("path.isAbsolute",path.isAbsolute(gcc_dir));
  //console.log("path.parse",JSON.stringify(path.parse(gcc_dir)));
  // console.log(""+process.cwd());
  console.log("gcc_dir"+gcc_dir);
  /* /* gcc_dir = gcc_dir.replace(/\\/g,'\/');
  gcc_dir = gcc_dir.charAt(0).toUpperCase()+':'+gcc_dir.substring(2).trim();
  console.log("gcc_dir"+gcc_dir); */
    GNU_Embedded    = gcc_dir+CONFIG.EMBEDDED_PATH;
    GNU_Include     = gcc_dir+CONFIG.INCLUDE_PATH;
    RUN_FROM_PATH   = gcc_dir+CONFIG.RUN_FROM_PATH;
    WRITE_TO_PATH   = gcc_dir+CONFIG.WRITE_TO_PATH;
    READ_FROM_PATH  = gcc_dir+CONFIG.READ_FROM_PATH;
   
	process.on('uncaughtException',function(err){
    console.log("error from process",err);
    var st = 'FOR /F \"tokens=5 delims= \" %P IN (\'netstat -a -n -o ^| findstr 0.0.0.0:9009\') DO TaskKill.exe/F /PID %P';
        shell.exec(st, {silent:true},function(code, stdout, stderr) {
        console.log('Exit code:', code);
    if(code==0){    
		server.listen(port, function () {
		console.log('socket.io server listening at %s', port);          
    });
	}
    console.log('Program output:', stdout);
    console.log('Program stderr:', stderr);
    });
    });
    
    server.listen(port, function () {
	  console.log('socket.io server listening at %s', port);    
    });
	var fs = require('fs');
	var opener = require("opener");
	var async = require('async');
	var multer = require('multer');
	var _= require("underscore");
	//var express = require('express');
	var jwt    = require('jsonwebtoken');
	var bodyParser = require('body-parser');
	//var server = express(); // better instead
	var uploadProgram;
	var shell = require('shelljs');
	var path =require('path');
	//var mongoose = require('mongoose');
	// mongoose.connect('mongodb://178.79.164.63:27017/bisoft_user');
	// var appdetailsSchema = new mongoose.Schema({name:String,secret:String,version:String});
	// var AppDetails = mongoose.model('app',appdetailsSchema,'app');
	//shell.exec('node -v', function(code, stdout, stderr) {}).stdout;
	
	var rimraf = require('rimraf');
	//server.use('/',express.static("./"));
	//server.use('/',express.static("./downloads"));
	//server.use(express.urlencoded());
	//server.use(express.multipart());
	//server.use(bodyParser.json({limit: '50mb'}));  
	//server.use(bodyParser.urlencoded({limit: '50mb',extended: true}));
	//var path = require('path');
	//server.get('/',function(req,res){
	 // res.sendFile(path.join('__dirname', '..', 'index.html'));
	//});
	//server.set('UPLOAD_FOLDER', './uploads/');

	//console.log("Running at Port:9009");
	 
	opener("http://localhost:9009/");
	console.log("Running at Port:9009");


	
   app.post('/app_validate/',function(req, res) {
	console.log("req "+ req.body.app_name);
	var name=req.body.app_name;
	var version=req.body.app_version;
	var secret=req.headers['secret'].toString();
	console.log(req.headers['secret']);
	AppDetails.findOne({'secret':secret,'name':name}).exec(function(err,appdetails){
		if(appdetails){		
				var token = jwt.sign({'name':name}, server.get('superSecret'), {
					expiresIn: '24h' // expires in 24 hours
				});
				res.json({'token':token});
				var decoded = jwt.decode(token, {complete: true});
		}
		else{
			res.status(400).json({'error':'Verification failed'});
		}
    });

	});


	app.get('/devices',function(req,res){
	
	var myVar;
	var nameId,macId;
	
	// res.send({'devices':devices});
 	console.log("startScanning: ");
	function myTimer() {
		count++;
		console.log(count);
		if(count>=5){
			count=0;
			console.log("res: "+devices.length);
			// noble.stopScanning();
			clearInterval(myVar);
			for(var i=0;i<devices.length;i++)
				console.log("sending: "+ devices[i].mac);
			res.send({'devices':devices});
			devices = [];
		}
	}
	
	// console.log("in1"+noble.state);
	// noble.stopScanning();
	// noble.emit('stateChange');
	myVar= setInterval(myTimer, 1000);
	
	
});

	app.post('/upload/hexa_code',function(req,res){
		var count=0;
		peripheralId=req.body.macId;
		var Program = req.body.code;
		uploadCall(Program);
		// noble.state='poweredOn';
		// noble.emit('stateChange');
		res.send({success:true});
	});

	var csv_upload 	= multer({
				dest: localAppDataLocation + '/projects/',
				limits: {
					fileSize: 50000000
				}
			});

	var csvUpload = csv_upload.fields([{ name: 'text', maxCount: 20 }]);

	app.post('/web_bisoft/save/project/:id',csvUpload,function(req,res){
		console.log("error posting project");
		var projectId=req.params.id;
		var file=req.files['text'];
		console.log("file project:"+ JSON.stringify(file)); 
	 
		//var ProjectDetails=JSON.stringify(datatoparse);
		var fpath=file[0].path;
		fs.mkdir(localAppDataLocation + '/projects/'+projectId, function (err) { 
			fs.rename(fpath,localAppDataLocation + '/projects/'+projectId+'/'+projectId+'_project.txt',function(err){
				if(err){
					console.log(err);
					res.status(400).json({'status':'error'});

				}else{
					console.log("success");
					res.status(200).json({'status':'success'});
				}
			});
		});   
	});

	app.post('/web_bisoft/save/app/:id',csvUpload,function(req,res){
		console.log("error posting app");
		var projectId=req.params.id;
		var file=req.files['text'];
		console.log("file app:"+ JSON.stringify(file));
		//var datatoparse=req.body.data; 
		//var AppDetails=data;
		var fpath=file[0].path;
		fs.mkdir(localAppDataLocation + '/projects/'+projectId, function (err) { 
			fs.rename(fpath, localAppDataLocation + '/projects/'+projectId+'/'+projectId+'_app.txt',function(err){
				if(err){
					console.log(err);
					res.status(400).json({'status':'error'});

				}else{
					console.log("success");
					res.status(200).json({'status':'success'});
				}
			});
	  });
	});

	app.post('/web_bisoft/deleteproject/:id',function(req,res){
		console.log("delete project");
			var projectId=req.params.id;
		var path_to_del= localAppDataLocation + '/projects/'+projectId;
		rimraf(path_to_del, function(err) {
			if (err) { 
				console.log("Error while deleting directory: "+err);
				res.status(400).json({'status':'error'});
			}
			console.error("directory deleted ");
			res.status(200).json({'status':'success'});
			//next();
		});
	});

	app.get('/web_bisoft/projects',function(req,res){
		var dir= localAppDataLocation  + "/projects";
		var AllfilesData=[];
		fs.readdir(dir, function (err, list) {
			if(list && list.length>0){
				var listlength=list.length;
				for(var i=0;i<listlength;i++){
					var proj=list[i];
					var path = dir + "/" + proj;
					var directoriesOpened=0;
					fs.readFile(path+'/'+proj+'_project.txt', 'utf8', function (err, data) {
						directoriesOpened++;
						try{
							if (err) {
								//continue;
								throw err;
							}else{
								AllfilesData.push(JSON.parse(data));
							}
							if(directoriesOpened==listlength){
								AllfilesData=_.sortBy(AllfilesData,function(elem){
									return elem.modifiedTime;
								});
								res.status(200).json({'projects':AllfilesData.reverse()});
							}
						} catch(err){
							//console.log("file not found "+err);
							if(directoriesOpened==listlength){
								AllfilesData=_.sortBy(AllfilesData,function(elem){
									return elem.modifiedTime;
								});
								res.status(200).json({'projects':AllfilesData.reverse()});
							}
						}
					});
				}
			}else{
				res.status(200).json({'projects':AllfilesData});
			}
		});	
	});

	app.get('/web_bisoft/tutorials',function(req,res){
		var dir= localAppDataLocation + "/tutorials";
		var AllfilesData=[];
		fs.readdir(dir, function (err, list) {
			var listlength=list.length;
			for(var i=0;i<listlength;i++){
				var proj=list[i];
				var path = dir + "/" + proj;
				var directoriesOpened=0;
				fs.readFile(path+'/'+proj+'_project.txt', 'utf8', function (err, data) {
					directoriesOpened++;
					try{
						if (err) {
							throw err;
						}else{
							AllfilesData.push(JSON.parse(data));
						}
						if(directoriesOpened==listlength){
							AllfilesData=_.sortBy(AllfilesData,function(elem){
								return elem.modifiedTime;
							});
							res.status(200).json({'projects':AllfilesData.reverse()});
						}
					} catch(err){
						//console.log("file not found "+err);
						if(directoriesOpened==listlength){
							AllfilesData=_.sortBy(AllfilesData,function(elem){
								return elem.modifiedTime;
							});
							res.status(200).json({'projects':AllfilesData.reverse()});
						}
					}
				});
			}
		});	
	});

	app.get('/web_bisoft/tutorial/:id',function(req,res){
		var projectId=req.params.id;
		var dir= localAppDataLocation + "/tutorials/" + projectId + '/' + projectId +"_project.txt";
		var AllfilesData = {};
		fs.readFile(dir, 'utf8', function read(err, data) {
			try{
				if (err) {
					throw err;
				}else{
					AllfilesData=JSON.parse(data);
					res.status(200).json({'project':AllfilesData});
				}	
			} catch(err){
					console.log("file not found "+err);
					res.status(200).json({'projects':AllfilesData});
			  }    
		});	      		   
	});

	app.get('/web_bisoft/project/:id',function(req,res){
		console.log("inside project save");
		var projectId=req.params.id;
		var dir= localAppDataLocation + "/projects/" + projectId + '/' + projectId +"_project.txt";
		var AllfilesData;
		fs.readFile(dir, 'utf8', function read(err, data) {
			try{
				if (err) {
					throw err;
				}else{
					AllfilesData=JSON.parse(data);
					res.status(200).json({'project':AllfilesData});
				}
			} catch(err){
				res.status(200).json({'project':AllfilesData});
			}		    
		});	      		   
	});

	app.get('/web_bisoft/app/:id',function(req,res){
		console.log("inside app save");
		var projectId=req.params.id;
		var dir = localAppDataLocation + "/projects/" + projectId + '/' + projectId +"_app.txt";
		var AllfilesData;
		fs.readFile(dir, 'utf8', function read(err, data) {
			try{
				if (err) {
					throw err;
				}else{
					AllfilesData=JSON.parse(data);
					res.status(200).json({'project':AllfilesData});
				}
			} catch(err){
				res.status(200).json({'project':AllfilesData});
			}	    
		});	      		   
	});

	app.get('/web_bisoft/tutorial_app/:id',function(req,res){
	var projectId=req.params.id;
	var dir = localAppDataLocation + "/tutorials/" + projectId + '/' + projectId +"_app.txt";
	var AllfilesData;
	fs.readFile(dir, 'utf8', function read(err, data) {
		try{
			if (err) {
	        	throw err;
	    	}else{
		    	AllfilesData=JSON.parse(data);
		    	res.status(200).json({'project':AllfilesData});
	    	}
	    } catch(err){
	    	res.status(200).json({'project':AllfilesData});
	    }	    
	});	      		   
	});


	app.get('/changed_path',function(req,res){
		change_input_and_output_path(function(err,data){
			res.send(data.DATA);
			
		});
	});

	var FILE_NAME_CHANGING_COUNTER = 1;
	var OLD_INPUT_PATH = 'C_SOURCE_FILES += main.c';
	var OLD_OUTPUT_PATH = 'OUTPUT_FILENAME := ble_app_uart';
	var NEW_INPUT_PATH, NEW_OUTPUT_PATH;
	var MAKEFILE_OBJECT = {'NEW_INPUT_PATH':'','NEW_OUTPUT_PATH':'','DATA':''};
	function change_input_and_output_path(callback){
		var ret='';
		var readPath='~/bisoftweb/testing_gcc/nrfgcctest/sdk6wonderbox/nrf51822/Board/nrf6310/s110/bibox_hornbill/app_uart_library_example_with_ble/gcc/';
		// var readPath='D:/Compiler/nrfgcctest/sdk6wonderbox/nrf51822/Board/nrf6310/s110/bibox_hornbill/app_uart_library_example_with_ble/gcc/';
		shell.cd(readPath);
		fs.readFile('Makefile', 'utf8', function(e,data){
			if(e){
				console.log(e);
				ret+=e;
				// console.log('uploaded: '+ret);
				callback(e,null);
			}else{
				ret+=data;
				// ret+='Compiled and Uploaded successfully';
				NEW_INPUT_PATH = "C_SOURCE_FILES += main_"+FILE_NAME_CHANGING_COUNTER+".c";
				NEW_OUTPUT_PATH = "OUTPUT_FILENAME := ble_app_uart_"+FILE_NAME_CHANGING_COUNTER;
				MAKEFILE_OBJECT.NEW_INPUT_PATH= "main_"+FILE_NAME_CHANGING_COUNTER+".c";
				MAKEFILE_OBJECT.NEW_OUTPUT_PATH= "ble_app_uart_"+FILE_NAME_CHANGING_COUNTER;
				ret=ret.replace(OLD_INPUT_PATH,NEW_INPUT_PATH);
				MAKEFILE_OBJECT.DATA=ret=ret.replace(OLD_OUTPUT_PATH,NEW_OUTPUT_PATH);
				OLD_INPUT_PATH=NEW_INPUT_PATH;
				OLD_OUTPUT_PATH=NEW_OUTPUT_PATH;
				FILE_NAME_CHANGING_COUNTER++;
				// console.log();
				fs.writeFile('Makefile', ret, 'utf8', function(MAKEFILE_OBJECT){
					return function(err){
						if (err){
							callback(err,null);
						}else{
							console.log('It\'s saved ! '+MAKEFILE_OBJECT.NEW_OUTPUT_PATH);
							callback(null,MAKEFILE_OBJECT);
						}
					}
				}(MAKEFILE_OBJECT));
			}
		});
	}


      function hexFileUpload(hex_file_upload,callback){
		if(portUsb){
			console.log("port usb is opened");
			portUsb.close(function(){
			   console.log("port Close");
			});
		}
		
		var hexCodeForCmd = "\""+localAppDataLocation +"\""+ "\\hci_dfu_send_hex\\py.exe " + "\""+localAppDataLocation+"\"" + "\\hci_dfu_send_hex\\hci_dfu_send_hex.py" + " -b 250000 -p " + COMPORT + " -fc -f " +  hex_file_upload;
		
		shell.exec(hexCodeForCmd, function(code, stdout, stderr) {
			console.log('Exit code:', code);
			console.log('Program output:', stdout);
			console.log('Program stderr:', stderr);
		callback(stdout);
		});
	 }
	 
	function dfuUpload(data,callback){
		console.log(data);
		var url;
		var hex_file_upload;
		var biboxType;
		require('dns').lookup('www.google.com', function(err) {
			if (err && err.code == "ENOTFOUND"){
				console.log("no internet");
				if(data=="hornbill"){
					biboxType= 'hornbill';
				}
				else{
					biboxType= 'starling';
				}
				fs.readdir(localAppDataLocation+'\\hci_dfu_send_hex\\'+biboxType+'\\online', (err, files) => {
					console.log('file length', files.length);
					if(!files.length){
						console.log("empty", biboxType);
						fs.readdir(localAppDataLocation+"\\hci_dfu_send_hex\\"+biboxType+"\\offline", (err, files) => {
							files.forEach(file => {
								console.log('file',file);
								hex_file_upload = "\""+localAppDataLocation+"\""+ "\\hci_dfu_send_hex\\"+biboxType+"\\offline\\" + file;
								//console.log('hex_file_upload',hex_file_upload);
							});
							hexFileUpload(hex_file_upload, function(stdout){
								callback(stdout);
								
							});
						});
					}
					else{
						console.log("not empty", biboxType);
						files.forEach(onlineFile => {
							//console.log("file", onlineFile);
							hex_file_upload = "\""+localAppDataLocation+"\""+'\\hci_dfu_send_hex\\'+biboxType+'\\online\\'+onlineFile;
							hexFileUpload(hex_file_upload, function(stdout){
								callback(stdout);
								
							});
						});
					}
				});
			}
			else{
				console.log("internet");
				if(data=="hornbill"){
				   url = CONFIG_PATH.BIBOX_HORNBILL_URL;
				   console.log('url', url);
				   biboxType= 'hornbill';
			
				}
				else{
					url =CONFIG_PATH.BIBOX_STARLING;
					console.log('url', url);
					biboxType = 'starling';
				}
				fs.readdir(localAppDataLocation+'\\hci_dfu_send_hex\\'+biboxType+'\\online', (err, fileDeleted) => {
					console.log('file length', fileDeleted.length);
					if(!fileDeleted.length){
						console.log('empty');
                       	request.get(url, function(err, response, body) {
							bodyJson = JSON.parse(response.body);
							final_url = bodyJson['hex_files'][0]['file_path'];
							var split_url = final_url.split('/');
							var hex_file_name =split_url[split_url.length-1];
							console.log(hex_file_name); 
							var url = final_url;
							var options = {
								directory:localAppDataLocation+'\\hci_dfu_send_hex\\'+biboxType+'\\online',
								filename:hex_file_name
							}
							download(url, options, function(err){
								if (err) throw err
								else{
									console.log("sucess")
									hex_file_upload = "\""+localAppDataLocation+"\""+'\\hci_dfu_send_hex\\'+biboxType+'\\online\\'+hex_file_name;
									hexFileUpload(hex_file_upload, function(stdout){
										callback(stdout);
										
									});
								}
							});
				        });
					}
					else{
                        console.log('not empty');
                        fs.unlink(localAppDataLocation+'\\hci_dfu_send_hex\\'+biboxType+'\\online\\'+fileDeleted, function(err){
                             if(err){
                             	console.log("err while deleting file" , err);
                             }
                             else{
                             	console.log("file deleted successfully");
                             }
                        });
                        request.get(url, function(err, response, body) {
							bodyJson = JSON.parse(response.body);
							final_url = bodyJson['hex_files'][0]['file_path'];
							var split_url = final_url.split('/');
							var hex_file_name =split_url[split_url.length-1];
							console.log(hex_file_name); 
							var url = final_url;
							var options = {
								directory:localAppDataLocation+'\\hci_dfu_send_hex\\'+biboxType+'\\online',
								filename:hex_file_name
							}
							download(url, options, function(err){
								if (err) throw err
								else{
									console.log("sucess")
									hex_file_upload = "\""+localAppDataLocation+"\""+'\\hci_dfu_send_hex\\'+biboxType+'\\online\\'+hex_file_name;
									hexFileUpload(hex_file_upload, function(stdout){
										callback(stdout);
										
									});
								}
							});
				        });
					}
				});

			}
		});
				
	}


	
	var count=0;
	var devices = [];
	var peripheralId = '@@';
	var uploadProgram;

	app.get('/uptime/',function(req,res){
		try{
		  console.log("up");
		  res.sendFile('img.jpg',{ root : __dirname});
		}catch(e){
		  console.log("down");
		  console.log(e);
		}  
	});

	var socketlist = [];
	var Socket = null;
	io.sockets.on('connection', function (socket) {
    console.log('Opened Connection ?');
    socketlist.push(socket);
    socket.on('close', function (data) {
      console.log('socket closed');
      socketlist.splice(socketlist.indexOf(socket), 1);
    });
    
	
	socket.on('/portClose',function(data){
		console.log('data',data);
		socket.emit('msg',{'data':'hello'})
		
	})
	
	
	socket.on('/starling', function (data) {
	if(COMPORT){
		console.log('COMPORT', COMPORT);
		portUsb.close(function(){
				   console.log("port Close");
			});
		portUsb = false;
	}
	console.log('browser request : ', data);
	async.series([
		function(callback){
			if(!portUsb){
				
				SerialPort.list((err, ports) => {
					ports.forEach((comport) => {
						if(comport.vendorId){
							COMPORT = comport.comName;
							console.log("COMPORT detected" , COMPORT);
						}
					});
					portUsb = new SerialPort(COMPORT, {autoOpen: true,
									baudRate:250000, 
									rtscts:true,
		 
					});
					console.log('one');
					callback();
				});
				
			}
		},
		function(callback){
			portUsb.on('open',function(){        
				var bufView = ["W".charCodeAt(),"H".charCodeAt(),"O".charCodeAt()];        
				//var bufView = ["D".charCodeAt(),"F".charCodeAt(),"U".charCodeAt()];
				console.log('bufview',bufView);
				portUsb.write(bufView, function(err) {
					 console.log('dfu',bufView);
					 if(err){
						console.log("error write", err);
					 }
					 else{
						 console.log('message written');
					 }
				});
				portUsb.on('error', function(err) {
				  console.log('Error: ', err.message);
				})
			});
			console.log('two');
			callback();
		},
		function(callback){
			sleep.msleep(1000) // sleep for 10 seconds
			console.log('three');
			callback();
			
		},
		function(callback){
			portUsb.on('open',function(){        
				var bufView = ["W".charCodeAt(),"H".charCodeAt(),"O".charCodeAt()];        
				//var bufView = ["D".charCodeAt(),"F".charCodeAt(),"U".charCodeAt()];
				console.log('bufview',bufView);
				portUsb.write(bufView, function(err) {
					 console.log('dfu',bufView);
					 if(err){
						console.log("error write", err);
					 }
					 else{
						 console.log('message written');
					 }
				});
				portUsb.on('error', function(err) {
				  console.log('Error: ', err.message);
				})
			});
			console.log('four');
			callback();
		},
		 function(callback){
			portUsb.on('open',function(){        
				portUsb.on('data', function (data) {
					console.log('reading');
					var response = data.toString('utf8');
					console.log('Response:', response);
					console.log('socket opened',data);
					socket.emit('message',{output:response})
				});
				
				portUsb.on('error', function(err) {
				  console.log('Error: ', err.message);
				})
			});
			console.log('five');
			callback();
		},
		
		 ],
		function(err){
		   console.log("error :: ", err);
				  
			}
	);
    }); 
	
	
     socket.on('/dfu', function (data) {
    	try{
			async.series([
			function(callback){
			    SerialPort.list((err, ports) => {
					ports.forEach((comport) => {
					  if(comport.vendorId){
						 COMPORT = comport.comName;
						 //console.log("COMPORT inside" , COMPORT);
					}
				});
				console.log('one');
				callback();
			    });
			},function(callback){
				dfuUpload(data,function(stdout){
				    socket.emit('message', { output: stdout});
				});
				console.log('two');
				callback();
            }
	      ],
		  function(err){
			  console.log("error", err);
			  
		  }
		  
		  )
    	}
    	catch(e){
    		console.log("error",e);
    	}
    	
    });
    socket.on('/selected_device',function(req){
      socket.emit('_selected_device',{"deviceId":deviceId});
    });

    socket.on('/uptime/',function(req,res){
      try{
        console.log("up");
        socket.emit('_uptime',{success:true});
      }catch(e){
      console.log("down");
      console.log(e);
      }  
    });
    
    socket.on('/device',function(req){
      peripheralId = req.code;
      peripheralId = JSON.parse(peripheralId).code;
      deviceId = peripheralId;
      console.log("peripheralId:  "+peripheralId);
      socket.emit('_device',{success:true});
    });
    
    socket.on('/btRemote',function(req){
      Socket = socket;
      count=0;
      requestFor="uploadBtData";
      uploadProgram = req.data;
      console.log("data:  "+uploadProgram); 
      if(Characsend){
        sendBtData(Characsend);
      }
      else if(peripheralId!='@@'){
        if(myInitVar==null ||(myInitVar && myInitVar._idleTimeout == -1)){
          if(noble == null)
            init();
          noble.state='poweredOn';
          noble.emit('stateChange');
        }
      }else{
        console.log("macId not set.");
        socket.emit('_btRemote',{'status':'devicenotfound'});
      }
    });
    
    socket.on('/getDevices',function(req){
      try{
        Socket = socket;
        requestFor="addtolist";
        var myVar;
        var nameId,macId;
        console.log("startScanning: ");
        if(noble == null)
          init();
        noble.state='poweredOn';
        console.log("in1   "+noble.state);
        noble.stopScanning();
        noble.emit('stateChange');
      }catch(e){
        socket.emit('_getDevices',{'devices':devices});
        noble = null;
        throw new Error('No compatible USB Bluetooth 4.0 device found! Please connect your bluetooth device..\n'+e);
      }
    });
    
    socket.on('upload/hex_file',function(req){
      try{
        var data = req.query.a;
        var file = req.query.c;
        console.log(file+' data: '+data.length);
        if(data && data.length>0){
          fs.writeFile(file, data, 'utf8', function(err){
            if (err){
              console.log(err);
              socket.emit('upload_hexfile',{'status':err});
            }else{
              console.log('It\'s saved!');
              socket.emit('upload_hexfile',{success:true});
            }
          });
        }else{
          console.log("no data to write hex file.");
          socket.emit('upload_hexfile',{'status':'no data to write hex file.'});
        }
      }catch(e){
        console.log("error"+e);
        socket.emit('upload_hexfile',{'status':e});
      }
    });

    socket.on('upload/editor_code',function(req){
      try{
        var datarecieved = req.code;
        var Program = datarecieved;
        var ret='';
        gcc_compile_output=" "; 
        gcc_compiler(Program, function(err,data){
          if(err){
            ret+=err;
            socket.emit('_upload/editor_code',{'status':ret,gcc_compile_output:err});
          }else{ 
            socket.emit('_upload/editor_code',{success:true,data:data,gcc_compile_output:"Sucessfully compiled, hex and bin file are generated"});
          }
        });
      }catch(e){
        console.log("error"+e);
        socket.emit('upload_hexfile',{'status':e});
      }
    });

    socket.on('/upload',function(req){
      try{
		
        requestFor="upload";
        var count=0;
		var status;
		var dummy;
		dummy= "00:00:00:00:00:00";
		console.log("uploading from upload");
        console.log("upload");
        var Program = req.code;
        uploadProgram=Program;
		async.series
			([  
			function (callback)
			{
				SerialPort.list((err, ports) => {
					ports.forEach((comport) => {
					  //console.log(port.comName,port,port.vendorId);
					  if(comport.vendorId){
						 COMPORT = comport.comName;
						 //console.log("COMPORT" , COMPORT);
					  }
					});
				//console.log("one");
				callback();
				});
				
			}
			,
			function (callback)
			{   if(COMPORT){
					if(peripheralId!='@@'){
					  generating_code_file(Program,function(err,data){
						if(err){
						  socket.emit('_upload',{status:err});
						}else{
						  socket.emit('_upload',{success:true});
						}
						});
					}else{
						  console.log("macId not set.");
						  socket.emit('_upload',{'status':'devicenotfound'});
					}
				}
				else if(deviceId!=dummy){
					console.log("no comport");
					console.log("device id", deviceId);
					console.log("device id type", typeof(deviceId));
					generating_code_file(Program,function(err,data){
					if(err){
					  socket.emit('_upload',{status:err});
					}else{
					  if(myInitVar==null ||(myInitVar && myInitVar._idleTimeout == -1)){
						if(noble == null)
						  init();
						noble.state='poweredOn';
						noble.emit('stateChange');
					  }
					  socket.emit('_upload',{success:true});
					}
					});
					
				}
				else{
					console.log("No comport is present to upload");
					
				}
				
				//console.log("two");
				callback();
			}
			]
			,
			function(err) 
			{
				console.log('Both a and b are saved now');
				
		    }
		);
		
		
      }catch(e){
        noble = null;
        console.log("error"+e);
        socket.emit('_upload',{'status':e});
      }
    });  
    
    socket.on('/disconnect',function(req){
      try{
        if(Peripheral){
          Peripheral.disconnect();
          console.log(Peripheral.advertisement.localName+" disconnected");
          socket.emit('_disconnect',{'success':Peripheral.advertisement.localName+"disconnected"});
          Peripheral = null;
          Characsend = null;
        }else{
          console.log("Device not present for disconnection");
          socket.emit('_disconnect',{'success':'Device not present for disconnection'});
        }
      }catch(e){
        noble = null;
        console.log("error"+e);
        socket.emit('_disconnect',{'status':e});
      }
    });
    Socket = socket;
    });

	var IOT_ACTIONS = {};
	var WS = {};
	var getIOTDataInitVar;
	var READ_INTERVAL = 100;
	try{
    wss.on('connection', function connection(ws) {
		async.series([
		function(callback){
			if(portUsb){
				console.log("port usb is opened");
				portUsb.close(function(){
				   console.log("port Close");
				});
			}
			console.log("one done")
			callback(null,1);
			
		},
		function(callback){
			SerialPort.list((err, ports) => {
			ports.forEach((comport) => {
			  //console.log(port.comName,port,port.vendorId);
			  if(comport.vendorId){
				 COMPORT = comport.comName;
				 console.log("COMPORT IN getIOTdata" , COMPORT);
			  }
			});
			portUsb = new SerialPort(COMPORT, {autoOpen: true,
				baudRate: 250000, 
				rtscts:true,
			
			});
			console.log("two done");
			callback(null,2);
			});
		}
		],
		function(err){
			console.log(err);
			console.log('sucess');
		});
		
		

        console.log('---------------------------------Opened Connection ?----------------------');
        WS = ws;
        // var location = url.parse(ws.upgradeReq.url, true);
      // var id = ws._ultron.id;
      var id = ws._socket.remoteAddress + ":" + ws._socket.remotePort;
      var flag= 1;
      var type;
      var macid;
        

      
        console.log("Client ip "+ws._socket.remoteAddress, ws._socket.remotePort);
        ws.on('message', function incoming(message) {
          var messageParts=message.split(',');
          var iot_actions = {
              
            'decimalToBinary'   :   function(num) {
                          console.log(num);                       
                          var binary=num.toString(2);
                                          var lb=binary.slice(-8);
                                          if(!lb){
                                            lb=0;
                                          }
                                          var hb=binary.slice(0,binary.lastIndexOf(lb));
                                          if(!hb){
                                            hb=0;
                                          }
                                          var hbDec=parseInt(hb, 2);//.toString(16);
                                          var lbDec=parseInt(lb, 2);//.toString(16);
                          console.log(num+" in binary is " + binary);                       
                          console.log(hb,hbDec);
                          console.log(lb,lbDec);
                          return [hbDec,lbDec];
                      },
            'sendIOTData'        :  function(message){
                        try{
                                        if(message['action']=='sendIOTData'){
                                          console.log("-----------------------------------write---------------",message);
                                      }
                                      var sendData = JSON.stringify({"data":message,'OP_CODE':'IOT_DATA','macid':peripheralId});
                                        console.log('sendData '+sendData);
                                      if(ws){
                                        ws.send(sendData);
                                      }
                        }catch(e){
                          console.log("iot_actions[sendIOTData] error handler "+e);
                        }
                                  },
            'getIOTData'        :   function(message){
                          try{
                            console.log("-----------------------------------read---------------",message);
                                        count=0;
                          requestFor="getIOTData";
                          console.log("data:  "+message['getIOTData']); 
                          DATA = [80,65];
                          READ_INTERVAL = message['readInterval'];
                         
								if(Characsend){
									if(!getIOTDataInitVar==null ||!(getIOTDataInitVar && getIOTDataInitVar._idleTimeout == -1)){
										  clearInterval(getIOTDataInitVar);
										getIOTDataInitVar= setInterval(getIOTDataTimer, READ_INTERVAL);
									  }else{
										getIOTDataInitVar= setInterval(getIOTDataTimer, READ_INTERVAL);
									  }
								    }
								   else if(COMPORT){
									  uploadBtData(null,COMPORT);
									  console.log("inside characsend");
									  if(!getIOTDataInitVar==null ||!(getIOTDataInitVar && getIOTDataInitVar._idleTimeout == -1)){
										  clearInterval(getIOTDataInitVar);
										getIOTDataInitVar= setInterval(getIOTDataTimer, READ_INTERVAL);
									  }
									  else{
										getIOTDataInitVar= setInterval(getIOTDataTimer, READ_INTERVAL);
									  }
								   }
								  else if(peripheralId!='@@'){
									if(myInitVar==null ||(myInitVar && myInitVar._idleTimeout == -1)){
									  if(noble == null)
										init();
									  noble.state='poweredOn';
									  noble.emit('stateChange');
									}
								  }else{
									console.log("macId not set.");
										ws.send(JSON.stringify({"getIOTData":{'status':'devicenotfound'}}));
								  }
                        }catch(e){
                          console.log("webSocket iot_actions[getIOTData] error handler "+e);
                        }
                        // ws.send(JSON.stringify(message));
                        
                                  },
            'writeIOTData'      :   function(message){
                        try{
                          console.log("-----------------------------------write---------------",message);
                          var bin;
                                        count=0;
                          requestFor="writeIOTData";
                          console.log("data:  "+message['writeIOTData']); 
                          DATA = [80,66];
                          for(var i=1,j=2; i<10; i++,j=j+2){
                            if(message['writeIOTData']['IOT_'+i]){
                              bin = IOT_ACTIONS['decimalToBinary'](Number(message['writeIOTData']['IOT_'+i]))
                              DATA[j] = bin[0];
                              DATA[j+1] = bin[1];
                            }
                          }
                          if(message['writeIOTData']['IOT_'+10]){
                            bin = IOT_ACTIONS['decimalToBinary'](Number(message['writeIOTData']['IOT_'+10]))
                            DATA.push(80);
                            DATA.push(84);
                            // DATA.push(-1);
                            // DATA.push(-1);
                            DATA.push(bin[0]);
                            DATA.push(bin[1]);
                          }
                          // ws.send(JSON.stringify(message));
                          if(Characsend){
                            sendIOTData(Characsend);
                          }
							else if(COMPORT){
							  console.log("inside write iot data", COMPORT);
							  sendIOTData(Characsend);
						  }
                          else if(peripheralId!='@@'){
                            if(myInitVar==null ||(myInitVar && myInitVar._idleTimeout == -1)){
                              if(noble == null)
                                init();
                              noble.state='poweredOn';
                              noble.emit('stateChange');
                            }
                          }else{
                            console.log("macId not set.");
                                        ws.send(JSON.stringify({"writeIOTData":{'status':'devicenotfound'}}));
                          }
                        }catch(e){
                          console.log("webSocket iot_actions[writeIOTData] error handler "+e);
                        }
                                  }

          };
          IOT_ACTIONS = iot_actions;
          if(isJson(message)){
            message = JSON.parse(message);
            console.log('message parsed: %s', JSON.stringify(message));
            if(iot_actions[message["OP_CODE"]]){
              iot_actions[message["OP_CODE"]](message);
            }
            else{
              console.log('message out: %s', JSON.stringify(message));
            }//{"IOT_DATA":{"IOT_1":"0","IOT_2":"2000"},"macid":"C3:C7:47:A3:9A:3C"}
          }
          else{
            if(iot_actions[messageParts[0]]){
              iot_actions[messageParts[0]](messageParts);
            }else {
              console.log('message : %s', message);
            }
          }

        });



        ws.on('close', function close() {
            console.log('---------------------------------close Connection ?----------------------',macid,type,id);
            if(Peripheral){
              Peripheral.disconnect();
            }
            if(!getIOTDataInitVar==null ||!(getIOTDataInitVar && getIOTDataInitVar._idleTimeout == -1)){
              clearInterval(getIOTDataInitVar);
          }
        });
    });
    }catch(e){
    console.log("webSocket error handler "+e);
    }

    function getIOTDataTimer() {
	try{
		  if(Characsend){
		sendIOTData(Characsend);
	  }
	else if(COMPORT){
		  sendIOTData(Characsend);
	  }
	  else{
		  console.log("no device is available to send");
	  }
	}catch(e){
	  console.log("getIOTDataTimer error handler "+e);
	}
	}
  
    function isJson(str) {
      try {
          JSON.parse(str);
      } catch (e) {
          return false;
      }
     return true;
    }

	app.post('/upload/flow_code', bodyParserMiddleware, function(req,res){
    var code=req.body.code;
    var program1=code.init;
    var program2=code.main;
    shell.cd(inputPath);
    fs.readFile('./flow/main.c', 'utf8', function(err, data) {
      shell.cd(gcc_dir);
      if (err) console.log(err);
      var textToCheck='void Bisoft_Generated_Settings(void)';
      var textToCheck2='void Bisoft_Generated_Loop(void)';
      var cFunctionIndex=data.indexOf(textToCheck);
      var cFunctionIndex2=data.indexOf(textToCheck2);
      if(cFunctionIndex>=0 && cFunctionIndex2>=0){
        if(data.charAt(cFunctionIndex+textToCheck.length+2)=='{' && data.charAt(cFunctionIndex2+textToCheck2.length+2)=='{'){
          
          var result = data.substring(0,cFunctionIndex+textToCheck.length+3)+program1;
          var result = result+data.substring(cFunctionIndex+textToCheck.length+3,cFunctionIndex2+textToCheck2.length+3)+program2+data.substring(cFunctionIndex2+textToCheck.length+3);
          var ret='';
          gcc_compiler(result, function(err,data){
            if(err){
              ret+=err;
              res.send({success:ret});
            }else{
              res.send({success:data});
            }
          });
        }else{
          res.send({success:"empty1"});
        }
      }else{
        res.send({success:"empty2"});
      }
    });
    });

    app.get('/compiled_file', function(req, res) {
    try{
        var FILE_NAME=req.body.file;
        // Check if file specified by the API_DOC exists 
        fs.exists(path+'/_build/'+FILE_NAME, function(exists){
          if (exists) {     
              res.sendFile(path+'/_build/'+FILE_NAME);
            } else {
              res.status(400).json({
                'result'  : "ERROR File does NOT Exists",
                  'status'  : 'Failure'
              });
            }
        });
      }catch(err){
        log.error("compiled_file get api error: "+err);
        res.status(400).json({
          'result'  : err,
            'status'  : 'Failure'
        });
      }
    });

    app.get('/compiled_file/:file', function(req, res) {
    try{
        var FILE_NAME=req.params.file;
        var file_path = READ_FROM_PATH+FILE_NAME;
        // console.log('\n',file_path+'');
        // Check if file specified by the API_DOC exists 
        fs.exists(file_path, function(exists){
          if (exists) {     
            var file_path_with_backslash = file_path.replace(/\//g,'\\');
            // console.log('\n',file_path_with_backslash+'');
            res.sendFile(file_path_with_backslash,function(err,data){
            // res.sendFile(path.join(__dirname, '.', CONFIG.READ_FROM_PATH+FILE_NAME),function(err,data){
              fs.unlink(file_path,function(err){
                if(err){
                  console.log("err: "+err);
                }else{
                  console.log(FILE_NAME+' removed');
                }
              });
            });
          } else {
            res.status(400).json({
              'result'  : "ERROR File does NOT Exists",
                'status'  : 'Failure'
            });
          }
        });
      }catch(err){
        log.error("compiled_file get api error: "+err);
        res.status(400).json({
          'result'  : err,
            'status'  : 'Failure'
        });
      }
    });

    app.post('/upload/compile', bodyParserMiddleware, function(req,res){
	var Program=req.body.code;
	console.log("hEEELLLOO ",JSON.stringify(Program,0,2));
	gcc_compiler_promise(Program)
	.then(function(result){
	  res.status(200).json({
		'result'  : ''+result,
		'status'  : 'Success'
	  });
	}).catch(function (error) {
	  res.status(400).json({
		'result'  : ''+error,
		'status'  : 'Failure'
	  });
	});
    });

    function gcc_compiler(Program,cb){
           
    
    shell.cd(WRITE_TO_PATH);
    
    var count = Math.floor(Math.random() * 9000) + 1000;
    var timestamp = Date.now();
    // shell.cd(RUN_FROM_PATH);
    console.log('user_'+count+'_'+timestamp+'.c saving!');
    // commands for Linux
    // var COMPILING_HEADERFILES = '\"/usr/bin/arm-none-eabi-gcc\" -DDEBUG_NRF_USER -DBLE_STACK_SUPPORT_REQD -DS110 -ffunction-sections -mcpu=cortex-m0 -mthumb -mabi=aapcs -DNRF51 -DBOARD_PCA10001 -DNRF51822_QFAA_CA --std=gnu99 -Wall -Werror -mfloat-abi=soft -DDEBUG -g3 -O0 -I\"../\" -I\"'+GNU_Include+'/Include/s110\" -I\"'+GNU_Include+'/Include/ble\" -I\"'+GNU_Include+'/Include/ble/device_manager\" -I\"'+GNU_Include+'/Include/ble/ble_services\" -I\"'+GNU_Include+'/Include/app_common\" -I\"'+GNU_Include+'/Include/sd_common\" -I\"'+GNU_Include+'/Board/nrf6310/s110/bibox_hornbill/app_uart_library_example_with_ble/arm\" -I\"../\" -I\"'+GNU_Include+'/Include\" -I\"'+GNU_Include+'/Include/gcc\" -I\"'+GNU_Include+'/Include/ext_sensors\" -M ../main_'+count+'_'+timestamp+'.c -MF \"_build/main_'+count+'_'+timestamp+'.d\" -MT _build/main_'+count+'_'+timestamp+'.o';

    // var COMPILING_MAIN_FILE = '\"/usr/bin/arm-none-eabi-gcc\" -DDEBUG_NRF_USER -DBLE_STACK_SUPPORT_REQD -DS110 -ffunction-sections -mcpu=cortex-m0 -mthumb -mabi=aapcs -DNRF51 -DBOARD_PCA10001 -DNRF51822_QFAA_CA --std=gnu99 -Wall -Werror -mfloat-abi=soft -DDEBUG -g3 -O0 -I\"../\" -I\"'+GNU_Include+'/Include/s110\" -I\"'+GNU_Include+'/Include/ble\" -I\"'+GNU_Include+'/Include/ble/device_manager\" -I\"'+GNU_Include+'/Include/ble/ble_services\" -I\"'+GNU_Include+'/Include/app_common\" -I\"'+GNU_Include+'/Include/sd_common\" -I\"'+GNU_Include+'/Board/nrf6310/s110/bibox_hornbill/app_uart_library_example_with_ble/arm\" -I\"../\" -I\"'+GNU_Include+'/Include\" -I\"'+GNU_Include+'/Include/gcc\" -I\"'+GNU_Include+'/Include/ext_sensors\" -c -o _build/main_'+count+'_'+timestamp+'.o ../main_'+count+'_'+timestamp+'.c'

    // var CREATING_OBJECT_FILE = '\"/usr/bin/arm-none-eabi-gcc\" -Wl,--gc-sections --specs=nano.specs -Xlinker -Map=_build/bibox_s110_xxaa.map -mcpu=cortex-m0 -mthumb -mabi=aapcs -L '+GNU_Include+'//Source//templates/gcc/ -Tgcc_nrf51_s110_xxaa.ld  _build/main_'+count+'_'+timestamp+'.o _build/ble_srv_common.o _build/ble_nus.o _build/ble_advdata.o _build/ble_conn_params.o _build/softdevice_handler.o _build/app_timer.o _build/app_gpiote.o _build/ble_debug_assert_handler.o _build/nrf_delay.o _build/pstorage.o _build/nrf_pwm.o _build/ST7735.o _build/winbond_flash.o _build/simple_uart.o _build/MFRC522.o _build/soft_spi.o _build/max7219.o _build/mma8452.o _build/mp3module.o _build/twi.o _build/system_nrf51.o _build/gcc_startup_nrf51.o  -o _build/bibox_'+count+'_'+timestamp+'_s110_xxaa.out';
    
    // var MAKING_BINARY_FILE = '\"/usr/bin/arm-none-eabi-objcopy\" -O binary _build/bibox_s110_xxaa.out _build/bibox_'+count+'_'+timestamp+'_s110_xxaa.bin';
    
    // var MAKING_HEX_FILE = '\"/usr/bin/arm-none-eabi-objcopy\" -O ihex _build/bibox_s110_xxaa.out _build/bibox_'+count+'_'+timestamp+'_s110_xxaa.hex';
    


    // commands for Windows
    // var COMPILING_HEADERFILES = '\"'+GNU_Embedded+'/GNU Tools ARM Embedded/5.2 2015q4/bin/arm-none-eabi-gcc\" -DDEBUG_NRF_USER -DBLE_STACK_SUPPORT_REQD -DS110 -ffunction-sections -mcpu=cortex-m0 -mthumb -mabi=aapcs -DNRF51 -DBOARD_PCA10001 -DNRF51822_QFAA_CA --std=gnu99 -Wall -Werror -mfloat-abi=soft -DDEBUG -g3 -O0 -I\"../\" -I\"'+GNU_Include+'/Include/s110\" -I\"'+GNU_Include+'/Include/ble\" -I\"'+GNU_Include+'/Include/ble/device_manager\" -I\"'+GNU_Include+'/Include/ble/ble_services\" -I\"'+GNU_Include+'/Include/app_common\" -I\"'+GNU_Include+'/Include/sd_common\" -I\"'+GNU_Include+'/Board/nrf6310/s110/bibox_hornbill/app_uart_library_example_with_ble/arm\" -I\"../\" -I\"'+GNU_Include+'/Include\" -I\"'+GNU_Include+'/Include/gcc\" -I\"'+GNU_Include+'/Include/ext_sensors\" -M ../main_'+count+'_'+timestamp+'.c -MF \"_build/main_'+count+'_'+timestamp+'.d\" -MT _build/main_'+count+'_'+timestamp+'.o';

    // var COMPILING_MAIN_FILE = '\"'+GNU_Embedded+'/GNU Tools ARM Embedded/5.2 2015q4/bin/arm-none-eabi-gcc\" -DDEBUG_NRF_USER -DBLE_STACK_SUPPORT_REQD -DS110 -ffunction-sections -mcpu=cortex-m0 -mthumb -mabi=aapcs -DNRF51 -DBOARD_PCA10001 -DNRF51822_QFAA_CA --std=gnu99 -Wall -Werror -mfloat-abi=soft -DDEBUG -g3 -O0 -I\"../\" -I\"'+GNU_Include+'/Include/s110\" -I\"'+GNU_Include+'/Include/ble\" -I\"'+GNU_Include+'/Include/ble/device_manager\" -I\"'+GNU_Include+'/Include/ble/ble_services\" -I\"'+GNU_Include+'/Include/app_common\" -I\"'+GNU_Include+'/Include/sd_common\" -I\"'+GNU_Include+'/Board/nrf6310/s110/bibox_hornbill/app_uart_library_example_with_ble/arm\" -I\"../\" -I\"'+GNU_Include+'/Include\" -I\"'+GNU_Include+'/Include/gcc\" -I\"'+GNU_Include+'/Include/ext_sensors\" -c -o _build/main_'+count+'_'+timestamp+'.o ../main_'+count+'_'+timestamp+'.c'

    // // var CREATING_OBJECT_FILE = '\"'+GNU_Embedded+'/GNU Tools ARM Embedded/5.2 2015q4/bin/arm-none-eabi-gcc\" -Wl,--gc-sections --specs=nano.specs -Xlinker -Map=_build/bibox_s110_xxaa.map -mcpu=cortex-m0 -mthumb -mabi=aapcs -L '+GNU_Include+'//Source//templates/gcc/ -Tgcc_nrf51_s110_xxaa.ld  _build/main_'+count+'_'+timestamp+'.o _build/ble_srv_common.o _build/ble_nus.o _build/ble_advdata.o _build/ble_conn_params.o _build/softdevice_handler.o _build/app_timer.o _build/app_gpiote.o _build/ble_debug_assert_handler.o _build/nrf_delay.o _build/pstorage.o _build/nrf_pwm.o _build/ST7735.o _build/winbond_flash.o _build/simple_uart.o _build/MFRC522.o _build/soft_spi.o _build/max7219.o _build/mma8452.o _build/mp3module.o _build/twi.o _build/system_nrf51.o _build/gcc_startup_nrf51.o  -o _build/bibox_'+count+'_'+timestamp+'_s110_xxaa.out';
    // var CREATING_OBJECT_FILE = '\"'+GNU_Embedded+'/GNU Tools ARM Embedded/5.2 2015q4/bin/arm-none-eabi-gcc\" -Wl,--gc-sections --specs=nano.specs -Xlinker -Map=_build/bibox_s110_xxaa.map -mcpu=cortex-m0 -mthumb -mabi=aapcs -L '+GNU_Include+'//Source//templates/gcc/ -Tgcc_nrf51_s110_xxaa.ld  _build/main_'+count+'_'+timestamp+'.o _build/nrf_delay.o _build/system_nrf51.o _build/gcc_startup_nrf51.o -o _build/bibox_'+count+'_'+timestamp+'_s110_xxaa.out';
    
    // var MAKING_BINARY_FILE = '\"'+GNU_Embedded+'/GNU Tools ARM Embedded/5.2 2015q4/bin/arm-none-eabi-objcopy\" -O binary _build/bibox_'+count+'_'+timestamp+'_s110_xxaa.out _build/bibox_'+count+'_'+timestamp+'_s110_xxaa.bin';
    
    // var MAKING_HEX_FILE = '\"'+GNU_Embedded+'/GNU Tools ARM Embedded/5.2 2015q4/bin/arm-none-eabi-objcopy\" -O ihex _build/bibox_'+count+'_'+timestamp+'_s110_xxaa.out _build/bibox_'+count+'_'+timestamp+'_s110_xxaa.hex';
    

    // new universal program compiling commands
    //var COMPILING_HEADERFILES = '\"'+GNU_Embedded+'GNU Tools ARM Embedded/5.2 2015q4/bin/arm-none-eabi-gcc\" -DDEBUG_NRF_USER -DBLE_STACK_SUPPORT_REQD -DS110 -ffunction-sections -O3 -ffunction-sections -fdata-sections -fno-strict-aliasing -lm -mcpu=cortex-m0 -mthumb -mabi=aapcs -DNRF51 -DBOARD_PCA10001 -DNRF51822_QFAA_CA --std=gnu99 -Wall -Werror -mfloat-abi=soft -DDEBUG -g3 -O0 -I\"../\" -I\"'+GNU_Include+'/Include/s110\" -I\"'+GNU_Include+'/Include/ble\" -I\"'+GNU_Include+'/Include/ble/device_manager\" -I\"'+GNU_Include+'/Include/ble/ble_services\" -I\"'+GNU_Include+'/Include/app_common\" -I\"'+GNU_Include+'/Include/sd_common\" -I\"'+GNU_Include+'/Board/nrf6310/s110/bibox_hornbill/app_uart_library_example_with_ble/arm\" -I\"../\" -I\"'+GNU_Include+'/Include\" -I\"'+GNU_Include+'/Include/gcc\" -I\"'+GNU_Include+'/Include/ext_sensors\" -M '+WRITE_TO_PATH+'user_'+count+'_'+timestamp+'.c -MF \"'+READ_FROM_PATH+'user_'+count+'_'+timestamp+'.d\" -MT '+READ_FROM_PATH+'user_'+count+'_'+timestamp+'.o';

	//var COMPILING_MAIN_FILE = '\"'+GNU_Embedded+'GNU Tools ARM Embedded/5.2 2015q4/bin/arm-none-eabi-gcc\" -DDEBUG_NRF_USER -DBLE_STACK_SUPPORT_REQD -DS110 -ffunction-sections -O3 -ffunction-sections -fdata-sections -fno-strict-aliasing -lm -mcpu=cortex-m0 -mthumb -mabi=aapcs -DNRF51 -DBOARD_PCA10001 -DNRF51822_QFAA_CA --std=gnu99 -Wall -Werror -mfloat-abi=soft -DDEBUG -g3 -O0 -I\"../\" -I\"'+GNU_Include+'/Include/s110\" -I\"'+GNU_Include+'/Include/ble\" -I\"'+GNU_Include+'/Include/ble/device_manager\" -I\"'+GNU_Include+'/Include/ble/ble_services\" -I\"'+GNU_Include+'/Include/app_common\" -I\"'+GNU_Include+'/Include/sd_common\" -I\"'+GNU_Include+'/Board/nrf6310/s110/bibox_hornbill/app_uart_library_example_with_ble/arm\" -I\"../\" -I\"'+GNU_Include+'/Include\" -I\"'+GNU_Include+'/Include/gcc\" -I\"'+GNU_Include+'/Include/ext_sensors\" -c -o '+READ_FROM_PATH+'user_'+count+'_'+timestamp+'.o '+WRITE_TO_PATH+'user_'+count+'_'+timestamp+'.c';

	//var CREATING_OBJECT_FILE = '\"'+GNU_Embedded+'GNU Tools ARM Embedded/5.2 2015q4/bin/arm-none-eabi-gcc\" -Wl,--gc-sections -mcpu=cortex-m0 --specs=nano.specs -lc -lnosys -lm  -Xlinker -Map='+READ_FROM_PATH+'bibox_s110_xxaa.map -mcpu=cortex-m0 -mthumb -mabi=aapcs -L '+GNU_Include+'//Source//templates/gcc/ -Tgcc_nrf51_s110_xxaa.ld  '+READ_FROM_PATH+'/main.o '+READ_FROM_PATH+'ble_srv_common.o '+READ_FROM_PATH+'ble_nus.o '+READ_FROM_PATH+'ble_advdata.o '+READ_FROM_PATH+'ble_conn_params.o '+READ_FROM_PATH+'softdevice_handler.o '+READ_FROM_PATH+'app_timer.o '+READ_FROM_PATH+'app_gpiote.o '+READ_FROM_PATH+'ble_debug_assert_handler.o '+READ_FROM_PATH+'nrf_delay.o '+READ_FROM_PATH+'pstorage.o '+READ_FROM_PATH+'nrf_pwm.o '+READ_FROM_PATH+'ST7735.o '+READ_FROM_PATH+'winbond_flash.o '+READ_FROM_PATH+'simple_uart.o '+READ_FROM_PATH+'MFRC522.o '+READ_FROM_PATH+'soft_spi.o '+READ_FROM_PATH+'max7219.o '+READ_FROM_PATH+'mma8452.o '+READ_FROM_PATH+'mp3module.o '+READ_FROM_PATH+'twi.o '+READ_FROM_PATH+'timeslot.o '+READ_FROM_PATH+'user_'+count+'_'+timestamp+'.o '+READ_FROM_PATH+'system_nrf51.o '+READ_FROM_PATH+'gcc_startup_nrf51.o  -o '+READ_FROM_PATH+'bibox_'+count+'_'+timestamp+'_s110_xxaa.out';

    //var MAKING_BINARY_FILE = '\"'+GNU_Embedded+'GNU Tools ARM Embedded/5.2 2015q4/bin/arm-none-eabi-objcopy\" -O binary '+READ_FROM_PATH+'bibox_'+count+'_'+timestamp+'_s110_xxaa.out '+READ_FROM_PATH+'bibox_'+count+'_'+timestamp+'_s110_xxaa.bin';

    //var MAKING_HEX_FILE = '\"'+GNU_Embedded+'GNU Tools ARM Embedded/5.2 2015q4/bin/arm-none-eabi-objcopy\" -O ihex '+READ_FROM_PATH+'bibox_'+count+'_'+timestamp+'_s110_xxaa.out '+READ_FROM_PATH+'bibox_'+count+'_'+timestamp+'_s110_xxaa.hex';

	var COMPILING_HEADERFILES = '\"'+GNU_Embedded+'GNU Tools ARM Embedded/5.2 2015q4/bin/arm-none-eabi-gcc\" -DDEBUG_NRF_USER -DBLE_STACK_SUPPORT_REQD -DS110 -ffunction-sections -O3 -ffunction-sections -fdata-sections -fno-strict-aliasing -lm -mcpu=cortex-m0 -mthumb -mabi=aapcs -DNRF51 -DBOARD_PCA10001 -DNRF51822_QFAA_CA --std=gnu99 -Wall -Werror -mfloat-abi=soft -DDEBUG -g3 -O0 -I\"../\" -I\"'+GNU_Include+'/Include/s110\" -I\"'+GNU_Include+'/Include/ble\" -I\"'+GNU_Include+'/Include/ble/device_manager\" -I\"'+GNU_Include+'/Include/ble/ble_services\" -I\"'+GNU_Include+'/Include/app_common\" -I\"'+GNU_Include+'/Include/sd_common\" -I\"'+GNU_Include+'/Board/nrf6310/s110/bibox_hornbill/app_uart_library_example_with_ble/arm\" -I\"../\" -I\"'+GNU_Include+'/Include\" -I\"'+GNU_Include+'/Include/gcc\" -I\"'+GNU_Include+'/Include/ext_sensors\" -M '+"\""+WRITE_TO_PATH+'user_'+count+'_'+timestamp+".c\""+' -MF \"'+READ_FROM_PATH+'user_'+count+'_'+timestamp+'.d\" -MT '+"\""+READ_FROM_PATH+'user_'+count+'_'+timestamp+".o\"";
	var COMPILING_MAIN_FILE = '\"'+GNU_Embedded+'GNU Tools ARM Embedded/5.2 2015q4/bin/arm-none-eabi-gcc\" -DDEBUG_NRF_USER -DBLE_STACK_SUPPORT_REQD -DS110 -ffunction-sections -O3 -ffunction-sections -fdata-sections -fno-strict-aliasing -lm -mcpu=cortex-m0 -mthumb -mabi=aapcs -DNRF51 -DBOARD_PCA10001 -DNRF51822_QFAA_CA --std=gnu99 -Wall -Werror -mfloat-abi=soft -DDEBUG -g3 -O0 -I\"../\" -I\"'+GNU_Include+'/Include/s110\" -I\"'+GNU_Include+'/Include/ble\" -I\"'+GNU_Include+'/Include/ble/device_manager\" -I\"'+GNU_Include+'/Include/ble/ble_services\" -I\"'+GNU_Include+'/Include/app_common\" -I\"'+GNU_Include+'/Include/sd_common\" -I\"'+GNU_Include+'/Board/nrf6310/s110/bibox_hornbill/app_uart_library_example_with_ble/arm\" -I\"../\" -I\"'+GNU_Include+'/Include\" -I\"'+GNU_Include+'/Include/gcc\" -I\"'+GNU_Include+'/Include/ext_sensors\" -c -o '+"\""+READ_FROM_PATH+'user_'+count+'_'+timestamp+".o\"" + " \""+ WRITE_TO_PATH+'user_'+count+'_'+timestamp+'.c'+"\"";
	var CREATING_OBJECT_FILE = '\"'+GNU_Embedded+'GNU Tools ARM Embedded/5.2 2015q4/bin/arm-none-eabi-gcc\" -Wl,--gc-sections -mcpu=cortex-m0 --specs=nano.specs -lc -lnosys -lm -Xlinker -Map='+"\""+READ_FROM_PATH+"bibox_s110_xxaa.map\""+'-mcpu=cortex-m0 -mthumb -mabi=aapcs -L '+" \""+GNU_Include+"//Source//templates/gcc\"/"+' -Tgcc_nrf51_s110_xxaa.ld'+ " \""+READ_FROM_PATH+"/main.o\"" +" \""+READ_FROM_PATH+"ble_srv_common.o\" "+" \""+READ_FROM_PATH+"ble_nus.o\" "+" \""+READ_FROM_PATH+"ble_advdata.o\" "+" \""+READ_FROM_PATH+"ble_conn_params.o\" "+" \""+READ_FROM_PATH+"softdevice_handler.o\" "+" \""+READ_FROM_PATH+"app_timer.o\" "+" \""+READ_FROM_PATH+"app_gpiote.o\" "+" \""+READ_FROM_PATH+"ble_debug_assert_handler.o\" "+" \""+READ_FROM_PATH+"nrf_delay.o\" "+" \""+READ_FROM_PATH+"pstorage.o\" "+" \""+READ_FROM_PATH+"nrf_pwm.o\" "+" \""+READ_FROM_PATH+"ST7735.o\" "+" \""+READ_FROM_PATH+"winbond_flash.o\" "+" \""+READ_FROM_PATH+"simple_uart.o\" "+" \""+READ_FROM_PATH+"MFRC522.o\" "+" \""+READ_FROM_PATH+"soft_spi.o\" "+" \""+READ_FROM_PATH+"max7219.o\" "+" \""+READ_FROM_PATH+"mma8452.o\" "+" \""+READ_FROM_PATH+"mp3module.o\" "+" \""+READ_FROM_PATH+"twi.o\" "+" \""+READ_FROM_PATH+"timeslot.o\" "+" \""+READ_FROM_PATH+"hmc5883.o\" "+" \""+READ_FROM_PATH+"apds9960.o\" "+" \""+READ_FROM_PATH+"mpu6050.o\" "+" \""+READ_FROM_PATH+"lcd.o\" "+" \""+READ_FROM_PATH+'user_'+count+'_'+timestamp+".o\"" +" \""+READ_FROM_PATH+"system_nrf51.o\" "+" \""+READ_FROM_PATH+"gcc_startup_nrf51.o\" " +'-lm -o'+" \""+READ_FROM_PATH+'bibox_'+count+'_'+timestamp+"_s110_xxaa.out\"";
	var MAKING_BINARY_FILE = '\"'+GNU_Embedded+'GNU Tools ARM Embedded/5.2 2015q4/bin/arm-none-eabi-objcopy\" -O binary '+"\""+READ_FROM_PATH+'bibox_'+count+'_'+timestamp+"_s110_xxaa.out\"" + " \""+READ_FROM_PATH+'bibox_'+count+'_'+timestamp+"_s110_xxaa.bin\"";
	var MAKING_HEX_FILE = '\"'+GNU_Embedded+'GNU Tools ARM Embedded/5.2 2015q4/bin/arm-none-eabi-objcopy\" -O ihex '+"\""+READ_FROM_PATH+'bibox_'+count+'_'+timestamp+"_s110_xxaa.out\""+" \""+READ_FROM_PATH+'bibox_'+count+'_'+timestamp+"_s110_xxaa.hex\"";

    var start_time = process.hrtime();
    // console.log(start_time);
    // console.log(new Date());
    async.series([
      function(callback){
        fs.writeFile('user_'+count+'_'+timestamp+'.txt', "Hey there!", function(err) {
        if(err) {
           return console.log(err);
         }
         console.log("The file was saved!");
        }); 
        fs.writeFileAsync('user_'+count+'_'+timestamp+'.c', Program, 'utf8')
        .then(function(){
          console.log('user_'+count+'_'+timestamp+'.c saved!');
          shell.cd(RUN_FROM_PATH);
          callback(null,"success");
        }).catch(function(error){
            throw error;
        });
      },
      function(callback){
        console.log('1: ',count+'_'+timestamp);
		//console.log('COMPILING_HEADERFILES',COMPILING_HEADERFILES);
        shell.exec(COMPILING_HEADERFILES, function(code, stdout, stderr) {
          if(stderr){
            callback('1: '+stderr,null);
            unlink_compiled_GCC_files(READ_FROM_PATH,count,timestamp);
          }else{
            console.log('1: '+process.hrtime(start_time),count+'_'+timestamp);
            callback(null,"success");
          }
        }).stdout;
      },
      
      function(callback){
        console.log('2: ',count+'_'+timestamp);
		//console.log('COMPILING_MAIN_FILE',COMPILING_MAIN_FILE);
        shell.exec(COMPILING_MAIN_FILE, function(code, stdout, stderr) {
          if(stderr){
            callback('2: '+stderr,null);
            unlink_compiled_GCC_files(READ_FROM_PATH,count,timestamp);
          }else{
            console.log('2: '+process.hrtime(start_time),count+'_'+timestamp);
            callback(null,"success");
          }
        }).stdout;
      },
      
      function(callback){
        console.log('3: ',count+'_'+timestamp);
		//console.log('CREATING_OBJECT_FILE',CREATING_OBJECT_FILE);
        if (fs.existsSync(READ_FROM_PATH+'user_'+count+'_'+timestamp+'.o')) {
          shell.exec(CREATING_OBJECT_FILE, function(code, stdout, stderr) {
            
              console.log('3: '+process.hrtime(start_time),count+'_'+timestamp);
              callback(null,"success");
            // }
          }).stdout;
        }else{
          callback('3: user_'+count+'_'+timestamp+'.o not exist',null);
        }
      },
      
      function(callback){
        console.log('4: ',count+'_'+timestamp);
		//console.log('MAKING_BINARY_FILE',MAKING_BINARY_FILE);
        shell.exec(MAKING_BINARY_FILE, function(code, stdout, stderr) {
          if(stderr){
            callback('4: '+stderr,null);
            unlink_compiled_GCC_files(READ_FROM_PATH,count,timestamp);
          }else{
            console.log('4: '+process.hrtime(start_time),count+'_'+timestamp);
            callback(null,"success");
          }
        }).stdout;
      },

      function(callback){
        console.log('5: ',count+'_'+timestamp);
		//console.log('MAKING_HEX_FILE',MAKING_HEX_FILE);
        shell.exec(MAKING_HEX_FILE, function(code, stdout, stderr) {
          if(stderr){
            callback('5: '+stderr,null);
            unlink_compiled_GCC_files(READ_FROM_PATH,count,timestamp);
          }else{
            console.log('5: '+process.hrtime(start_time),count+'_'+timestamp);
            callback(null,"success");
            var total_string = MAKING_HEX_FILE;
            var remove_link= total_string.substring(0, total_string.indexOf('out\" '));
            var remove_first_word = total_string.split(remove_link).pop();
			//console.log("remove_first_word", remove_first_word);
			var hex_file_final = remove_first_word.split("out\" ").pop();
			//console.log("hex_file_final", hex_file_final);
			async.series([
			  function(callback)
			  {  
				SerialPort.list((err, ports) => {
					ports.forEach((comport) => {
					  //console.log(port.comName,port,port.vendorId);
					  if(comport.vendorId){
						 COMPORT = comport.comName;
						 //console.log("COMPORT" , COMPORT);
					  }
					});
					console.log("one");
				    callback();
					
	            });
				  
			  },

			  function(callback){
				 hexFileUpload(hex_file_final,function(callback){
			        console.log("success");
		         });
				//console.log("two");
				callback();
			  }
			
			]
			,
			function(err) 
			{
				console.log('Both a and b are saved now');
			}
			)
			 
           
			
			 
		

          }
        }).stdout;
      }
    ],  function(err,results){
        if(err){
          cb(err,null);
          gcc_compile_output+=err;
        }else{
          cb(null,'bibox_'+count+'_'+timestamp+'_s110_xxaa.bin');
          gcc_compile_output+= 'Code is processed, hex and bin files are generated';       
  
        }
        console.log('before: '+process.hrtime(start_time),count+'_'+timestamp);
        shell.cd(gcc_dir);
        unlink_compiled_GCC_files(READ_FROM_PATH,count,timestamp);
      }
    );
    }

    function unlink_compiled_GCC_files(delete_path,count,timestamp){
    var main_prefix = 'user_'+count+'_'+timestamp;
    var bibox_prefix = 'bibox_'+count+'_'+timestamp;
    async.series([
      function(callback){
        var file_name = main_prefix+'.c';
        var full_path = delete_path.substring(0,delete_path.lastIndexOf('gcc'))+file_name;
        if (fs.existsSync(full_path)) {
          fs.unlinkAsync(full_path)
          .then(function(){
            console.log(file_name+' removed');
            callback(null,'');
          })
          .catch(function(err){
            console.log("err: "+err);
            callback(null,err);
          }); 
        }else{
          console.log(file_name+' not found');
          callback(null,'');
        }
      },
      function(callback){
        var file_name = main_prefix+'.o';
        var full_path = delete_path+file_name;
        if (fs.existsSync(full_path)) {
          fs.unlinkAsync(full_path)
          .then(function(){
            console.log(file_name+' removed');
            callback(null,'');
          })
          .catch(function(err){
            console.log("err: "+err);
            callback(null,err);
          });
        }else{
          console.log(file_name+' not found');
          callback(null,'');
        }
      },
      function(callback){
        var file_name = main_prefix+'.d';
        var full_path = delete_path+file_name;
        if (fs.existsSync(full_path)) {
          fs.unlinkAsync(full_path)
          .then(function(){
            console.log(file_name+' removed');
            callback(null,'');
          })
          .catch(function(err){
            console.log("err: "+err);
            callback(null,err);
          });
        }else{
          console.log(file_name+' not found');
          callback(null,'');
        }
      },
      function(callback){
        var file_name = bibox_prefix+'_s110_xxaa.hex';
        var full_path = delete_path+file_name;
        if (fs.existsSync(full_path)) {
          /*fs.unlinkAsync(full_path)
          .then(function(){
            console.log(file_name+' removed');
            callback(null,'');
          })
          .catch(function(error){
            console.log("err: "+err);
            callback(null,err);
          });*/
          callback(null,'');
        }else{
          console.log(file_name+' not found');
          callback(null,'');
        }
      },
      function(callback){
        var file_name = bibox_prefix+'_s110_xxaa.out';
        var full_path = delete_path+file_name;
        if (fs.existsSync(full_path)) {
          fs.unlinkAsync(full_path)
          .then(function(){
            console.log(file_name+' removed');
            callback(null,'');
          })
          .catch(function(err){
            console.log("err: "+err);
            callback(null,err);
          });
        }else{
          console.log(file_name+' not found');
          callback(null,'');
        }
      },

      function(callback){
        var file_name = bibox_prefix+'_s110_xxaa.bin';
        var full_path = delete_path+file_name;
        if (fs.existsSync(full_path)) {
           /*fs.unlinkAsync(full_path)
          .then(function(){
            console.log(file_name+' removed');
            callback(null,'');
          })
          .catch(function(error){
            console.log("err: "+err);
            callback(null,err);
          }); */
        }else{
          console.log(file_name+' not found');
          callback(null,'');
        }
      }

    ],  function(err,results){
        shell.cd(gcc_dir);
        if(err){
          console.log("err: "+err);
        }else{
          console.log("Done unlinking.");
        }
      }
    );

    }


	app.get('/changed_path',function(req,res){
		change_input_and_output_path(function(err,data){
		  res.send(data.DATA);
		  
		});
	});

    var FILE_NAME_CHANGING_COUNTER = 1;
    var OLD_INPUT_PATH = 'C_SOURCE_FILES += main.c';
    var OLD_OUTPUT_PATH = 'OUTPUT_FILENAME := ble_app_uart';
    var NEW_INPUT_PATH, NEW_OUTPUT_PATH;
    var MAKEFILE_OBJECT = {'NEW_INPUT_PATH':'','NEW_OUTPUT_PATH':'','DATA':''};
    function change_input_and_output_path(callback){
    var ret='';
    var readPath='~/bisoftweb/testing_gcc/nrfgcctest/sdk6wonderbox/nrf51822/Board/nrf6310/s110/bibox_hornbill/app_uart_library_example_with_ble/gcc/';
    // var readPath='D:/Compiler/nrfgcctest/sdk6wonderbox/nrf51822/Board/nrf6310/s110/bibox_hornbill/app_uart_library_example_with_ble/gcc/';
    shell.cd(readPath);
    fs.readFile('Makefile', 'utf8', function(e,data){
      if(e){
        console.log(e);
        ret+=e;
        // console.log('uploaded: '+ret);
        callback(e,null);
      }else{
        ret+=data;
        // ret+='Compiled and Uploaded successfully';
        NEW_INPUT_PATH = "C_SOURCE_FILES += main_"+FILE_NAME_CHANGING_COUNTER+".c";
        NEW_OUTPUT_PATH = "OUTPUT_FILENAME := ble_app_uart_"+FILE_NAME_CHANGING_COUNTER;
        MAKEFILE_OBJECT.NEW_INPUT_PATH= "main_"+FILE_NAME_CHANGING_COUNTER+".c";
        MAKEFILE_OBJECT.NEW_OUTPUT_PATH= "ble_app_uart_"+FILE_NAME_CHANGING_COUNTER;
        ret=ret.replace(OLD_INPUT_PATH,NEW_INPUT_PATH);
        MAKEFILE_OBJECT.DATA=ret=ret.replace(OLD_OUTPUT_PATH,NEW_OUTPUT_PATH);
        OLD_INPUT_PATH=NEW_INPUT_PATH;
        OLD_OUTPUT_PATH=NEW_OUTPUT_PATH;
        FILE_NAME_CHANGING_COUNTER++;
        // console.log();
        fs.writeFile('Makefile', ret, 'utf8', function(MAKEFILE_OBJECT){
          return function(err){
            if (err){
              callback(err,null);
            }else{
              console.log('It\'s saved ! '+MAKEFILE_OBJECT.NEW_OUTPUT_PATH);
              callback(null,MAKEFILE_OBJECT);
            }
          }
        }(MAKEFILE_OBJECT));
      }
    });
  }

  var count=0;
  var devices = [];
  var peripheralId = '@@';
  var uploadProgram;
  var requestFor='null';
  var bufView;
  if(presentPlatform=="win32"){
	  console.log("win32");
	  var FOLDER1 = localAppDataLocation + "\\code" , FOLDER2 = localAppDataLocation + "\\binary";
  }
  else{
	  console.log('not win32');
	  var FOLDER1 = "./code" , FOLDER2 = "./binary";
  }
  var myInitVar;
  var Peripheral;
  var Characsend;
  var DATA;
  var ChunkSize = 20;

  async.series([
    function(cb){check_folder(FOLDER1);cb();},
    function(cb){check_folder(FOLDER2);cb();}
  ],function(err,results){});
  function check_folder(FOLDER){
    if (!fs.existsSync(FOLDER)){
      console.log(FOLDER+" false");
      fs.mkdir(FOLDER);
    }else{
      console.log(FOLDER+" true");
    }
  }

  var CodeGenerationRangeValues = require('./CodeGenerationRangeValues.js');
  var CodeGenerationConstants = require('./CodeGenerationConstants.js');
   if(useNoble=="USB"){
	  console.log("usb from winapi");
  }
  else{
  console.log("init from winapi");
  function init(){
    try{
      noble = require('noble');
      noble.on('stateChange', function(state) {
        try{
          console.log("state change"+state);
          function myInitialTimer() {
                count++;
                console.log(count);
                if(count>=5){
                  count=0;
                  console.log("res: "+devices.length);
                  noble.stopScanning();
                  console.log("stopped Scanning myInitVar");
                  clearInterval(myInitVar);
                  if(requestFor=="addtolist"){
                for(var i=0;i<devices.length;i++)
                  console.log("sending: "+ devices[i].mac, devices[i].name);
                    if(Socket!=null)
                      Socket.emit('_getDevices',{'devices':devices});
                devices = [];
                  }
              else if(requestFor=="uploadBtData"){
                    if(Socket!=null)
                    Socket.emit('_btRemote',{success:false});
              }
                }
            }
          if (noble.state === 'poweredOn') {
                if(requestFor=="addtolist" || requestFor=="upload"){
                  console.log("stAart");
                  noble.startScanning();
                  if(myInitVar==null ||(myInitVar && myInitVar._idleTimeout == -1)){
                myInitVar= setInterval(myInitialTimer, 1000);
              }
                }else if(requestFor=="uploadBtData" || requestFor=="getIOTData" || requestFor=="writeIOTData"){
              if(!Peripheral){
                console.log("stAarted");
                noble.startScanning();
                if(myInitVar==null ||(myInitVar && myInitVar._idleTimeout == -1)){
                  myInitVar= setInterval(myInitialTimer, 1000);
                }
              }else{
                uploadBtData(Peripheral,null);
              }
            }
          }else {
            noble.stopScanning();
          }
          
        }catch(e){
          noble = null;
          throw new Error('No compatible USB Bluetooth 4.0 device found! Please connect your bluetooth device..\n'+e);
        }
      });
      noble.stopScanning();
      noble.on('discover', function(peripheral) {
        try{
            if(requestFor=="upload"){ 
            clearInterval(myInitVar);
            if (peripheral.id === peripheralId) 
              upload(peripheral);
              // peripheralId = '@@';
          }else if(requestFor=="addtolist"){
              //clearInterval(myInitVar);
            addDeviceToList(peripheral);
          }else if(requestFor=="uploadBtData" || requestFor=="getIOTData" || requestFor=="writeIOTData"){
            console.log(deviceId,peripheral.id);
            if(deviceId == peripheral.id){
              clearInterval(myInitVar);
              Peripheral = peripheral;
              uploadBtData(peripheral,null);
            }
          }
        }catch(e){
          noble = null;
          throw new Error('No compatible USB Bluetooth 4.0 device found! Please connect your bluetooth device..\n'+e);
        }
      });
    }catch(e){
      //res.send("No Bluetoooth device found");
      //app_elec.quit();
      noble = null;
      throw new Error('No compatible USB Bluetooth 4.0 device found! Please connect your bluetooth dongle device.\n'+e);
    }
  }


  }


    function generating_code_file(Program,callback){
    var uuid_gen = uuid.v4();
    FILE_NAME = "code_"+uuid_gen+".txt";
    console.log("uuid_gen: "+uuid_gen);
    async.series([
        function(cb){
          saving_to_file(JSON.stringify(Program),FOLDER1+"/code_"+uuid_gen+".txt",function(err,data){
            if(err){
              cb(err,null);
            }else{
              cb(null,'');
            }
          });
        },

        function(cb){
          try{
            if(useExe){
				var current_directory=  __dirname;
				console.log("current_directory" , current_directory);
				var current_cd = shell.cd(current_directory);
				console.log("current_cd", current_cd);
				shell.exec('pwd', function(code, stdout, stderr) {
                 console.log("stdout", stdout);
                });
				
                 shell.exec('CodeGen.exe '+uuid_gen, function(code, stdout, stderr) {
               
                 cb(null,'');
              });
                 
              console.log("else");
              }
              else{
                var genCodeString = require('./codeGeneration.js');
				//console.log("program", Program);
                genCodeString["genCode"](Program);
                stringToByteCode =genCodeString["genCode"](Program)
                console.log("code",stringToByteCode);
                genCodeString["stringToByte"](stringToByteCode);
				result =genCodeString["stringToByte"](stringToByteCode);
                stringToByteCodeConverted =  genCodeString["stringToByte"](stringToByteCode);
					 //console.log("string to byte",result);
					 //console.log("type", typeof(result));
					 stringData =result.toString();
					 //console.log("type", typeof(stringData));
					 //console.log(stringData, stringData);
					 buff = new Buffer(stringData);
                     
					fs.open(FOLDER2+"/binary_"+uuid_gen+".txt", 'w+', function(err, fd) {
						if (err) {
							throw 'error opening file: ' + err;
						}

						fs.write(fd, buff, 0, buff.length, null, function(err) {
							if (err) throw 'error writing file: ' + err;
							fs.close(fd, function() {
								console.log('file written');
							})
						callback(null,'success');	
						});
						
					});
                    
           

                cb(null,'');
              }
            }
            catch(e){
              cb(e,null);
              console.log("ERR: "+e);
          }
         
        },

        function(cb){
          try{
			  
              fs.readFile(FOLDER2+"/binary_"+uuid_gen+".txt", function(err,data) {
                if(err) {
                    console.log("reading file: "+err);
                    cb(err,null);
                }else{
                    data = ""+(data);
                    // var bufLen = data.substring(0,data.indexOf(',');
                    var array = data.split(',');
                    var buf = new ArrayBuffer(array.length);  // 2 bytes for each char
                    bufView = new Uint8Array(buf);
                    for(var i=0; i<array.length; i++){
                      bufView[i] = array[i];
                    }
                    console.log("bufView",bufView);
                    cb(null,'');
                }
              });
            }catch(e){
              cb(e,null);
              console.log("ERR: "+e);
          }
        },
		  function(cb){
          try{
			async.series([
				function(callback) {
					if(!portSerial){
						SerialPort.list((err, ports) => {
							ports.forEach((comport) => {
							  //console.log(port.comName,port,port.vendorId);
							  if(comport.vendorId){
								 COMPORT = comport.comName;
								 //console.log("COMPORT inside" , COMPORT);
							  }
							});
						});
					}
				    console.log("Task 1");
				    callback(null, 1);
				   
				 },
				function(callback) {
					if(COMPORT){
					if(!portUsb){
			        //console.log("comport inside portusb", COMPORT);
					if(COMPORT=="undefined"){
				    SerialPort.list((err, ports) => {
							ports.forEach((comport) => {
							  //console.log(port.comName,port,port.vendorId);
							  if(comport.vendorId){
								 COMPORT = comport.comName;
								 //console.log("COMPORT inside" , COMPORT);
							  }
							});
								portUsb = new SerialPort(COMPORT, {autoOpen: true,
									baudRate: 250000, 
									rtscts:true,

								});
						});
				
					}
					else{
						SerialPort.list((err, ports) => {
							ports.forEach((comport) => {
							  //console.log(port.comName,port,port.vendorId);
							  if(comport.vendorId){
								 COMPORT = comport.comName;
								 //console.log("COMPORT inside" , COMPORT);
							  }
							});
					    portUsb = new SerialPort(COMPORT, {autoOpen: true,
							baudRate: 250000, 
							baudRate: 250000, 
							rtscts:true,

						});
						portUsb.write(bufView, function(err) {
						if(err){
							portUsb.open(function (err) {
								if (err){
								  console.log('Error opening port: ', err);
								  
								  ;
								}
								portUsb.write(bufView);
								
							});
						}
						 console.log('message written');
						});
						portUsb.on('error', function(err) {
							console.log('Error: ', err);
						   
						});
						});
				
					}
					}
					console.log("Task 2");
					callback(null, 2);
				  
				}
				},
				function(callback) {
					if(COMPORT){
                    if(portUsb){  	
					portUsb.write(bufView, function(err) {
						if(err){
							portUsb.open(function (err) {
								if (err){
								  console.log('Error opening port: ', err);
								  
								  ;
								}
								portUsb.write(bufView);
								
							});
						}
					 console.log('message written');
					});
					portUsb.on('error', function(err) {
						console.log('Error: ', err);
					   
					});
                     }
					  console.log("Task 3");
					  callback(null, 3);

				
				}
				}
				], 
				function(error, results) {
				  console.log(results);
				});
				cb(null,'');
          }
          catch(e){
              cb(e,null);
              console.log("ERR: "+e);
          }
        }

      ],  function(err,results){
            if(err){
              callback(err,null);
            }else{
              callback(null,results);
            }
          }
      );
  }
  
	/*   buffer = new Buffer("some content\n");

	fs.open(path, 'w', function(err, fd) {
		if (err) {
			throw 'error opening file: ' + err;
		}

		fs.write(fd, buffer, 0, buffer.length, null, function(err) {
			if (err) throw 'error writing file: ' + err;
			fs.close(fd, function() {
				console.log('file written');
			})
		});
	}); */
  
    function saving_to_file(data,FILE_NAME,callback){
	  
    try{
		  buffer = new Buffer(data);

	fs.open(FILE_NAME, 'w+', function(err, fd) {
		if (err) {
			throw 'error opening file: ' + err;
		}

		fs.write(fd, buffer, 0, buffer.length, null, function(err) {
			if (err) throw 'error writing file: ' + err;
			fs.close(fd, function() {
				console.log('file written');
			})
		callback(null,'success');	
		});
		
	});
	
    }catch(e){
      console.log("saving_to_file error handler "+e);
    }
    }

    function addDeviceToList(peripheral){
    try{
        count=0;
        console.log(peripheral.id+" discovered: " + devices.length);
        nameId=peripheral.advertisement.localName||"Bibox Tern";
        macId=peripheral.id;
        var booleanAddToList=true;
        for(var i=0;i<devices.length;i++){
          if(macId==devices[i].mac){
            booleanAddToList=false;break;
          }
        }
        if(booleanAddToList)
          devices.push({name: nameId , mac : macId});
    }catch(e){
      console.log("addDeviceToList error handler "+e);
    }
    }
    function upload(peripheral){
    try{
        var localName = peripheral.advertisement.localName;
        noble.stopScanning();
        if (localName) {
          console.log('  Local Name        = ' + localName);
        }
        
        peripheral.connect(function(error) {
          peripheral.discoverServices([], function(error, services) {
            var serviceIndex = 2;
            var characread;
            var characsend;
            console.log("services length= "+services.length);
            while(serviceIndex<services.length){
              var service = services[serviceIndex];
              var serviceInfo = service.uuid;
              if (service.name) {
                serviceInfo += ' (' + service.name + ')';
              }
              console.log("se");
              service.discoverCharacteristics([], function(error, characteristics) {
                var characteristicIndex = 0;
                characread=characteristics[0];
                characsend=characteristics[1];
                characread.notify(true, function(error) {
                  console.log('reading notification on');
                  console.log();
                  var count=0
                  try{
                    // var str="RT$5$11SETPOOAOOOOOOOOOOOOOOOOOOOOOOOOOOOOO00000000000000000000000000o{1082}d0040198<o{1042}0-,RST";
                    // var str="RT$5$11SETPOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO00000000000000000000000000o{1033}RST";
                    // var str="RT$5$11SETPPOPOOOOOOOOOOOOOOOOOOOOOOOOOOOOO00000000000000000000000000o{10@79&20@141&40@109&}RST";
                    // var str=uploadProgram;
                    var arrayProgram=bufView;
                    var chunkSize = 20;
                    var arrayLength=Object.keys(arrayProgram).length;
                    var arrayAfterChunking = chunkDataToSmallPacketsNumber(arrayProgram, chunkSize);
                    var strings="";
                    var delay=50; //1 seconds
                    var id=setInterval(function(){
                      var len=0;
                      if(arrayLength-count>=20)len=20; 
                      else len=arrayLength-count;
                      
                      var currentArray = new Buffer(len);
                      for(var j=0;j<20;j++){
                        
                        currentArray[j]=arrayProgram[count];
                        if(count==arrayLength)
                          break;
                        count++;
                      }
                      console.log("length= "+len+"  Data= "+currentArray+" ,"+ currentArray.length);
                      console.log("\n"+count+' Bytes Send');
                      characsend.write(currentArray,true,function(err){
                        if(err == null)
                          console.log('writing success');
                        else
                          console.log('writing error is:'+err);
                        console.log();
                        if(count>arrayLength)
                        {
                          console.log('exit');
                          peripheral.disconnect();
                          // process.exit(0);
                          clearInterval(id);
                        }
                        if(count==arrayLength){count++;}  
                      });               
                    }, delay);
                  }catch(e){
                    noble = null;
                    console.log(e.toString());
                  }
                });
              });
              serviceIndex++;
            }
          });
        });
    }catch(e){
      console.log("upload error handler "+e);
    }
  }

     function uploadBtData(peripheral,COMPORT){
    try{
	    if(peripheral && COMPORT ==null){
			var localName = peripheral.advertisement.localName;
			noble.stopScanning();
			if (localName) {
			  console.log('  Local Name        = ' + localName);
			}
        
			peripheral.connect(function(error) {
				peripheral.discoverServices([], function(error, services) {
				  var serviceIndex = 2;
				  var characread;
				  var characsend;
				  console.log("services length= "+services.length);
				  while(serviceIndex<services.length){
					  var service = services[serviceIndex];
					  var serviceInfo = service.uuid;
					  if (service.name) {
						serviceInfo += ' (' + service.name + ')';
					  }
					  service.discoverCharacteristics([], function(error, characteristics) {
						var characteristicIndex = 0;
						characread=characteristics[0];
						characsend=characteristics[1];
						Characsend = characsend;
				  characread.notify(true, function(error) {
						  console.log('reading notification on');
							console.log();
							var count=0;
							if(requestFor=="uploadBtData"){
					  sendBtData(characsend);
					}else if(requestFor=="writeIOTData"){
					  sendIOTData(Characsend);
					}else if(requestFor=="getIOTData"){
					  if(!getIOTDataInitVar==null ||!(getIOTDataInitVar && getIOTDataInitVar._idleTimeout == -1)){
							clearInterval(getIOTDataInitVar);
						  getIOTDataInitVar= setInterval(getIOTDataTimer, READ_INTERVAL);
						}else{
						  getIOTDataInitVar= setInterval(getIOTDataTimer, READ_INTERVAL);
						}
					}
				  });
				  if(requestFor == 'getIOTData'){
						
							console.log("no comport");
							characread.on('read', function(data, isNotification) {
							  var iotData = {};
							  for(var i=0,j=1; i<data.length; i=i+2,j++){
								var temp = data.readUInt8(i+1);
								temp<<=8;
								temp = temp|data.readUInt8(i)
								// peripheral.disconnect();
								iotData['IOT_'+j]=temp;
									  console.log(j,'battery level is now: ', temp + '%', data.readUInt8(i),data.readUInt8(i+1));
							  }
							  // console.log(JSON.stringify(iotData));
							  IOT_ACTIONS['sendIOTData'](iotData);
								});
							
						}
					
				  // characread.read(function(error, data){
				  //  console.log('error '+error,'data '+data.toString('utf8'));
				  // });
					  });
					  serviceIndex++;
				  }
				});
			});

			peripheral.on('disconnect', function() {
			  if(Socket!=null){
				if(requestFor=="uploadBtData"){
				  Socket.emit('_btRemote',{success:false});
				}
				try{
				if(Peripheral){
				  Peripheral.disconnect();
				  console.log(Peripheral.advertisement.localName+" disconnected");
				  //socket.emit('_disconnect',{'success':Peripheral.advertisement.localName+"disconnected"});
				  Peripheral = null;
				  Characsend = null;
				}else{
				  // console.log("Device not present for disconnection");
				  //socket.emit('_disconnect',{'success':'Device not present for disconnection'});
				}
			  }catch(e){
				noble = null;
				console.log("error"+e);
				//socket.emit('_disconnect',{'status':e});
			  }
			  }
			  //process.exit(0);
			});
		}
		else{
			if(peripheral==null && COMPORT){
				if(requestFor == 'getIOTData'){
					console.log("comport in peripheral ", COMPORT);
					portUsb.on('data', function(data) {
						var iotData = {};
					   console.log("usb data",data);
						if(data.length!=20){
							console.log("data is less than 20", JSON.stringify(data), data.length);
							
						}
						else{
							for(var i=0,j=1; i<data.length; i=i+2,j++){
									var temp = data.readUInt8(i+1);
									temp<<=8;
									temp = temp|data.readUInt8(i)
									iotData['IOT_'+j]=temp;
										  console.log(j,'battery level is now: ', temp + '%', data.readUInt8(i),data.readUInt8(i+1));
								 
								  console.log(JSON.stringify(iotData));
							}
							IOT_ACTIONS['sendIOTData'](iotData);
						}
					});
				}
				else if(requestFor=="writeIOTData"){
					sendIOTData(Characsend);
				}
				else{
					console.log("nothing to be sent");
				}
			}
			else{
				console.log("no comport or pheripheral is present");
			}
		}
						
    }catch(e){
      console.log("uploadBtData error handler " + e);
    }
  }

    function sendBtData(characsend) {
    try{
      if(Socket!=null)
          Socket.emit('_btRemote',{success:true});
      var btData = uploadProgram.split('_');
        /* if(btData == '44d')
          btData = "d4";
        if(btData == '22d')
          btData = "222222";
        if(btData == '11d')
          btData = "11abcd"; */
      var btDataLength = btData.length;
      var buf = new ArrayBuffer(btDataLength);  // 2 bytes for each char
      var bufView = new Uint8Array(buf);
      // var codeView = new Uint8Array(codeLen);
      for(var i=0; i<btDataLength; i++){
        if(i==0)
          bufView[i]=btData[i].charCodeAt(0);
        else
          bufView[i]=btData[i];//parseInt(btData[i], 16);
      }
      console.log("bufView: \n"+bufView);
      var currentArray = new Buffer(btDataLength);
      for(var j=0;j<btDataLength;j++){
        currentArray[j]=bufView[j];
      }
      console.log("length= "+currentArray.length+"  Data= "+currentArray);
      
      characsend.write(currentArray,true,function(err){
        if(err == null){
          console.log('writing success');
        }
        else
          console.log('writing error is:'+err);
        // peripheral.disconnect(); 
      }); 
      
    }catch(e){
      console.log("sendBtData error handler "+e.toString());
    }
  }

    function sendIOTData(characsend) {
    try{
      console.log(DATA);
      writeToBibox(DATA,characsend);
    }catch(e){
      console.log("sendIOTData error handler "+e);
    }
   }

  function writeToBibox(dataArray,characsend) {
    try{
		
		  var dataToSend ;
		  dataToSend = chunkArray(dataArray, ChunkSize);
		if(!COMPORT){
		  var counter = 0;
		  console.log("dataToSend length= "+dataToSend.length);
		  async.eachSeries(dataToSend,function(dataToSend, counter){
			return function(currentArray,callback){

			  console.log("length= "+currentArray.length+"  Data= "+currentArray);
			  characsend.write(dataToSend[counter],true,function(err){
				if(err == null){
				  console.log('writing success');
				  Characsend = characsend;
				}
				else
					console.log('writing error is:'+err);
				// peripheral.disconnect(); 
				counter++;
				setImmediate(callback);
			  });
			  // setImmediate(callback);
			}
		  }(dataToSend, counter), function(err){
			if(!err){
			  if(requestFor == 'writeIOTData'){
				if(Peripheral){
				  Peripheral.disconnect();
				}
			  }
			  // setImmediate(callback);
			}
		  });
	    }
		else if(COMPORT){
			portUsb.write([80,65,48], function(err) {
			  if (err) {
				return console.log('Error on write: ', err.message);
			  }
			  console.log('message written output');
			});
		
		}
		else{
			console.log("no comport or ble is present");
		}
      
    }catch(e){
      console.log("writeToBibox error handler "+e.toString());
    }
  }


  function chunkArray(iArray, iChunkSize) {
    try{
      var iArrayLength  = iArray.length;
      var uint8Array    = new Uint8Array(iArrayLength);
      var currentArray  = new Buffer(iChunkSize);
      if(iArrayLength<iChunkSize){
        currentArray  = new Buffer(iArrayLength);
      }
      var packet = [];//new Buffer(packetsToSend);
      var packetsToSend =  Math.ceil(iArray.length / iChunkSize);
      packetsToSend = 0;
      for(var i=0, each = 0; i<iArrayLength; i++, each++){
        uint8Array[i] = iArray[i];
        currentArray[each] = uint8Array[i];
        // console.log(iArrayLength,each,currentArray[each]);
        if(each==iChunkSize-1 || i==iArrayLength-1){
          each = -1;
          packet[packetsToSend] = (currentArray);
          packetsToSend++;
          var currentArrayLength = iChunkSize;
          if((iArrayLength-1-i)<iChunkSize)
            currentArrayLength = iArrayLength-1-i;
          currentArray  = new Buffer(currentArrayLength);
        }
      }
        return packet;
    }catch(e){
      console.log("chunkArray error handler "+e);
    }
  }

  function chunkDataToSmallPacketsNumber(iArray, iChunkSize) {
    var chunksize = iChunkSize;
    var source = iArray;
    var packetsToSend =  Math.ceil(iArray.length / chunksize);
    console.log("packetsToSend "+packetsToSend);
    console.log();
    return packetsToSend;
  }
}catch(e){
  noble = null;
  //res.send("No Bluetoooth device found");
  //app_elec.quit();
  throw new Error('No compatible USB Bluetooth 4.0 device found! Please connect your bluetooth dongle device.\n'+e);

}
