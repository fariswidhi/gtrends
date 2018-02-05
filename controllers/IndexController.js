
const gtrends = require('google-trends-api');
var moment = require('moment');
var indexController = {};	

 indexController.list = function(req,res){
 	var q =req.query.q;
 	var m = req.query.from;
 	var c = req.query.country;

		var day = moment().day(-1).get('year')+"-"+moment().day(-1).get('month')+1+"-"+moment().day(-1).get('date');
		var week = moment().day(-7).get('year')+"-"+moment().day(-7).get('month')+1+"-"+moment().day(-7).get('date');
		var oneMonth = moment().month(-1).get('year')+"-"+parseInt(moment().month(-1).get('month')+1)+"-"+moment().month(-1).get('date');
		var threeMonth = moment().month(-3).get('year')+"-"+parseInt(moment().month(-3).get('month')+1)+"-"+moment().month(-3).get('date');
		var year = moment().month(-12).get('year')+"-"+moment().month(-12).get('month')+1+"-"+moment().month(-12).get('date');
		var now = moment().day(0).get('year')+"-"+moment().day(0).get('month')+1+"-"+moment().day(0).get('date');
	if(q==null){

		res.render('../views/home',{day:day,week:week,oneMonth:oneMonth,threeMonth:threeMonth,year:year});
	}
	else{
		gtrends.relatedQueries({keyword: q,geo: c,startTime: new Date(m), endTime: new Date("2018-11-4")})


	.then(function(result){
		
		res.render('../views/search',{datas:JSON.parse(result).default.rankedList[0]['rankedKeyword'],title:q,week:week,oneMonth:oneMonth,threeMonth:threeMonth,year:year,day:day});
		console.log(result);
		console.log(m);
		console.log(now);
	})
	.catch(function(err){
		console.log(err);
		res.render('error');
	});

	}
}

indexController.search = function(req,res){

	if(q==null){
		res.redirect('/');
	}
		gtrends.relatedQueries({keyword: q,geo:'ID'})


	.then(function(result){
		// console.log(JSON.stringify(result));
		res.render('../views/search',{datas:JSON.parse(result).default.rankedList[0]['rankedKeyword'],title:q});
	})
	.catch(function(err){
		console.log(err);
	});
}


module.exports = indexController;