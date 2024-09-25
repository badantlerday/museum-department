'use client'

import { useState, useMemo } from 'react'
import SummaryCallout from "@/components/SummaryCallout"
import HoverListing from "@/components/HoverListing"
import PosterCardClient from "@/components/PosterCardClient";
import { memo } from 'react'

const MemoizedPosterCardClient = memo(PosterCardClient)

export default function StudiosArchive({ studios, userBookmarks, user }) {
  const [view, setView] = useState('list')

  const toggleView = (newView) => {
    setView(newView)
  }

    // Settings for listing
    const aspect = "portrait";
    const image = "image";
    const columns = "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6";
    const limit = 18;

    const gridView = useMemo(() => (
      <div className="px-10 lg:px-18 mx-auto mb-40">
        <div className={`grid ${columns} gap-x-4 gap-y-8`}>
          {studios?.slice(0, limit).map((item) => (
            <MemoizedPosterCardClient
              key={item._id}
              data={{ item }}
              aspect={aspect}
              image={image}
              columns={columns}
              user={user}
              userBookmarks={userBookmarks}
            />
          ))}
        </div>
      </div>
    ), [studios, user, userBookmarks])

  return (
    <main className="">
      <div className="pt-60 pb-8">
        <SummaryCallout data={studios} />
      </div>
      <div className="flex uppercase text-xs tracking-[1%] items-center flex-col pb-32 text-md-grey-300">
      <div className="space-x-2">
      <span>View as</span>
        <button
          className={`uppercase text-xs tracking-[1%] pb-[0.5px] transition-colors ${
            view === 'list'
              ? 'bg-primary text-primary-foreground border-b border-b-md-grey-600 text-md-black'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
          onClick={() => toggleView('list')}
        >
          List
        </button>
        <button
          className={`uppercase text-xs tracking-[1%] pb-[0.5px] transition-colors ${
            view === 'grid'
              ? 'bg-primary text-primary-foreground border-b border-b-md-grey-600 text-md-black'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
          onClick={() => toggleView('grid')}
        >
          Visual
        </button>
        
        </div>
      </div>
      <div style={{ display: view === 'list' ? 'block' : 'none' }}>
        <HoverListing
          data={studios}
          sectionHeader=" "
          userBookmarks={userBookmarks}
          user={user}
        />
      </div>
      <div style={{ display: view === 'grid' ? 'block' : 'none' }}>
        {gridView}
      </div>
    </main>
  )
}