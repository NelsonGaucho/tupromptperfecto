
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import InstagramHashtags from "./pages/InstagramHashtags";
import YoutubeHashtags from "./pages/YoutubeHashtags";
import XHashtags from "./pages/XHashtags";
import SEOKeywords from "./pages/SEOKeywords";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import LegalNotice from "./pages/LegalNotice";
import NotFound from "./pages/NotFound";
import ApiSettings from "./pages/ApiSettings";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";

const queryClient = new QueryClient();

// Para GitHub Pages, es mejor usar HashRouter en lugar de BrowserRouter
// ya que GitHub Pages no maneja bien las rutas de cliente
const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
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
            <Route path="/api-settings" element={<ApiSettings />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/legal-notice" element={<LegalNotice />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
