var images = require('images');
const getPixels = require('get-pixels');
const fs = require('fs');
const TEXT_AREA_HIGHT_PRECEBT = 0.3;
const TEXT_AREA_TOP_PRECEBT = 0.25;
const QUESTION_SCREENSHOT_FILENAME = 'screen.png';
const QUESTION_SAVE_FILENAME = 'question.png';

let lines = [];
let top;
let width;

async function calculate() {
    return new Promise((resolve, reject) => {
        getPixels(QUESTION_SCREENSHOT_FILENAME, function(err, pixels) {
            if (err) {
                reject(err);
                return;
            }
            lines = [];
            top = pixels.shape[1] * TEXT_AREA_TOP_PRECEBT;
            let count = 0;
            for (let j = top + 100; j < pixels.shape[1]; j++) {
                for (let i = 0; i < pixels.shape[0] - 1; i++) {
                    if (pixels.get(i, j, 0) >= 230) {
                        continue;
                    }
                    if (
                        pixels.get(i, j, 0) == pixels.get(i + 1, j, 0) &&
                        pixels.get(i, j, 1) == pixels.get(i + 1, j, 1) &&
                        pixels.get(i, j, 2) == pixels.get(i + 1, j, 2)
                    ) {
                        count++;
                        if (count >= 200) {
                            lines.push(j - top);
                            count = 0;
                            j += 20;
                            break;
                        }
                    } else {
                        count = 0;
                    }
                }
                if (lines.length == 5) {
                    break;
                }
            }
            width = pixels.shape[0];
            let height = pixels.shape[1];
            const x = width / 8;
            resolve({
                A: {
                    x: x,
                    y: (lines[1] - lines[0]) / 2 + lines[0] + top
                },
                B: {
                    x: x,
                    y: (lines[2] - lines[1]) / 2 + lines[1] + top
                },
                C: {
                    x: x,
                    y: (lines[3] - lines[2]) / 2 + lines[2] + top
                },
                D: {
                    x: x,
                    y: (lines[4] - lines[3]) / 2 + lines[3] + top
                },
                next: {
                    x: width / 9 * 7 + width / 9 / 2,
                    y: height / 13 * 12 + height / 13 / 2
                }
            });
        });
    });
}

/**
 * 裁剪图片
 */
function cut_screenshot() {
    let base_img = images(QUESTION_SCREENSHOT_FILENAME);
    images(base_img, 0, top, width, lines[0]).save(QUESTION_SAVE_FILENAME);
}

module.exports = {
    cut_screenshot,
    calculate
};
