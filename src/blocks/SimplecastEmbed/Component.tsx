'use client'

import type { SimplecastEmbedBlock } from '../../payload-types'
import React from 'react'

export const SimplecastEmbed: React.FC<SimplecastEmbedBlock> = (props) => {
  const { episodeId, height, darkMode = true } = props
  const playerHeight = typeof height === 'number' ? height : 200

  if (!episodeId) {
    return (
      <div className="container my-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Episode ID is required. Please provide a valid Simplecast episode ID.
        </div>
      </div>
    )
  }

  const embedUrl = `https://player.simplecast.com/${episodeId}${darkMode ? '?dark=true' : ''}`

  return (
    <div className="container my-4">
      <iframe
        src={embedUrl}
        height={playerHeight}
        width="100%"
        frameBorder="no"
        scrolling="no"
        seamless
        title="Simplecast Episode Player"
      />
    </div>
  )
}
