let Manager = require('../models/managerModel');

async function createManager(req, UserId)
{
    await Manager.create({
        UserId: UserId,
        TravelName: req.body.TravelName,
        BookableCount: req.body.BookableCount
    });   
}

async function getManager(UserId)
{
    let result = await Manager.findOne({
        where:
        {
            UserId: UserId
        }
    });
    return result;
}

module.exports = {createManager, getManager};