import supabase from '../../config/supabaseClient.js';

async function getLoginUser(username, password) {
	// test-1
	//username = "user1";
	//password = "password";
	const { data, error } = await supabase
		.from('TaxPayer')
		.select('taxPayerID,name')
		.eq('username', username)
		.eq('password', password)

	if (error) {
		throw new Error("Tax Payer not found");
	} else {
		console.log(data);
		return data;
	}
}

async function registerUser(NID, TIN, name, dateOfBirth, taxZone, presentAddress,
	permanentAddress, taxCircle, username, password, gender) {
	// test-1
	// NID = 76455256377383
	// TIN = 76359891979333
	// name = "Faria Binta Awal"
	// dateOfBirth = "2000-09-24"
	// taxZone = "Manikganj"
	// presentAddress = "22, bazar mosque road, Manikganj";
	// permanentAddress = presentAddress
	// taxCircle = 7
	// username = "user6"
	// password = "123"
	// gender = "Female"
	const { data, error } = await supabase
		.from('TaxPayer')
		.insert([{
			NID, TIN, name, dateOfBirth, taxZone, presentAddress, permanentAddress
			, taxCircle, username, password, gender
		}]).select()
	if (error) {
		console.log(error);
		throw new Error("Couldn't insert data in TaxPayer");
	} else {
		console.log(data);
		return data;
	}
}

async function updateBasicInfo(NID, TIN, name, dateOfBirth, taxZone, presentAddress, permanentAddress,
	taxCircle, username, gender, password, maritalStatus) {
	// test-1
	const { data, error } = await supabase
		.from('TaxPayer')
		.update({
			'NID': NID,
			'TIN': TIN,
			'name': name,
			'dateOfBirth': dateOfBirth,
			'taxZone': taxZone,
			'presentAddress': presentAddress,
			'permanentAddress': permanentAddress,
			'taxCircle': taxCircle,
			'gender': gender,
			'password': password,
			'maritalStatus': maritalStatus
		})
		.eq('username', username)
		.select()

	if (error) {
		console.log(error);
		throw new Error("Basic info could not be updated");
	} else {
		console.log(data);
		return data;
	}
}

module.exports = {
	getLoginUser,
	registerUser,
	updateBasicInfo
}