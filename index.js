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

let createTimeInEvent = function(record, dateTime) {
    let [date, time] = dateTime.split(' ')
    let timeInEvent = {}
    timeInEvent = {
        type:   'TimeIn',
        hour:   parseInt(time),
        date:   date
    }
    record.timeInEvents.push(timeInEvent)
    return record
}

let createTimeOutEvent = function(record, dateTime) {
    let [date, time] = dateTime.split(' ')
    let timeOutEvent = {}
    timeOutEvent = {
        type:   'TimeOut',
        hour:   parseInt(time),
        date:   date
    }
    record.timeOutEvents.push(timeOutEvent)
    return record
}

let hoursWorkedOnDate = function(record, date) {
    let timeInEvent = record.timeInEvents.find(function(event) {
        return event.date === date
    })
    let timeOutEvent = record.timeOutEvents.find(function(event) {
        return event.date === date
    })
    let hoursWorked = Math.abs(timeOutEvent.hour - timeInEvent.hour)/100
    return hoursWorked
}

let wagesEarnedOnDate = function(record, date) {
    let payRate = record.payPerHour
    let hoursWorked = hoursWorkedOnDate(record, date)
    let payOwed = payRate * hoursWorked
    return payOwed
}

let allWagesFor = function(record) {
    let datesWorked = record.timeInEvents.map(event => event.date)
    return datesWorked.reduce((payOwed, date) => {
        return payOwed += wagesEarnedOnDate(record, date)
    }, 0)
}

let findEmployeeByFirstName = function(records, fname) {
    return records.find(function(employee){
        return fname === employee.firstName
    })
}

let calculatePayroll = function(records) {
    return records.reduce((payroll, employee) => {
        return payroll += allWagesFor(employee)
    }, 0)
}