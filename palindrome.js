var btnCheck=document.querySelector('#result-btn');
var birthdayToCheck=document.querySelector('#birth-date');
var resultContent=document.querySelector('#result');
btnCheck.addEventListener('click',function displayStatement(){
    
    var birthdayBreakArray=birthdayToCheck.value.split('-');
    var dateObj={
        day:birthdayBreakArray[2],
        month:birthdayBreakArray[1],
        year:birthdayBreakArray[0]
    };
    var isPalindrome=checkPalindromeForAllDateFormats(dateObj);
    if(birthdayToCheck.value==='') resultContent.innerText="Please Enter a value"
    else if(isPalindrome){
        resultContent.innerText="Yay! Your birthday is palindrome!"
    }
    else{
        var getNextPal=getNextPalindromeDate(dateObj);
        var palDate=convertDateToString(getNextPal[1]);
        var dateFormat=palDate.day+'-'+palDate.month+'-'+palDate.year;
        resultContent.innerText=`The nearest palindrome date is ${dateFormat}, you missed by ${getNextPal[0]} days.`
        // console.log(palDate);
    }
});

function reverseStr(str){
    return str.split('').reverse().join('');
}

function isPalindrome(str){
    if(reverseStr(str)===str){
        return true;
    }
    return false;
}

function convertDateToString(date){
    // console.log(date);
    var dateStr={
        day:'',
        month:'',
        year:''
    }
    if(date.day<10){
        if(date.day[0]!=='0'){
            dateStr.day='0'+date.day;
        }
        else{
            dateStr.day=date.day.toString();
        }
    }
    else{
        dateStr.day=date.day.toString();
    }
    if(date.month<10){
        if(date.month[0]!=='0'){
            dateStr.month='0'+date.month;
        }
        else{
            dateStr.month=date.month.toString();
        } 
    }
    else{
        dateStr.month=date.month.toString();
    }
    
   
    dateStr.year=date.year.toString();

    return dateStr;
}

function getAllDateFormats(date){

    // var dateStr=convertDateToString(date);

    var ddmmyyyy=date.day+date.month+date.year;
    var mmddyyyy=date.month+date.day+date.year;
    var yyyymmdd=date.year+date.month+date.day;
    var ddmmyy=date.day+date.month+date.year.slice(-2);
    var mmddyy=date.day+date.month+date.year.slice(-2);
    var yymmdd=date.year.slice(-2)+date.month+date.day;

    return [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd];
}

function checkPalindromeForAllDateFormats(date){
    var listOfDates=getAllDateFormats(date);
    // console.log(listOfDates);
    var flag=false;
    for(var i=0;i<listOfDates.length;i++){
        if(isPalindrome(listOfDates[i])){
            flag=true;
            break;
        }
    }
    return flag;
}

function getNextPalindromeDate(date){
    var ctr=0;
    var nextDate=getNextDate(date);
    while(1){
        ctr++;
        var dateStr=convertDateToString(nextDate);
        // console.log(dateStr);
        var isPalindrome=checkPalindromeForAllDateFormats(dateStr);
        // console.log(isPalindrome);
        if(isPalindrome) break;
        nextDate=getNextDate(nextDate);
    }
    return [ctr,nextDate];
}

function getNextDate(date){
    // console.log(date);
    var day=Number(date.day)+1;
    // console.log(day);
    var month=date.month;
    var year=date.year;
    var daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31];
    if(month==2){
        if(isLeapYear(year)){
            if(day>29){
                day=1;
                month++;
            }
        }
        else {
            if (day > 28) {
              day = 1;
              month = 3;
            }
           
        }
    }
    else{
        if(day>daysInMonth[month-1]){
            // console.log("here");
            day=1;
            month++;
        }
    }
    if(month>12){
        month=1;
        year++;
    }
    return {
        day:day,
        month:month,
        year:year
    }

}


function isLeapYear(year){
    if(year%400===0){
        return true;
    }
    if(year%100===0) return false;
    if(year%4===0) return true;

    return false;
}

// var date={
//     day:28,
//     month:2,
//     year:2021
// };

// console.log(getNextPalindromeDate(date));