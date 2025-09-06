// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

// Load environment variables from .env file
// @ts-ignore
import dotenv from 'dotenv';
dotenv.config();

import { themes as prismThemes } from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Sivi AI Help And Support',
  tagline: 'Generative AI for design creation.',
  favicon: 'img/sivi_fav.png',

  // Set the production url of your site here
  url: 'https://support.sivi.ai',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'hellosivi', // Usually your GitHub org/user name.
  projectName: 'sivi-docs', // Usually your repo name.

  trailingSlash: false, // this will create direct htmls and fetch the same in next try
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/',
          sidebarCollapsed: false,
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        googleTagManager: {
          containerId: 'GTM-WBB6XSZJ',
        },
      }),
    ],
  ],

  // plugins: [
    // [
      // '@docusaurus/plugin-client-redirects',
      // {
        // fromExtensions: ['html'], // /myPage.html -> /myPage
        // toExtensions: ['exe', 'zip'], // /myAsset -> /myAsset.zip (if latter exists)
        // redirects: [
        //   // Redirect from multiple old paths to the new path=
        //   {
        //     to: '/plans-and-credits/credits',
        //     from: ['/portal/en/kb/articles/how-is-credit-usage-managed-within-sivi'],
        //   },
        //   {
        //     to: '/plans-and-credits/credits',
        //     from: ['/portal/en/kb/articles/sivi-credits-usage'],
        //   },
        //   {
        //     to: '/intro',
        //     from: ['/portal/en/kb/sivi'],
        //   },
        //   {
        //     to: '/intro',
        //     from: ['/portal/en/kb/sivi/faqs'],
        //   },
        //   {
        //     to: '/intro',
        //     from: ['/portal/en/kb/sivi/use-cases'],
        //   },
        //   {
        //     to: '/intro',
        //     from: ['/portal/en/kb/articles/vector-properties'],
        //   },
        //   {
        //     to: '/intro',
        //     from: ['/portal/en/kb/articles/share-designs'],
        //   },
        //   {
        //     to: '/intro',
        //     from: ['/portal/en/kb/articles/add-button'],
        //   },
        //   {
        //     to: '/intro',
        //     from: ['/portal/en/kb/articles/add-contact-and-social'],
        //   },
        // ],
        // createRedirects(existingPath) {
        //   if (existingPath.includes('/portal')) {
        //     return [
        //       '/intro',
        //     ];
        //   }
        //   return undefined; // Return a falsy value: no redirect created
        // },
      // },
    // ],
  // ],

  themes: [
    '@docusaurus/theme-mermaid',
  ],

  markdown: {
    mermaid: true,
  },

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Algolia search configuration
      algolia: {
        // Your Algolia Application ID
        appId: process.env.ALGOLIA_APP_ID,
        // Your Algolia Search API Key - the public one, not the admin key
        apiKey: process.env.ALGOLIA_API_KEY,
        // Your Algolia index name
        indexName: process.env.ALGOLIA_INDEX_NAME || 'support-sivi',
        // Optional: Algolia search parameters
        searchParameters: {},
        // Optional: path for search page that enabled by default
        searchPagePath: 'search',
        // Optional: Configure the crawler
        contextualSearch: true,
      },

      // Replace with your project's social card
      image: 'img/social-support-sivi.png',

      // Configure Mermaid to respect system theme
      mermaid: {
        theme: {
          light: 'neutral',
          dark: 'dark'
        },
      },
      navbar: {
        title: '',
        logo: {
          alt: 'Sivi Logo',
          src: 'img/sivi_logo.png',
          srcDark: 'img/sivi_logo_dark.png', // Logo for dark theme
          href: '/'
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docs',
            position: 'left',
            label: 'Help Center',
          },
          {
            href: 'https://sivi.ai/',
            position: 'right',
            label: 'Website Home'
          }
        ],
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: false,
        },
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} Sivi AI. All rights reserved.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
