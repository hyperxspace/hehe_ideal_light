const Data = require('./data');
const Util = require('./util');
const data = Data.loadData();
module.exports.find = function find(title, type) {
    let d;
    if (type == 0) {
        d = data.one;
    } else {
        d = data.more;
    }
    if (d[title] == null) {
        let max = 0;
        let a;
        for (t in d) {
            let s = Util.similarity(title, t);
            if (s > max) {
                max = s;
                a = d[t];
            }
        }
        return a.answer;
    } else {
        return d[title].answer;
    }
};

module.exports.pretty = function(data) {
    return data.replace(
        /\s+|['(',')','，','！','。','、',',','“','”','（','）','：','〇','o','O','】']+/g,
        ''
    );
};
