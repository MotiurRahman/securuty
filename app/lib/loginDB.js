var db = Ti.Database.open('people');
db.execute('CREATE TABLE IF NOT EXISTS login(id  INTEGER PRIMARY KEY autoincrement not null,pass TEXT,email TEXT)');
db.close();

exports.add = function(pass, email,_callback) {
	var db = Ti.Database.open('people');
	db.execute('INSERT INTO login (pass,email) VALUES(?,?)', pass, email);
	_callback('success');
	db.close();
};

exports.getinfo = function() {
	var loginInfo = [];
	var db = Ti.Database.open('people');
	var result = db.execute('select * from login');

	while (result.isValidRow()) {

		loginInfo.push({

			id : result.fieldByName('id'),
			pass : result.fieldByName('pass'),
			email : result.fieldByName('email'),

		});
		result.next();
	}

	result.close();
	db.close();
	//Ti.API.info('stuInfo'+ stuInfo);
	return loginInfo;
};

exports.updateinfo = function(pass, email) {
	var db = Ti.Database.open('people');
	db.execute('UPDATE login set pass=?,email=? where id=?', pass, email, id);
	//alert(title);
	db.close();
};

exports.updatePass = function(pass,id) {
	var db = Ti.Database.open('people');
	db.execute('UPDATE login set pass=? where id=?', pass, id);
	Ti.API.info("update pass:"+pass);
	db.close();
};

exports.deletinfo = function(id) {
	var db = Ti.Database.open('people');
	db.execute('DELETE FROM login where id=?', id);

	db.close();
};
