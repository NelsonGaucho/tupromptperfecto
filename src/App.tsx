
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import InstagramHashtags from "./pages/InstagramHashtags";
import YoutubeHashtags from "./pages/YoutubeHashtags";
import XHashtags from "./pages/XHashtags";
import SEOKeywords from "./pages/SEOKeywords";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Para GitHub Pages, es mejor usar HashRouter en lugar de BrowserRouter
// ya que GitHub Pages no maneja bien las rutas de cliente
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/instagram-hashtags" element={<InstagramHashtags />} />
          <Route path="/youtube-hashtags" element={<YoutubeHashtags />} />
          <Route path="/x-hashtags" element={<XHashtags />} />
          <Route path="/seo-keywords" element={<SEOKeywords />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
