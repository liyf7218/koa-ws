import Router from 'koa-router'
let router = new Router()

router
// 查询功能
	// body: Object
	// return: Object
	.post('/person/list', async(ctx, next) => {
		let queryBody = ctx.getValidatedProps(ctx.request.body)
		console.log('/person/list.queryBody', queryBody)
		ctx.body = await ctx.db.person.find(queryBody)
	})
	// id/_id: [String, Number]
	// return: Object 
	.post('/person/get', async(ctx, next) => {
		let id = ctx.request.body._id || ctx.request.body.id
		console.log('/person/get.id', id)
		ctx.body = await ctx.db.person.findById(id)
	})
// 新增/插入功能
	// payload: [Array(Object),Object]
	// return: payload
	.post('/person/add', async(ctx, next) => {
		let { payload } = ctx.request.body;
		console.log('/person/add.payload', payload)
		// 上传数据,统一用JSON
		let data = JSON.parse(payload);
		ctx.body = await ctx.db.person.create(data)
	})
// 修改/更新 功能
	// payload: [Array(Object),Object]
	// return: payload
	// About findByIdAndUpdate, see [https://cn.mongoosedoc.top/docs/api.html#findbyidandupdate_findByIdAndUpdate]
	.post('/person/update', async (ctx, next) => {
		let payload = JSON.parse(ctx.request.body.payload);
		console.log('/person/update', payload)
		if(!(payload instanceof Array)){
			payload = [payload];
		}
		ctx.body = [];
		// 下面这个循环操作,用 Array.map/forEach ... 是不能将返回值赋给 ctx.body 的.
		// 很难受,还是原始的办法比较靠谱
		for(let index = 0; index < payload.length; index++){
			let id = payload[index]._id || payload[index].id
			ctx.body.push( await ctx.db.person.findByIdAndUpdate(id, { $set: payload[index] }, { new: true, upsert: true }) )
		}
	})
// 删除 功能
	// ids: [String, Array(String)]
	// return: Array(Object)
	.post('/person/delete', async (ctx, next) => {
		console.log(ctx.request.body)
		let { ids } = ctx.request.body
		if(!(ids instanceof Array)){
			ids = ids.split(',').map(ele => ele.trim())
		}
		ctx.body = []
		for (let i = 0; i < ids.length; i++) {
			ctx.body.push( await ctx.db.person.findByIdAndRemove(ids[i]) );
		}
		console.log(ctx.body)
	})

module.exports = router;
export default router;