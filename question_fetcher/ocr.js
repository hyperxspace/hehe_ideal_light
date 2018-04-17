var Tesseract = require("tesseract.js")

let tesseract = Tesseract.create({
    langPath: 'http://localhost:8080/langpath/',
    corePath:'https://cdn.rawgit.com/naptha/tesseract.js-core/master/index.js'
})

const QUESTION_START_SIGN = '】'
const QUESTION_END_SIGN = 'A'
const QUESTION_FILENAME = 'question.png'
/**
 * 获取问题文字,返回一个Promise
 */
function get_question(){
    return new Promise(function (resolve,reject){
        
    tesseract
        .recognize(QUESTION_FILENAME,{
            lang:'chi_sim'
        })
        // .progress(function  (p) { console.log('progress', p)    })
        .then(result=>{
            let statrIndex = result.text.indexOf(QUESTION_START_SIGN)
            let endIndex = result.text.indexOf(QUESTION_END_SIGN)
            if (statrIndex==-1||endIndex==-1){
                resolve(result.text)
                return
            }
            resolve(result.text.substring(statrIndex,endIndex))
            
        }).catch(err=>{
            reject(err)
        })
    })
        
}

module.exports= {
    get_question
}
