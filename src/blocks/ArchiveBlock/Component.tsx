import type { Post, Episode, ArchiveBlock as ArchiveBlockProps } from '../../payload-types'

import configPromise from '../../payload.config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '../../components/RichText'

import { PostCollectionArchive } from '../../components/PostCollectionArchive'
import { EpisodeCollectionArchive } from '../../components/EpisodeCollectionArchive'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const {
    id,
    categories,
    introContent,
    limit: limitFromProps,
    populateBy,
    selectedDocs,
    archiveType = 'posts',
  } = props

  console.log('ArchiveBlock props:', {
    archiveType,
    populateBy,
    selectedDocs,
    categories,
  })

  const limit = limitFromProps || 3

  let posts: Post[] = []
  let episodes: Episode[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    const categoryFilter =
      flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}

    if (archiveType === 'posts') {
      const fetchedPosts = await payload.find({
        collection: 'posts',
        depth: 1,
        limit,
        ...categoryFilter,
      })
      posts = fetchedPosts.docs
      console.log('Fetched posts:', posts.length)
    } else {
      const fetchedEpisodes = await payload.find({
        collection: 'episodes',
        depth: 1,
        limit,
        ...categoryFilter,
      })
      episodes = fetchedEpisodes.docs
      console.log('Fetched episodes:', episodes.length, episodes)
    }
  } else if (selectedDocs?.length) {
    selectedDocs.forEach((doc) => {
      if (typeof doc === 'object' && doc.relationTo) {
        console.log('Processing selected doc:', {
          relationTo: doc.relationTo,
          value: doc.value,
          archiveType,
        })

        if (doc.relationTo === 'posts' && typeof doc.value === 'object') {
          posts.push(doc.value as Post)
        } else if (doc.relationTo === 'episodes' && typeof doc.value === 'object') {
          episodes.push(doc.value as Episode)
        }
      }
    })
    console.log('Selected docs processed:', {
      posts: posts.length,
      episodes: episodes.length,
    })
  }

  const contentToRender =
    archiveType === 'posts' ? (
      <PostCollectionArchive posts={posts} />
    ) : (
      <EpisodeCollectionArchive episodes={episodes} />
    )

  console.log('Rendering archive block:', {
    archiveType,
    postsLength: posts.length,
    episodesLength: episodes.length,
  })

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText className="ml-0 max-w-[48rem]" data={introContent} enableGutter={false} />
        </div>
      )}
      {contentToRender}
    </div>
  )
}
