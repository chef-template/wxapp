module.export = function(Klass, ...args){
    Object.assign(Klass.prototype, ...args)
    return Klass
}