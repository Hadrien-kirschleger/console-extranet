const Connection = require('./FonctionConnection');


var split = function divideArray(array) {

	for (let i = 0; i < Math.round(array.length / 2); i++) {

		arraySplit1.push(array[i]);
		arraySplit2.push(array[locatairesSql.length - i]);
	}

	return { arraySplit1, arraySplit2 };

}

var MettreNull = async function MettreNull() {
	let reqs = {
		req0: "UPDATE locataire set tel_gard = null WHERE tel_gard =  '';",
		req1: "UPDATE locataire set nom_asc = null WHERE nom_asc =  '';",
		req2: "UPDATE locataire set prenom = null WHERE prenom =  '';",
		req3: "UPDATE locataire set tel_asc = null WHERE tel_asc =  '';",
		req4: "UPDATE infos set tel_mobile = null WHERE tel_mobile =  '';",
		req5: "UPDATE infos set tel_fixe = null WHERE tel_fixe =  '';",
		req6: "UPDATE infos set mail_contentieux = null WHERE mail_contentieux =  '';",
		req7: "UPDATE infos set nom_contentieux = null WHERE nom_contentieux = '';",
		req8: "UPDATE infos set tel_contentieux = null WHERE tel_contentieux = '';",
		req9: "UPDATE infos set chauffage = null WHERE chauffage =  '';"
	}

	let nubReq = Object.keys(reqs);

	for (let i = 0; i < nubReq.length; i++) {

		let key = nubReq[i];
		let req = reqs[key];
		Connection.RequeteSql.then((connection) => { connection.query(req); });
	}



}



const GetSqlData = async function GetSqlData(sql, callback) {

	Connection.RequeteSql.then((connection) => {
		connection.query(sql, function (err, result) {
			if (err) throw err;
			return callback(result);
		});
	});

}


const GetSqlData2 = async function GetSqlData(sql, callback) {

	Connection.RequeteSql2.then((connection) => {
		connection.query(sql, function (err, result) {
			if (err) throw err;
			return callback(result);
		});
	});

}

exports.split = split;
exports.MettreNull = MettreNull;
exports.GetSqlData = GetSqlData;
exports.GetSqlData2 = GetSqlData2;