import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { mainNavigations } from '../../constants/navigations';
import { MainStackParamList } from '../../navigations/MainStackNavigator';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const injectedJavascript = `
      (function() {
        function wrap(fn) {
          return function wrapper() {
            var res = fn.apply(this, arguments);
  
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'navigationStateChange'
            }));
            return res;
          }
        }
  
        history.pushState = wrap(history.pushState);
        history.replaceState = wrap(history.replaceState);
        window.addEventListener('popstate', function() {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'navigationStateChange'
          }));
        });
      })();
  
      true;
    `

type WebViewScreenProps = StackScreenProps<
  MainStackParamList,
  typeof mainNavigations.WEBVIEW
>;

function WebViewScreen({ route, navigation }: WebViewScreenProps) {
  const { clubId } = route.params;
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
  const onMessage = ({ nativeEvent: e }: WebViewMessageEvent) => {
    const data = JSON.parse(e.data);
    if (data.type === 'navigationStateChange') {
      setIsCanGoBack(e.canGoBack);
    } else if (data.type === 'eventCreate') {
      navigation.navigate(mainNavigations.EVENT_CREATE, { clubId: data.clubId });
    } else if (data.type === 'eventConfig') {
      
    }
  };
  const onLoad = () => {
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(injectedJavascript);
      webViewRef.current.postMessage(JSON.stringify({
        isChongmu: true,
      }));
    }
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onPressHardwareBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onPressHardwareBackButton);
    }
  }, [isCanGoBack]);

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ uri: `https://movis.klr.kr/clubs/${clubId}` }}
        // source={{ uri: `http://10.0.2.2:3000/` }}
        onMessage={onMessage}
        onLoad={onLoad}
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
