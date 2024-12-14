import clsx from 'clsx'
import React from 'react'
import RichText from '@/components/RichText'

import type { Episode } from '@/payload-types'

import { EpisodeCard } from '../../components/EpisodeCard'

export type RelatedEpisodesProps = {
  className?: string
  docs?: Episode[]
  introContent?: any
}

export const RelatedEpisodes: React.FC<RelatedEpisodesProps> = (props) => {
  const { className, docs, introContent } = props

  return (
    <div className={clsx('lg:container', className)}>
      {introContent && <RichText data={introContent} enableGutter={false} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-stretch">
        {docs?.map((doc, index) => {
          if (typeof doc === 'string') return null

          return <EpisodeCard key={index} doc={doc} relationTo="episodes" showCategories />
        })}
      </div>
    </div>
  )
}
