const fs = require('fs');
const moment = require('moment');
moment().format();

const setupOutputByEmployee = (employees) => {
  return employees.map((employee) => {
    return {
      employee_id: employee.id,
      first_name: employee.first_name,
      last_name: employee.last_name,
      labour: []
    }
  });
}


const calculateTimePeriods = (startTime, endTime) => {
  const periods = [moment.duration(0), moment.duration(0), moment.duration(0), moment.duration(0)];

  let time = startTime;
  while (time.isBefore(endTime)) {
    if (time.hour() >= 5 && time.hour() < 12) {
      periods[0].add(1, 'seconds');
    }
    if (time.hour() >= 12 && time.hour() < 18) {
      periods[1].add(1, 'seconds');
    }
    if (time.hour() >= 18 && time.hour() < 23) {
      periods[2].add(1, 'seconds');
    }
    if (time.hour() >= 23 || time.hour() < 5) {
      periods[3].add(1, 'seconds');
    }
    time.add(1, 'seconds');
  }

  const formattedPeriods = periods.map((period) => {
    return Math.round(period.valueOf()/3600000 * 100) / 100;
  });
  return formattedPeriods;
}

const createLabourObjects = (outputArray, clocksArray) => {

  for (let shift of clocksArray) {
    let clock_in = moment(shift.clock_in_datetime);
    let clock_out = moment(shift.clock_out_datetime);
    const dateString = moment(clock_in).format('YY-MM-DD');
    const total = Math.round((clock_out - clock_in)/3600000 * 100) / 100;

    const periods = calculateTimePeriods(clock_in, clock_out);

    for (let employee of outputArray) {
      if (shift.employee_id === employee.employee_id) {
        employee.labour.push({
          date: dateString,
          total: total,
          labour_by_time_period: {
            period1: periods[0],
            period2: periods[1],
            period3: periods[2],
            period4: periods[3]
          }
        });
      }
    }
  }
}

const writeOutput = (filename, outputArray) => {
  fs.writeFile(filename, JSON.stringify(outputArray, null, 2), (err) => {
    if (err) throw err;
    console.log('It\'s saved!');
  });
}


// Run functions

const employeeFile = JSON.parse(fs.readFileSync('./apertureLabsClocks.json'));

const employeesArray = employeeFile.employees;
const clocksArray = employeeFile.clocks;

const outputArray = setupOutputByEmployee(employeesArray);

createLabourObjects(outputArray, clocksArray);

writeOutput('./labour_hours.json', outputArray);
