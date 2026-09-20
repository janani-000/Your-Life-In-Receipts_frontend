export type SpotifyEntry = {
  timestamp: string; trackName: string; artistName: string; album: string;
  msPlayed: number | null; skipped: boolean; genre: string; platform: string; timeOfDay: string;
};

export type FinanceEntry = {
  timestamp: string; merchant: string; category: string; amount: number | null;
  paymentMode: string; status: string;
};

export type HouseholdEntry = {
  timestamp: string; category: string; subcategory: string; note: string;
  amount: number | null; type: "income" | "expense"; paymentMethod: string;
};

export const spotifyHistory: SpotifyEntry[] = [
  { timestamp: "2026-05-04T23:48:00+05:30", trackName: "A Walk", artistName: "Tycho", album: "Dive", msPlayed: 312000, skipped: false, genre: "Ambient", platform: "Desktop", timeOfDay: "Late night" },
  { timestamp: "2026-05-05T00:34:00+05:30", trackName: "Snowfall", artistName: "Øneheart", album: "Snowfall", msPlayed: 248000, skipped: false, genre: "Lo-fi", platform: "Desktop", timeOfDay: "Late night" },
  { timestamp: "2026-05-18T07:12:00+05:30", trackName: "Sun Models", artistName: "ODESZA", album: "In Return", msPlayed: 161000, skipped: false, genre: "Electronic", platform: "Mobile", timeOfDay: "Morning" },
  { timestamp: "2026-06-07T09:06:00+05:30", trackName: "Bloom", artistName: "The Paper Kites", album: "Woodland", msPlayed: 215000, skipped: false, genre: "Acoustic", platform: "Speaker", timeOfDay: "Morning" },
  { timestamp: "2026-06-07T10:11:00+05:30", trackName: "Kasoor", artistName: "Prateek Kuhad", album: "Kasoor", msPlayed: 198000, skipped: false, genre: "Indie", platform: "Speaker", timeOfDay: "Morning" },
  { timestamp: "2026-06-21T23:26:00+05:30", trackName: "Weightless", artistName: "Marconi Union", album: "Weightless", msPlayed: 486000, skipped: false, genre: "Ambient", platform: "Desktop", timeOfDay: "Late night" },
  { timestamp: "2026-07-03T06:31:00+05:30", trackName: "Titanium", artistName: "David Guetta", album: "Nothing but the Beat", msPlayed: 245000, skipped: false, genre: "EDM", platform: "Mobile", timeOfDay: "Morning" },
  { timestamp: "2026-07-03T07:05:00+05:30", trackName: "Levels", artistName: "Avicii", album: "Levels", msPlayed: 222000, skipped: false, genre: "EDM", platform: "Mobile", timeOfDay: "Morning" },
  { timestamp: "2026-07-19T22:52:00+05:30", trackName: "Night Trouble", artistName: "Petit Biscuit", album: "Presence", msPlayed: 176000, skipped: true, genre: "Electronic", platform: "Desktop", timeOfDay: "Late night" },
  { timestamp: "2026-08-15T18:45:00+05:30", trackName: "Gallan Goodiyaan", artistName: "Yashita Sharma", album: "Dil Dhadakne Do", msPlayed: 296000, skipped: false, genre: "Bollywood", platform: "Speaker", timeOfDay: "Evening" },
  { timestamp: "2026-08-15T19:26:00+05:30", trackName: "Kala Chashma", artistName: "Amar Arshi", album: "Baar Baar Dekho", msPlayed: 187000, skipped: false, genre: "Party", platform: "Speaker", timeOfDay: "Evening" },
  { timestamp: "2026-08-16T00:18:00+05:30", trackName: "Ilahi", artistName: "Arijit Singh", album: "YJHD", msPlayed: 229000, skipped: false, genre: "Bollywood", platform: "Mobile", timeOfDay: "Late night" },
  { timestamp: "2026-08-29T23:41:00+05:30", trackName: "Lush Life", artistName: "Zara Larsson", album: "So Good", msPlayed: 201000, skipped: false, genre: "Pop", platform: "Desktop", timeOfDay: "Late night" },
  { timestamp: "2026-09-06T08:22:00+05:30", trackName: "Heartbeats", artistName: "José González", album: "Veneer", msPlayed: 158000, skipped: false, genre: "Acoustic", platform: "Speaker", timeOfDay: "Morning" },
  { timestamp: "2026-09-12T06:52:00+05:30", trackName: "Don't You Worry Child", artistName: "Swedish House Mafia", album: "Until Now", msPlayed: 212000, skipped: false, genre: "EDM", platform: "Mobile", timeOfDay: "Morning" },
  { timestamp: "2026-09-14T23:56:00+05:30", trackName: "Awake", artistName: "Tycho", album: "Awake", msPlayed: 276000, skipped: false, genre: "Ambient", platform: "Desktop", timeOfDay: "Late night" },
];

export const financeTransactions: FinanceEntry[] = [
  { timestamp: "2026-05-05T00:42:00+05:30", merchant: "Swiggy", category: "Food & Dining", amount: 487, paymentMode: "UPI", status: "Completed" },
  { timestamp: "2026-05-10T14:20:00+05:30", merchant: "Amazon", category: "Shopping", amount: 2499, paymentMode: "Credit Card", status: "Completed" },
  { timestamp: "2026-05-18T08:03:00+05:30", merchant: "Cult.fit", category: "Health & Fitness", amount: 1299, paymentMode: "Credit Card", status: "Completed" },
  { timestamp: "2026-06-07T10:28:00+05:30", merchant: "Blinkit", category: "Food & Dining", amount: 862, paymentMode: "UPI", status: "Completed" },
  { timestamp: "2026-06-12T19:30:00+05:30", merchant: "Spotify Premium", category: "Tech & Subscriptions", amount: 119, paymentMode: "UPI", status: "Completed" },
  { timestamp: "2026-06-21T23:58:00+05:30", merchant: "Zomato", category: "Food & Dining", amount: 638, paymentMode: "UPI", status: "Completed" },
  { timestamp: "2026-07-03T08:02:00+05:30", merchant: "Cult.fit", category: "Health & Fitness", amount: 3499, paymentMode: "Credit Card", status: "Completed" },
  { timestamp: "2026-07-03T08:22:00+05:30", merchant: "EatFit", category: "Food & Dining", amount: 379, paymentMode: "UPI", status: "Completed" },
  { timestamp: "2026-07-19T23:36:00+05:30", merchant: "Swiggy", category: "Food & Dining", amount: 544, paymentMode: "UPI", status: "Completed" },
  { timestamp: "2026-08-15T17:25:00+05:30", merchant: "BookMyShow", category: "Entertainment", amount: 1840, paymentMode: "Credit Card", status: "Completed" },
  { timestamp: "2026-08-15T20:08:00+05:30", merchant: "Fabindia", category: "Shopping", amount: 6290, paymentMode: "Credit Card", status: "Completed" },
  { timestamp: "2026-08-16T00:32:00+05:30", merchant: "Uber", category: "Travel", amount: 684, paymentMode: "UPI", status: "Completed" },
  { timestamp: "2026-08-22T11:10:00+05:30", merchant: "IRCTC", category: "Travel", amount: 2785, paymentMode: "NetBanking", status: "Completed" },
  { timestamp: "2026-09-06T09:10:00+05:30", merchant: "Blinkit", category: "Food & Dining", amount: 1037, paymentMode: "UPI", status: "Completed" },
  { timestamp: "2026-09-12T07:42:00+05:30", merchant: "EatFit", category: "Food & Dining", amount: 425, paymentMode: "UPI", status: "Completed" },
  { timestamp: "2026-09-14T23:59:00+05:30", merchant: "Swiggy", category: "Food & Dining", amount: 521, paymentMode: "UPI", status: "Completed" },
];

export const householdTransactions: HouseholdEntry[] = [
  { timestamp: "2026-05-01T09:00:00+05:30", category: "Rent", subcategory: "Apartment", note: "May rent", amount: 18500, type: "expense", paymentMethod: "NetBanking" },
  { timestamp: "2026-05-05T18:20:00+05:30", category: "Utilities", subcategory: "Electricity", note: "Tata Power bill", amount: 1840, type: "expense", paymentMethod: "UPI" },
  { timestamp: "2026-05-17T10:10:00+05:30", category: "Groceries", subcategory: "Weekly shop", note: "Fresh produce and staples", amount: 2240, type: "expense", paymentMethod: "UPI" },
  { timestamp: "2026-06-01T09:00:00+05:30", category: "Rent", subcategory: "Apartment", note: "June rent", amount: 18500, type: "expense", paymentMethod: "NetBanking" },
  { timestamp: "2026-06-07T11:02:00+05:30", category: "Groceries", subcategory: "Restock", note: "Sunday pantry reset", amount: 3180, type: "expense", paymentMethod: "UPI" },
  { timestamp: "2026-06-07T11:26:00+05:30", category: "Utilities", subcategory: "Internet", note: "Monthly broadband", amount: 999, type: "expense", paymentMethod: "Credit Card" },
  { timestamp: "2026-07-01T09:00:00+05:30", category: "Rent", subcategory: "Apartment", note: "July rent", amount: 18500, type: "expense", paymentMethod: "NetBanking" },
  { timestamp: "2026-07-05T08:40:00+05:30", category: "Domestic Help", subcategory: "Monthly salary", note: "Housekeeping", amount: 4500, type: "expense", paymentMethod: "UPI" },
  { timestamp: "2026-07-19T10:05:00+05:30", category: "Home Maintenance", subcategory: "Repair", note: "Monsoon window sealing", amount: 2750, type: "expense", paymentMethod: "UPI" },
  { timestamp: "2026-08-01T09:00:00+05:30", category: "Rent", subcategory: "Apartment", note: "August rent", amount: 18500, type: "expense", paymentMethod: "NetBanking" },
  { timestamp: "2026-08-15T12:42:00+05:30", category: "Supplies", subcategory: "Hosting", note: "Festival dinner supplies", amount: 4860, type: "expense", paymentMethod: "Credit Card" },
  { timestamp: "2026-08-16T09:15:00+05:30", category: "Groceries", subcategory: "Breakfast", note: "Post-party breakfast restock", amount: 1320, type: "expense", paymentMethod: "UPI" },
  { timestamp: "2026-09-01T09:00:00+05:30", category: "Rent", subcategory: "Apartment", note: "September rent", amount: 18500, type: "expense", paymentMethod: "NetBanking" },
  { timestamp: "2026-09-06T09:28:00+05:30", category: "Groceries", subcategory: "Restock", note: "Sunday essentials", amount: 2860, type: "expense", paymentMethod: "UPI" },
  { timestamp: "2026-09-06T09:44:00+05:30", category: "Utilities", subcategory: "Electricity", note: "Tata Power bill", amount: 2130, type: "expense", paymentMethod: "UPI" },
  { timestamp: "2026-09-12T10:15:00+05:30", category: "Supplies", subcategory: "Health", note: "Protein and recovery supplies", amount: 1920, type: "expense", paymentMethod: "UPI" },
];