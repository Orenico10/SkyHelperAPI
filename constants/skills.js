//CREDIT: https://github.com/SkyCrypt/SkyCryptWebsite (Modified)
const xp_tables = require('./xp_tables');

module.exports = function calcSkill(skill, experience, { cap, infinite, ignoreMax } = {}) {
	table = 'normal';
	if (skill === 'runecrafting') table = 'runecrafting';
	if (skill === 'social') table = 'social';
	if (skill === 'dungeoneering') table = 'catacombs';

	if (experience <= 0) {
		return {
			totalXp: 0,
			xp: 0,
			level: 0,
			xpCurrent: 0,
			xpForNext: xp_tables[table][0],
			progress: 0,
			levelWithProgress: 0,
		};
	}
	let xp = 0;
	let level = 0;
	let xpForNext = 0;
	let progress = 0;
	let maxLevel = 0;

	if (xp_tables.max_levels[skill])
		maxLevel = ignoreMax ? xp_tables.weight_max_levels[skill] : cap ?? xp_tables.max_levels[skill];

	for (let i = 1; i <= maxLevel; i++) {
		xp += xp_tables[table][i - 1];

		if (xp > experience) {
			xp -= xp_tables[table][i - 1];
		} else {
			if (i <= maxLevel) level = i;
		}
	}

	let xpCurrent = Math.floor(experience - xp);

	let totalXp = experience;

	if (level < maxLevel) {
		xpForNext = Math.ceil(xp_tables[table][level]);
	}

	if (infinite) {
		const maxExperience = Object.values(xp_tables[table]).at(-1);
		level += Math.floor(xpCurrent / maxExperience);
		xpCurrent %= maxExperience;
		maxLevel = level >= maxLevel ? level + 1 : maxLevel;
		xpForNext = xpForNext == 0 ? maxExperience: xpForNext;
	}

	progress = level >= maxLevel ? 0 : Math.max(0, Math.min(xpCurrent / xpForNext, 1));

	return {
		totalXp,
		xp,
		level,
		xpCurrent,
		xpForNext,
		progress,
		levelWithProgress: level < maxLevel ? level + progress : level,
	};
};
