// Import module :
const schedule = require("node-schedule");
require('dotenv').config('./.env');

//Import function :
const MettreNull = require('./assets/Tool');
const Comparer = require('./assets/comparer');








async function main() {

		// TODO
		//call function : Comparer.Comparer('nameTable1', 'nameTable2', 'typeOfbase', 'typeOfBase2', 'NameTable', 'NameTable', 'requestTable1', 'requestTable2') 
		//typeOfBase can be : 'oracle' or 'MySql'
		// request for MySql dataBase must end by ';' not for oracle dataBase
		// Base 1 is the one on which the modifications will be applied and base 2 is the up-to-date one
		// If you have id on table make a request to take evry champ exepted id 
		// for the moment writting on base ( base 1 ) must be MySQL type 
	
Comparer.Comparer();

	
	
}



main();

