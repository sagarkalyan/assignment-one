const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const pool = require('../../dbconfig/dbconfig')

const app = new Koa()
app.use(bodyParser())

app.use(async ctx => {
  const deldata = await ctx.request.body
  await createPost(deldata.todoItem)

  ctx.body = { "deletedtodoItem": `${deldata.todoItem}` }
})


async function createPost(todoItem) {
  try {
    const deltodoItem = await pool.query(`DELETE FROM Todotable WHERE todoItem LIKE '%${todoItem}%';`)
    return deltodoItem
  }catch(e){
    console.error(e)
  }
}

module.exports = app.callback()