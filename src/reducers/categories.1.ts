// import React from 'react'
// import { render } from '@testing-library/react'
// import { pipe } from 'ramda'
// import * as firebase from 'firebase'

// import CounterReducer$, { counterActions } from './categories'

// const set = jest.fn();
// const onAuthStateChanged = jest.fn()

// const getRedirectResult = jest.fn(() => {
//   return Promise.resolve({
//     user: {
//       displayName: 'redirectResultTestDisplayName',
//       email: 'redirectTest@test.com',
//       emailVerified: true
//     }
//   })
// })

// const createUserWithEmailAndPassword = jest.fn(() => {
//   return Promise.resolve('result of createUserWithEmailAndPassword')
// })

// const signInWithEmailAndPassword = jest.fn(() => {
//   return Promise.resolve('result of signInWithEmailAndPassword')
// })

// jest
//   .spyOn(firebase, 'initializeApp')
//   .mockImplementation(() => {
//     return {
//       auth: () => {
//         return {
//           createUserWithEmailAndPassword,
//           signInWithEmailAndPassword,
//         }
//       },
//       database: jest.fn(() => ({
//         ref: jest.fn(() => ({
//           push: jest.fn(() => ({
//             set,
//           })),
//         })),
//       })),
//     }
//   })

// jest.spyOn(firebase, 'auth').mockImplementation(() => {
//   return {
//     onAuthStateChanged,
//     currentUser: {
//       displayName: 'testDisplayName',
//       email: 'test@test.com',
//       emailVerified: true
//     },
//     getRedirectResult
//   }
// })

// jest.spyOn(firebase, 'database').mockImplementation(() => {
//   return {
//     ref: jest.fn(() => ({
//       push: jest.fn(() => ({
//         set,
//       })),
//     })),
//   }
// })

// // describe('handle increment, descrement and reset', (t) => {
// //   CounterReducer$.take(5).toArray().subscribe((fns) => {
// //     t.is(pipe(...fns)(), 9);
// //   });

// //   counterActions.increment.next(1);
// //   counterActions.reset.next();
// //   counterActions.increment.next(10);
// // })

// describe('CampaignItem component', () => {
//   test('Render component without props', (t) => {
//     CounterReducer$.take(5).toArray().subscribe((fns) => {
//       t.is(pipe(...fns)(), 9);
//     });

//     counterActions.increment.next(1);
//     counterActions.reset.next();
//     counterActions.increment.next(10);
//   })
// })
