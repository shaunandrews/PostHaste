import React, { useState, useEffect } from 'react';
import { Input } from '../../components/Interface/Input';
import { Button } from '../../components/Interface/Button';
import { FieldsetSwitch } from '../../components/Interface/FieldsetSwitch';
import { Fieldset } from '../../components/Interface/Fieldset';
import { wordPressService } from '../../services/wordpress';
import styles from './Settings.module.css';
import { Internet, PeopleTag, Lock } from "iconoir-react"

const { ipcRenderer } = window.require('electron');
const Store = window.require('electron-store');
const store = new Store();

const REMINDER_FREQUENCIES = [
  { value: 1/3, label: 'Every 20 seconds' },
  { value: 5, label: 'Every 5 minutes' },
  { value: 15, label: 'Every 15 minutes' },
  { value: 30, label: 'Every 30 minutes' },
  { value: 60, label: 'Every hour' },
  { value: 120, label: 'Every 2 hours' },
  { value: 240, label: 'Every 4 hours' },
];

export default function Settings() {
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [isEditingCredentials, setIsEditingCredentials] = useState(false);
  const [originalData, setOriginalData] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [siteIcon, setSiteIcon] = useState(null);
  const [formData, setFormData] = useState({
    blogUrl: '',
    username: '',
    password: '',
    enableReminders: false,
    reminderFrequency: 30,
    keepOnTop: false,
    showTitleField: true,
    defaultTags: ''
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = () => {
    const settings = {
      blogUrl: store.get('blogUrl', ''),
      username: store.get('username', ''),
      password: '',
      enableReminders: store.get('enableReminders', false),
      reminderFrequency: store.get('reminderFrequency', 30),
      keepOnTop: store.get('keepOnTop', false),
      showTitleField: store.get('showTitleField', true),
      defaultTags: store.get('defaultTags', '')
    };
    setFormData(settings);
    setOriginalData(settings);
    
    // Load cached site icon
    const cachedIcon = store.get('siteIcon');
    if (cachedIcon) {
      setSiteIcon(cachedIcon);
    }
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
      setConnectionStatus(null);
      await wordPressService.testConnection();
      
      // After successful connection, try to get the site icon
      const iconUrl = await wordPressService.getSiteIcon();
      setSiteIcon(iconUrl);
      
      setConnectionStatus('success');
      // Hide success message after 3 seconds
      setTimeout(() => {
        setConnectionStatus(null);
      }, 3000);
      
      console.log("Success: Successfully connected to WordPress!");
    } catch (error) {
      setConnectionStatus('error');
      console.error("Error:", error.message);
    } finally {
      setIsTestingConnection(false);
    }
  };

  const handleResetCredentials = async () => {
    try {
      // Clear electron-store values
      store.delete('blogUrl');
      store.delete('username');
      store.delete('siteIcon');
      setSiteIcon(null);
      
      // Clear keychain password
      const username = store.get('username');
      if (username) {
        await ipcRenderer.invoke('delete-credentials', username);
      }
      
      // Reset form data
      setFormData(prev => ({
        ...prev,
        blogUrl: '',
        username: '',
        password: ''
      }));

      console.log("Success: Credentials reset successfully!");
    } catch (error) {
      console.error('Error resetting credentials:', error);
    }
  };

  const handleReminderToggle = async (checked) => {
    if (checked) {
      // Request notification permissions if enabling for the first time
      const result = await ipcRenderer.invoke('request-notification-permission');
      if (!result) {
        // If permission denied, don't enable reminders
        return;
      }
    }
    
    // Update state and save immediately
    setFormData(prev => ({ ...prev, enableReminders: checked }));
    store.set('enableReminders', checked);
    await ipcRenderer.invoke('update-reminder-settings');
  };

  const handleReminderFrequencyChange = async (e) => {
    const { value } = e.target;
    // Update state and save immediately
    setFormData(prev => ({ ...prev, reminderFrequency: value }));
    store.set('reminderFrequency', value);
    await ipcRenderer.invoke('update-reminder-settings');
  };

  const handleEdit = () => {
    setIsEditingCredentials(true);
    setOriginalData(formData);
    setConnectionStatus(null);
  };

  const handleCancel = () => {
    setIsEditingCredentials(false);
    setConnectionStatus(null);
    loadSettings(); // Reset any unsaved changes
  };

  const hasChanges = () => {
    if (!originalData) return false;
    return (
      formData.blogUrl !== originalData.blogUrl ||
      formData.username !== originalData.username ||
      formData.password !== '' // Any password input is considered a change
    );
  };

  const handleSave = async () => {
    try {
      store.set('blogUrl', formData.blogUrl);
      store.set('username', formData.username);
      store.set('keepOnTop', formData.keepOnTop);
      store.set('showTitleField', formData.showTitleField);
      store.set('defaultTags', formData.defaultTags);

      // Update window behavior immediately
      await ipcRenderer.invoke('set-always-on-top', formData.keepOnTop);

      if (formData.password) {
        await ipcRenderer.invoke('save-credentials', {
          username: formData.username,
          password: formData.password
        });
        setFormData(prev => ({ ...prev, password: '' }));
      }

      setIsEditingCredentials(false);
      console.log("Success: Settings saved successfully!");
      
      // Close the settings window
      await ipcRenderer.invoke('close-settings');
    } catch (error) {
      console.error("Error saving settings:", error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.options}>
        <div className={styles.site}>
          <h3>WordPress Connection</h3>
          
          {!isEditingCredentials && formData.blogUrl ? (
            <div className={styles.siteSummary}>
              <div className={styles.siteInfo}>
                {siteIcon ? (
                  <img src={siteIcon} alt="" className={styles.siteIcon} />
                ) : (
                  <Internet />
                )}
                <div>
                  <div className={styles.siteUrl}>
                    <span>{formData.blogUrl}</span>
                  </div>
                  <div className={styles.siteUser}>
                    <PeopleTag />
                    <span>{formData.username}</span>
                  </div>
                </div>
                {connectionStatus && (
                  <div className={`${styles.connectionStatus} ${styles[connectionStatus]}`}>
                    {connectionStatus === 'success' ? 'Connection successful' : 'Connection failed'}
                  </div>
                )}
              </div>
              <div className={styles.siteActions}>
                <Button onClick={handleEdit}>
                  Edit
                </Button>
                <Button
                  onClick={testConnection}
                  disabled={isTestingConnection}
                >
                  {isTestingConnection ? 'Testing...' : 'Test'}
                </Button>
              </div>
            </div>
          ) : (
            <>
              <Fieldset
                id="blogUrl"
                label="Site"
              >
                <Input
                  type="url"
                  id="blogUrl"
                  name="blogUrl"
                  icon={<Internet />}
                  value={formData.blogUrl}
                  onChange={handleChange}
                  placeholder="https://yourblog.com"
                />
              </Fieldset>

              <Fieldset
                id="username"
                label="Username"
              >
                <Input
                  type="text"
                  id="username"
                  name="username"
                  icon={<PeopleTag />}
                  value={formData.username}
                  onChange={handleChange}
                />
              </Fieldset>

              <Fieldset
                id="password"
                label="Application password"
                description="Go to your Wordpress → Users → Profile to create one."
              >
                <Input
                  type="password"
                  id="password"
                  name="password"
                  icon={<Lock />}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••••••••••••••"
                />
              </Fieldset>
        
              <div className={styles.siteActions}>
                <Button
                  onClick={testConnection}
                  disabled={isTestingConnection}
                >
                  {isTestingConnection ? 'Testing...' : 'Test'}
                </Button>

                <Button
                  variant="default"
                  onClick={handleResetCredentials}
                  className={styles.resetButton}
                >
                  Reset
                </Button>

                <Button variant="default" onClick={handleCancel}>
                  Cancel
                </Button>

                {hasChanges() && (
                  <Button variant="primary" onClick={handleSave}>
                    Save
                  </Button>
                )}
              </div>
              {connectionStatus && (
                <div className={`${styles.connectionStatus} ${styles[connectionStatus]}`}>
                  {connectionStatus === 'success' ? 'Connection successful' : 'Connection failed'}
                </div>
              )}
            </>
          )}
        </div>

        <div className={styles.preferences}>
          <h3>Preferences</h3>

          <FieldsetSwitch
            id="enableReminders"
            label="Enable reminders"
            description="Get reminded to write a new post periodically"
            checked={formData.enableReminders}
            onCheckedChange={handleReminderToggle}
          />

          {formData.enableReminders && (
            <Fieldset
              id="reminderFrequency"
              label="Reminder frequency"
              description="How often should we remind you to write?"
            >
              <select
                id="reminderFrequency"
                name="reminderFrequency"
                value={formData.reminderFrequency}
                onChange={handleReminderFrequencyChange}
                className={styles.select}
              >
                {REMINDER_FREQUENCIES.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </Fieldset>
          )}

          <FieldsetSwitch
            id="keepOnTop"
            label="Keep window on top"
            description="The window will stay visible if you switch to another app."
            checked={formData.keepOnTop}
            onCheckedChange={(checked) => {
              setFormData(prev => ({ ...prev, keepOnTop: checked }));
              store.set('keepOnTop', checked);
              ipcRenderer.invoke('set-always-on-top', checked);
            }}
          />

          <FieldsetSwitch
            id="showTitleField"
            label="Show title field in editor"
            description="All WordPress posts require a title. With this off, WP will generate a title for you."
            checked={formData.showTitleField}
            onCheckedChange={(checked) => {
              setFormData(prev => ({ ...prev, showTitleField: checked }));
              store.set('showTitleField', checked);
            }}
          />

          <Fieldset
            id="defaultTags"
            label="Default tags"
            description="Comma-separated tags to add to all posts (e.g. PostHaste, Quick Post)"
          >
            <Input
              type="text"
              id="defaultTags"
              name="defaultTags"
              value={formData.defaultTags}
              onChange={handleChange}
              placeholder="tag1, tag2, tag3"
            />
          </Fieldset>
        </div>
      </div>
    </div>
  );
} 