import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, Dimensions, SafeAreaView, StyleSheet } from 'react-native';
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
  const [receivedData, setReceivedData] = useState('');
  const webViewRef = useRef<WebView>(null);
  const [isCanGoBack, setIsCanGoBack] = useState(false);

  const onPressHardwareBackButton = () => {
    if (webViewRef.current && isCanGoBack) {
      webViewRef.current.goBack();
      return true;
    } 
    else {
      return false;
    }
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onPressHardwareBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onPressHardwareBackButton);
    }
  }, [isCanGoBack]);

  useEffect(() => {
    if (webViewRef.current && receivedData) {
      console.log('React로 보낼 데이터: ', receivedData);
      webViewRef.current.postMessage(receivedData);
      navigation.navigate(mainNavigations.EVENT_CREATE, { clubId: clubId });
    }
  }, [receivedData, webViewRef.current]);

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webViewRef}
        // source={{ uri: `https://movis.klr.kr/clubs/${clubId}` }}
        source={{ uri: `https://movis.klr.kr` }}
        onMessage={({ nativeEvent: state }) => {
          if (state.data === 'navigationStateChange') {
            setIsCanGoBack(state.canGoBack);
            return;
          }
          setReceivedData(state.data);
        }}
        onLoadStart={() => webViewRef.current.injectJavaScript(`
          (function() {
            function wrap(fn) {
              return function wrapper() {
                var res = fn.apply(this, arguments);
                window.ReactNativeWebView.postMessage('navigationStateChange');
                return res;
              }
            }
      
            history.pushState = wrap(history.pushState);
            history.replaceState = wrap(history.replaceState);
            window.addEventListener('popstate', function() {
              window.ReactNativeWebView.postMessage('navigationStateChange');
            });
          })();
      
          true;
        `)}
        style={styles.webview}
      />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
  },
});

export default WebViewScreen;
