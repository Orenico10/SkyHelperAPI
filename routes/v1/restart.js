const { makeRequest, wrap } = require('../../utils/request');

module.exports = wrap(async function (req, res) {
    const key = req.query.key?.toString()
    if (process.env.TOKENS.includes(key)) {
        res.status(200).json({ status: 200, reason: "Success, restarted." });
        return process.exit(0)
    }
    res.status(400).json({ status: 400, reason: "Unauthorized, invalid API key." });
});
