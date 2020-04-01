const modelPermissions = require('../models/Permissions');
const Employee = require('../controllers/EmployeeController');

const addNewPermissionRow = (request, response, next) => {
    const bodyReq = { ...request.body }

    modelPermissions.add(bodyReq.idEmployee, bodyReq.manageScholarship, bodyReq.manageScheduleScholarship, bodyReq.manageEmployee,
          bodyReq.validateSchedules, bodyReq.confirmVisits,  bodyReq.generateReport,  bodyReq.insertActivity,  
          bodyReq.registerAttraction, next)
}

module.exports = { addNewPermissionRow }