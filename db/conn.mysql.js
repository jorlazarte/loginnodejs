import db2 from 'mysql2/promise';
import configdb from '../db/mysql.config.js'

async function createConnection() {
	try {
		/*
		const connection = await db2.createConnection({
			host: 'localhost',
			user: 'root',
			password: '',
			database: 'nodejsv1'
		});
		*/
		
		console.log('configdb', configdb)
		const connection = await db2.createConnection(configdb)


		return connection
	
	} catch (error) {
		console.error('Error al crear la conexión a la base de datos:', error);
	throw error;
	}
}

export {createConnection}