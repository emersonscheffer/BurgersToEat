const connection = require('../config/connection');

const printQuestionMarks = num => {

    let arr = [];

    for(var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}



function objToSql(ob) {
    var arr = [];
  
    for (var key in ob) {
      var value = ob[key];

      if (Object.hasOwnProperty.call(ob, key)) {

        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }

        arr.push(key + "=" + value);
      }
    }
  
    return arr.toString();
  }

const orm = {
    all: (tableInput, cb) => {
        let queryString = "SELECT * FROM " + tableInput + ";";
        
        connection.query(queryString, (err, result) => {
            if(err) {
                throw err;
            }
            cb(result);
        })
    }
    ,

    create: (table, cols, vals, cb) => {
        let queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length); 
        queryString += ") ";


        connection.query(queryString, vals,(err, result) => {
            if(err) throw err;

            cb(result);
        });

    }
    ,

    update: (table, objColVals, condition, cb) => {

        console.log('from orm');
        console.log(objColVals);

        let queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition

        console.log(queryString);
        connection.query(queryString, (err, result) => {
            if(err) throw err;

            cb(result);
        });
    }
}

module.exports = orm;