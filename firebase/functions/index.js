/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const fetch = require("node-fetch-commonjs");
const cheerio = require("cheerio")
// The Firebase Admin SDK to access Firestore.
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

initializeApp();
async function usingNodeFetch(link) {
    return await (await fetch(link)).text();
  }
  
// Take the text parameter passed to this HTTP endpoint and insert it into
// Firestore under the path /messages/:documentId/original
exports.addmessage = onRequest(async (req, res) => {
  // Grab the text parameter.
//   const original = req.query.text;
const original = req.body.link
// console.log(original)
  // Push the new message into Firestore using the Firebase Admin SDK.


  var content = [];

  const $ = cheerio.load(await usingNodeFetch(original));


  $("div.row.content div p").each(function () {
    const text = $(this).html().trim();
    if (text.startsWith("<img") || text.startsWith("▲")) {
      return;
    } else {
      content.push(text.replace("undefined", "").trim());
    }
  });

  let title = $("li.breadcrumb-item.active").text().trim().replace("\n", "");
  let date_source_author = `${$("div.created.slacken span")
    .eq(1)
    .text()
    .trim()
    .split(" ")[0]
    .replace(/\./g, "-")} / Cool3c / ${$("div.author a").text().trim()}`;

  const writeResult = await getFirestore()
    .collection("messages")
    .add(
        {
            "title": title,
            "date_source_author": date_source_author,
            "link": original,
            "content": content
        });
  // Send back a message that we've successfully written the message
  res.json({ result: `Message with ID: ${writeResult.id} added.` });
});
// Listens for new messages added to /messages/:documentId/original
// and saves an uppercased version of the message
// to /messages/:documentId/uppercase
// exports.makeuppercase = onDocumentCreated("/messages/{documentId}", (event) => {
//   // Grab the current value of what was written to Firestore.
//   const original = event.data.data().original;

//   // Access the parameter `{documentId}` with `event.params`
//   logger.log("Uppercasing", event.params.documentId, original);

//   const uppercase = original.toUpperCase();

//   // You must return a Promise when performing
//   // asynchronous tasks inside a function
//   // such as writing to Firestore.
//   // Setting an 'uppercase' field in Firestore document returns a Promise.
//   return event.data.ref.set({ uppercase }, { merge: true });
// });

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started

// // exports.helloWorld = onRequest((request, response) => {
// //   logger.info("Hello logs!", {structuredData: true});
// //   response.send("Hello from Firebase!");
// // });
