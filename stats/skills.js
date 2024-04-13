const calcSkill = require('../constants/skills');
const { max_levels } = require('../constants/xp_tables');

module.exports = function getSkills(player, profile, ignoreMax) {
	const skill_experience = {
		farming: profile?.player_data?.experience?.SKILL_FARMING || 0,
		mining: profile?.player_data?.experience?.SKILL_MINING || 0,
		combat: profile?.player_data?.experience?.SKILL_COMBAT || 0,
		foraging: profile?.player_data?.experience?.SKILL_FORAGING || 0,
		fishing: profile?.player_data?.experience?.SKILL_FISHING || 0,
		enchanting: profile?.player_data?.experience?.SKILL_ENCHANTING || 0,
		alchemy: profile?.player_data?.experience?.SKILL_ALCHEMY || 0,
		carpentry: profile?.player_data?.experience?.SKILL_CARPENTRY || 0,
		runecrafting: profile?.player_data?.experience?.SKILL_RUNECRAFTING || 0,
		social: profile?.player_data?.experience?.SKILL_SOCIAL || 0,
		taming: profile?.player_data?.experience?.SKILL_TAMING || 0,
	};

	return {
		farming: calcSkill('farming', skill_experience['farming'], {
			ignoreMax,
			cap: max_levels.farming + (profile.jacobs_contest?.perks?.farming_level_cap ?? 0),
		}),
		mining: calcSkill('mining', skill_experience['mining'], { ignoreMax }),
		combat: calcSkill('combat', skill_experience['combat'], { ignoreMax }),
		foraging: calcSkill('foraging', skill_experience['foraging'], { ignoreMax }),
		fishing: calcSkill('fishing', skill_experience['fishing'], { ignoreMax }),
		enchanting: calcSkill('enchanting', skill_experience['enchanting'], { ignoreMax }),
		alchemy: calcSkill('alchemy', skill_experience['alchemy'], { ignoreMax }),
		carpentry: calcSkill('carpentry', skill_experience['carpentry'], { ignoreMax }),
		runecrafting: calcSkill('runecrafting', skill_experience['runecrafting'], { ignoreMax }),
		social: calcSkill('social', skill_experience['social'], { ignoreMax }),
		taming: calcSkill('taming', skill_experience['taming'], {
			ignoreMax,
			cap: Math.max(player?.skills?.taming, 50),
		}),
	};
};
