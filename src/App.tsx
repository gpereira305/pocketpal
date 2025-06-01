import React from "react";
import Header from "./components/layouts/Header";
import Main from "./components/layouts/Main";
import Footer from "./components/layouts/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const App: React.FC = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Main />
      <Footer />
    </QueryClientProvider>
  );
};

export default App;
