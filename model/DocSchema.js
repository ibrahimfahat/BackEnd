
var mongoose = require('mongoose');
var schema = mongoose.Schema;

var DocSchema = new schema({
	Username: {type: String,required :true, unique : true},
	Speciality: String,
	Email: String,
	rating: String,
	Password: {type: String,required: true},
	SaltPass: {type: String,required:true}

}); 
var DocInfo = mongoose.model('DoctorModel',DocSchema);
module.exports = DocInfo;
