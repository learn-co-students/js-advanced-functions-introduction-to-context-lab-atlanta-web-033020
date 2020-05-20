// Your code here
let createEmployeeRecord = (employee) => {
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(employeeRowData) {
    return employeeRowData.map((employee) => {
        return createEmployeeRecord(employee)
    })
}


let createTimeInEvent = (obj, timeStamp) => {
    let [date, hour] = timeStamp.split(' ')

    obj.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    })
    return obj
}
let createTimeOutEvent = (obj, timeStamp) => {
    let [date, hour] = timeStamp.split(' ')

    obj.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    })
    return obj
}

let hoursWorkedOnDate = (employee, date) => {
    let clockInTime = employee.timeInEvents.find((clockIn) => {
        return clockIn.date === date
    })

    let clockOutTime = employee.timeOutEvents.find((clockOut) => {
        return clockOut.date === date
    })
    let hoursWorked = (clockOutTime.hour - clockInTime.hour) / 100
    return hoursWorked

}

let wagesEarnedOnDate = (employee, date) => {
    return employee.payPerHour * hoursWorkedOnDate(employee, date)
}

let allWagesFor = (employee) => {
    let dates = employee.timeInEvents.map((event) => {
        return event.date
    })
    let total = 0

    dates.map((date) => {
        return total += wagesEarnedOnDate(employee, date)
    })
    return total
}

let findEmployeeByFirstName = (srcArray, firstName) => {
    return srcArray.find((employee) => {
        return employee.firstName === firstName
    })
}

let calculatePayroll = (array) => {
    return array.reduce((total, employee) => {
        return total += allWagesFor(employee)
    }, 0)
}