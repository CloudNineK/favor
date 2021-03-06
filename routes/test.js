const serviceAccount = require('./service-account.json');
const admin = require('firebase-admin');
const casual = require('casual');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bounty-crowd-app.firebaseio.com"
});

const db = admin.firestore();

const bounties = db.collection('bounties');

const categories = [
  "Technology",
  "Crafts",
  "Gaming",
  "Art",
  "Music",
  "Misc.",
]

const cat = () => categories[Math.floor(Math.random() * 6)]


const addBounty = async () => {
  let card = {
    user: casual.first_name,
    subject: casual.title,
    description: casual.text,
    category: cat(),
    backers: 0,
    bounty: Math.floor(Math.random()*300)
  }
  console.log(card)
  let doc = await bounties.add(card)
  console.log(doc.id)
}

let i;
for (i = 0; i < 10; i++) {
  addBounty();
}