/*
* 此文件用于测试最新编写的接口
* 当接口测试完成,或可用时,将完成部分移动到对应文件中
*/

import Router from 'koa-router'
let router = new Router()

router
  .post('/find', async (ctx, next) => {
    let reqBody = ctx.getValidatedProps(ctx.request.body)
    console.log("reqBody: ", reqBody)
    ctx.body = await ctx.db.test.find(reqBody)
  })
  .post('/create', async (ctx, next) => {
    let reqBody = ctx.getValidatedProps(ctx.request.body)
    console.log("reqBody: ", reqBody)
    ctx.body = await ctx.db.test.create(reqBody)
  })
  .post('/remove', async (ctx, next) => {
    let conditions = ctx.getValidatedProps(ctx.request.body)
    console.log("conditions: ", conditions)
    ctx.body = await ctx.db.test.remove(conditions)
  })
  .post('/update', async (ctx, next) => {
    let reqBody = ctx.getValidatedProps(ctx.request.body)
    console.log("reqBody: ", reqBody)
    let conditions = { index: reqBody.index }
    let updates = {
      $set: reqBody
    }
    ctx.body = await ctx.db.test.update(conditions, updates)
  })

module.exports = router;
export default router;