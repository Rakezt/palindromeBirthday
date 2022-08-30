function reverseStr(str) {
    return str.split("").reverse().join("")
}

function isPalindrome(str) {
    var reverse = reverseStr(str)
    return reverse === str;
}

function convertDatetoStr(date) {
    var dateStr = {
        day: " ",
        month: " ",
        year: " "
    };
    if (date.day < 10) {
        dateStr.day = "0" + date.day;
    } else {
        dateStr.day = date.day.toString();
    }
    if (date.month < 10) {
        dateStr.month = "0" + date.month;
    } else {
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();
    return dateStr;
}

function getAllDateFormat(date) {
    var dateString = convertDatetoStr(date)

    var ddmmyyyy = dateString.day + dateString.month + dateString.year;
    var mmddyyyy = dateString.month + dateString.day + dateString.year;
    var yyyymmdd = dateString.year + dateString.month + dateString.day;
    var ddmmyy = dateString.day + dateString.month + dateString.year.slice(-2);
    var mmddyy = dateString.month + dateString.day + dateString.year.slice(-2);
    var yymmdd = dateString.year.slice(-2) + dateString.month + dateString.day;
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd]
}

function checkPalindromeAllDateformats(date) {
    var listOfDates = getAllDateFormat(date)
    var flag = false;
    for (var i = 0; i < listOfDates.length; i++) {
        if (isPalindrome(listOfDates[i])) {
            flag = true;
            break;
        }
    }
    return flag;
}

function isLeapYear(year) {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false;
    }
    if (year % 4 === 0) {
        return true;
    }
    return false;
}
function getNextDate(date){
    var day=date.day+1;
    var month=date.month;
    var year= date.year;
    var dayInMonth=[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if(month===2){
        if (isLeapYear(year)){
            if (day>29){
                day=1; month++;
            }
        } else {
            if (day>28){
                day=1; month++;
            }
        }
    } else{
        if (day>dayInMonth[month-1]){
            day=1; month++;
        }
    }
    if (month>12){
        month=1; year++
    }
    return {
        day: day, month:month, year: year
    };
}
function getNextPalindrome(date){
    var counter=0;
    var nextDate=getNextDate(date);

    while(1){
        counter++;
        var isPalindrome=checkPalindromeAllDateformats(nextDate);
        if (isPalindrome){
            break;
        }
        nextDate=getNextDate(nextDate)
    }
    return [counter, nextDate]
}


var inputDate=document.querySelector(".input-date");
var calculateButton=document.querySelector(".calculate-btn")
var output=document.querySelector("#output")

calculateButton.addEventListener("click", clickHandler)

function clickHandler(){
    var bdayStr=inputDate.value;
    if(bdayStr===""){output.innerText="🤢🤢Date can't be empty"}
   if (bdayStr!=""){
        var listOfDate=bdayStr.split("-");
       var date={
        day: Number(listOfDate[2]),
        month: Number(listOfDate[1]),
        year: Number(listOfDate[0])
       };
       var isPalindrome=checkPalindromeAllDateformats(date);
       if (isPalindrome){
        output.innerText="Yes, your birthday is palindrome 😄😄"
       } else {
        var [counter, nextDate]=getNextPalindrome(date);
        output.innerText="😭 😭 The next palindrome is on "+nextDate.day+"-"+nextDate.month+"-"+nextDate.year+" and its after "+counter+" days"
       }   
    }
}