const { ICON } = require('./env.json')

module.exports = {
  expo: {
    name: 'rn-rxjs',
    slug: 'rn-rxjs',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './src/assets/images/icon.png',
    scheme: 'myapp',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './src/assets/images/splash.png',
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
      favicon: ICON,
    },
    android: {
      package: 'com.phucla.rnrxjs',
      googleServicesFile: './google-services.json',
    },
  },
}
