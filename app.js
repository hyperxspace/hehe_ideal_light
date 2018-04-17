var question_fetcher = require("./question_fetcher/")
var readlineSync = require('readline-sync');

const Koa = require('koa')
const KoaStatic = require('koa-static')
const Data = require('./data')
const app = new Koa()

app.use(KoaStatic("./static"))
app.listen(8080)

async function main () {
    while (true) {

        await question_fetcher
            .get_question_text()
            .then((question) => {
                console.log("== 问题 ==")
                let question_text_pretty = Data.pretty(question.text);
                console.log(question.type === 0 ? "【 单选题 】" : "【 多选题 】", question_text_pretty)
                console.log("== 答案 ==")
                console.log(Data.find(question_text_pretty, question.type));
            })

        readlineSync.question("press enter to contine ...")
    }
}

main()
