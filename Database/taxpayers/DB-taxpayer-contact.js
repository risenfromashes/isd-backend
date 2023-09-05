import supabase from '../../config/supabaseClient.js';

async function updateContactInfo(TIN, contactNumber, type) {
	// test-1
	// TIN = "123456789012"
	// contactNumber = "01793787850"
	// type = "office"

	const { data, error } = await supabase
		.from('taxPayerContactInfo')
		.update({ 'contactNumber': contactNumber })
		.eq('TIN', TIN)
		.eq('type', type)
		.select()

	if (error) {
		console.log(error);
		throw new Error("Contact info could not be updated");
	} else {
		console.log(data);
		return data;
	}
}

module.exports = {
	updateContactInfo
}