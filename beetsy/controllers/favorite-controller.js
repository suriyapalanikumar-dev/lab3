const connection = require("../config/database.js")
module.exports.setFavorite = (req, res) =>{
    const {itemid, userid} = req.body
    const sql = `Insert into dbetsy.Favorites(itemid, userid) values (?,?)`
    const values = [
       itemid, userid
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
            message: 'Favorites set Sucessfully'
          })
        }
    });
}

module.exports.fetchFavorite = (req,res) =>{
  const {userid} = req.body
  const sql = `SELECT Item.*, User.usernaame FROM dbetsy.Favorites left join dbetsy.Item on Favorites.itemid=Item.itemid left join dbetsy.User on User.userid=Favorites.userid  where Favorites.userid=?`
    const values = [
       userid
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
            message: 'Fetched favorites Successfully'
          })
        }
    });

}


