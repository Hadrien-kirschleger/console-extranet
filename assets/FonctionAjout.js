const jsonSql = require('json-sql')({ separatedValues: false, namedValues: false, wrappedIdentifiers: false });
const Connection = require('./FonctionConnection');

var Ajout = async function Ajout(Array = [], table = "") {


	if (Array === undefined) {
		return 0;
	}
	else {
		let i = 0;
		while (i < Array.length) {
			var requete = jsonSql.build({
				type: 'insert',
				table: table,
				values: Array[i]
			})
			await Connection.RequeteSql.then( (connection) => {connection.query(requete.query);});
			i++;
		}

	}

}

exports.Ajout = Ajout;