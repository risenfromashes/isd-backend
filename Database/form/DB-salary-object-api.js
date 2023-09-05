import supabase from './config/supabaseClient.js';


async function addSalary(salaryId, formId, Type, incomeAmount, exemptedAmount) {
	// test-1
	//formId = 6;
	// Type = "Basic Tax";
	// incomeAmount = 8000
	// exemptedAmount = 900
	// salaryId = 12

	const { data, error } = await supabase
		.from('salary')
		.insert([{
			salaryId, Type, formId, incomeAmount, exemptedAmount
		}]).select()
	if (error) {
		console.log(error);
		throw new Error("Couldn't insert data in Salary");
	} else {
		console.log(data);
		return data;
	}
}


async function getLastYearSalary(formId) {
	// test-1
	//formId = 3;
	const { data, error } = await supabase
		.from('salary')
		.select()
		.eq('formId', formId)

	if (error) {
		throw new Error("Salary of prev year not found");
	} else {
		console.log(data);
		return data;
	}
}
module.exports = {
	addSalary,
	getLastYearSalary
}