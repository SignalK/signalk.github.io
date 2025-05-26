import { z, defineCollection } from 'astro:content';
import doFetch from 'make-fetch-happen';
import { join } from 'node:path';
import type { LoaderContext } from 'astro/loaders';
import pMap from 'p-map';

const cachePath = join(import.meta.dirname, '../../node_modules/.cache/fetch');

export const fetch = doFetch.defaults({
  cachePath,
});

const schema = z.object({
  name: z.string(),
  description: z.string().optional(),
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
  links: z.record(z.string(), z.string()),
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
  }),
  readme: z.string(),
  signalk: z.object({
    appIcon: z.string().optional(),
    displayName: z.string().optional(),
  }).optional(),
});

export type Module = z.infer<typeof schema>;

export default defineCollection({
  schema,
  loader: npmLoader({
    keywords: ['signalk-node-server-plugin', 'signalk-embeddable-webapp', 'signalk-webapp'],
  }),
});

export function npmLoader({ keywords = [], concurrency = 10 }: { keywords?: string[]; concurrency?: number } = {}) {
  return {
    name: 'npm',
    load: async ({ store, logger, meta, parseData }: LoaderContext): Promise<void> => {
      logger.info(`Loading npm modules with keywords: ${keywords.join(', ')}`);

      await pMap(
        keywords,
        async (keyword) => {
          const modules = await fetchModulesByKeyword(keyword);
          await pMap(
            modules,
            async ({ package: pkg, ...module }) => {
              const id = pkg.name;

              logger.debug(`Fetching ${id}`);
              const res = await fetch(`https://registry.npmjs.org/${id}`);
              if (!res.ok) throw new Error(`Failed to fetch package data: ${res.statusText}`);
              const { readme, versions } = await res.json();

              const data = await parseData({
                id,
                data: {
                  ...module,
                  ...versions[pkg.version],
                  ...pkg,
                  readme,
                }
              })

              meta.set('lastModified', data.date);

              store.set({
                id,
                data: {
                  ...module,
                  ...data,
                },
              });
            },
            { concurrency }
          );
        },
        { concurrency }
      );
    },
  };
}

async function fetchModulesByKeyword(keyword: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const items: any[] = [];
  const size = 250;

  while (true) {
    const url = new URL('https://registry.npmjs.org/-/v1/search');
    url.search = new URLSearchParams({
      size: size.toString(),
      from: items.length.toString(),
      text: `keywords:${keyword}`,
    }).toString();

    const response = await fetch(url.toString());
    if (!response.ok) throw new Error(`Failed to fetch modules: ${response.statusText}`);
    const data = await response.json();

    items.push(...data.objects);

    if (data.objects.length < 250) {
      break;
    }
  }

  return items;
}
