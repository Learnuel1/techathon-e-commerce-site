exports.buildResponse = (msg, data, field = "data", others = {})=>{
    return{
        msg,
        [field]:data,
        ...others
    }
}

exports.buildUser = (userObject)=>{
    const {password, __v, refreshToken, address, ...data} = userObject
    return data
}