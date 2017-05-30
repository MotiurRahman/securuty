var db = Ti.Database.open('people');
db.execute('CREATE TABLE IF NOT EXISTS general(id  INTEGER PRIMARY KEY autoincrement not null,title TEXT,email TEXT, pass TEXT,account TEXT,pin TEXT, url TEXT)');
db.close();

exports.add = function(title, email, pass, account, pin, url, _callBacl) {
	var db = Ti.Database.open('people');
	db.execute('INSERT INTO general (title,email,pass,account,pin,url) VALUES(?,?,?,?,?,?)', title, email, pass, account, pin, url);
	_callBacl('success');
	db.close();
};

exports.getinfo = function() {
	var generalInfo = [];
	var db = Ti.Database.open('people');
	var result = db.execute('select * from general');

	while (result.isValidRow()) {

		generalInfo.push({

			id : result.fieldByName('id'),
			title : result.fieldByName('title'),
			email : result.fieldByName('email'),
			pass : result.fieldByName('pass'),
			account : result.fieldByName('account'),
			pin : result.fieldByName('pin'),
			url : result.fieldByName('url'),

		});
		result.next();
	}

	result.close();
	db.close();
	//Ti.API.info('stuInfo'+ stuInfo);
	return generalInfo;
};

exports.updateinfo = function(title, email, pass, account, pin, url, id) {
	var db = Ti.Database.open('people');
	db.execute('UPDATE general set title=?,email=?,pass=?,account=?,pin=?,url=? where id=?', title, email, pass, account, pin, url, id);
	//alert(title);
	db.close();
};

exports.deletinfo = function(id) {
	var db = Ti.Database.open('people');
	db.execute('DELETE FROM general where id=?', id);

	db.close();
};
