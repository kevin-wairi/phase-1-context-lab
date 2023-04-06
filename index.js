let employee = [firstname, familyname, title,payRatePerHour]
function createEmployeeRecord(array){
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(newArray){
    return newArray.map(e => createEmployeeRecord(e))
}

function createTimeInEvent(dateTime){
    let obj = {
        type: "TimeIn",
        hour: Number(dateTime.split(" ")[1]),
        date: dateTime.split(" ")[0]
    }
    this.timeInEvents.push(obj)
    return this
}

function createTimeOutEvent(dateTime){
    let obj = {
        type: "TimeOut",
        hour: Number(dateTime.split(" ")[1]),
        date: dateTime.split(" ")[0]
    }
    this.timeOutEvents.push(obj)
    return this
}

function hoursWorkedOnDate(date){
    let timeIn = this.timeInEvents.find(e => e.date === date).hour
    let timeOut = this.timeOutEvents.find(e => e.date === date).hour
    let hoursWorked = (timeOut - timeIn)/100
    return hoursWorked
}

function wagesEarnedOnDate(date){
    let payOwed = hoursWorkedOnDate.call(this, date) * this.payPerHour
    return payOwed
}

function allWagesFor(){
    let datesWorked = this.timeOutEvents.map(e => e.date)
    let wagesArr = datesWorked.map(e => wagesEarnedOnDate.call(this, e))
    let allPayOwed = wagesArr.reduce((memo, val) => memo + val, 0)
    return allPayOwed
}

function findEmployeeByFirstName(empArr, firstName){
    return empArr.find(e => e.firstName === firstName)
}

function calculatePayroll(empArr){
    let totalPayroll = empArr.map(e => allWagesFor.call(e)).reduce((memo, val) => memo + val, 0)
    return totalPayroll
}