import React, { useState } from 'react';
import { Input } from '../../components/Interface/Input';
import { Label } from '../../components/Interface/Label';
import { Button } from '../../components/Interface/Button';
import { wordPressService } from '../../services/wordpress';
import styles from './Onboarding.module.css';

const { ipcRenderer } = window.require('electron');
const Store = window.require('electron-store');
const store = new Store();

const STEPS = {
  WELCOME: 1,
  BLOG_URL: 2,
  CREDENTIALS: 3,
  SUCCESS: 4
};

export function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(STEPS.WELCOME);
  const [formData, setFormData] = useState({
    blogUrl: '',
    username: '',
    password: ''
  });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    try {
      setError(null);
      
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
      
      // Move to success step
      setCurrentStep(STEPS.SUCCESS);
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      setError(error.message);
    }
  };

  const handleComplete = async () => {
    await ipcRenderer.invoke('complete-onboarding');
  };

  const renderStep = () => {
    switch (currentStep) {
      case STEPS.WELCOME:
        return (
          <div className={styles.onboardingStep}>
            <h2>Welcome to Post Haste!</h2>
            <p>
              Post Haste is a simple tool that lives in your menu bar, making it quick and easy to publish posts to your WordPress blog.
            </p>
            <Button onClick={handleNext}>
              Get Started
            </Button>
          </div>
        );

      case STEPS.BLOG_URL:
        return (
          <div className={styles.onboardingStep}>
            <h2>Connect Your Blog</h2>
            <p>
              First, we'll need your WordPress blog's URL. This should be the main URL of your blog.
            </p>
            <div>
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
            <div className={styles.buttons}>
              <Button onClick={handleBack}>
                Back
              </Button>
              <Button 
                onClick={handleNext}
                disabled={!formData.blogUrl}
              >
                Next
              </Button>
            </div>
          </div>
        );

      case STEPS.CREDENTIALS:
        return (
          <div className={styles.onboardingStep}>
            <h2>WordPress Credentials</h2>
            <p>
              Now, enter your WordPress username and application password. You can create an application password in your WordPress admin panel under Users → Profile.
            </p>
            <div>
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
            <div>
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
            {error && (
              <div className={styles.error}>
                {error}
              </div>
            )}
            <div className={styles.buttons}>
              <Button onClick={handleBack}>
                Back
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={!formData.username || !formData.password}
              >
                Connect
              </Button>
            </div>
          </div>
        );

      case STEPS.SUCCESS:
        return (
          <div className={styles.onboardingStep}>
            <h2>You're All Set!</h2>
            <p>
              Your WordPress blog is now connected to Post Haste. You can start publishing posts right away!
            </p>
            <Button onClick={handleComplete}>
              Start Writing
            </Button>
          </div>
        );
    }
  };

  return (
    <div className={styles.onboardingPage}>
      {renderStep()}
    </div>
  );
} 