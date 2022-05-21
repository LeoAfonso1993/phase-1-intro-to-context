// Your code here
function createEmployeeRecord(array){
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents:[]
    }

}

function createEmployeeRecords(array){
    let newArray = array.map((item) => (createEmployeeRecord(item)))
    return newArray
}

function createTimeInEvent(obj, timeStamp) {
    let h = parseInt(timeStamp.slice(-4), 10)
    let d = timeStamp.split(' ')[0]

    obj.timeInEvents.push({
        type: "TimeIn",
        hour: h,
        date: d,
    })
    return obj
}

function createTimeOutEvent(obj, timeStamp) {
    let h = parseInt(timeStamp.slice(-4), 10)
    let d = timeStamp.split(' ')[0]

    obj.timeOutEvents.push({
        type: "TimeOut",
        hour: h,
        date: d,
    })
    return obj
}

function hoursWorkedOnDate(obj, day) {
    let timeIn = obj.timeInEvents.find((el) => el.date === day).hour
    let timeOut = obj.timeOutEvents.find((el) => el.date === day).hour
    return parseInt((timeOut - timeIn) / 100)
}

function wagesEarnedOnDate(object, date) {
    let hoursWorked = hoursWorkedOnDate(object, date)
    let pay = object.payPerHour
    return hoursWorked * pay
}

function allWagesFor(obj) {
    let getDates = obj.timeOutEvents.map((el) => el.date)
    let getHours = getDates.map((date) => wagesEarnedOnDate(obj, date))

    const sum = (a, b) => a + b
    let total = getHours.reduce(sum)
    return total
}

function calculatePayroll(array) {
    let totalWages = 0
    array.forEach(element => {
        totalWages += allWagesFor(element)        
    });
    return totalWages
}
