var images = require("images")

const TEXT_AREA_HIGHT_PRECEBT = 0.3
const TEXT_AREA_TOP_PRECEBT = 0.25
const QUESTION_SCREENSHOT_FILENAME = 'screen.png'
const QUESTION_SAVE_FILENAME = 'question.png'


/**
 * 裁剪图片
 */
function cut_screenshot () {
    let base_img = images(QUESTION_SCREENSHOT_FILENAME)

    let margin_top = base_img.height() * TEXT_AREA_TOP_PRECEBT
    let width = base_img.width()
    let height = base_img.height() * TEXT_AREA_HIGHT_PRECEBT
    images(base_img, 0, margin_top, width, height)
        .save(QUESTION_SAVE_FILENAME)
}

module.exports = {
    cut_screenshot
}