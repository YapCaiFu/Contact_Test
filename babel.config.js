module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@screen': './src/screen',
          '@screen/*': './src/screen/*',
          '@store/*': './src/store/*',
          '@store': './src/store',
          '@data/*': './src/data/*',
          '@data': './src/data',
        },
      },
    ],
  ],
};
