
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Users from "./pages/Users";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import DashboardLayout from "./components/layout/DashboardLayout";
import LoginForm from "./components/auth/LoginForm";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<LoginForm />} />
            
            {/* Dashboard Routes */}
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/users" element={<Users />} />
              <Route path="/products" element={<Products />} />
              <Route path="/orders" element={<Orders />} />
              
              {/* Redirect /dashboard to / */}
              <Route path="/dashboard" element={<Navigate to="/" replace />} />
              
              {/* Placeholder routes for future implementation */}
              <Route path="/categories" element={<div className="p-4"><h1 className="text-2xl font-bold">Categories Page</h1><p className="text-muted-foreground mt-2">Coming soon...</p></div>} />
              <Route path="/offers" element={<div className="p-4"><h1 className="text-2xl font-bold">Offers & Discounts</h1><p className="text-muted-foreground mt-2">Coming soon...</p></div>} />
              <Route path="/reports" element={<div className="p-4"><h1 className="text-2xl font-bold">Reports & Analytics</h1><p className="text-muted-foreground mt-2">Coming soon...</p></div>} />
              <Route path="/settings" element={<div className="p-4"><h1 className="text-2xl font-bold">Settings</h1><p className="text-muted-foreground mt-2">Coming soon...</p></div>} />
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
