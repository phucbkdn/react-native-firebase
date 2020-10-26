// import firebase functions modules
const functions = require('firebase-functions')
// import admin module
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)

exports.basicTest = function () {
  const a = 1
  const b = 5
  return a + b
}

/**
 * onCreate function trigger
 */
exports.upperCaseText = functions.firestore
  .document('messages/{messageId}')
  .onCreate((snap, context) => {
    // Get snapshot data
    const value = snap.data()
    let { message } = value
    message = message.toUpperCase()

    // Update new value
    return snap.ref.set({ message }, { merge: true })
  })

exports.updateMessage = functions.firestore
  .document('messages/{messageId}')
  .onUpdate((change, context) => {
    const newValue = change.after.data()
    const previousValue = change.before.data()

    return change.before.ref.set(
      { newValue: newValue.message, previousValue: previousValue.message },
      { merge: true }
    )
  })

exports.addMessage = functions.https.onRequest(async (req, res) => {
  const original = req.query.text
  const snapshot = await admin
    .firestore()
    .collection('messages')
    .add({ original })
  res.json({ result: `Message with ID: ${snapshot.id} added` })
})
