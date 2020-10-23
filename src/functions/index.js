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
