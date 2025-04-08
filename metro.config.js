const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);
const {
    wrapWithReanimatedMetroConfig,
  } = require('react-native-reanimated/metro-config');

module.exports = config;
