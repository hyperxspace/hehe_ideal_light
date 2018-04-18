const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');
let one = path.join(__dirname, 'one.xls');
let more = path.join(__dirname, 'more.xls');

let oneSheet = xlsx.utils.sheet_to_json(xlsx.readFile(one).Sheets['sheet1']);
let moreSheet = xlsx.utils.sheet_to_json(xlsx.readFile(more).Sheets['sheet1']);
let oneQuestions = {};
for (let i = 0; i < oneSheet.length; i++) {
    let title = oneSheet[i]['题干'].replace(
        /\s+|['(',')','，','！','。','、',',','“','”','（','）','：']+/g,
        ''
    );
    oneQuestions[title] = {
        A: oneSheet[i]['A'],
        B: oneSheet[i]['B'],
        C: oneSheet[i]['C'],
        D: oneSheet[i]['D'],
        answer: [oneSheet[i]['答案'].replace(/\s+/g,'') + ' : ' + oneSheet[i][oneSheet[i]['答案']]]
    };
}
let moreQuestions = {};
for (let i = 0; i < moreSheet.length; i++) {
    let title = moreSheet[i]['题干'].replace(
        /\s+|['(',')','，','！','。','、',',','“','”','（','）','：']+/g,
        ''
    );
    let answer = moreSheet[i]['答案'].replace(/\s+/g,'');
    let answerArray = [];
    for (let j = 0; j < answer.length; j++) {
        answerArray[j] = answer[j] + ' : ' + moreSheet[i][answer[j]];
    }
    moreQuestions[title] = {
        A: moreSheet[i]['A'],
        B: moreSheet[i]['B'],
        C: moreSheet[i]['C'],
        D: moreSheet[i]['D'],
        answer: answerArray
    };
}

module.exports.initData = function() {
    fs.writeFile('one.json', JSON.stringify(oneQuestions), function() {
        console.log('one.json 写入成功');
    });
    fs.writeFile('more.json', JSON.stringify(moreQuestions), function() {
        console.log('more.json 写入成功');
    });
};

module.exports.loadData = function() {
    let data = {};
    data.one = oneQuestions;
    data.more = moreQuestions;
    return data;
};
