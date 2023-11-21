const { decodeData } = require('../utils/nbt');
const getMissingTalismans = require('../constants/missing');
const { getPrices } = require('../data/refreshPrices');

function getPrice(name) {
    name = name.toLowerCase();
    return getPrices()[name] || null;
}

module.exports = async (profile) => {
    if (profile.inventory.bag_contents.talisman_bag?.data && profile.inventory.inv_contents?.data) {
        let talismans = (await decodeData(Buffer.from(profile.inventory.bag_contents.talisman_bag.data, 'base64'))).i;
        const inventory = (await decodeData(Buffer.from(profile.inventory.inv_contents.data, 'base64'))).i;
        talismans = talismans.concat(inventory);

        let talisman_ids = [];
        for (const talisman of talismans) {
            if (talisman?.tag?.ExtraAttributes?.id) talisman_ids.push(talisman.tag.ExtraAttributes.id);
        }
        let missing = {
            talismans: getMissingTalismans(talisman_ids),
            maxTalismans: getMissingTalismans(talisman_ids, 'max'),
        };

        for (const talisman of missing.talismans) {
            talisman.price = getPrice(talisman.id) || null;
        }
        for (const talisman of missing.maxTalismans) {
            talisman.price = getPrice(talisman.id) || null;
        }
        missing.talismans.sort((a, b) => a.price - b.price);
        missing.maxTalismans.sort((a, b) => a.price - b.price);

        return missing;
    } else {
        return null;
    }
};
