import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import defaultConfig from '../config/eventConfig';

const EventConfigContext = createContext(null);

const STORAGE_KEY = 'tk-admin-config';

function applyTheme(theme) {
  const root = document.documentElement;
  if (theme.bg) root.style.setProperty('--bg', theme.bg);
  if (theme.sf) root.style.setProperty('--sf', theme.sf);
  if (theme.ink) root.style.setProperty('--ink', theme.ink);
  if (theme.soft) root.style.setProperty('--soft', theme.soft);
  if (theme.ac) root.style.setProperty('--ac', theme.ac);
}

function deepMerge(target, source) {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (
      source[key] &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key]) &&
      target[key] &&
      typeof target[key] === 'object' &&
      !Array.isArray(target[key])
    ) {
      result[key] = deepMerge(target[key], source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}

function loadConfig() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const overrides = JSON.parse(saved);
      const oldAddress = overrides.venue?.address?.toUpperCase() || '';
      if (
        overrides.venue?.name === 'Trung tâm Hội nghị White Palace' ||
        oldAddress.includes('PHƯỜNG CỦA NAM') ||
        (!overrides.registrationUrl && overrides.title === 'GTISD - CAFE CÔNG NGHỆ XANH')
      ) {
        const migrated = deepMerge(overrides, defaultConfig);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
        return migrated;
      }
      return deepMerge(defaultConfig, overrides);
    }
  } catch (e) { /* ignore */ }
  return { ...defaultConfig };
}

export function EventConfigProvider({ children }) {
  const [config, setConfig] = useState(loadConfig);

  // Apply theme CSS variables on mount and when theme changes
  useEffect(() => {
    applyTheme(config.theme);
  }, [config.theme]);

  const updateConfig = useCallback((partial) => {
    setConfig((prev) => {
      const next = deepMerge(prev, partial);
      try {
        // Save only the diff from defaults
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (e) { /* ignore */ }
      return next;
    });
  }, []);

  const replaceConfig = useCallback((full) => {
    setConfig(full);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(full));
    } catch (e) { /* ignore */ }
  }, []);

  const resetConfig = useCallback(() => {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) { /* ignore */ }
    const fresh = { ...defaultConfig };
    setConfig(fresh);
    applyTheme(fresh.theme);
  }, []);

  return (
    <EventConfigContext.Provider value={{ config, updateConfig, replaceConfig, resetConfig, defaultConfig }}>
      {children}
    </EventConfigContext.Provider>
  );
}

export function useConfig() {
  const ctx = useContext(EventConfigContext);
  if (!ctx) throw new Error('useConfig must be used within EventConfigProvider');
  return ctx;
}

export default EventConfigContext;
