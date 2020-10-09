const { description } = require('../../package');

module.exports = {
	/**
	 * Ref：https://v1.vuepress.vuejs.org/config/#title
	 */
	title: 'Chatbots',
	/**
	 * Ref：https://v1.vuepress.vuejs.org/config/#description
	 */
	description: description,

	/**
	 * Extra tags to be injected to the page HTML `<head>`
	 *
	 * ref：https://v1.vuepress.vuejs.org/config/#head
	 */
	head: [
		['meta', { name: 'theme-color', content: '#3eaf7c' }],
		['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
		[
			'meta',
			{ name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
		],
		['link', { rel: "icon", type: "image/png", sizes: "96x96", href: "/assets/favicons/favicon-96x96.png"}],
		['link', { rel: "icon", type: "image/png", sizes: "48x48", href: "/assets/favicons/favicon-48x48.png"}],
	],

	/**
	 * Theme configuration, here is the default theme configuration for VuePress.
	 *
	 * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
	 */
	themeConfig: {
		repo: '',
		editLinks: false,
		docsDir: '',
		editLinkText: '',
		lastUpdated: false,
		nav: [
			{
				text: 'Over',
				link: '/over/',
			},
			{
				text: 'Toepassingen',
				link: '/toepassingen/',
			},
			{
				text: 'Documentatie',
				link: '/documentatie/',
			},
			{
				text: 'Referenties',
				link: '/referenties/',
			},
		],
		sidebar: {
			'/over/': [
				{
					title: 'Over',
					collapsable: false,
					children: ['', 'geschiedenis', 'tools-talen', 'intelligentie', 'werking'],
				},
			],
			'/toepassingen/': [
				{
					title: 'Toepassingen',
					collapsable: false,
					children: [''],
				},
			],
			'/documentatie/': [
				{
					title: 'Documentatie',
					collapsable: false,
					children: ['', 'demo'],
				},
			],
		},
	},

	/**
	 * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
	 */
	plugins: ['@vuepress/plugin-back-to-top', '@vuepress/plugin-medium-zoom'],
};
