"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { addBookmark, removeBookmark } from "@/app/actions";
import { toast } from "sonner";
import Image from "next/image";

export default function BookmarkButtonClient({
  documentId,
  userBookmarks,
  user,
  variant = "text",
  message,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  
  // Memoize the checkIsBookmarked function to prevent unnecessary re-renders
  const checkIsBookmarked = useCallback(() => {
    return userBookmarks.data.some((item) => item.document_id === documentId);
  }, [userBookmarks, documentId]);

  useEffect(() => {
    if (user) {
    // Check if the document is bookmarked when component mounts or userBookmarks changes
    setIsBookmarked(checkIsBookmarked());
    }
  }, [checkIsBookmarked]);

  const handleBookmarkClick = async () => {
    setIsLoading(true);

    try {
      // Use ternary operator to determine which action to perform
      const { data, error } = isBookmarked
        ? await removeBookmark({ docid: documentId })
        : await addBookmark({ docid: documentId });

      if (error) throw error;

      console.log(
        `Bookmark ${isBookmarked ? "removed" : "added"} successfully:`,
        data,
      );
      toast(`${message} ${isBookmarked ? "removed" : "added"} successfully`);

      // Toggle bookmark state
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error("Error updating bookmark:", error);
      toast(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // If user is not logged in, show link to sign in
  if (!user) {
    return (
      <Link href="/become-a-patron" className="flex items-center gap-2">
        <Image
          src="/icon-bookmark.svg"
          width={10}
          height={15}
          alt="Become a patron to bookmark"
        />
        {variant === "text" ? (
          <span>Sign in to bookmark</span>
        ) : null}
      </Link>
    );
  }

  // Render button based on variant
  return (
    <button
      onClick={handleBookmarkClick}
      disabled={isLoading}
      className="flex items-center"
    >
      {variant === "text" &&
        (isLoading
          ? "Processing..."
          : isBookmarked
            ? "Remove Bookmark"
            : "Add Bookmark")}
      {variant === "icon" && <BookmarkIcon isBookmarked={isBookmarked} />}
    </button>
  );
}

// (isLoading ? (
//   <LoadingSpinner />
// ) : (
//   <BookmarkIcon isBookmarked={isBookmarked} />
// ))}

// Separate component for loading spinner
const LoadingSpinner = () => (
  <svg
    className="animate-spin h-[15px] w-[15px] text-md-black"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

// Separate component for bookmark icon
const BookmarkIcon = ({ isBookmarked }) => (
  <svg
    width="10"
    height="15"
    alt={isBookmarked ? "Remove bookmark" : "Add bookmark"}
    viewBox="0 0 10 15"
    fill="none"
    className={
      isBookmarked
        ? "fill-md-black _hover:fill-md-grey-200"
        : "fill-md-grey-200 _hover:fill-md-black"
    }
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 15L5 10.7531L10 15V0H0V15Z" />
  </svg>
);
