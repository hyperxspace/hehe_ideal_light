var question_fetcher = require("./question_fetcher/")
var readlineSync = require('readline-sync');

const Koa = require('koa')
const KoaStatic = require('koa-static')
const app = new Koa()

app.use(KoaStatic("./static"))
app.listen(8080)

async function main(){
    while (true) {
        await question_fetcher
        .get_question_text()
        .then(question => {
            console.log("== 问题 ==")
            console.log(question)
        })

        readlineSync.question("press enter to contine ...")
    }
}

main()
