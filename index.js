// Your code here

let createEmployeeRecord = function (ary){
    return {
        firstName:      ary[0],
        familyName:     ary[1],
        title:          ary[2],
        payPerHour:     ary[3],
        timeInEvents:   [],
        timeOutEvents:  []
    }
}

let createEmployeeRecords = function(ary) {
    return ary.map(createEmployeeRecord)
}

let createTimeInEvent = function() {

}

let createTimeOutEvent = function() {

}