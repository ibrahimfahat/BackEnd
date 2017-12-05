var mqtt = require('mqtt');
var mqttclient = mqtt.connect('http://localhost:1883');
var connectToMongodb = require('./ConnectToMongodb.js');
var sensorModel = require('./model/sensor.js');


mqttclient.on('connect', function () {
  mqttclient.subscribe('HelloDoc/#');

})
mqttclient.on('message', function (topic, message) {
  var walking  = "50";
  var heartbit = "41";
  var blood = "112";
  var time = new Date();
  if(topic.toString() == "HelloDoc/heartbeat"){
  		heartbit = message.toString();
  		console.log('heartbit '+heartbit );
  }
  if(topic.toString() == "HelloDoc/walking"){
  		walking = message.toString();
  		console.log('walking '+walking );
  }
  if(topic.toString() == "HelloDoc/bloodpresser"){
  		blood = message.toString();
  		console.log('blood pressure  '+blood );
  }
  
  var newstatus = sensorModel({
			heartbits: heartbit,
			bloodpressur: blood,
			walking: walking,
			created_at : time
		});
 	newstatus.save(function (err) {
		if (err) {
			console.log("some error: ", err);
			//return res.json({ "success": false, "msg": "Error while creating user", "error": err });
		}
		console.log("seccess");
	});

});

module.exports = mqttclient;



