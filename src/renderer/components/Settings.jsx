import React, { useState, useEffect } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { wordPressService } from '../services/wordpress';

const { ipcRenderer } = window.require('electron');
const Store = window.require('electron-store');
const store = new Store();

export function Settings({ isOpen, onToggle, onClose, onError, onSuccess }) {
  const [formData, setFormData] = useState({
    blogUrl: '',
    username: '',
    password: '',
    enableReminders: false,
    reminderTime: '09:00',
    keepOnTop: false
  });
  const [isTestingConnection, setIsTestingConnection] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = () => {
    setFormData({
      blogUrl: store.get('blogUrl', ''),
      username: store.get('username', ''),
      password: '',
      enableReminders: store.get('enableReminders', false),
      reminderTime: store.get('reminderTime', '09:00'),
      keepOnTop: store.get('keepOnTop', false)
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async () => {
    try {
      store.set('blogUrl', formData.blogUrl);
      store.set('username', formData.username);
      store.set('enableReminders', formData.enableReminders);
      store.set('reminderTime', formData.reminderTime);
      store.set('keepOnTop', formData.keepOnTop);

      // Update window behavior immediately
      await ipcRenderer.invoke('set-always-on-top', formData.keepOnTop);

      if (formData.password) {
        await ipcRenderer.invoke('save-credentials', {
          username: formData.username,
          password: formData.password
        });
        setFormData(prev => ({ ...prev, password: '' }));
      }

      onSuccess('Settings saved successfully!');
      onClose();
    } catch (error) {
      onError('Error saving settings: ' + error.message);
    }
  };

  const testConnection = async () => {
    try {
      if (!formData.blogUrl.trim()) {
        onError('Please enter your WordPress URL');
        return;
      }

      setIsTestingConnection(true);
      await wordPressService.testConnection();
      onSuccess('Successfully connected to WordPress!');
    } catch (error) {
      onError(error.message);
    } finally {
      setIsTestingConnection(false);
    }
  };

  return (
    <>
      <button
        onClick={onToggle}
        className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground"
        title="Settings"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="w-[800px] max-h-[90vh] rounded-lg border bg-card shadow-lg">
            <div className="p-6 overflow-auto">
              <div className="grid grid-cols-2 gap-6">
                {/* Left Column - Credentials */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">WordPress Credentials</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="blogUrl">WordPress URL</Label>
                      <Input
                        type="url"
                        id="blogUrl"
                        name="blogUrl"
                        value={formData.blogUrl}
                        onChange={handleChange}
                        placeholder="https://yourblog.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Application Password</Label>
                      <Input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>

                    <Button
                      variant="outline"
                      onClick={testConnection}
                      disabled={isTestingConnection}
                      className="w-full"
                    >
                      {isTestingConnection ? 'Testing...' : 'Test Connection'}
                    </Button>
                  </div>
                </div>

                {/* Right Column - Other Settings */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Preferences</h3>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="keepOnTop"
                        name="keepOnTop"
                        checked={formData.keepOnTop}
                        onCheckedChange={(checked) => 
                          setFormData(prev => ({ ...prev, keepOnTop: checked }))
                        }
                      />
                      <Label htmlFor="keepOnTop">Keep window on top</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="enableReminders"
                        name="enableReminders"
                        checked={formData.enableReminders}
                        onCheckedChange={(checked) => 
                          setFormData(prev => ({ ...prev, enableReminders: checked }))
                        }
                      />
                      <Label htmlFor="enableReminders">Enable Reminders</Label>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reminderTime">Reminder Time</Label>
                      <Input
                        type="time"
                        id="reminderTime"
                        name="reminderTime"
                        value={formData.reminderTime}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end space-x-2 pt-6 mt-6 border-t">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  Save Settings
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 