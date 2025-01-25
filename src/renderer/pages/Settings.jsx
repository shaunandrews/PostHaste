import React, { useState, useEffect } from 'react';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { useToast } from '../hooks/use-toast';
import { wordPressService } from '../services/wordpress';

const { ipcRenderer } = window.require('electron');
const Store = window.require('electron-store');
const store = new Store();

export default function Settings() {
  const { toast } = useToast();
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [formData, setFormData] = useState({
    blogUrl: '',
    username: '',
    password: '',
    enableReminders: false,
    reminderTime: '09:00',
    keepOnTop: false
  });

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

  const testConnection = async () => {
    try {
      setIsTestingConnection(true);
      await wordPressService.testConnection();
      toast({
        title: "Success",
        description: "Successfully connected to WordPress!"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsTestingConnection(false);
    }
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

      toast({
        title: "Success",
        description: "Settings saved successfully!"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Error saving settings: " + error.message,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="p-3">
      <div className="grid grid-cols-2 gap-4">
        {/* Left Column - Credentials */}
        <div className="bg-background rounded-lg p-3 border">
          <h3 className="text-base font-semibold mb-3">WordPress Credentials</h3>
          
          <div className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="blogUrl" className="text-sm font-medium">WordPress URL</Label>
              <Input
                type="url"
                id="blogUrl"
                name="blogUrl"
                value={formData.blogUrl}
                onChange={handleChange}
                placeholder="https://yourblog.com"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="username" className="text-sm font-medium">Username</Label>
              <Input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="password" className="text-sm font-medium">Application Password</Label>
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
        <div className="bg-muted rounded-lg p-3">
          <h3 className="text-base font-semibold mb-3">Preferences</h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="keepOnTop" className="text-sm font-medium cursor-pointer">Keep window on top</Label>
              <Switch
                id="keepOnTop"
                name="keepOnTop"
                checked={formData.keepOnTop}
                onCheckedChange={(checked) => {
                  setFormData(prev => ({ ...prev, keepOnTop: checked }));
                  store.set('keepOnTop', checked);
                  ipcRenderer.invoke('set-always-on-top', checked);
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="enableReminders" className="text-sm font-medium cursor-pointer">Enable Reminders</Label>
              <Switch
                id="enableReminders"
                name="enableReminders"
                checked={formData.enableReminders}
                onCheckedChange={(checked) => {
                  setFormData(prev => ({ ...prev, enableReminders: checked }));
                  store.set('enableReminders', checked);
                }}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="reminderTime" className="text-sm font-medium">Reminder Time</Label>
              <Input
                type="time"
                id="reminderTime"
                name="reminderTime"
                value={formData.reminderTime}
                onChange={handleChange}
                onBlur={() => store.set('reminderTime', formData.reminderTime)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end pt-3 mt-3 border-t">
        <Button onClick={handleSave}>
          Save Settings
        </Button>
      </div>
    </div>
  );
} 