import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Appbar, MD3LightTheme, PaperProvider } from 'react-native-paper';

import GitExplorer from './GitExplorer';

export default function App() {

  
  return (
    <PaperProvider theme={MD3LightTheme}>
      <Appbar.Header elevated>
        <Appbar.Content title="GitExplorer" />
      </Appbar.Header>
      <GitExplorer />
      <StatusBar style="auto" />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 150,
  },
});
