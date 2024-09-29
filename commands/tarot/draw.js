const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
} = require("discord.js");
const tarot = require("../../assets/tarot.json");

//////////////////////////////////////////////////////////////////////
//             discord.js Embedded Message documentation            //
// https://discordjs.guide/popular-topics/embeds.html#embed-preview //
//////////////////////////////////////////////////////////////////////
module.exports = {
  data: new SlashCommandBuilder()
    .setName("draw")
    .setDescription("One card reading"),

  async execute(/** @type {ChatInputCommandInteraction} */ interaction) {
    /** @type {{"card": string, "upright": string, "reversed": string, "image": string}[]}*/
    const tempTarot = tarot;

    const randomCard = Math.floor(Math.random() * tempTarot.length);
    const isUpright = Math.floor(Math.random() * 2) === 0;
    const chosenCard = tempTarot[randomCard];
    /** @type {"major" | "wands" | "cups" | "swords" | "pentacles"} */
    const suit = chosenCard.card.toLocaleLowerCase().includes("wands")
      ? "wands"
      : chosenCard.card.toLocaleLowerCase().includes("cups")
      ? "cups"
      : chosenCard.card.toLocaleLowerCase().includes("swords")
      ? "swords"
      : chosenCard.card.toLocaleLowerCase().includes("pentacles")
      ? "pentacles"
      : "major";
    const color =
      suit === "cups"
        ? 0x5D86B2
        : suit === "pentacles"
        ? 0xB89B63
        : suit === "swords"
        ? 0x66C9C4
        : suit === "wands"
        ? 0xB67DB4
        : 0xFFFFFF;

    const embedReply = new EmbedBuilder()
      .setColor(color)
      .setTitle(`${chosenCard.card}${isUpright ? "" : " Reversed"}`)
      .setImage(chosenCard.image)
      .setDescription(isUpright ? chosenCard.upright : chosenCard.reversed);

    await interaction.reply({
		embeds: [embedReply]
	});
  },
};
