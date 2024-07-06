"use client"

import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import { useState } from 'react';
import { addBookmark } from '@/app/actions'
import { toast } from 'sonner';
// adjust the import path as needed

const AddBookmarkLink = ({ documentId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const {
    user,
} = useKindeBrowserClient();

  const addBookmarkButton = async () => {
    setIsLoading(true);
    setMessage('');

    try {

      const userid = user.id;
      const docid = documentId;
      const {data, error} = await addBookmark({userid,docid});

      if (error) {
        throw error;
      }

      // console.log('Bookmark added successfully:', data);
      // setMessage('Bookmark added successfully.');
      toast('Bookmark added successfully.');
    } catch (error) {
      console.error('Error adding bookmark:', error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={addBookmarkButton} disabled={isLoading}>
        {isLoading ? 'Adding...' : 'Add Bookmark'}
      </button>
      {/* <button onClick={() => toast('This is a sonner toast')}>Render my toast</button> */}
      {/* {message && <p>{message}</p>} */}
    </div>
  );
};

export default AddBookmarkLink;
