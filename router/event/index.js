import Router from 'koa-router'
let router = new Router()

router
// 查询功能
	// body: Object
	// return: Object
	.post('/event/list', async(ctx, next) => {
		let queryBody = ctx.getValidatedProps(ctx.request.body)
		console.log('/event/list.queryBody', queryBody)
		ctx.body = await ctx.db.event.find(queryBody)
	})
	// id/_id: [String, Number]
	// return: Object 
	.post('/event/get', async(ctx, next) => {
		let id = ctx.request.body._id || ctx.request.body.id
		console.log('/event/get.id', id)
		ctx.body = await ctx.db.event.findById(id)
	})
// 新增/插入功能
	// payload: [Array(Object),Object]
	// return: payload
	.post('/event/add', async(ctx, next) => {
		let { payload } = ctx.request.body;
		console.log('/event/add.payload', payload)
		// 上传数据,统一用JSON
		let data = JSON.parse(payload);
		ctx.body = await ctx.db.event.create(data)
	})
// 修改/更新 功能
	// payload: [Array(Object),Object]
	// return: payload
	// About findByIdAndUpdate, see [https://cn.mongoosedoc.top/docs/api.html#findbyidandupdate_findByIdAndUpdate]
	.post('/event/update', async (ctx, next) => {
		let payload = JSON.parse(ctx.request.body.payload);
		console.log('/event/update', payload)
		if(!(payload instanceof Array)){
			payload = [payload];
		}
		ctx.body = [];
		// 下面这个循环操作,用 Array.map/forEach ... 是不能将返回值赋给 ctx.body 的.
		// 很难受,还是原始的办法比较靠谱
		for(let index = 0; index < payload.length; index++){
			let id = payload[index]._id || payload[index].id
			ctx.body.push( await ctx.db.event.findByIdAndUpdate(id, { $set: payload[index] }, { new: true, upsert: true }) )
		}
	})
// 删除 功能
	// ids: [String, Array(String)]
	// return: Array(Object)
	.post('/event/delete', async (ctx, next) => {
		console.log(ctx.request.body)
		let { ids } = ctx.request.body
		if(!(ids instanceof Array)){
			ids = ids.split(',').map(ele => ele.trim())
		}
		ctx.body = []
		for (let i = 0; i < ids.length; i++) {
			ctx.body.push( await ctx.db.event.findByIdAndRemove(ids[i]) );
		}
		console.log(ctx.body)
	})

module.exports = router;
export default router;