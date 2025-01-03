const { ignoredKeys } = require('../constants/events');
module.exports = function getEvents(profile) {
	const uniqueRabbits = profile.events?.easter?.rabbits
		? Object.keys(profile.events?.easter?.rabbits).filter((key) => !ignoredKeys.includes(key)).length
		: 0;
	return (eventsData = {
		easter: {
			chocolate: {
				current: profile.events?.easter?.chocolate || 0,
				sincePrestige: profile.events?.easter?.chocolate_since_prestige || 0,
				total: profile.events?.easter?.total_chocolate || 0,
			},
			employees: {
				bro: profile.events?.easter?.employees?.rabbit_bro || 0,
				cousin: profile.events?.easter?.employees?.rabbit_cousin || 0,
				sis: profile.events?.easter?.employees?.rabbit_sis || 0,
				father: profile.events?.easter?.employees?.rabbit_father || 0,
				grandma: profile.events?.easter?.employees?.rabbit_grandma || 0,
				dog: profile.events?.easter?.employees?.rabbit_dog || 0,
				uncle: profile.events?.easter?.employees?.rabbit_uncle || 0,
			},
			level: profile.events?.easter?.chocolate_level || 0,
			uniqueRabbits: uniqueRabbits,
		},
	});
};
