const connection = require("../config/database.js")
module.exports.dashboardFetch = (req, res) =>{
    const {category} = req.body
    //console.log(req)
    const sql = `select * from dbetsy.Item where itemcategory=? and itemcount>0 limit 4`
    const values = [
       category
    ]
    connection.query(sql, values, function (error, results, fields) {
        if (error) {
          console.log(error);
          res.status(500).json({
            message: error.sqlMessage
          })
        } else {
          res.status(200).json({
            data: results,
            message: 'Item Fetched Sucessfully'
          })
        }
    });
}