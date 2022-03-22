# console-extranet

## Features

Un projet qui permet de faire une mise à jour d'une base de donnée en la comparant avec une autre via :

- un server Node.JS

Les caractéristiques sont :

#### Types de bases qui peuvent être lus : 

 - Oracle
 - MariaDB
 - MySQL

#### Types de bases sur lesquels l'écriture est possible ( qui peuvent être mises à jour ) : 

 - MariaDB
 - MySQL

## Installation :

Le programme ne met pas en place de nouveaux champs dans la base qui est mise à jour. Veillez à ce que les champs soit créer avant de lancer le programme

Télécharger le projet, ouvrir l'invité de commande à la racine du projet téléchargé et rentrer la commande :

```bash
// with npm
npm install 
```

## Mise en place :

#### Remplir le fichier .env  
Voici un exemple :

```js
//oracle db
DB_Host= ip or url de l'host
DB_USER= nom utilisateur utilisé pour ce connecter à la base
DB_PASS= mot de passe utilisé pour ce connecter à la base
DB_TNS= connectString
PORT= port pour ce connecter à la base généralement 3000

//Données SSH
SSH_HOST= ip or url de l'host
SSH_PORT = 22
SSH_LOGIN = nom utilisateur utilisé pour ce connecter au serveur
SSH_PASS = mot de passe utilisé pour ce connecter au serveur


//MySQL db
DB_sqlHost= localhost 
DB_sqlUser= nom utilisateur utilisé pour ce connecter à la base
DB_sqlPassword= mot de passe utilisé pour ce connecter à la base
DB_sqlPort= 3001
DB_sqlDatabase= nom de la base
```
#### Dans le cas d'une volonté de mise à jour d'une base MySQL par rapport à une base MySQL : 

 - Ajouté dans le fichier .env une nouvelle base :

  ```js
//MySQL db 2
DB_sqlHost2= localhost 
DB_sqlUser2= nom utilisateur utilisé pour ce connecter à la base
DB_sqlPassword2= mot de passe utilisé pour ce connecter à la base
DB_sqlPort2= 3001
DB_sqlDatabase2= nom de la base
```


  - Ajouter une fonction de connection pour la base MySQL 2 dans le fichier FonctionConnection.js dans le dossier assets : 

```js

const dbServer2 = {
	host: process.env.DB_sqlHost2,
	port: process.env.DB_sqlPort2,
	user: process.env.DB_sqlUser2,
	password: process.env.DB_sqlPassword2,
	database: process.env.DB_sqlDatabase2,
	
}

var RequeteSql2 = new Promise((resolve, reject) => {
	sshclient.on('ready', () => {
		sshclient.forwardOut(
			forwardConfig.srcHost,
			forwardConfig.srcPort,
			forwardConfig.dstHost,
			forwardConfig.dstPort,
			(err, stream) => {
				if (err) reject(err);
				const updatedDbServer = {
					...dbServer2,		
					stream
				};
				const connection = mysqldb.createConnection(updatedDbServer);
				connection.connect((error) => {
					if (error) {
						reject(error);
					}
					resolve(connection);
				});
			});
	}).connect(tunnelConfig);
});

exports.RequeteSql2 = RequeteSql2;
```
#### Choisir le champ des bases qui va être utilisé pour la comparaison :

Ce champ doit être unique à chaque ligne par exemple un id ou bien un numéro de contrat.

Dans le fichier comparaison dans le dossier assets 2 éléments sont à changer : 

 ```js
console.log("Ajout")
				var i = 0;
				while (i < Array1.length) {
					const Elem = Array1[i];
					if (Array2.find(nameTable1 => nameTable1.ElemToChange === Elem.ElemToChange) === undefined) {
						ElemToAdd.push(Elem);
						Array1.splice(i, 1);

					}
```
et 

 ```js
console.log("Supression")
				i = 0;
				while (i < Array2.length) {
					const Elem = Array2[i];
					if (Array1.find(nameTable2 => nameTable2.ElemToChange === Elem.ElemToChange) === undefined) {
						ElemToDelete.push(Elem);
						Array2.splice(i, 1);

					}
```
L'élément appeler "ElemeToChange" doit prendre le nom du champ de la base voulu.


#### Choisir le champ des bases qui va être utilisé pour la suppresion de données  :

Ce champ doit être unique à chaque ligne par exemple un id ou bien un numéro de contrat.

Dans le fichier FonctionDelete dans le dossier assets 2 éléments sont à changer 

```js
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
					ElemToChange: Array[i].ElemToChange
				}
			})
			await Connection.RequeteSql.then( (connection) => {connection.query(requete.query);});
			i++;
		}
	}
```
Pareil que pour la comparaison les 2 éléments nomé "ElemToChange" doivent prendre le nom du champs de la base que vous utiliser pour faire la mise à jour.


#### Choisir les champs des bases qui vont être utilisés pour la mise à jour de données  :

Pour cette étape mettre tous les champs qui vont être mis à jour. Dont un champ principale qui à la même propriété d'être unique que pour les étapes précédentes

```js
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
```
Changer les élément ElemNumber et ElemToChangeUnique. ElemenNumber étant les différents champs à mettre à jour et ElemToChangeUnique le champ unique.


#### Dernière mise en place :

Remplir les arguments dans l'appel de fonction Comparer.Comparer avec les explication suivantes : 

  -  appeler la fonction : Comparer.Comparer('nameTable1', 'nameTable2', 'typeOfbase', 'typeOfBase2', 'NameTable', 'NameTable', 'requestTable1', 'requestTable2') 
  -  typeOfBase peut être : 'oracle' ou 'MySql'.
  -  Les requêtes pour la base de données MySql doivent se terminer par ';', pas pour la base de données oracle.
  -  La base 1 est celle sur laquelle les modifications seront appliquées et la base 2 est celle qui est à jour.
  -  Si vous avez des id sur la table, faites une demande pour prendre chaque champ excepté l'id. 
  -  pour le moment l'écriture sur la base ( base 1 ) doit être de type MySQL 

## L'application est prête à être utilisé ! 

pour lancer l'application :

être à la racine du projet dans le terminal et :

```bash
// with npm
npm start 
```
