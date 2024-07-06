const { SlashCommandBuilder } = require('discord.js');
const tarot = require("../../assets/tarot.json");
module.exports = {
	data: new SlashCommandBuilder()
		.setName('draw')
		.setDescription('One card daily reading'),

	async execute(interaction) {
		/** @type {{"card": string, "upright": string, "reversed": string}[]}*/
		const tempTarot = tarot;

		const randomCard = Math.floor(Math.random() * tempTarot.length);
		const isUpright = Math.floor(Math.random() * 2) === 0;

		await interaction.reply({content: `${tempTarot[randomCard].card}: ${isUpright ? tempTarot[randomCard].upright : tempTarot[randomCard].reversed + " (R)"}`});
	},
};