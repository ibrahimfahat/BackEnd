
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var useSchemar = new schema({
	Username: {type : String, required:true, unique: true},
	Email: String,
	Password: {type : String, required: true},
	SaltPass : {type : String, required : true}
});

var userInfo = mongoose.model('myUserModel',useSchemar);
module.exports = userInfo;
