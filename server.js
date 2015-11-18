var express = require('express');
var app = express();
var mongojs = require('mongojs');
var dbc = mongojs('contactlist',['contactlist']);
var dbm = mongojs('meetings',['meeting']);
var bodyParser = require('body-parser');
var ip = require('ip');
var port = Number(process.env.PORT || 3000);

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/location',function(req,res){
	res.json(ip.address());
});
app.get('/contactlist',function(req,res){
	dbc.contactlist.find(function(err,docs){
		res.json(docs);
	})
});
app.post('/contactlist',function(req,res){
	dbc.contactlist.insert(req.body,function(err,doc){
		res.json(doc);
	})
})
app.delete('/contactlist/:id',function(req,res){
	var id = req.params.id;
	dbc.contactlist.remove({_id: mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	});
})

app.get('/contactlist/:id',function(req,res){
	var id = req.params.id;
	dbc.contactlist.findOne({_id: mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	})
})

app.put('/contactlist/:id',function(req,res){
	var id = req.params.id;
	dbc.contactlist.findAndModify({query:{_id: mongojs.ObjectId(id)},
	update:{$set:{name: req.body.name, id: req.body.id}},
	new: true},function(err,doc){
		res.json(doc);
	});
})

app.get('/meeting',function(req,res){
	dbm.meeting.find(function(err,docs){
		res.json(docs);
	})
});
app.get('/meetingcount',function(req,res){
	dbm.meeting.count(function(err,doc){
		res.json(doc);
	})
});
app.post('/meeting',function(req,res){
	dbm.meeting.insert(req.body,function(err,doc){
		res.json(doc);
	})
})
app.delete('/meeting/:id',function(req,res){
	var id = req.params.id;
	dbm.meeting.remove({_id: mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	});
})

app.get('/meeting/:id',function(req,res){
	var id = req.params.id;
	dbm.meeting.findOne({_id: mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	})
})

app.put('/meeting/:id',function(req,res){ 
	var id = req.params.id;
	dbm.meeting.findAndModify({query:{_id: mongojs.ObjectId(id)},
	update:{$set:{name: req.body.name}},
	new: true},function(err,doc){
		res.json(doc);
	});
})

app.listen(port);
console.log("server running on port 3000");