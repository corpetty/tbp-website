import type { Metadata } from 'next/types'

import { EpisodeCollectionArchive } from '@/components/EpisodeCollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const episodes = await payload.find({
    collection: 'episodes',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Episodes</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="episodes"
          currentPage={episodes.page}
          limit={12}
          totalDocs={episodes.totalDocs}
        />
      </div>

      <EpisodeCollectionArchive episodes={episodes.docs} />

      <div className="container">
        {episodes.totalPages > 1 && episodes.page && (
          <Pagination page={episodes.page} totalPages={episodes.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `The Bitcoin Podcast Episodes`,
  }
}
