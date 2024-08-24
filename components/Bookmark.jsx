"use client";
import { useState } from "react";
import { addBookmark, removeBookmark } from "@/app/actions";
import { toast } from "sonner";
import Image from "next/image"; // Make sure this import is correct based on your setup

// Video about how to enable RLS in supabase with Kinde as auth.
// https://www.youtube.com/watch?v=E9sN9Wol3GI

const Bookmark = ({
  documentId,
  isBookmarked: initialIsBookmarked,
  userid,
  variant = "text",
  message,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const [isLoading, setIsLoading] = useState(false);

  if (!documentId || !userid) {
    console.error("Invalid documentId or userId");
    return null;
  }

  const handleBookmarkClick = async () => {
    setIsLoading(true);

    try {
      if (isBookmarked) {
        const { data, error } = await removeBookmark({
          userid,
          docid: documentId,
        });

        if (error) {
          throw error;
        }

        console.log("Bookmark removed successfully:", data);
        toast(`${message} removed successfully`);
      } else {
        const { data, error } = await addBookmark({
          userid,
          docid: documentId,
        });

        if (error) {
          throw error;
        }

        console.log("Bookmark added successfully:", data);
        toast(`${message} added successfully`);
      }

      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error("Error updating bookmark:", error);
      toast(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

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
      {variant === "icon" &&
        (isLoading ? (
          <svg
            class="animate-spin h-[15px] w-[15px] text-md-black"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : isBookmarked ? (
          <Image
            src="/icon-bookmark-added.svg"
            width={10}
            height={15}
            alt="Remove Bookmark"
          />
        ) : (
          <Image
            src="/icon-bookmark.svg"
            width={10}
            height={15}
            alt="Add Bookmark"
          />
        ))}
    </button>
  );
};

export default Bookmark;
