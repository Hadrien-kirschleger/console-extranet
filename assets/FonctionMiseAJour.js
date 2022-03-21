const jsonSql = require('json-sql')({ separatedValues: false, namedValues: false, wrappedIdentifiers: false });
const Connection = require('./FonctionConnection');


var MiseAJour = async function MiseAJour(Array = [], table = "") {


	if (Array === undefined) {
		return 0;
	}
	else {

		let i = 0;

		while (i < Array.length) {

			var requete = jsonSql.build({
				type: 'update',
				table: table,
				condition: {
					// TODO: add condition (A variable that is never twice the same for each line) exemple Contrat: Array[i].Contrat
					Contrat: Array[i].Contrat
				},
				modifier: {
					// TODO add all variable compared by the app que
					
					Nom : Array[i].Nom,
					Prenom : Array[i].Prenom,
					Contrat : Array[i].Contrat,
					email : Array[i].email,
					phone : Array[i].phone,
					address : Array[i].address

				}

			})
			
			await Connection.RequeteSql.then( (connection) => {connection.query(requete.query);});
			i++;

		}
	}



}


exports.MiseAJour = MiseAJour;

