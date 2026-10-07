# Body First Discord Bot

A low-demand, deterministic Discord decision guide for choosing what the body needs first. It uses no generative AI, analytics, user accounts, or persistent database.

## Discord command

`/body-first` opens the guide. Sessions default to private and can optionally be posted in a channel.

## Set up a separate Discord bot

1. Create a separate application and bot in the Discord Developer Portal.
2. Copy `.env.example` to `.env` for local use, or add the variables in Railway.
3. Set `DISCORD_TOKEN` to the Body First bot token.
4. Set `CLIENT_ID` to the Body First application ID.
5. Run `npm install`.
6. Run `node deploy-commands.js` once to register `/body-first`.
7. Run `npm start`, or deploy the folder to Railway.

Never commit or share the `.env` file or bot token.

## Included behavior

- Complete Body First V1.0.1 decision tree
- Private or shared Discord sessions
- Session ownership protection
- Back, **That’s enough for now**, and Start over controls
- Start over hidden on the repeated-use reflection
- Fourth genuine **Start with fluids** initiation within 10 minutes opens the reassurance/checking reflection
- Reflection never blocks access to the decision tree
- Short-lived navigation history and timestamps stored only in process memory
- Discord-specific About, Terms, and Privacy information
- No medical urgency screen, symptom-investigation path, timers, tracking, scores, or saved answers

## Discord appearance and accessibility

Discord controls fonts, text scaling, contrast, light/dark mode, button colors, and screen-reader behavior. The PWA's Pastel, Grayscale, and Dark controls therefore do not transfer to the bot. Body First uses concise embeds, descriptive buttons, short paragraphs, and no meaning conveyed only through color.

## Privacy

Button interactions necessarily pass through Discord and the hosting provider. Body First does not use a persistent database or intentionally send selections to a clinician or creator. Private sessions use Discord's ephemeral interaction mode. Shared sessions remain visible in the selected channel.
