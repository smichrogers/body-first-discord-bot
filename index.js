require("dotenv").config();

const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Client,
  EmbedBuilder,
  Events,
  GatewayIntentBits,
  MessageFlags
} = require("discord.js");

const screens = require("./screens");
const recentStarts = new Map();
const sessions = new Map();
const TEN_MINUTES = 10 * 60 * 1000;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const buttonStyles = {
  primary: ButtonStyle.Primary,
  secondary: ButtonStyle.Secondary,
  success: ButtonStyle.Success
};

function shouldReflect(userId) {
  const now = Date.now();
  const recent = (recentStarts.get(userId) ?? []).filter(time => now - time < TEN_MINUTES);
  recent.push(now);
  const reflect = recent.length >= 4;
  recentStarts.set(userId, reflect ? [now] : recent);
  return reflect;
}

function getSession(userId) {
  if (!sessions.has(userId)) sessions.set(userId, { current: "home", history: [] });
  return sessions.get(userId);
}

function createScreen(screenId, userId) {
  const screen = screens[screenId];
  if (!screen) throw new Error(`Screen "${screenId}" does not exist.`);

  const embed = new EmbedBuilder()
    .setColor(0x78aeb2)
    .setTitle(screen.title)
    .setDescription(screen.description)
    .setFooter({ text: "General educational support. Not medical advice, monitoring, or a saved care record." });

  const rows = [];
  for (let index = 0; index < (screen.buttons ?? []).length; index += 5) {
    const row = new ActionRowBuilder();
    screen.buttons.slice(index, index + 5).forEach((button, offset) => {
      row.addComponents(
        new ButtonBuilder()
          .setCustomId(`nav:${button.to}:${userId}:${index + offset}`)
          .setLabel(button.label)
          .setStyle(buttonStyles[button.style] ?? ButtonStyle.Secondary)
      );
    });
    rows.push(row);
  }

  if (!["home", "paused"].includes(screenId)) {
    const utility = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder().setCustomId(`back:${userId}`).setLabel("← Back").setStyle(ButtonStyle.Secondary),
        new ButtonBuilder().setCustomId(`enough:${userId}`).setLabel("That’s enough for now").setStyle(ButtonStyle.Secondary)
      );
    if (screenId !== "reflection") {
      utility.addComponents(
        new ButtonBuilder().setCustomId(`restart:${userId}`).setLabel("Start over ↻").setStyle(ButtonStyle.Secondary)
      );
    }
    rows.push(utility);
  }

  return { embeds: [embed], components: rows };
}

async function show(interaction, userId, destination, addHistory = true) {
  const session = getSession(userId);
  if (addHistory && session.current !== destination) session.history.push(session.current);
  session.current = destination;
  session.history = session.history.slice(-30);
  await interaction.update(createScreen(destination, userId));
}

client.once(Events.ClientReady, readyClient => {
  console.log(`Body First is online as ${readyClient.user.tag}.`);
});

client.on(Events.InteractionCreate, async interaction => {
  try {
    if (interaction.isChatInputCommand() && interaction.commandName === "body-first") {
      const visibility = interaction.options.getString("visibility") ?? "private";
      sessions.set(interaction.user.id, { current: "home", history: [] });
      const response = createScreen("home", interaction.user.id);
      if (visibility === "private") response.flags = MessageFlags.Ephemeral;
      await interaction.reply(response);
      return;
    }

    if (!interaction.isButton()) return;
    const [type, value, navUserId] = interaction.customId.split(":");
    const userId = type === "nav" ? navUserId : value;
    if (!["nav", "back", "enough", "restart"].includes(type)) return;

    if (interaction.user.id !== userId) {
      await interaction.reply({
        content: "This Body First session belongs to someone else. Use `/body-first` to begin your own session.",
        flags: MessageFlags.Ephemeral
      });
      return;
    }

    const session = getSession(userId);
    if (type === "back") {
      const destination = session.history.pop() ?? "home";
      session.current = destination;
      await interaction.update(createScreen(destination, userId));
      return;
    }
    if (type === "enough") {
      await show(interaction, userId, "paused");
      return;
    }
    if (type === "restart") {
      sessions.set(userId, { current: "home", history: [] });
      await interaction.update(createScreen("home", userId));
      return;
    }

    let destination = value;
    const chosen = screens[session.current]?.buttons?.find(button => button.to === value);
    if (chosen?.begins) destination = shouldReflect(userId) ? "reflection" : "fluids";
    await show(interaction, userId, destination);
  } catch (error) {
    console.error("Body First interaction error:", error);
    if (!interaction.replied && !interaction.deferred) {
      await interaction.reply({
        content: "Body First encountered an error and could not continue.",
        flags: MessageFlags.Ephemeral
      });
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
