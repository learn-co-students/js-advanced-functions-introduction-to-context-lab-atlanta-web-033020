// Your code here
function createEmployeeRecord(arr) {
  return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(arr) {
  return arr.map(element => createEmployeeRecord(element));
}

function createTimeInEvent(record, time) {
  const timeInObject = {};
  timeInObject.type = "TimeIn";
  timeInObject.date = time.split(' ')[0];
  timeInObject.hour = parseInt(time.split(' ')[1]);

  record.timeInEvents.push(timeInObject);
  return record;
}

function createTimeOutEvent(record, time) {
  const timeOutObject = {};
  timeOutObject.type = "TimeOut";
  timeOutObject.date = time.split(' ')[0];
  timeOutObject.hour = parseInt(time.split(' ')[1]);

  record.timeOutEvents.push(timeOutObject);
  return record;
}

function hoursWorkedOnDate(record, date) {
  const timeInObject = record.timeInEvents.find(event => event.date === date)
  const timeOutObject = record.timeOutEvents.find(event => event.date === date)

  return (timeOutObject.hour - timeInObject.hour) / 100;
}

function wagesEarnedOnDate(record, date) {
  return (hoursWorkedOnDate(record, date) * record.payPerHour);
}

function allWagesFor(record) {
  return record.timeInEvents.reduce((total, event) => total + wagesEarnedOnDate(record, event.date), 0);
}

function calculatePayroll(employees) {
  return employees.reduce((total, employee) => total + allWagesFor(employee), 0);
}

function findEmployeeByFirstName(employees, name) {
  return employees.find(employee => employee.firstName === name);
}