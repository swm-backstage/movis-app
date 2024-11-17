const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
// const config = {};

// module.exports = mergeConfig(getDefaultConfig(__dirname), config);
// module.exports = (async () => {
//     const {
//       resolver: { sourceExts, assetExts }
//     } = await getDefaultConfig();
//     return {
//       transformer: {
//         babelTransformerPath: require.resolve(
//           "react-native-svg-transformer/react-native"
//         )
//       },
//       resolver: {
//         assetExts: assetExts.filter((ext) => ext !== "svg"),
//         sourceExts: [...sourceExts, "svg"]
//       }
//     };
//   })();


module.exports = (async () => {
  // 기본 설정 가져오기
  const defaultConfig = await getDefaultConfig(__dirname);

  // 기본 설정에서 resolver 부분 추출
  const {
    resolver: { sourceExts, assetExts },
  } = defaultConfig;

  // 사용자 정의 설정 정의
  const config = {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer/react-native'),
    },
    resolver: {
      // 'svg'를 assetExts에서 제거하고 sourceExts에 추가
      assetExts: assetExts.filter((ext) => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
    },
  };

  // 기본 설정과 사용자 정의 설정 병합
  return mergeConfig(defaultConfig, config);
})();
