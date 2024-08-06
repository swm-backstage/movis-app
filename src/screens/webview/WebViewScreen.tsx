import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { mainNavigations } from '../../constants/navigations';
import { MainStackParamList } from '../../navigations/MainStackNavigator';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type WebViewScreenProps = StackScreenProps<
  MainStackParamList,
  typeof mainNavigations.WEBVIEW
>;

function WebViewScreen({ route, navigation }: WebViewScreenProps) {

  const { clubId } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        style={styles.webview}
        // source={{ uri: `https://movis.klr.kr/clubs/${clubId}` }}
        source={{ uri: `https://movis.klr.kr` }}
      />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  webview: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
  },
});

export default WebViewScreen;