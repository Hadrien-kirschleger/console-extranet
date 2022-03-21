const jsonSql = require('json-sql')({ separatedValues: false, namedValues: false, wrappedIdentifiers: false });
const Connection = require('./FonctionConnection');

var suppr = async function Suppression(Array = [], table = "") {


	if (Array === undefined) {
		return 0;
	}
	else {

		let i = 0;
		while (i < Array.length) {
			var requete = jsonSql.build({
				type: 'remove',
				table: table,
				condition: {
					// TODO: add condition (A variable that is never twice the same for each line) exemple Contrat: Array[i].Contrat
					Contrat: Array[i].Contrat
				}
			})
			await Connection.RequeteSql.then( (connection) => {connection.query(requete.query);});
			i++;
		}
	}


}


exports.Suppression = suppr;
