import supabase from '../../config/supabaseClient.js';

async function getExemptionRules(year) {
	// test-1
	//year = 2022
	const { data, error } = await supabase
		.from('exemptionRule')
		.select('type, maxAmount,basicSalaryPercentage')
		.eq('year', year)

	if (error) {
		throw new Error("Exemption rules of the given year not found");
	} else {
		console.log(data);
		return data;
	}
}

module.exports = {
	getExemptionRules
}