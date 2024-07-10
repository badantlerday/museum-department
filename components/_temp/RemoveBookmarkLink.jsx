"use client"

import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import { useState } from 'react';
import { removeBookmark } from '@/app/actions'
// adjust the import path as needed

const RemoveBookmarkLink = ({ documentId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const {
    user,
} = useKindeBrowserClient();

  const removeBookmarkButton = async () => {
    setIsLoading(true);
    setMessage('');

    try {

      const userid = user.id;
      const docid = documentId;
      const {data, error} = await removeBookmark({userid,docid});

      if (error) {
        throw error;
      }

      // console.log('Bookmark removed successfully:', data);
      setMessage('Bookmark removed successfully.');
    } catch (error) {
      console.error('Error removing bookmark:', error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={removeBookmarkButton} disabled={isLoading}>
        {isLoading ? 'Removing...' : 'Remove Bookmark'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RemoveBookmarkLink;
