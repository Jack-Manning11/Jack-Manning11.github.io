/**
 * Jack Manning
 * Problem 1.
 * Create JSON for each employee with the following details (first name, department, designation, salary, raise eligible)
 * Sam, Tech, Manager, 40000, true
 * Mary, Finance, Trainee, 18500, true
 * Bill, HR, Executive, 21200, false
 *
 * Print JSON(s) to console.
 **/


const test = {
  'listName' : [
    {
      'string' : 'firstName',
      'num': 0,
      'bool': false
    },
    {
      'string' : 'firstName',
      'num': 0,
      'bool': false
    }
  ]
}
















 let company1 = {
   "employeeList": [
     {
     "firstName": "Sam",
     "department": "Tech",
     "designation": "Manager",
     "salary": 40000,
     "raiseEligible": true
   },
   {
     "firstName": "Mary",
     "department": "Finance",
     "designation": "Trainee",
     "salary": 18500,
     "raiseEligible": true
   },
   {
     "firstName": "Bill",
     "department": "HR",
     "designation": "Executive",
     "salary": 21200,
     "raiseEligible": false
   }]
 }

console.log("Question 1:");
console.log(company1);

/**
 * Problem 2.
 *
 * Create JSON for the company with the following details (companyName, website, employees)
 * Tech Stars, www.techstars.site, array of Employees
 *
 * Print JSON to console.
 **/

 let company2 = {
   "companyName": "Tech Stars",
   "website": "www.techstars.site",
   "employeeList": [
     {
     "firstName": "Sam",
     "department": "Tech",
     "designation": "Manager",
     "salary": 40000,
     "raiseEligible": true
   },
   {
     "firstName": "Mary",
     "department": "Finance",
     "designation": "Trainee",
     "salary": 18500,
     "raiseEligible": true
   },
   {
     "firstName": "Bill",
     "department": "HR",
     "designation": "Executive",
     "salary": 21200,
     "raiseEligible": false
   }]
 }
 console.log("Question 2");
console.log(company2);

/**
 * Problem 3.
 *
 * A new employee has joined the company. Update the JSON from problems 1 and 2 to reflect the addition of:
 * Anna, Tech, Executive, 25600, false
 *
 * Write function to add a new employee
 *
 * Print updated JSON to console.
 **/

 let company3 = {
   "companyName": "Tech Stars",
   "website": "www.techstars.site",
   "employeeList": [
     {
     "firstName": "Sam",
     "department": "Tech",
     "designation": "Manager",
     "salary": 40000,
     "raiseEligible": true
   },
   {
     "firstName": "Mary",
     "department": "Finance",
     "designation": "Trainee",
     "salary": 18500,
     "raiseEligible": true
   },
   {
     "firstName": "Bill",
     "department": "HR",
     "designation": "Executive",
     "salary": 21200,
     "raiseEligible": false
   }]
 }

 function addEmployee(obj, name, dep, des, sal, raise) {
  let employee = {
    "firstName": name,
    "department": dep,
    "designation": des,
    "salary": sal,
    "raiseEligible": raise
  };
  obj['employeeList'].push(employee);
}
addEmployee(company3, "Anna", "Tech", "Executive", 25600, false);

console.log(company3);

/**
 * Problem 4.
 *
 * Given the JSON for the company, calculate the total salary for all company employees.
 *
 * Print total salary to console.
 **/

let salaryTotal = 0;
for(let i = 0; i < company3.employeeList.length; i++){
  salaryTotal += company3.employeeList[i]['salary'];
  //check raiseEligible
  //if(true) salary += salary*.1
}

console.log(salaryTotal);



for(let i = 0; i < company3.employeeList.length; i++){
  if(company3.employeeList[i]['raiseEligible']){
    company3.employeeList[i]['salary'] += company3.employeeList[i]['salary'] * .1;
    company3.employeeList[i]['raiseEligible'] = false;
  }
}

console.log("Question 5");
console.log(company3);



let arr = ['Anna', 'Sam'];
for(let i = 0; i < company3.employeeList.length; i++){
  for(let j = 0; j <arr.length; j++){
    if(company3.employeeList[i]['firstName'] == arr[j]){
      company3.employeeList[i]['wfh'] = true;
    } else {
      company3.employeeList[i]['wfh'] = false;
    }
  }
}

/**
 * Problem 5.
 *
 * It's raise time. If an employee is raise eligible, increase their salary by 10%.
 * Given the JSON of the company and its employees, write a function to update the salary
 * for each employee who is raised eligible, then set their eligibility to false.
 *
 * Print names of employees who got a raise to console, list original and new salary.
 **/

for(let i = 0; i < company3.employeeList.length; i++){
  if(company3.employeeList[i]['raiseEligible'] === true){
    company3.employeeList[i]['salary'] += company3.employeeList[i]['salary'] * .1;
    company3.employeeList[i]['raiseEligible'] = false;
  }
}
console.log(company3.employeeList);

/**
 * Problem 6.
 *
 * Some employees have decided to work from home. The following array indicates who is working from home.
 * Use the array to update the company JSON. For each employee, add another property called 'wfh' and set it to true or false
 *
 * Working from home: ['Anna', 'Sam']
 *
 * Print updated JSON to console.
 **/
let wfh = ['Anna', 'Sam'];
for(let i = 0; i < company3.employeeList.length; i++){
  let check = false;
  let name = company3.employeeList[i].firstName;
  console.log(check);
  for(let j = 0; j < wfh.length; j++){
    if(wfh[j] === name){
      check = true;
    }
  }
  if(check === true){
    company3['employeeList'][i].workFromHome = true;
  }
  else {
    company3['employeeList'][i].workFromHome = false;
    }
}
console.log(company3);
