import type { Block } from 'payload'

export const SimplecastEmbed: Block = {
  slug: 'simplecastEmbed',
  interfaceName: 'SimplecastEmbedBlock',
  fields: [
    {
      name: 'episodeId',
      type: 'text',
      required: true,
      label: 'Episode ID',
      admin: {
        description: 'Enter the Simplecast episode ID (e.g., 98708a39-37d7-4cf1-ab1c-a17cae6bdd75)',
      },
    },
    {
      name: 'height',
      type: 'number',
      defaultValue: 200,
      admin: {
        description: 'Height of the embedded player in pixels',
      },
    },
    {
      name: 'darkMode',
      type: 'checkbox',
      defaultValue: true,
      label: 'Dark Mode',
      admin: {
        description: 'Enable dark mode for the player',
      },
    },
  ],
  labels: {
    singular: 'Simplecast Embed',
    plural: 'Simplecast Embeds',
  },
}
