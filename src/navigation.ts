import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'About',
      href: getPermalink('about'),
    },
    {
      text: 'Specification',
      href: 'https://signalk.org/specification/latest/',
    },
    {
      text: 'Documentation',
      target: '_blank',
      href: 'https://demo.signalk.org/documentation/',
    },
    {
      text: 'Blog',
      href: getBlogPermalink(),
    },
  ],
  actions: [
    {
      text: 'Try Demo',
      href: 'https://github.com/SignalK/signalk-server',
      target: '_blank',
      icon: 'tabler:arrow-right',
    },
  ],
};

export const footerData = {
  links: [
    {
      title: 'Project',
      links: [
        { text: 'Sponsor', href: 'https://opencollective.com/signalk' },
        { text: 'Security', href: '#' },
        { text: 'Contact', href: 'mailto:info@signalk.org' },
      ],
    },
    {
      title: 'Platform',
      links: [
        { text: 'Specification', href: 'https://signalk.org/specification/latest' },
        { text: 'Server', href: 'https://github.com/SignalK/signalk-server' },
        { text: 'Plugins & Webapps', href: '#' },
      ],
    },
    {
      title: 'Community',
      links: [
        { text: 'Discord', href: 'https://discord.gg/uuZrwz4dCS' },
        { text: 'GitHub Discussions', href: 'https://github.com/SignalK/signalk/discussions' },
      ],
    },
  ],
  secondaryLinks: [],
  socialLinks: [
    { ariaLabel: 'Discord', icon: 'tabler:brand-discord', href: 'https://discord.gg/uuZrwz4dCS' },
    { ariaLabel: 'GitHub', icon: 'tabler:brand-github', href: 'https://github.com/SignalK' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
  ],
  footNote: `
    <p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/">
      <a property="dct:title" rel="cc:attributionURL" href="https://signalk.org/">
        The Signal K Website
      </a>
      is licensed under
      <a href="https://creativecommons.org/licenses/by-sa/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer">
        CC BY-SA 4.0
        <img class="size-[16px] opacity-80 dark:opacity-60 align-text-bottom inline-block" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt="">
        <img class="size-[16px] opacity-80 dark:opacity-60 align-text-bottom inline-block" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" alt="">
        <img class="size-[16px] opacity-80 dark:opacity-60 align-text-bottom inline-block" src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1" alt="">
      </a>
    </p>
    <p>©2018-${new Date().getFullYear()} The Signal K Project.</p>
  `,
};
