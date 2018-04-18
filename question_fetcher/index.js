var adb = require('./adb');
var img = require('./img');
var ocr = require('./ocr');

async function get_question_text() {
    // 截图
    console.log('正在截图...');
    adb.cap_question_screeshot();
    console.log('ok...');

    console.log('正在拉取...');
    // 拉取到电脑
    adb.pull_screenshot();
    console.log('ok...');

    console.log('正在计算坐标...');
    const points = await img.calculate();
    console.log('ok...');

    console.log('正在切图...');
    img.cut_screenshot();
    console.log('ok...');
    console.log('\n正在思考...等我一会..');
    // 识别截图
    const question = await ocr.get_question();

    return Promise.resolve({
        points,
        question
    });
}

function autoTouch(point){
    adb.touch(point.x,point.y);
}

module.exports = {
    get_question_text,
    autoTouch
};
