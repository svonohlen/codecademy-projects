

const checkMillionDollarIdea = (req, res, next) => {
    if (req.body.numWeeks * req.body.weeklyRevenue >= 1000000) {
        next()
    } else {
        res.status(400).send('less than 1mio');
    }
};


// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;

