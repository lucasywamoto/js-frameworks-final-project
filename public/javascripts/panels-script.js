const User = require("../models/user");
const Mood = require("../models/mood");

async function getLast7DaysEntries(userId) {
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);

  const user = await User.findById(userId).populate({
    path: "moods",
    match: { created: { $gte: sevenDaysAgo } },
    options: { sort: { created: -1 }, limit: 7 },
  });

  if (user && user.moods) {
    return user.moods;
  }

  return [];
}

module.exports = {
  getLast7DaysEntries,
};
