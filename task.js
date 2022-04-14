module.exports = {
    arrayDiff: function(arg1, arg2) {
        for (var j = 0; j < arg1.length; j++) {
          for (var i = 0; i < arg2.length; i++) {
            if (arg1[j] == arg2[i]) {
              delete arg1[j];
            }
          }
        }
        return arg1.filter(Boolean);
    },

    indexEqualsValue: function (array){
        let answer = "(xxx) xxx-xxxx";
        
        for(i=0; i<array.length; i++){
            answer = answer.replace('x', array[i]);
        }
        
        return answer;
      }
};