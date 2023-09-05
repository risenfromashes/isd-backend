import supabase from '../../config/supabaseClient.js';

async function getSalaryRules(year) {
	// test-1
	//year = 2022
	const { data, error } = await supabase
		.from('paySlabRule')
		.select()
		.eq('year', year)

	if (error) {
		throw new Error("Salary rules of the given year not found");
	} else {
		console.log(data);
		return data;
	}
}

module.exports = {
	getSalaryRules
}