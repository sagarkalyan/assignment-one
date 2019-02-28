const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const pool = require('../../dbconfig/dbconfig')

const app = new Koa()

app.use(bodyParser())

app.use(async ctx => {

  const todoItem = await ctx.request.body.todoItem
  const returnedtodoItem = await getTodoItem(todoItem)
  ctx.body = returnedtodoItem

})

async function getTodoItem(todoItem) {
  try {
    const gettodoitem = await pool.query(`SELECT * FROM Todotable WHERE todoItem LIKe '%${todoItem}%';`)
    return gettodoitem[0]
  }catch(e){
    console.error(e)
  }
}

module.exports = app.callback()