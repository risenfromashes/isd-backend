import supabase from '../../config/supabaseClient.js';

async function updateFamilyMemberInfo(TIN, name, relation, memberTIN) {
	// test-1
	// TIN = "123456789012"
	// name = "Anindya Iqbal"
	// relation = "Father"
	// memberTIN = "123456789000"

	const { data, error } = await supabase
		.from('taxPayerFamilyMember')
		.update({ 'name': name, 'relation': relation, 'memberTIN': memberTIN })
		.eq('TIN', TIN)
		.select()

	if (error) {
		console.log(error);
		throw new Error("Family member's contact info could not be updated");
	} else {
		console.log(data);
		return data;
	}
}

module.exports = {
	updateFamilyMemberInfo
}