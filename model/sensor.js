
var mongoose = require('mongoose');
var schema = mongoose.Schema;

var sensorSchema = new schema({
	heartbits: String,
	bloodpressur : String,
	walking : String,
	created_at : Date
}); 
var sensorInfo = mongoose.model('SensorModel',sensorSchema);
module.exports = sensorInfo;
