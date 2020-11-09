let Customer = require('../models/customerModel');

async function createCustomer(req, UserId)
{
    await Customer.create({
        UserId : UserId, 
        DoB: req.body.DoB,
        Gender: req.body.Gender
    });
}

async function getCustomer(UserId)
{
    let result = await Customer.findOne({
        where:
        {
            UserId: UserId
        }
    });
    return result;
}

module.exports = {createCustomer, getCustomer};