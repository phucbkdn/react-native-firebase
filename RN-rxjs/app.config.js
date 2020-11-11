const { FAVICON, SPLASH, ICON, GOOGLE_SERVICES_PATH } = require('./env.json')

module.exports = {
  expo: {
    name: 'rn-rxjs',
    slug: 'rn-rxjs',
    version: '1.0.0',
    orientation: 'portrait',
    icon: ICON,
    scheme: 'myapp',
    userInterfaceStyle: 'automatic',
    splash: {
      image: SPLASH,
      resizeMode: 'contain',
      backgroundColor: '#fff',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.phucla.rnrxjs',
    },
    web: {
      favicon: FAVICON,
    },
    android: {
      package: 'com.phucla.rnrxjs',
      googleServicesFile: GOOGLE_SERVICES_PATH,
    },
  },
}
