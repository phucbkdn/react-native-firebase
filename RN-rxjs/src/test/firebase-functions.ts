import functions from 'firebase-functions-test'
import * as admin from 'firebase-admin'
import * as path from 'path'

// you can check all these information in firebase console/settings
const projectConfig = {
  databaseURL: 'https://products-management-db74a.firebaseio.com',
  storageBucket: 'products-management-db74a.appspot.com',
  projectId: 'products-management-db74a',
}

const testEnv = functions(
  projectConfig,
  path.resolve('service-account-file.json')
)
export default testEnv
