var mongoose = require('mongoose');
var Employee = mongoose.model("Employee");

var employeeController = {};

employeeController.list = function(req,res){
	Employee.find({}).exec(function(err,employess){
		if (err) {
			console.log("Error",err);
		}
		else{
			res.render("../views/employee/index",{employees: employess});
/*			console.log(employess);*/
		}
	});
}

employeeController.create = function(req,res){

	res.render('../views/employee/create');

}

employeeController.save = function(req,res){
	var employee = new Employee(req.body);

	employee.save(function(err){
		if (err) {
			console.log(err);
			res.render("../views/employee/create");
		}
		else{
			console.log("Success");
			res.redirect("/employees");
		}
	});
}

employeeController.edit = function(req,res){
	Employee.findOne({_id:req.params.id}).exec(function (err,employee){
		if (err) {
			console.log(err);
		}
		else{
			res.render('../views/employee/edit',{employee:employee});
		}
	});
}

employeeController.update = function(req,res){
	Employee.findByIdAndUpdate(req.params.id,
		{$set: 
			{name : req.body.name,
			address:req.body.address,
			position: req.body.position,
			salary: req.body.salary}}, {new: true},
			function(err,employee){
				if (err) {
					console.log(err);
					res.render('../views/employee/edit',{employee: req.body});
				}
				res.redirect('/employees');
			}

		)
}

employeeController.delete = function(req,res){
	Employee.remove({_id:req.params.id},function(err){
		if (err) {
			console.log(err);
		}
		else{
			console.log("successfuly");
			res.redirect('/employees');
		}
	});
}

employeeController.search =function(req,res){
	var q = req.params.q;
		console.log(q);
		Employee.find( {name:{'$regex':q}},function(err,doc){
			if (err) {
				console.log(err);
			}
			else{
				console.log(doc);
			}
		} );
}
module.exports = employeeController;