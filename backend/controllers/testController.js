const testController = (req, res)=>{
    res.status(200).send("<h1>MVC model</h1>");
}

module.exports = { testController}