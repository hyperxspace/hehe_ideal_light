var Tesseract = require("tesseract.js")

let tesseract = Tesseract.create({
    langPath: 'http://localhost:8080/langpath/',
    corePath: 'https://cdn.rawgit.com/naptha/tesseract.js-core/master/index.js'
})

const QUESTION_START_SIGN = '】'
const QUESTION_END_SIGN = 'A'
const QUESTION_FILENAME = 'question.png'
/**
 * 获取问题文字,返回一个Promise
 */
function get_question () {
    return new Promise(function (resolve, reject) {

        tesseract
            .recognize(QUESTION_FILENAME, {
                lang: 'chi_sim'
            })
            // .progress(function  (p) { console.log('progress', p)    })
            .then(result => {
                let statr_index = result.text.indexOf(QUESTION_START_SIGN)
                let end_index = result.text.indexOf(QUESTION_END_SIGN)
                let is_one_choice = (result.text.indexOf("单选题") != -1)
                let question_type = is_one_choice?0:1
                if (statr_index == -1 || end_index == -1) {
                    resolve({
                        text:result.text,question_type,
                        type:question_type
                    })
                    return
                }
                resolve({
                    text:result.text.substring(statr_index+1, end_index),
                    type:question_type
                })

            }).catch(err => {
                reject(err)
            })
    })

}

module.exports = {
    get_question
}
