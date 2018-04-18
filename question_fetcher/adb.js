var exec = require('child_process').execSync;

const CMD_CAP_SCREENSHOT = "adb shell screencap -p '/sdcard/screen.png'"
const CMD_PULL_SCREENSHOT = "adb pull '/sdcard/screen.png' './screen.png'"
const CMD_TOUCH = "adb shell input tap"
/**""
 * 进行截图
 * 保存到 /sdcard/screenshot.png
 */
function cap_question_screeshot () {
    exec(CMD_CAP_SCREENSHOT)
}

/**
 * 拉取问题截图
 * 保存到 ./screenshot.png
 */
function pull_screenshot(){
    exec(CMD_PULL_SCREENSHOT)
}

function touch(x,y){
    if(x == undefined || y == undefined){
        return;
    }
    exec(`${CMD_TOUCH} '${x}' '${y}'`)
}

module.exports={
    pull_screenshot,
    cap_question_screeshot,
    touch
}

