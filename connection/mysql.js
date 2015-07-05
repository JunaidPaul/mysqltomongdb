// connection to mysql
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'glucoguide'
});

module.exports = connection;
