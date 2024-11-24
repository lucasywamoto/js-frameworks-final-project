const mongoose = require("mongoose");
const User = require("./models/user");
const Mood = require("./models/mood");
const ClearRecord = require("./models/clearRecord");

// MongoDB connection string
const mongoURI =
  "mongodb+srv://lucasywamoto:7GamFaVOYZFgLdM0@cluster0.dbkzn.mongodb.net/ClearHeart?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongoURI)
  .then(async () => {
    console.log("Connected to MongoDB!");
    await createUsersAndRecords(); // Ensure the function runs only after connection is established
  })
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// Generate random names
const randomNames = [
  "Alex",
  "Jordan",
  "Taylor",
  "Morgan",
  "Casey",
  "Riley",
  "Jamie",
  "Blake",
  "Quinn",
  "Cameron",
  "Harper",
  "Dakota",
  "Skylar",
  "Finley",
  "Avery",
  "Rowan",
  "Emerson",
  "Charlie",
  "Logan",
  "Elliot",
  "Hunter",
  "Reese",
  "Sage",
  "Tatum",
  "Drew",
  "Sawyer",
  "Arden",
  "Kendall",
  "Monroe",
  "Lane",
  "Marley",
  "Jules",
  "Remy",
  "Shiloh",
  "Wren",
  "Bellamy",
  "Hollis",
  "Ellis",
  "Peyton",
  "Spencer",
  "Marlow",
  "Sky",
  "Winter",
  "Rory",
  "Haven",
  "Linden",
  "Sloan",
  "Robin",
  "Kai",
  "Gray",
];

// Helper function to generate a random name
function getRandomName() {
  const index = Math.floor(Math.random() * randomNames.length);
  return randomNames[index];
}

// Helper function to generate a unique username (using the random name and a random number)
function generateUniqueUsername(name) {
  const randomNum = Math.floor(Math.random() * 1000); // Generate a random number to ensure uniqueness
  return `${name.toLowerCase()}_${randomNum}`;
}

// Get a random mood from the database
async function getRandomMood() {
  const moods = await Mood.find();
  if (moods.length === 0) {
    throw new Error("No moods found. Ensure the Mood collection is populated.");
  }
  const randomIndex = Math.floor(Math.random() * moods.length);
  return moods[randomIndex];
}

// Create 50 users with 20 ClearRecords each
async function createUsersAndRecords() {
  try {
    for (let i = 0; i < 50; i++) {
      const randomName = getRandomName();
      const username = generateUniqueUsername(randomName); // Ensure the username is unique

      // Generate realistic data for additional fields
      const negativeStreaks = [
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 5),
      ];
      const lastNegativeDate = negativeStreaks.length > 0 ? new Date() : null;
      const lastMoodType = ["Positive", "Negative", "Neutral"][
        Math.floor(Math.random() * 3)
      ];
      const lastStreakReset = new Date();

      const user = new User({
        name: randomName,
        username: username, // Assign the unique username
        email: `${username}@example.com`, // Example email
        password: "123456", // Set the password as requested
        negativeStreaks: negativeStreaks,
        lastNegativeDate: lastNegativeDate,
        lastMoodType: lastMoodType,
        lastStreakReset: lastStreakReset,
      });

      await user.save(); // Save user to get their ID

      for (let j = 0; j < 20; j++) {
        const mood = await getRandomMood();

        if (!mood || !mood._id) {
          throw new Error("Mood not found. Check the Mood collection.");
        }

        const clearRecord = new ClearRecord({
          userId: user._id,
          mood: mood._id,
        });

        await clearRecord.save();

        user.clearRecords.push(clearRecord._id); // Add ClearRecord to user
      }

      await user.save(); // Save user with ClearRecords references

      console.log(`User ${user.username} created with 20 ClearRecords!`);
    }

    console.log("All users and ClearRecords created successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    mongoose.connection.close(); // Close connection after seeding
  }
}

createUsersAndRecords(); // Call the function to seed the data
