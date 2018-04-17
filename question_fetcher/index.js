var adb = require("./adb")
var img = require("./img")
var ocr = require("./ocr")

function get_question_text () {
    // 截图
    console.log("正在截图...")
    adb.cap_question_screeshot()
    console.log("ok...")
    
    console.log("正在拉取...")
    // 拉取到电脑
    adb.pull_screenshot()
    console.log("ok...")
    
    console.log("正在切图...")
    img.cut_screenshot()
    console.log("ok...")
    console.log("\n正在思考...等我一会..")    
    // 识别截图
    return ocr.get_question()
    
}

module.exports = {
    get_question_text
}