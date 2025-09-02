export const sendResponse =(res, data )=>{
    return res.status(data.statusCode).json({
        success : data.success,
        message : data.message,
        data : data.data,
        meta : data.meta
    })
}