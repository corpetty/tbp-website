import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="The Bitcoin Podcast Logo"
      width={320}
      height={53}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('w-[320px] h-[53px]', className)}
      src="/media/june2017logo.png"
    />
  )
}
