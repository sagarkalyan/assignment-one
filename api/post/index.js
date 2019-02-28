const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const pool = require('../../dbconfig/dbconfig')

const app = new Koa()
app.use(bodyParser())

app.use(async ctx => {
  const createdata = await ctx.request.body
  await createPost(createdata.todoItem, createdata.todoDateAdded, createdata.todoStatus, createdata.todoDueBy)

  ctx.body = { "todoItems": `${createdata.todoItem}`, "todoDateAddeds": `${createdata.todoDateAdded}`, "todoStatuss": `${createdata.todoStatus}`, "todoDueBys": `${createdata.todoDueBy}` }
})


async function createPost(todoItem, todoDateAdded, todoStatus, todoDueBy) {
  try {
    const createdtodoItem = await pool.query(`INSERT INTO Todotable (todoItem, todoDateAdded, todoStatus, todoDueBy) VALUES ('${todoItem}', '${todoDateAdded}', ${todoStatus}, '${todoDueBy}');`)
    return createdtodoItem
  }catch(e){
    console.error(e)
  }
}

module.exports = app.callback()