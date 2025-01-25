import React, { useState } from 'react';
import { Input } from './ui/Input';
import { Label } from './ui/Label';
import { Button } from './ui/Button';
import { wordPressService } from '../services/wordpress';

const { ipcRenderer } = window.require('electron');
const Store = window.require('electron-store');
const store = new Store();

export function Onboarding({ onComplete, onError }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    blogUrl: '',
    username: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Save the settings
      store.set('blogUrl', formData.blogUrl);
      store.set('username', formData.username);
      
      // Save credentials securely
      await ipcRenderer.invoke('save-credentials', {
        username: formData.username,
        password: formData.password
      });
      
      // Test the connection
      await wordPressService.testConnection();
      
      onComplete();
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      onError(error.message);
    }
  };

  return (
    <div className="onboarding-overlay" id="onboarding">
      <div className="onboarding-content">
        <div className="onboarding-step active" id="step-1">
          <h2 className="onboarding-title">Welcome to Post Haste!</h2>
          <p className="onboarding-description">
            Let's get you set up with your WordPress blog. First, we'll need
            your blog's URL.
          </p>
          <div className="onboarding-form">
            <div className="form-group">
              <Label htmlFor="blogUrl">WordPress URL</Label>
              <Input
                type="url"
                id="blogUrl"
                name="blogUrl"
                placeholder="https://yourblog.com"
                value={formData.blogUrl}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <Label htmlFor="password">Application Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            <Button onClick={handleSubmit} className="w-full">
              Connect to WordPress
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 