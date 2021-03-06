/*
* author : Jian-Kai Wang (http://jiankaiwang.no-ip.biz)
* project : seed 2016
* github : https://github.com/jiankaiwang/seed
*/

var getDictionaryLength = function(getDictObj) {
        var dictLength = 0;
        for (var key in getDictObj) {
                        if (getDictObj.hasOwnProperty(key)) {
                                        dictLength += 1;
                        }
        }
        return dictLength;
}

var getDictionaryKeyList = function(getDictObj) {
        var keyList = [];
        for(var key in getDictObj) {
                keyList.push(key);
        }
        return keyList;
}

var getDictionaryValueList = function(getDictObj) {
        var valueList = [];
        for(var key in getDictObj) {
                valueList.push(getDictObj[key]);
        }
        return valueList;
}

var dictBubbleSortOnValue = function(getDictObj) {
        var retKeyList = getDictionaryKeyList(getDictObj);
        var tmpKey = "";
        // sort body
        for(var i = 0 ; i < retKeyList.length-1 ; i ++) {
                for(var j = 0 ; j < retKeyList.length-1-i ; j++) {
                        if(parseFloat(getDictObj[retKeyList[j]]) > parseFloat(getDictObj[retKeyList[j+1]])) {
                                tmpKey = retKeyList[j];
                                retKeyList[j] = retKeyList[j+1];
                                retKeyList[j+1] = tmpKey;
                        }
                }
        }
        return retKeyList;
}

/*
 * desc : sort keys in dictionary by their values
 * para :
 *      1. getDictObj : { key : value }
 *      2. sortType : "bubble"(default)
 *      3. getOrder : desc, asc(default)
 *      4. getListCount : 0-N
 * example :
 *      var aa = { 'a' : 10, 'b' : 3, "c" : 5 }
 *  var keyList = getKeyBySortOnValue(aa, "bubble", "desc", getDictionaryLength(aa));
*/
var getKeyBySortOnValue = function(getDictObj, sortType, getOrder, getListCount) {
        var retKeyList = getDictionaryKeyList(getDictObj);
        switch(sortType) {
                default:
                case "bubble":
                        retKeyList = dictBubbleSortOnValue(getDictObj);
                        break;
        }
        // getOrder : desc, asc
        var tmpKeyList = [];
        switch(getOrder) {
                case "desc":
                        for(var i = retKeyList.length-1 ; i >= 0 ; i--) {
                                tmpKeyList.push(retKeyList[i]);
                        }
                        retKeyList = tmpKeyList;
                        break;
        }
        // return as desired number
        tmpKeyList = [];
        var keyLength = getListCount > getDictionaryLength(getDictObj) ? getDictionaryLength(getDictObj) : getListCount;
        for(var i = 0 ; i < keyLength ; i++) {
                        tmpKeyList.push(retKeyList[i]);
        }
        retKeyList = tmpKeyList;
        return retKeyList;
}


