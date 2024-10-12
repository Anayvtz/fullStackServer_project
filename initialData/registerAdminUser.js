const fs = require('fs');
const { validateUserRegistration } = require('../validation/userValidationService');
const { handleError } = require('../utils/handleErrors');
const { registerUser } = require('../dataAccess/usersDataAccessService');

const registerAdminUser = async () => {
    try {
        const data = fs.readFileSync('./initialData/adminUser.json', 'utf8');
        const adminUserInfo = JSON.parse(data);

        const error = validateUserRegistration(adminUserInfo);
        if (error) { console.log(`registerAdminUser: Joi Error: ${error}`); return; }

        let admin = await registerUser(adminUserInfo);
    } catch (error) {
        console.log('registerAdminUser: ' + error.message);
    }
}

module.exports = registerAdminUser;