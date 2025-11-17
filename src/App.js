import './assets/css/App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import initialTheme from './theme/theme';

import { useState } from 'react';

import Home from 'components/Home';
import SignIn from 'views/auth/signIn';
import Header from 'components/Header';
import Footer from 'components/Footer';
import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';
import RTLLayout from './layouts/rtl';

export default function Main() {
  const [currentTheme, setCurrentTheme] = useState(initialTheme);
  const location = useLocation();

  // pages where header should NOT be shown
  const hideHeader =
    location.pathname.startsWith('/admin') ||
    location.pathname.startsWith('/auth') ||
    location.pathname === '/login';

  return (
    <ChakraProvider theme={currentTheme}>

      {/* SHOW HEADER ONLY WHEN NEEDED */}
      {!hideHeader && <Header />}

      <Routes>
        <Route path="auth/*" element={<AuthLayout />} />
        <Route
          path="admin/*"
          element={
            <AdminLayout theme={currentTheme} setTheme={setCurrentTheme} />
          }
        />
        <Route
          path="rtl/*"
          element={<RTLLayout theme={currentTheme} setTheme={setCurrentTheme} />}
        />
        <Route path="/login" element={<SignIn />} />
        <Route path="/" element={<Home />} />
      </Routes>

      {/* Footer (optional — you can do same hiding logic if needed) */}
      <Footer />
    </ChakraProvider>
  );
}
