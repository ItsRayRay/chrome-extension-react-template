import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// Chrome extension storage adapter for Supabase
const chromeStorage = {
  getItem: (key: string): Promise<string | null> => {
    return new Promise((resolve) => {
      if (typeof chrome !== 'undefined' && chrome.storage) {
        chrome.storage.local.get([key], (result: { [key: string]: string }) => {
          resolve(result[key] || null)
        })
      } else {
        // Fallback to localStorage for development
        resolve(localStorage.getItem(key))
      }
    })
  },
  setItem: (key: string, value: string): Promise<void> => {
    return new Promise((resolve) => {
      if (typeof chrome !== 'undefined' && chrome.storage) {
        chrome.storage.local.set({ [key]: value }, () => {
          resolve()
        })
      } else {
        // Fallback to localStorage for development
        localStorage.setItem(key, value)
        resolve()
      }
    })
  },
  removeItem: (key: string): Promise<void> => {
    return new Promise((resolve) => {
      if (typeof chrome !== 'undefined' && chrome.storage) {
        chrome.storage.local.remove([key], () => {
          resolve()
        })
      } else {
        // Fallback to localStorage for development
        localStorage.removeItem(key)
        resolve()
      }
    })
  }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: chromeStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
})
