import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { ReservasContext, ReservasProvider } from './components/context/ReservasContext';
import { DateProvider } from './components/context/DateContext';
import { RootSiblingParent } from 'react-native-root-siblings';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <RootSiblingParent>
          <DateProvider>
            <ReservasProvider>
              <Navigation colorScheme={colorScheme} />
            </ReservasProvider>
          </DateProvider>
        </RootSiblingParent>
      </SafeAreaProvider>
    );
  }
}
