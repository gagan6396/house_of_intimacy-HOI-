import './assets/css/App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { useState } from 'react';

import initialTheme from './theme/theme';

// PAGES & COMPONENTS
import Home from 'components/Home';
import SignIn from 'views/auth/signIn';
import Header from 'components/Header';
import Footer from 'components/Footer';
import CreateNewUser from "views/auth/CreateNewUser"; // ⬅️ ADD THIS

// LAYOUTS
import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';

// 🌙 DARK MODE FLOAT BUTTON
import FixedPlugin from '../src/components/Dashboard/fixedPlugin/FixedPlugin';
import ProtectedRoute from 'components/ProtectedRoute';
import PublicRoute from 'components/PublicRoute';

export default function Main() {
  const [currentTheme, setCurrentTheme] = useState(initialTheme);
  const location = useLocation();

  // Hide Header on these routes
  const hideHeader =
    location.pathname.startsWith('/admin') ||
    location.pathname.startsWith('/auth') ||
    location.pathname === '/login';

  const hideFooter = location.pathname.startsWith('/admin')|| location.pathname.startsWith('/auth') || location.pathname === '/login';

  return (
    <ChakraProvider theme={currentTheme}>
      {/* APP LAYOUT WRAPPER */}
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* HEADER (conditionally hidden) */}
        {!hideHeader && <Header />}

        {/* MAIN CONTENT – takes remaining height */}
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="auth/*" element={<AuthLayout />} />

            <Route
              path="admin/*"
              element={
                <ProtectedRoute>
                  <AdminLayout
                    theme={currentTheme}
                    setTheme={setCurrentTheme}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/login"
              element={
                <PublicRoute>
                  <SignIn />
                </PublicRoute>
              }
            />

            <Route
              path="/auth/create_new_user"
              element={
                <PublicRoute>
                  <CreateNewUser />
                </PublicRoute>
              }
            />

            {/* HOME PAGE */}
            <Route path="/" element={<Home />} />
          </Routes>
        </div>

        {/* 🌙 DARK MODE BUTTON */}
        <FixedPlugin />

        {/* FOOTER */}
        {!hideFooter && <Footer />}
      </div>
    </ChakraProvider>
  );
}

