

module.exports.similarity = function similarity(str1, str2){
    //计算两个字符串的长度。  
    let len1 = str1.length;  
    let len2 = str2.length;  
    //建立数组，比字符长度大一个空间  
    let dif = [];  
    //赋初值，步骤B。  
    for (let a = 0; a <= len1; a++) {  
        dif[a] = [];
        dif[a][0] = a;  
    }  
    for (let a = 0; a <= len2; a++) {  
        dif[0][a] = a;  
    }  
    
    //计算两个字符是否一样，计算左上的值  
    let temp;  
    for (let i = 1; i <= len1; i++) {  
        for (let j = 1; j <= len2; j++) {  
            if (str1[i - 1] == str2[j - 1]) {  
                temp = 0;  
            } else {  
                temp = 1;  
            }  
            //取三个值中最小的  
            dif[i][j] = Math.min(dif[i - 1][j - 1] + temp, dif[i][j - 1] + 1,  
                    dif[i - 1][j] + 1);  
        }  
    }  
    return 1 - dif[len1][len2] / Math.max(str1.length, str2.length);
}