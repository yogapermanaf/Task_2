const response = (status_code,data, message, res) => {
    res.status(status_code).json({
payload: {
    status_code: status_code,
    datas: data,
    message: message
},
pagination: {
    Prev: "",
    next: "",
    max: ""

}
    })
}
module.exports = response