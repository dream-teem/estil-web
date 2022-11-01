import { config } from '@/config'
import { useTranslation } from 'next-i18next'
import NextHead from 'next/head'
import React from 'react'

type Props = {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: string
}

const defaultMetaTags = (props: Props) => {
  const { title, description, image, url, type = 'website' } = props
  const metaTags = [
    { name: 'twitter:card', content: 'summary_large_image' },
    {
      name: 'twitter:site',
      content: config.seo.meta.twitter.site
    },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    {
      name: 'twitter:creator',
      content: config.seo.meta.twitter.creator
    },
    { name: 'twitter:image:src', content: image },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'og:title', content: title },
    { name: 'og:type', content: type },
    { name: 'og:url', content: url },
    { name: 'og:image', content: image },
    { name: 'og:description', content: description },
    {
      name: 'og:site_name',
      content: config.seo.meta.og.siteName
    }
  ]

  return metaTags
}

function Head(props: Props) {
  const { t } = useTranslation('head')

  const {
    title = t('title'),
    description = t('description'),
    image,
    type,
    url
  } = props
  config
  return (
    <NextHead>
      <title>
        {title} - {config.seo.meta.og.siteName}
      </title>
      <meta name="description" content={description} />
      <meta name="name" content={title} />

      {defaultMetaTags(props).map(({ name, content }) => (
        <meta key={name} name={name} content={content} />
      ))}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'http://schema.org',
            '@type': type, // todo: this is different type
            name: title,
            about: description,
            url: url
          })
        }}
      />
    </NextHead>
  )
}

export default Head
