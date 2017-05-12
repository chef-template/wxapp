let we = require('./we/index.js')

if(!Function.prototype.bind){
    Function.prototype.bind = function(context, ...args){
        if(typeof this != 'function'){
            throw new Error('invalid function use bind')
        }
        
        return (...a) => {
            return this.apply(context, [...args, ...a])
        }
    }
}


new class extends we.App {
    onLaunch() {}
}