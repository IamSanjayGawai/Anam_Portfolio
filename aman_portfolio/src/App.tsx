
// import HeroPage from './pages/HeroPage'
// import HomePage from './pages/HomePage'
// import { Toaster } from  "./components/ui/toaster";
// import { Toaster as Sonner } from "./components/ui/sonner";
// import { TooltipProvider } from "./components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import NotFound from "./pages/NotFound";
// import AddProject from './admin/addProject';

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<HeroPage onProceed={function (): void {
//             throw new Error('Function not implemented.');
//           } }/>}  />
//            <Route path='/home' element={<HomePage />} />
//            <Route path='/admin' element={<AddProject />}></Route>

//           {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;



import HeroPage from './pages/HeroPage';
import HomePage from './pages/HomePage';
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import AddProject from './admin/Dashboard';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HeroPage onProceed={function (): void {
              throw new Error('Function not implemented.');
            }} />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/admin' element={
              <ProtectedRoute>
                <AddProject />
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;