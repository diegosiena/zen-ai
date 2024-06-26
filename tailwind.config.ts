import { join } from 'path';
import type { Config } from 'tailwindcss';

// 1. Import the Skeleton plugin
import { skeleton } from '@skeletonlabs/tw-plugin';
import typography from '@tailwindcss/typography';
const config = {
	// 2. Opt for dark mode to be handled via the class method
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		// 3. Append the path to the Skeleton package
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {}
	},
	plugins: [
		typography,
		// 4. Append the Skeleton plugin (after other plugins)
		skeleton({
			themes: {
				preset: [
					// Enable 'enhancements' per each registered theme:
					{ name: 'gold-nouveau', enhancements: true }
				]
			}
		})
	]
} satisfies Config;

export default config;
