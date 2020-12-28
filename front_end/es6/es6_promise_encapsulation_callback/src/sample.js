/* just code sample, can't be run */

// 1. http request
const request = require('request')
request.get('http://localhost:3000', (err, res, body) => {
  /* http 请求结果处理 */
})

// 2. SQL query
const mysql = require('mysql')
const connection = mysql.createConnection(
  {
    /* 配置信息省略 */
  }
)
connection.query('select * from a_table', (err, data) => {
  /* sql 查询结果处理 */
})

// 3. sync function
const syncFunction = (x, cb) => {
  console.log(`param x = ${x}`)
  cb()
}
syncFunction(1, () => {
  /* do something */
})

// 4. callback hell
connection.query('' /* SQL命令1 */, (err, data1) => {
  /* judge or do something else */
  connection.query('' /* SQL命令2 */, (err, data2) => {
    /* judge or do something else */
    connection.query('' /* SQL命令3 */, (err, data3) => {
      /* judge or do something else */
      console.log(data3)
    })
  })
})
