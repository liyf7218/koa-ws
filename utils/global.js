/*
 * 全局函数和变量
 * 即绑定在 ctx.context 上的函数和变量
 */

// 检出对象上的有效属性
let getValidatedProps = (obj = {}) => {
    if (typeof(obj) != "object") {
        console.log("[global.getValidatedProps error] Got wrong param type, expect an object.")
    }

    let tempObj = {}
    for (let prop in obj) {
        if (prop == 'pageNumber' || prop == 'pageSize' || !obj[prop]) {
          continue;
        }
        tempObj[prop] = RegExp(obj[prop], 'i');
    }
    return tempObj;
}

// 类型判断
let checkType = function(str, type) {
    switch (type) {
        case 'email':
            return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
        case 'phone':
            return /^1[3-9][0-9]{9}$/.test(str);
        case 'tel':
        case 'telephone':
            return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
        case 'int':
        case 'integer':
        case 'positive_integer':
        	return /^[0-9]+$/.test(str);
        case 'number':
            return /^[0-9]+.?[0-9]*$/.test(str);
        case 'english':
            return /^[a-zA-Z]+$/.test(str);
        case 'text':
            return /^\w+$/.test(str);
        case 'chinese':
            return /^[\u4E00-\u9FA5]+$/.test(str);
        case 'lower':
            return /^[a-z]+$/.test(str);
        case 'upper':
            return /^[A-Z]+$/.test(str);
        default:
            return true;
    }
}

export default app => {
    app.context.getValidatedProps = getValidatedProps;
    app.context.checkType = checkType;
}
