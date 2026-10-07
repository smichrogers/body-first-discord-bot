require("dotenv").config();

const { REST, Routes, SlashCommandBuilder } = require("discord.js");

const commands = [
  new SlashCommandBuilder()
    .setName("body-first")
    .setDescription("Open Body First's low-demand guide for choosing one next step.")
    .addStringOption(option =>
      option
        .setName("visibility")
        .setDescription("Choose who can see this Body First session.")
        .setRequired(false)
        .addChoices(
          { name: "Private — only I can see it", value: "private" },
          { name: "Shared — post it in this channel", value: "shared" }
        )
    )
    .toJSON()
];

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

async function deployCommands() {
  try {
    console.log("Registering Body First's command...");
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
    if (process.env.GUILD_ID) {
      await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: [] });
    }
    console.log("Body First's global command was registered successfully.");
  } catch (error) {
    console.error("Command registration failed:", error);
    process.exitCode = 1;
  }
}

deployCommands();
