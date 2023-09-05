import supabase from '../../config/supabaseClient.js';

async function getFormId(TIN, assessmentYear) {
	// test-1
	TIN = "123456789012"
	assessmentYear = "2045-20"

	const { data, error } = await supabase
		.from('taxForm')
		.select('id')
		.eq('TIN', TIN)
		.eq('assessmentYear', assessmentYear)

	if (error) {
		throw new Error("Form Id not found");
	} else {
		console.log(data);
		return data;
	}
}
module.exports = {
	getFormId
}