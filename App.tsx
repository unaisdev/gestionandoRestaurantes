import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { ReservasContext, ReservasProvider } from './components/context/ReservasContext';
import { DateProvider } from './components/context/DateContext';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <DateProvider>

          <ReservasProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </ReservasProvider>
        </DateProvider>

      </SafeAreaProvider>
    );
  }
}
