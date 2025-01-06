import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { Episode } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatAuthors } from '@/utilities/formatAuthors'

export const EpisodeHero: React.FC<{
  episode: Episode
}> = ({ episode }) => {
  const {
    categories,
    meta: { image: metaImage } = {},
    populatedAuthors,
    publishedAt,
    title,
  } = episode

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  return (
    <div className="bg-background">
      <div className="container py-12">
        <div className="max-w-4xl">
          <div className="uppercase text-sm mb-4 text-primary">
            {categories?.map((category, index) => {
              if (typeof category === 'object' && category !== null) {
                const { title: categoryTitle } = category

                const titleToUse = categoryTitle || 'Untitled category'

                const isLast = index === categories.length - 1

                return (
                  <React.Fragment key={index}>
                    {titleToUse}
                    {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                  </React.Fragment>
                )
              }
              return null
            })}
          </div>

          <h1 className="mb-8 text-3xl md:text-5xl lg:text-6xl">{title}</h1>

          <div className="flex flex-col md:flex-row gap-4 md:gap-12">
            {hasAuthors && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-sm">Author</p>

                  <p>{formatAuthors(populatedAuthors)}</p>
                </div>
              </div>
            )}
            {publishedAt && (
              <div className="flex flex-col gap-1">
                <p className="text-sm">Date Published</p>

                <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
