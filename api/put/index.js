const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const pool = require('../../dbconfig/dbconfig')

const app = new Koa()
app.use(bodyParser())

app.use(async ctx => {
  const updatedata = await ctx.request.body
  await updatePost(updatedata.todoItem, updatedata.todoDateAdded, updatedata.todoStatus, updatedata.todoDueBy)

  ctx.body = { "todoItems": `${updatedata.todoItem}`, "todoDateAddeds": `${updatedata.todoDateAdded}`, "todoStatuss": `${updatedata.todoStatus}`, "todoDueBys": `${updatedata.todoDueBy}`}
})

async function updatePost(todoItem, todoDateAdded, todoStatus, todoDueBy) {
  try {
    const updatetodoItem = await pool.query(`UPDATE Todotable SET todoDateAdded = '${todoDateAdded}', todoDateStatus = ${todoStatus}, todoDueBy = '${todoDueBy}' WHERE todoItem LIKE '%${todoItem}%';`)
    return updatetodoItem
  }catch(e){
    console.error(e)
  }
}

module.exports = app.callback()