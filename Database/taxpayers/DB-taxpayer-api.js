import supabase from '../../config/supabaseClient.js';

async function getLoginUser(username, password) {
	// test-1
	// username = "user1";
	// password = "password";
	console.log({username, password});
	const { data, error } = await supabase
		.from('TaxPayer')
		.select('taxPayerID,name')
		.eq('username', username)
		.eq('password', password)

	if (error || data.length == 0) {
		throw new Error("Tax Payer not found");
	} else {
		console.log(data);
		return {username: data[0].name, clientID: data[0].taxPayerID};
	}
}

async function registerUser(username, password) {
	// test-1
	let NID = 0
	let TIN = 0
	let name = ""
	let dateOfBirth = "2000-01-01"
	let taxZone = ""
	let presentAddress = "";
	let permanentAddress = presentAddress
	let taxCircle = 0
	let gender = ""

	{
		const { data, error } = await supabase
			.from('TaxPayer')
			.select('taxPayerID,name')
			.eq('username', username)
		
		if (error) {
			console.log(error);
			throw new Error("Couldn't query table");
		} else if (data.length > 0){
			throw new Error("Username taken");
		}
	}

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

async function getBasicInfo(id) {
	// test-1
	const { data, error } = await supabase
		.from('TaxPayer')
		.select('NID,TIN,name,contactNumber,dateOfBirth,taxZone,presentAddress,permanentAddress,taxCircle,gender,maritalStatus')
		.eq('taxPayerID', id)

	if (error) {
		console.log(error);
		throw new Error("Basic info could not be fetched");
	} else if (data.length == 0) {
		throw new Error("No such user");
	} else {
		console.log(data);
		return data[0];
	}
}

async function updateBasicInfo(id, fullname, tin, nid, contactNumber, gender, dateOfBirth, presentAddress,
							   permanentAddress, taxZone, taxCircle, maritalStatus) {
	// test-1
	const { data, error } = await supabase
		.from('TaxPayer')
		.update({
			'NID': nid,
			'TIN': tin,
			'name': fullname,
			'contactNumber': contactNumber,
			'dateOfBirth': dateOfBirth,
			'taxZone': taxZone,
			'presentAddress': presentAddress,
			'permanentAddress': permanentAddress,
			'taxCircle': taxCircle,
			'gender': gender,
			'maritalStatus': maritalStatus
		})
		.eq('taxPayerID', id)
		.select()

	if (error) {
		console.log(error);
		throw new Error("Basic info could not be updated");
	} else {
		console.log(data);
		return data[0];
	}
}

export {
	getLoginUser,
	registerUser,
	updateBasicInfo,
	getBasicInfo
}