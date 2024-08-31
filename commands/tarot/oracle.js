const { SlashCommandBuilder } = require('discord.js');
const oracle = require("../../assets/oracle.json");
module.exports = {
	data: new SlashCommandBuilder()
		.setName('draw-oracle')
		.setDescription('Draw a single oracle card'),

	async execute(interaction) {
		/** @type {{"card": string, "upright": string, "reversed": string}[]}*/
		const tempOracle = oracle;

		const randomCard = Math.floor(Math.random() * tempOracle.length);
		const isUpright = Math.floor(Math.random() * 2) === 0;

		await interaction.reply({content: `${tempOracle[randomCard].card}: ${isUpright ? tempOracle[randomCard].upright : tempOracle[randomCard].reversed + " (R)"}`});
	},
};