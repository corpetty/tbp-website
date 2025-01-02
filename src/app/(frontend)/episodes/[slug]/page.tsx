import type { Metadata } from 'next'

import { RelatedEpisodes } from '../../../../blocks/RelatedEpisodes/Component'
import { PayloadRedirects } from '../../../../components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '../../../../components/RichText'

import type { Episode } from '../../../../payload-types'

import { EpisodeHero } from '../../../../heros/EpisodeHero'
import { generateMeta } from '../../../../utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '../../../../components/LivePreviewListener'
import { RenderBlocks } from '../../../../blocks/RenderBlocks'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const episodes = await payload.find({
    collection: 'episodes',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = episodes.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Episode({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/episodes/' + slug
  const episode = await queryEpisodeBySlug({ slug })

  if (!episode) return <PayloadRedirects url={url} />

  return (
    <article className="pt-16 pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <EpisodeHero episode={episode} />

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container">
          {episode.simplecastEmbed && episode.simplecastEmbed.length > 0 && (
            <div className="max-w-[48rem] mx-auto mb-8">
              <RenderBlocks blocks={episode.simplecastEmbed} />
            </div>
          )}
          <RichText className="max-w-[48rem] mx-auto" data={episode.content} enableGutter={false} />
          {episode.relatedEpisodes && episode.relatedEpisodes.length > 0 && (
            <RelatedEpisodes
              className="mt-12 max-w-[52rem] lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]"
              docs={episode.relatedEpisodes.filter((episode) => typeof episode === 'object')}
            />
          )}
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const episode = await queryEpisodeBySlug({ slug })

  return generateMeta({ doc: episode })
}

const queryEpisodeBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'episodes',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
