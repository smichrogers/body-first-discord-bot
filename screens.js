const screens = {
  home: {
    title: "What does my body need first?",
    description: [
      "*One small next step*",
      "When everything feels important, I do not have to solve everything.",
      "**I only need to figure out what needs attention FIRST.**"
    ].join("\n\n"),
    buttons: [
      { label: "Start with fluids", to: "fluids", style: "primary", begins: true },
      { label: "When everything feels important", to: "reminders", style: "secondary" },
      { label: "About Body First", to: "about", style: "secondary" }
    ]
  },
  reminders: {
    title: "When everything feels important",
    description: [
      "**Food and fluids → immediate body needs → rest → everything else.**",
      "A task being important does not mean:\n• It has to happen right now.\n• I have to finish all of it.\n• Delaying it means I am unsafe.\n• Another basic need ‘stole’ energy from it.\n• I failed if my body cannot do it today.",
      "Food did not ruin hygiene.\nA bowel movement did not ruin the day.\nRest does not ruin progress.",
      "When two things compete, I don’t have to find the perfect choice. I choose the more basic need, make the task as small as possible, and we figure out the rest later."
    ].join("\n\n"),
    buttons: [{ label: "Start with fluids", to: "fluids", style: "primary", begins: true }]
  },
  fluids: {
    title: "Does my body need fluid?",
    description: "*First: fluids*\n\nAm I thirsty, dry, or behind on fluids?",
    buttons: [
      { label: "Yes, I need fluid", to: "drink", style: "primary" },
      { label: "No, continue", to: "food", style: "secondary" }
    ]
  },
  drink: {
    title: "Drink first.",
    description: "*One small action*\n\nIt can be a few sips. It does not have to become a whole task.",
    buttons: [
      { label: "Continue", to: "food", style: "primary" },
      { label: "That’s enough for now", to: "enough", style: "secondary" }
    ]
  },
  food: {
    title: "Does my body need food?",
    description: "*Next: food*\n\nAm I hungry, shaky, weak, nauseated from not eating, or overdue for food?",
    buttons: [
      { label: "Yes, I need food", to: "eat", style: "primary" },
      { label: "No, continue", to: "toileting", style: "secondary" }
    ]
  },
  eat: {
    title: "Food comes before optional tasks.",
    description: "*One small action*\n\nThe goal is something accessible, not the perfect meal.",
    buttons: [
      { label: "Continue", to: "toileting", style: "primary" },
      { label: "That’s enough for now", to: "enough", style: "secondary" }
    ]
  },
  toileting: {
    title: "Do I need the bathroom or immediate toileting care?",
    description: "*Next: immediate body care*\n\nNeed to pee or poop? Urine or stool currently on skin? Something uncomfortable that needs attention?",
    buttons: [
      { label: "Yes", to: "toiletingAction", style: "primary" },
      { label: "No, continue", to: "timeSensitive", style: "secondary" }
    ]
  },
  toiletingAction: {
    title: "Do the minimum needed for comfort and skin protection.",
    description: "*One small action*\n\nThis does not automatically mean a larger wipe-down needs to happen, too.",
    buttons: [
      { label: "Continue", to: "timeSensitive", style: "primary" },
      { label: "That’s enough for now", to: "enough", style: "secondary" }
    ]
  },
  timeSensitive: {
    title: "Is there another time-sensitive body need?",
    description: "*Next: what cannot wait*\n\nMedication or care that is already due, repositioning because something currently hurts, or another body-care task I already know cannot wait.",
    buttons: [
      { label: "Yes", to: "timeSensitiveAction", style: "primary" },
      { label: "No, continue", to: "rest", style: "secondary" }
    ]
  },
  timeSensitiveAction: {
    title: "Handle the time-sensitive part.",
    description: "*One small action*\n\nI do not have to turn it into a bigger task.",
    buttons: [
      { label: "Continue", to: "rest", style: "primary" },
      { label: "That’s enough for now", to: "enough", style: "secondary" }
    ]
  },
  rest: {
    title: "Do I need rest more than another task?",
    description: "*Now: rest*\n\nIf I feel overloaded, sick, cognitively scrambled, tearful, or like everything is becoming impossible.",
    buttons: [
      { label: "Rest is what I need", to: "restAction", style: "primary" },
      { label: "I feel able to consider one thing", to: "optional", style: "secondary" }
    ]
  },
  restAction: {
    title: "Rest is the task.",
    description: "*This can end here*\n\nI can reassess later. I do not have to predict exactly how much energy I have left.",
    buttons: [{ label: "That’s enough for now", to: "paused", style: "primary" }]
  },
  optional: {
    title: "Choose one non-urgent thing, if my body seems able.",
    description: "*After basic needs*\n\nOne is enough. Choosing none is also allowed.",
    buttons: [
      { label: "Face / skin care", to: "smallStep", style: "primary" },
      { label: "Glasses", to: "smallStep", style: "primary" },
      { label: "Larger wipe-down", to: "smallStep", style: "primary" },
      { label: "Clothes", to: "smallStep", style: "primary" },
      { label: "Hair", to: "smallStep", style: "primary" },
      { label: "Room / environment", to: "smallStep", style: "primary" },
      { label: "Planning tomorrow", to: "smallStep", style: "primary" },
      { label: "Something enjoyable", to: "smallStep", style: "primary" },
      { label: "Other", to: "smallStep", style: "secondary" },
      { label: "None — that’s enough for now", to: "enough", style: "secondary" }
    ]
  },
  smallStep: {
    title: "Choose the smallest part that feels manageable.",
    description: "*Keep it small*\n\nI do not have to plan every step or finish all of it.\n\nI can begin with one part, or stop if my body needs to stop.",
    buttons: [
      { label: "That’s enough for now", to: "paused", style: "primary" },
      { label: "Choose a different thing", to: "optional", style: "secondary" }
    ]
  },
  enough: {
    title: "I can stop here.",
    description: "*This is enough*\n\nI do not have to keep checking for the perfect next step.",
    buttons: [{ label: "That’s enough for now", to: "paused", style: "primary" }]
  },
  paused: {
    title: "Nothing else is required right now.",
    description: "*That’s enough for now*\n\nNothing was saved. Body First can stay closed, and I can begin again later if I choose.",
    buttons: [{ label: "Return home", to: "home", style: "secondary" }]
  },
  reflection: {
    title: "Am I using Body First to choose one step, or am I restarting because I want to feel certain I chose correctly?",
    description: "*Before another round*\n\nI do not have to prove that I picked the perfect need.\n\nIf I already have a reasonable next step, I can close Body First and try that. I can also continue without using another round to search for certainty.",
    buttons: [
      { label: "Continue anyway", to: "fluids", style: "primary" },
      { label: "That’s enough for now", to: "paused", style: "secondary" }
    ]
  },
  about: {
    title: "About Body First",
    description: [
      "Body First is a low-demand, disability- and neurodiversity-affirming decision guide for choosing one small next step when many needs feel important at once.",
      "It prioritizes basic body needs, rest, and accessible action without asking you to complete a checklist or find the perfect choice.",
      "Body First does not use generative AI, diagnose users, monitor activity, or automatically send information to a clinician."
    ].join("\n\n"),
    buttons: [
      { label: "Terms of Use", to: "terms", style: "secondary" },
      { label: "Privacy Information", to: "privacy", style: "secondary" }
    ]
  },
  terms: {
    title: "Terms of Use",
    description: [
      "**Last updated: October 7, 2026**",
      "Body First is a general educational decision-support tool. It is not therapy, diagnosis, medical care, symptom monitoring, or individualized medical advice.",
      "You remain responsible for decisions about your care. Use Body First only as a prompt for choosing a small next step, not as a substitute for guidance from your qualified providers.",
      "Using the bot does not create a therapist-client or other professional relationship. Body First is not continuously monitored and does not notify a clinician or another person.",
      "The bot is provided ‘as is,’ without guarantees that it will fit every need or circumstance."
    ].join("\n\n"),
    buttons: []
  },
  privacy: {
    title: "Privacy Information",
    description: [
      "**Last updated: October 7, 2026**",
      "Body First does not use generative AI, analytics, advertising trackers, or a persistent database. It does not intentionally send your button choices to Body First’s creator or a clinician.",
      "Discord and the bot’s hosting provider process the interaction and technical data needed to operate the bot. This may include Discord account and server identifiers, commands, button interactions, timestamps, device or network information, and security or diagnostic logs. Their handling of data is governed by their own policies.",
      "Private sessions are delivered as ephemeral Discord interactions. Shared sessions are visible in the selected channel. Do not use a shared session for information you want to keep private.",
      "Body First temporarily keeps navigation history and recent-start timestamps in the bot’s memory. These disappear when the bot restarts and are not stored in a persistent database.",
      "Do not use the bot as a medical record, secure-messaging system, or guaranteed HIPAA-confidential communication channel."
    ].join("\n\n"),
    buttons: []
  }
};

module.exports = screens;
