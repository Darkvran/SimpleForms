const app = require("./app"); 
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send(__dirname + "public/index.html")
})


app.listen(port, () => console.log (`Сервер запущен на ${port}`));
