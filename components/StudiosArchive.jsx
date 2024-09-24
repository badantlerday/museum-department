'use client'

import { useState } from 'react'
import SummaryCallout from "@/components/SummaryCallout"
import HoverListing from "@/components/HoverListing"
import GridListing from "@/components/GridListing"

export default function StudiosArchive({ studios, userBookmarks, user }) {
  const [view, setView] = useState('list')

  const toggleView = (newView) => {
    setView(newView)
  }

  return (
    <main className="container mx-auto px-4">
      <div className="pt-60 pb-32">
        <SummaryCallout data={studios} />
      </div>
      <div className="flex justify-center space-x-4 mb-8">
        <button
          className={`px-4 py-2 rounded-md transition-colors ${
            view === 'list'
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
          onClick={() => toggleView('list')}
        >
          List
        </button>
        <button
          className={`px-4 py-2 rounded-md transition-colors ${
            view === 'grid'
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
          onClick={() => toggleView('grid')}
        >
          Grid
        </button>
      </div>
      {view === 'list' ? (
        <HoverListing
          data={studios}
          sectionHeader=" "
          userBookmarks={userBookmarks}
          user={user}
        />
      ) : (
        <GridListing
          data={studios}
          title="Design Studios"
          limit={18}
          aspect="portrait"
        />
      )}
    </main>
  )
}