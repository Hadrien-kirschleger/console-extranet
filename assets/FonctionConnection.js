require('dotenv').config('./.env');
const { Client } = require('ssh2');
const mysqldb = require('mysql2');
const sshclient = new Client();
const oracledb = require('oracledb');
oracledb.fetchAsString = [oracledb.DATE];
oracledb.oracleCommand = [BindByName = true];






const tunnelConfig = {
	host: process.env.SSH_HOST,
	port: process.env.SSH_PORT,
	username: process.env.SSH_LOGIN,
	password: process.env.SSH_PASS
}


const dbServer = {
	host: process.env.DB_sqlHost,
	port: process.env.DB_sqlPort,
	user: process.env.DB_sqlUser,
	password: process.env.DB_sqlPassword,
	database: process.env.DB_sqlDatabase,
	
}


const forwardConfig = {
	srcHost: process.env.srcHost,
	srcPort: process.env.srcPort,
	dstHost: process.env.dstHost,
	dstPort: process.env.dstPort
}

var RequeteOracle = async function RequeteOracle(sql) {

	let connection;

	console.log('connecting to Oracle');

	try {
		connection = await oracledb.getConnection({
			user: process.env.DB_USER,
			password: process.env.DB_PASS,
			connectString: process.env.DB_TNS
		});
		// formatage de la date pour avoir le même que MySQL pour simplifier les comparaisons
		connection.execute("ALTER SESSION SET nls_date_format = 'YY-MM-DD '");
		result = await connection.execute(sql, {}, { outFormat: oracledb.OBJECT });
		return result;

	} catch (err) {
		console.error(err);
	} finally {
		if (connection) {
			try {
				await connection.close();
			} catch (err) {
				console.error(err);
			}
		}
	}
}



var RequeteSql = new Promise((resolve, reject) => {

	sshclient.on('ready', () => {

		sshclient.forwardOut(
			forwardConfig.srcHost,
			forwardConfig.srcPort,
			forwardConfig.dstHost,
			forwardConfig.dstPort,
			(err, stream) => {

				if (err) reject(err);

				const updatedDbServer = {

					...dbServer,
					

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

exports.RequeteSql = RequeteSql;
exports.RequeteOracle = RequeteOracle;