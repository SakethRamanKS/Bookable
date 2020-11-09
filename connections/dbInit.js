var User = require('../models/userModel');
var Customer = require('../models/customerModel');
var Manager = require('../models/managerModel');

async function init()
{
    await User.sync();
    await Customer.sync();
    await Manager.sync();
}

init();