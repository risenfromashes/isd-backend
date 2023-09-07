import supabase from '../../config/supabaseClient.js';

async function getExemptionRules(year) {
	// test-1
	//year = 2022
	console.log(year);
	const { data, error } = await supabase
		.from('exemptionRule')
		.select('type, maxAmount,basicSalaryPercentage')
		.eq('year', year)

	if (error) {
		throw new Error("Exemption rules of the given year not found");
	} else {
		let obj = {};
		for (let i = 0; i < data.length; i++) {
			obj[data[i].type] = {
				ceil: data[i].maxAmount,
				rate: data[i].basicSalaryPercentage
			}
		}
		console.log(obj);
		return obj;
	}
}

export {
	getExemptionRules
}