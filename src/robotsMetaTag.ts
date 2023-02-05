//
// Reference:
// https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag
//

export type RobotsMetaTagContent = 'all' | 'none'
// TODO: Cover all missing possible content values.
// noindex
// nofollow
// noarchive
// nositelinkssearchbox
// nosnippet
// indexifembedded
// max-snippet: [number]
// max-image-preview: [setting]
// max-video-preview: [number]
// notranslate
// noimageindex
// unavailable_after: [date/time]

export interface RobotsMetaTagProperties {
  name: 'robots'
  content: RobotsMetaTagContent
}

const createRobotsMetaTagProperties = (content: RobotsMetaTagContent) => ({
  name: 'robots',
  content,
})

export const AllowAll = createRobotsMetaTagProperties('all')

export const DisallowAll = createRobotsMetaTagProperties('none')
