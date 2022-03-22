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
					ElemToChangeUnique: Array[i].ElemToChangeUnique
				},
				modifier: {
					// TODO add all variable compared by the app que
					
					Elem1 : Array[i].Elem1,
					Elem2 : Array[i].Elem2,
					Elem3 : Array[i].Elem3,
					Elem4 : Array[i].Elem4,

				}

			})
			
			await Connection.RequeteSql.then( (connection) => {connection.query(requete.query);});
			i++;

		}
	}



}


exports.MiseAJour = MiseAJour;

