var question_fetcher = require('./question_fetcher/');
var readlineSync = require('readline-sync');

const Koa = require('koa');
const KoaStatic = require('koa-static');
const Data = require('./data');
const app = new Koa();

app.use(KoaStatic('./static'));
app.listen(8080);
let count = 0;
async function run() {
    return new Promise(async (resolve, reject) => {
        const data = await question_fetcher.get_question_text();
        count++;
        console.log("== 问题 ==")
        let question_text_pretty = Data.pretty(data.question.text);
        console.log(data.question.type === 0 ? "【 单选题 】" : "【 多选题 】", question_text_pretty)
        console.log("== 答案 ==")
        const answer = Data.find(question_text_pretty, data.question.type);
        console.log(answer);
        console.log("== 正在自动答题 ==")
        for(let i=0;i<answer.length;i++){
            const index = answer[i].split(':')[0].trim();
            question_fetcher.autoTouch(data.points[index]);
        }
        console.log("== 答题完成 ==")
        console.log("\n== 开始下一题 ==")
        if(data.question.type == 1){
            question_fetcher.autoTouch(data.points.next);
        }
        setTimeout(() => {
            resolve();
        }, 500);
    });
}

async function main() {
    while (true) {
        await run();
        if(count == 80){
            console.log("\n== 答题完成,Ctrl+C结束 ==")
            break;
        }
    }
}

main();
