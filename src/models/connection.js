const fs = require('fs').promises;
const mysql = require('mysql2/promise');

const path = require('path');

const MIGRATION = '../../sql/01-migration.sql';
const SEEDS = '../../sql/02-seed.sql';

const connection = mysql.createPool({
  host: process.env.MYSQL_HOSTNAME || 'localhost', 
  port: process.env.MYSQL_PORT || 3306, 
  user: process.env.MYSQL_USER || 'root', 
  password: process.env.MYSQL_PASSWORD || 'password', 
  database: 'StoreManager',
  multipleStatements: true,
});

const runMySQL = async ({ sql, args = [] }) => {
  const result = await connection.query(sql, args);
  await connection.end();
  return result;
};

const runQueries = async (location) => {
  const file = await fs.readFile(path.join(__dirname, location), 'utf8');
  return runMySQL({ sql: file });
};

const makeMigration = () => runQueries(MIGRATION);
const makeSeed = () => runQueries(SEEDS);

module.exports = {
  makeMigration,
  makeSeed,
  connection,
};
