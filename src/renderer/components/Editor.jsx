import React, { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { wordPressService } from '../services/wordpress';

const { ipcRenderer } = window.require('electron');

export function Editor({ onError, onSuccess }) {
  const [content, setContent] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [isPublishing, setIsPublishing] = useState(false);

  const handleContentChange = (e) => {
    setContent(e.target.value);
    setCharCount(e.target.value.length);
  };

  const handleSettingsClick = async () => {
    try {
      await ipcRenderer.invoke('open-settings');
    } catch (error) {
      console.error('Error opening settings:', error);
      onError('Failed to open settings');
    }
  };

  const handlePublish = async () => {
    try {
      if (!content.trim()) {
        onError('Please write something before publishing.');
        return;
      }

      setIsPublishing(true);
      await wordPressService.createPost(content);
      
      setContent('');
      setCharCount(0);
      onSuccess('Post published successfully!');
    } catch (error) {
      console.error('Publishing error:', error);
      onError('Error publishing post: ' + error.message);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex-1 relative">
        <Textarea
          value={content}
          onChange={handleContentChange}
          placeholder="What's on your mind?"
          className="absolute inset-0 resize-none border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-background text-lg leading-relaxed p-6"
        />
        <div className="absolute bottom-4 right-4 text-sm text-muted-foreground">
          {charCount} characters
        </div>
      </div>

      <div className="flex justify-between items-center p-4 border-t bg-background">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleSettingsClick}
          className="rounded-full"
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
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </Button>
        <Button 
          onClick={handlePublish}
          disabled={isPublishing || !content.trim()}
          className="px-8"
        >
          {isPublishing ? 'Publishing...' : 'Publish'}
        </Button>
      </div>
    </div>
  );
} 