//CREDIT: https://github.com/Senither/hypixel-skyblock-facade (Modified)
const { isUuid } = require('../../utils/uuid');
const { makeRequest, wrap } = require('../../utils/request');
const { parseHypixel, parseProfile } = require('../../utils/hypixel');

module.exports = wrap(async function (req, res) {
    const profileid = req.params.profileid;
    let uuid = req.params.uuid;
    if (!isUuid(uuid)) {
        const mojang_response = await makeRequest(res, `https://api.ashcon.app/mojang/v2/user/${uuid}`);
        if (mojang_response?.data?.uuid) {
            uuid = mojang_response.data.uuid.replace(/-/g, '');
        }
    }

    const playerRes = await makeRequest(res, `https://api.hypixel.net/player?key=${req.query.key?.toString()}&uuid=${uuid}`);
    const player = parseHypixel(playerRes, uuid, res);

    const profileRes = await makeRequest(res, `https://api.hypixel.net/skyblock/profiles?key=${req.query.key?.toString()}&uuid=${uuid}`);
    const profile = await parseProfile(player, profileRes, uuid, profileid, res);

    return res.status(200).json({ status: 200, data: profile });
});
