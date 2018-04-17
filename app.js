var question_fetcher = require("./question_fetcher/")

question_fetcher.get_question_text()
    .then(question => {
        console.log("== 问题 ==")
        console.log(question)
    })