// models/mood.js
const mongoose = require("mongoose");

// Define the schema
const schemaObj = {
  mood: { type: String, required: true },
  type: { type: String, required: true },
  tooltip: { type: String, required: true },
};
const mongooseSchema = mongoose.Schema(schemaObj);

// Define the static method
mongooseSchema.statics.seedDatabase = async function () {
  try {
    const moods = [
      {
        mood: "Joyful",
        type: "Positive",
        tooltip: "Pure happiness and delight.",
      },
      {
        mood: "Grateful",
        type: "Positive",
        tooltip: "Appreciation and thankfulness.",
      },
      {
        mood: "Hopeful",
        type: "Positive",
        tooltip: "Optimism about the future.",
      },
      {
        mood: "Confident",
        type: "Positive",
        tooltip: "Self-assured and secure.",
      },
      { mood: "Excited", type: "Positive", tooltip: "Energized and eager." },
      {
        mood: "Inspired",
        type: "Positive",
        tooltip: "Motivated by new ideas or beauty.",
      },
      { mood: "Content", type: "Positive", tooltip: "Peaceful and satisfied." },
      {
        mood: "Proud",
        type: "Positive",
        tooltip: "A sense of accomplishment or worth.",
      },
      {
        mood: "Playful",
        type: "Positive",
        tooltip: "Lighthearted and fun-seeking.",
      },
      {
        mood: "Loved",
        type: "Positive",
        tooltip: "Feeling valued and cherished.",
      },
      {
        mood: "Empowered",
        type: "Positive",
        tooltip: "Feeling strong and capable.",
      },
      {
        mood: "Optimistic",
        type: "Positive",
        tooltip: "Expecting the best outcome.",
      },

      // Neutral Emotions
      { mood: "Calm", type: "Neutral", tooltip: "Relaxed and tranquil." },
      {
        mood: "Reflective",
        type: "Neutral",
        tooltip: "Thoughtful or introspective.",
      },
      { mood: "Nostalgic", type: "Neutral", tooltip: "Longing for the past." },
      {
        mood: "Curious",
        type: "Neutral",
        tooltip: "Open to discovery and learning.",
      },
      {
        mood: "Indifferent",
        type: "Neutral",
        tooltip: "Neither pleased nor displeased.",
      },
      {
        mood: "Conflicted",
        type: "Neutral",
        tooltip: "Torn between choices or feelings.",
      },
      { mood: "Focused", type: "Neutral", tooltip: "Concentrating on a task." },
      {
        mood: "Surprised",
        type: "Neutral",
        tooltip: "Feeling unexpected but neutral.",
      },
      {
        mood: "Pensive",
        type: "Neutral",
        tooltip: "Deep in thought or contemplation.",
      },
      {
        mood: "Balanced",
        type: "Neutral",
        tooltip: "Feeling steady and centered.",
      },
      { mood: "Neutral", type: "Neutral", tooltip: "Balanced and steady." },
      {
        mood: "Cautious",
        type: "Neutral",
        tooltip: "Careful but not fearful.",
      },

      // Negative Emotions
      { mood: "Anxious", type: "Negative", tooltip: "Nervous or uneasy." },
      {
        mood: "Frustrated",
        type: "Negative",
        tooltip: "Irritated by obstacles or delays.",
      },
      {
        mood: "Lonely",
        type: "Negative",
        tooltip: "Isolated or disconnected.",
      },
      {
        mood: "Overwhelmed",
        type: "Negative",
        tooltip: "Stressed and emotionally overloaded.",
      },
      { mood: "Sad", type: "Negative", tooltip: "Feeling down or despondent." },
      { mood: "Angry", type: "Negative", tooltip: "Resentful or enraged." },
      {
        mood: "Embarrassed",
        type: "Negative",
        tooltip: "Feeling self-conscious or awkward.",
      },
      {
        mood: "Jealous",
        type: "Negative",
        tooltip: "Envious of someone else’s situation.",
      },
      {
        mood: "Guilty",
        type: "Negative",
        tooltip: "Regret over actions or choices.",
      },
      {
        mood: "Ashamed",
        type: "Negative",
        tooltip: "A deeper sense of regret tied to self-perception.",
      },
      {
        mood: "Hopeless",
        type: "Negative",
        tooltip: "Feeling despair about the future.",
      },
      {
        mood: "Betrayed",
        type: "Negative",
        tooltip: "Feeling let down by someone trusted.",
      },
    ];

    // Loop through the moods to check and insert them one by one
    for (let mood of moods) {
      const existingMood = await this.findOne({ mood: mood.mood });
      if (!existingMood) {
        await this.create(mood); // Insert if not already in the database
        console.log(`${mood.mood} added to the database.`);
      } else {
        console.log(`${mood.mood} already exists in the database.`);
      }
    }
    console.log("Database seeding process completed!");
  } catch (error) {
    console.error("Error seeding the database:", error);
  }
};

const Mood = mongoose.model("Mood", mongooseSchema);

module.exports = Mood;
