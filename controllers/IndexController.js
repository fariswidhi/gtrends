
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

	if(q==null){

		res.render('../views/home',{day:day,week:week,oneMonth:oneMonth,threeMonth:threeMonth,year:year});
	}
	else{

		// console.log(moment().subtract(1, 'months').get('year'));
		// console.log(moment().subtract(1, 'months').get('month')+1);
		// console.log(moment().subtract(1, 'months').get('date'));
		// console.log(c);
		gtrends.relatedQueries({keyword: q,startTime: new Date(m),geo:c})


	.then(function(result,err){
		// console.log(JSON.stringify(result));
		console.log(err);
		res.render('../views/search',{datas:JSON.parse(result).default.rankedList[0]['rankedKeyword'],title:q,week:week,oneMonth:oneMonth,threeMonth:threeMonth,year:year,day:day});
		// res.json(JSON.parse(result));
		// JSON.stringify(result);
	})
	.catch(function(err){
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
		// res.json(JSON.parse(result).default.rankedList[0]['rankedKeyword']);
		// JSON.stringify(result);
	})
	.catch(function(err){
		console.log(err);
	});
}


module.exports = indexController;