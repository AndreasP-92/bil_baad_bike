const db = require('../../config/database').connect();
const Hash = require('./hash');

const User = function (username, passphrase) {
	return new Promise(async (resolve, reject) => {
		const hash = await Hash(passphrase);
		db.execute('INSERT INTO users SET username = ?, passphrase = ?, user_role = 1', [username, hash], (err, result) => {
			if (err) reject(err);
			console.log(result);
			resolve(true);
		});
	});
};

User.valid = function (username, passphrase) {
	return new Promise((resolve, reject) => {
		db.execute('SELECT id, passphrase FROM users WHERE username = ?', [username], async (err, result) => {
			if (err) reject(err);
			if (result[0] === undefined) reject('invalid stuffs');
			if (await Hash.compare(passphrase, result[0].passphrase)) {
				resolve(result[0].id);
			} else {
				reject('invalid passphrase or username');
			}
		});
	});
};

User.google = function () {};

User.google.findOrCreate = function (key) {
	return new Promise ((resolve, reject) => {
		db.execute('SELECT gKey, user FROM googleKeys WHERE gKey = ?', [key], (err, result) => {
			if (err) reject(err);
			if (result.length)
				resolve(result[0].gKey);
			else {
				db.execute('INSERT INTO googleKeys SET gKey = ?', [key], (err, record) => {
					if (err) reject(err);
					resolve(record.gKey);
				});
			}
		});
	}); 
};

module.exports = User;
