// function addListener(element, eventName, handler) {
  // if (element.addEventListener) {
    // element.addEventListener(eventName, handler, false);
  // }
  // else if (element.attachEvent) {
    // element.attachEvent('on' + eventName, handler);
  // }
  // else {
    // element['on' + eventName] = handler;
  // }
// }


var macID="52:6C";
var host="http://localhost:9009";
function scan(){
	//alert("scan for devices");
	document.getElementsByClassName('loadinggif')[0].style.display = 'block';
	document.getElementById('list').textContent = "";
	$.ajax({
            url: host+"/getdevices/",
            type: 'GET',
            success: function(data) {
			  console.log(data.devices);
			  document.getElementsByClassName('loadinggif')[0].style.display = 'none';
			  for(var i=0;i<data.devices.length;i++){
				  var node = document.createElement("LI");                 // Create a <li> node
				  var devicemac=data.devices[i].mac;
				  var textnode = document.createTextNode(data.devices[i].mac);         // Create a text node
				  node.appendChild(textnode);                              // Append the text to <li>
				  macID=data.devices[i].mac;
				  document.getElementById("list").appendChild(node);
				  document.getElementsByTagName("LI")[i].id=i+"MAC";
				  var buttons=document.getElementById(i+"MAC");
				  buttons.addEventListener('click', function(e) {
						//alert("device selected: "+e.target.textContent);
						var h1node = document.createElement("H1");  
						var textnodeConnected = document.createTextNode(devicemac);
						h1node.appendChild(textnodeConnected);	
						document.getElementById("activeconnection").innerHTML='';
						document.getElementById("activeconnection").appendChild(h1node);
						upload(e.target.textContent);
					});
				  // buttons.onclick=function(macID,buttons){
					  // alert("id "+buttons.textContent);
					  // var content=buttons.textContent;
					  // return function(macID,buttons){
						  // alert("id11 "+buttons);
						  /*upload(macID);*/
					  // };
				  // }(macID,buttons);
				  // document.getElementById('list').textContent = ;
			  }
			  if(data.status=="success"){
				//window.location.reload();
				this.close();
			  }
            }.bind(this),
            error: function(xhr, status, err) {
              //console.error("/save", status, err.toString());
            }.bind(this)
    });
}

function upload(mac){
	alert("upload: "+ mac);
	var res=JSON.stringify({code:mac});
	// var params={"logic":logicData,"components":componentsConnected};
	// var params={"logic":{"program":[{"type":"start","state":{"bic1":false,"bic2":false,"bic3":false,"bid2":false,"bif1":false,"bif2":false,"bif3":false,"bid3":false,"bid1":false,"bmp3":false}},{"type":"output","state":{"assignA1":true,"valueA1":190}}],"end":{"type":"end","state":"end"},"offset":{"left":0,"top":0},"scale":1,"currentProgramGuide":-1,"active":[1,3],"bottomPanel":"border","insertState":false},"components":{"A1":{"type":"led","index":0},"A2":null,"A3":null,"A4":null,"MOTOR1":null,"MOTOR2":null,"BC":null,"DE":null,"F":null,"G":null,"A5":null,"A6":null,"BATTERY":{"type":"battery","index":0}}};
	// var res=JSON.stringify({macId: mac , code:params});
	var hostname="http://localhost:9009";
	$.ajax({
        url: host+"/device/",
        dataType: 'json',
        type: 'POST',
        data: {
          "code":res
        },
        success: function(data) {
          respVal=data.result+'';
          console.log("hello: "+ respVal);
          // this.setState();
        }.bind(this),
        error: function(xhr, status, err) {
          respVal=err+'';
          // this.setState();
        }.bind(this)
      });
}


function disconnect(){
	// alert("upload: "+ mac);
	document.getElementById('list').textContent = "";
}

function stop(){
	var devices=[];
	for(var i=0;i<4;i++){
		devices.push({mac : i+"mac"});
	}
	for(var i=0;i<devices.length;i++){
				  var node = document.createElement("LI");                 // Create a <li> node
				  var textnode = document.createTextNode(devices[i].mac);         // Create a text node
				  node.setAttribute('id', i+"MAC");
				  // node.setAttribute('onclick', 'upload('+devices[i].mac+')');
				  node.appendChild(textnode);                              // Append the text to <li>
				  document.getElementById("list").appendChild(node);
				  document.getElementsByTagName("LI")[i].id=i+"MAC";
				  var buttons=document.getElementById(i+"MAC");
				  buttons.addEventListener('click', function(e) {
						alert("device selected: "+e.target.textContent);
						upload(e.target.textContent);
					});
				  // addListener(document.getElementById(i+"MAC"), 'click', this.upload(devices[i].mac));
				  // document.getElementById(i+"MAC").onclick=this.upload(devices[i].mac);
				  // document.getElementById('list').textContent = ;
			  }
}