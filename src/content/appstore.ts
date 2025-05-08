import { z, defineCollection } from 'astro:content';

export default defineCollection({
  schema: z.object({
    id: z.string(),
    package: z.object({
      name: z.string(),
      description: z.string(),
      version: z.string(),
      keywords: z.array(z.string()),
      publisher: z.object({
        username: z.string(),
        email: z.string(),
      }),
      maintainers: z.array(
        z.object({
          username: z.string(),
          email: z.string(),
        })
      ),
      license: z.string().optional(),
      date: z.string().datetime(),
      links: z.record(z.string(), z.string())
    }),
    downloads: z.object({
      monthly: z.number(),
      weekly: z.number(),
    }),
    updated: z.string(),
    score: z.object({
      final: z.number(),
      detail: z.object({
        popularity: z.number(),
        quality: z.number(),
        maintenance: z.number(),
      }),
    }),
    flags: z.object({
      insecure: z.number(),
    })
  }),

  // TODO: update to use content loader api
  // https://docs.astro.build/en/reference/content-loader-reference/
  loader: async () => {
    const keywords = [
      'signalk-node-server-plugin',
      'signalk-embeddable-webapp',
      'signalk-webapp'
    ];

    // TODO paginate
    const url = new URL('https://registry.npmjs.org/-/v1/search');
    url.search = new URLSearchParams({
      size: '250',
      from: '0',
      text: `keywords:${keywords[0]}`
    }).toString();

    const response = await fetch(url);
    const data = await response.json();

    const result = data.objects.map((item) => ({
      id: item.package.name,
      ...item,
    }));

    return result;
  },
})
