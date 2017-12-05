
var express = require('express');
var app = express();
var connect = require('./ConnectToMongodb.js');
var UserModel = require('./model/UserSchema.js');
var DocModule = require('./model/DocSchema.js');
var mqtt = require('./sensorInfo.js');
var bcrypto = require('crypto');

//this is just for testing 
app.get('/',function(req,res){
		console.log('welcom to the root');
});

//this is the part where we can verifia a doctor when logging in
app.get('/RestApi/VarifiaUser',function(req,res){
		console.log('hello you trying to login as a patien');
		console.log(req.headers);
		UserModel.findOne({username: req.headers.username}, function(err, user){

		if (err) {
			return res.json({ "success": false, "msg": "Error while creating users", "error": err });
		}
		
		if(req.headers.password === user.password){
			res.status(200).send({ "success": true, "result": user });
		}else{
			res.status(401).send({ "success": false, "result": 'null' });
		}
	});
		
});

//this is the part where we can verifia a doctor when logging in
app.get('/RestApi/VarifiaDoc',function(req,res){
		console.log('hello you trying to login As a doctor ');
		
});
//Sensor data is done with Mqtt modules
app.get('/RestApi/GetMqttInfo',function(req,res){
		
	});

//patient registration process missing the security part 
app.post('/RestApi/InscriptionPatient',function(req,res){
	console.log('save new user');
	if (!req.body.username) {
		return res.status(400).send({ "success": false, "msg": "You need to send the text of the user!" });
	}
	var salt = genRandomString(16); /** Gives us salt of length 16 */
	var passwordData = sha512(req.body.password, salt);
	console.log('UserPassword = '+req.body.password);
	console.log('Passwordhash = '+passwordData.password);
	console.log('nSalt = '+passwordData.salt);

	var newuser = new UserModel({
			Username: res.body.username,
			Email : res.body.email,
			Password: passwordData.password,
			SaltPass: passwordData.salt
		});
		
	newuser.save(function (err) {
		if (err) {
			console.log("some error: ", err);
			return res.json({ "success": false, "msg": "Error while creating user", "error": err });
		}
		res.status(201).send({ "success": true, "msg": 'Successful created new user.', "result": newuser });
	});
});


//Doctor registration part missing the security part 
app.post('/RestApi/InscriptionDoctor',function(req,res){

	if (!req.body.username) {
		return res.status(400).send({ "success": false, "msg": "You need to send the text of the user!" });
	}

	var salt = genRandomString(16); /** Gives us salt of length 16 */
	var passwordData = sha512(req.body.password, salt);
	console.log('UserPassword = '+req.body.password);
	console.log('Passwordhash = '+passwordData.password);
	console.log('nSalt = '+passwordData.salt);

	var newDoc = new DocModule({
			Username: res.body.username,
			Speciality: res.body.Speciality,
			Email : res.body.email,
			rating : res.body.rating,
			Password: passwordData.password,
			SaltPass: passwordData.salt
		});
		
	newDoc.save(function (err) {
		if (err) {
			console.log("some error: ", err);
			return res.json({ "success": false, "msg": "Error while creating doctor", "error": err });
		}
		res.status(201).send({ "success": true, "msg": 'Successful created new doctor.', "result": newDoc });
	});
});

app.listen(8080);



/*
this is the app.js , here i uses modules fro different users , every req comes from a client 
is treated as a http get or post requests , one for login and the other for singup 


*/