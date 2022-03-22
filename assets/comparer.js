require('dotenv').config('./.env');
const Connection = require('./FonctionConnection');
const Ajout = require('./FonctionAjout');
const Suppression = require('./FonctionDelete');
const MiseAJour = require('./FonctionMiseAJour');
const Tools = require('./Tool');

var Comparer = async function Comparer(table1 = "undefined", table2 = "undefined", typeBase1 = "undefined", typeBase2 = "undefined", nameTable1 = "undefined", nameTable2 = "undefined", requestTable1 = "NoRequest", requestTable2 = "NoRequest") {

	var BreakException = {};
	let LigneSansDiff = [];
	let ElemToAdd = [];
	let ElemToDelete = [];
	let Array1 = [];
	let Array2 = [];

	if (requestTable1 == "NoRequest" || requestTable2 == "NoRequest" || table1 == "undefined" || table2 == "undefined" || typeBase1 == "undefined" || typeBase2 == "undefined" || nameTable1 == "undefined" || nameTable2 == "undefined") {

		console.log("Il manque des paramètres pour lancer le programme");

		if (requestTable1 == 'NoRequest') {

			console.log("Il manque le paramètres requestTable1");
		}
		if (requestTable2 == 'NoRequest') {

			console.log("Il manque le paramètres requestTable2");
		}
		if (table1 == "undefined") {

			console.log("Il manque le paramètres table1");
		}
		if (table2 == "undefined") {

			console.log("Il manque le paramètres table2");
		}
		if (nameTable1 == "undefined") {

			console.log("Il manque le paramètres nameTable1");
		}
		if (nameTable2 == "undefined") {

			console.log("Il manque le paramètres nameTable2");
		}
		if (typeBase1 != "MySQL") {

			console.log("Le paramètre typeBase1 n'est pas correct");
		}
		if (typeBase2 == "undefined") {

			console.log("Il manque le paramètres typeBase2");
		}
	}
	else {

			Tools.GetSqlData2(requestTable1, function (result) {

				Array1 = result;

				if (typeBase2 == 'MySQL') {

					Tools.GetSqlData(requestTable2, function (result) {
						Array2 = result;

						comp(Array1, Array2);
					})
				}

				if (typeBase2 == 'oracle') {

					let Array2 =  Connection.RequeteOracle(requestTable2).then(function (result) {
	
						return result.rows;
					})

					comp(Array1, Array2);
				}

				

			})

			

		function comp(Array1, Array2) {


			let StringArray1 = JSON.stringify(Array1);

			let StringArray2 = JSON.stringify(Array2);

			// Log en cas de problèmes 
			console.log("Tab Array1 : " + Array1.length + " , Tab Array2 : " + Array2.length);
			console.log("Taille Array1 : " + StringArray1.length + " , Taille Array2 : " + StringArray2.length);

			if (StringArray1 == StringArray2) {

				console.log("Pas de changement à effectuer ");
			}
			else if (StringArray2 != StringArray1) {

				console.log("Ajout")
				var i = 0;
				while (i < Array1.length) {
					const Elem = Array1[i];
					if (Array2.find(nameTable1 => nameTable1.ElemToChange === Elem.ElemToChange) === undefined) {
						ElemToAdd.push(Elem);
						Array1.splice(i, 1);

					}
					else {
						i++;
					}
				}

				//Recherche de ligne à suprimer 
				console.log("Supression")
				i = 0;
				while (i < Array2.length) {
					const Elem = Array2[i];
					if (Array1.find(nameTable2 => nameTable2.ElemToChange === Elem.ElemToChange) === undefined) {
						ElemToDelete.push(Elem);
						Array2.splice(i, 1);

					}
					else {
						i++;
					}
				}

			}

			let StringArray3 = JSON.stringify(Array1);
			let StringArray4 = JSON.stringify(Array2);

			console.log("Tab Array1 : " + Array1.length + " , Tab Array2 : " + Array2.length);
			console.log("Taille Array1 : " + StringArray3.length + " , Taille Array2 : " + StringArray4.length);
			console.log("Elements à supprimer : " + ElemToDelete.length + " , Elements à ajouter : " + ElemToAdd.length);

			if (StringArray3 == StringArray4) {

				console.log("Pas de changement à effectuer ");
			}
			else {
				//Recherche de différences dans les lignes
				console.log("Recherche différence");
				var i = 0;
				while (i < Array2.length) {
					const ArrayS = Array2[i];
					let SqlString = JSON.stringify(ArrayS);
					try {
						var o = 0;
						while (o < Array1.length) {
							const ArrayO = Array1[o];
							let OracleString = JSON.stringify(ArrayO);
							if (SqlString == OracleString) {
								throw BreakException;
							} else {
								o++;
							}
						}

					}
					catch (e) {
						LigneSansDiff.push(i);
						Array1.splice(o, 1);
						if (e !== BreakException) throw e;

					}
					i++;
				}
				console.log(LigneSansDiff.length + " Lignes sans différence");
				console.log("Tab Oracle : " + Array1.length + " , Tab Sql : " + Array2.length)


			}
			if (ElemToAdd.length !== 0) {
				console.log('Ajout');
				Ajout.Ajout(ElemToAdd, nameTable1);
			}

			if (ElemToDelete.length !== 0) {
				console.log('Suppression');
				Suppression.Suppression(ElemToDelete, nameTable1);

			}



			if (Array1.length !== 0) {

				MiseAJour.MiseAJour(Array1, nameTable1);
			}

		}


	}
}


exports.Comparer = Comparer;