import { cn } from 'src/utilities/cn'
import React from 'react'

import type { Episode } from '@/payload-types'

import { EpisodeCard, CardEpisodeData } from '@/components/EpisodeCard'

export type Props = {
  episodes: CardEpisodeData[]
}

export const EpisodeCollectionArchive: React.FC<Props> = (props) => {
  const { episodes } = props

  return (
    <div className={cn('container')}>
      <div>
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
          {episodes?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div className="col-span-4" key={index}>
                  <EpisodeCard
                    className="h-full"
                    doc={result}
                    relationTo="episodes"
                    showCategories
                  />
                </div>
              )
            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}
