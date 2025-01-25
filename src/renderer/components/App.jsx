import React, { useState, useEffect } from 'react';
import { Editor } from './Editor';
import { Onboarding } from './Onboarding';
import { ToastProvider, ToastViewport } from './ui/toast';
import { useToast } from '../hooks/use-toast';

const { ipcRenderer } = window.require('electron');
const Store = window.require('electron-store');
const store = new Store();

export default function App() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { toast, toasts } = useToast();

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
    toast({
      title: "Setup Complete",
      description: "Your WordPress blog is now connected!",
    });
  };

  return (
    <ToastProvider>
      <div className="fixed inset-0 flex flex-col">
        {showOnboarding && (
          <Onboarding
            onComplete={handleOnboardingComplete}
            onError={(msg) => toast({
              title: "Error",
              description: msg,
              variant: "destructive"
            })}
          />
        )}
        
        <Editor
          onError={(msg) => toast({
            title: "Error",
            description: msg,
            variant: "destructive"
          })}
          onSuccess={(msg) => toast({
            title: "Success",
            description: msg
          })}
        />

        <ToastViewport>
          {toasts.map((toast) => toast.element)}
        </ToastViewport>
      </div>
    </ToastProvider>
  );
} 