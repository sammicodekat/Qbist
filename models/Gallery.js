const squel = require('squel').useFlavour('mysql')
const connection = require('../config/db')
const tablename = 'art'

// SCHEMA
connection.query(`CREATE TABLE IF NOT EXISTS ${tablename} (
  title VARCHAR(100),
  author VARCHAR(50),
  image LONGTEXT,
  id INT NOT NULL AUTO_INCREMENT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
)`, err => {
  if (err) throw err
})

exports.getArt = (cb) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${tablename}`, (err, artwork) => {
      if (err) return reject(err)
      resolve(artwork)
    })
  })
}

exports.addArt = (newArt) => {
  return new Promise((resolve, reject) => {
    let sql = squel.insert()
      .into(tablename)
      .setFields(newArt)
      .toString()

    connection.query(sql, (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}
