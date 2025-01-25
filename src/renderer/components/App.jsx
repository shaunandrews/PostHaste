import React, { useState, useEffect } from 'react';
import { Editor } from './Editor';
import { Onboarding } from './Onboarding';

const { ipcRenderer } = window.require('electron');
const Store = window.require('electron-store');
const store = new Store();

export default function App() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    checkOnboarding();
  }, []);

  const checkOnboarding = async () => {
    try {
      const savedBlogUrl = store.get('blogUrl');
      let credentials = null;
      
      try {
        credentials = await ipcRenderer.invoke('get-credentials');
      } catch (error) {
        console.log('No credentials found:', error.message);
      }

      if (!savedBlogUrl || !credentials?.username) {
        setShowOnboarding(true);
      }
    } catch (error) {
      console.error('Error in checkOnboarding:', error);
      setShowOnboarding(true);
    }
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    console.log("Setup Complete: Your WordPress blog is now connected!");
  };

  return (
    <div className="fixed inset-0 flex flex-col">
      {showOnboarding && (
        <Onboarding
          onComplete={handleOnboardingComplete}
          onError={(msg) => console.error("Error:", msg)}
        />
      )}
      
      <Editor
        onError={(msg) => console.error("Error:", msg)}
        onSuccess={(msg) => console.log("Success:", msg)}
      />
    </div>
  );
} 