import React from "react";
import Header from "./components/layouts/Header";
import Main from "./components/layouts/Main";
import Footer from "./components/layouts/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/sonner";

const App: React.FC = () => {
  // Configuração do QueryClient para gerenciar o cache e as requisições
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        staleTime: 1000 * 60 * 5,
        retry: 1,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Main />
      <Footer />
      <Toaster
        position="top-center"
        richColors
        toastOptions={{
          duration: 3000,
        }}
      />
    </QueryClientProvider>
  );
};

export default App;
