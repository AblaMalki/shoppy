import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { Navbar, Sidebar, ThemeSettings } from './components';
import {
  Dashboard,
  Orders,
  Calendar,
  Team,
  Stacked,
  Customers,
  Kanban,
  Area,
  Bar,
  Pie,
  Line,
} from './pages';
import { useStateContext } from './contexts/ContextProvider';

import './App.css';

const App = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  // to get the current Color Mode and the current Theme after
  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        <div className="flex relative dark:bg-bgDark bg-bgLight">
          {/* The Settings Button */}
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            <TooltipComponent content="Settings" position="top">
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                className="text-3xl p-3 hover:drop-shadow-xl hover:bg-gray-100 text-white rounded-full"
                style={{ background: currentColor }}
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
          {/* The Sidebar */}
          {activeMenu ? (
            <div className="w-64 fixed sidebar dark:bg-cardDark bg-white">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-bgDark">
              <Sidebar />
            </div>
          )}
          {/* Navigation */}
          <div
            className={`dark:bg-bgDark bg-bgLight min-h-screen w-full ${
              activeMenu ? 'md:ml-64' : 'flex-2'
            }`}
          >
            <div className="fixed md:static bg-white dark:bg-cardDark navbar w-full">
              <Navbar />
            </div>

            <div>
              {themeSettings && <ThemeSettings />}
              <Routes>
                {/* Home Screen : Dashboard */}
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />

                {/* Pages */}
                <Route path="/orders" element={<Orders />} />
                <Route path="/team" element={<Team />} />
                <Route path="/customers" element={<Customers />} />

                {/* Apps */}
                <Route path="/kanban" element={<Kanban />} />
                <Route path="/calendar" element={<Calendar />} />

                {/* Charts */}
                <Route path="/line" element={<Line />} />
                <Route path="/area" element={<Area />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/stacked" element={<Stacked />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;