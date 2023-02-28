import {useCallback} from 'react';
import {Linking ,Platform ,StyleSheet} from 'react-native';
import WebView from 'react-native-webview';
import * as Clipboard from 'expo-clipboard';

export default function App() {
  const onMessage = useCallback(event => {
    Clipboard.setStringAsync(event.nativeEvent.data)
  }, []);

  const onNavigationStateChange=(webViewState)=>{
    let newUrl = webViewState.url
    /*Your navigation logic*/
    console.log('newUrl: ' + newUrl)
 }

  // const onNavigationStateChange=(event) => {
  //   console.log('event.url: ' + event.url)
  //   if (event.url !== uri) {
  //     this.webview.stopLoading();
  //     Linking.openURL(event.url);
  //   }
  // }

  // const onShouldStartLoadWithRequest=(event) => {
  //   console.log('event.url: ' + event.url)
  //   const isExternalLink =
  //     Platform.OS === 'ios'
  //       ? event.navigationType === 'click'
  //       : true
  //   if (event.url !== 'about:blank' && isExternalLink) {
  //     Linking.openURL(event.url)
  //       return false
  //     }
  //   return true
  // }

  const onShouldStartLoadWithRequest=(event) => {
    console.log('event.url: ' + event.url)
    if (event.url !== uri) {
        Linking.openURL(event.url)
        return false
    }
    return true
  }

  const injectedCode = `
  const onPaste = useCallback(async() => {
    const readText = await navigator.clipboard.readText();
    setText(readText);
  },[]);
  `



  const uri = 'uri'

  js= `
  setTimeout( function(){window.postMessage("ok") }, 0 )
`
  return (
    <WebView
      ref={r => webview = r}
      style={styles.cpmtaomer}
      source={{uri: uri}}
      onMessage={onMessage}
      // onAccessibilityAction={e => console.log('onAccessibilityAction: ' + e.eventPhase)}
      // onAccessibilityTap={e => console.log('onAccessibilityTap: ' + e.eventPhase)}
      // onPointerDown={e => console.log('onPointerDown: ' + e.eventPhase)}
      // onPointerEnter={e => console.log('onPointerEnter: ' + e.eventPhase)}
      // onNavigationStateChange={onNavigationStateChange}
      // onPointerDown={onNavigationStateChange}
      // onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
      // injectedJavascriptBeforeContentLoaded={injectedCode}
      // injectedJavaScript={js}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
