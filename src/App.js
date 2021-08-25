import React from 'react';
import { extendTheme, ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import '@fontsource/open-sans/600.css';
import '@fontsource/open-sans/700.css';

import Routes from './Routes';

const queryClient = new QueryClient();

const theme = extendTheme({
  fonts: {
    heading: 'Open Sans',
    body: 'Open Sans',
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Routes />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
