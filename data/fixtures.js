// Season schedule. The "Next Match" box shows the first game that hasn't kicked off yet
// (it moves on about 3 hours after kickoff). Times are Eastern, 24-hour ("16:30" = 4:30 PM).
// Use venue: "TBD" if unknown. Entries with date: null (e.g. playoff rounds not yet set)
// show only once every dated game has been played.
window.WFC_FIXTURES = [
  { date: "2026-10-25", time: "16:00", home: "Warriors FC",   away: "Cheverly FC", venue: "Troy Park #2" },
  { date: "2026-11-01", type: "bye" },
  { date: "2026-11-08", time: "16:00", home: "Terebinth FC",  away: "Warriors FC", venue: "Hammond HS" },
  { date: "2026-11-15", time: "18:30", home: "Motionz FC",    away: "Warriors FC", venue: "Latrobe Park" },
  { date: "2026-11-22", time: "20:30", home: "Mavericks FC",  away: "Warriors FC", venue: "Latrobe Park" },
  { date: "2026-11-29", time: "16:30", home: "Balto. Valors", away: "Warriors FC", venue: "Latrobe Park" },
  { date: "2026-12-06", time: "14:00", home: "Bridge Sports", away: "Warriors FC", venue: "Troy Park #2" },
  { date: null, label: "Playoffs • Quarterfinals", venue: "Latrobe Park", note: "Date, time and opponent TBD • Semifinals Sun, Dec 20" }
];
