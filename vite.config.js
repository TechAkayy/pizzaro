import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
import vuetify from 'vite-plugin-vuetify'
import { liveDesigner } from '@pinegrow/vite-plugin'
import { vuetifyPlugin } from '@pinegrow/vuetify-plugin'
import Unocss from 'unocss/vite'
import presetIcons from '@unocss/preset-icons'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		liveDesigner({
			plugins: [vuetifyPlugin],
			// routerHistoryMode: 'hash', // 'hash', 'html5' (default)
			iconsets: ['all'],
			usingStandaloneVueDevtools: true,
			customTypes: {
				Icon: {
					name: {
						customType: 'icon'
					}
				}
			}

			// customTypes: {
			// To apply type overrides to a specific component (overrides above default fn),
			// ComponentName: { prop: { customType: 'icon' } },
			// VSelect: {
			// 	variant: {
			// 		customType: 'select',
			// 		options: ['plain', 'outlined', 'underlined', 'solo'],
			// 		default: ''
			// 	},
			// 	density: {
			// 		customType: 'select',
			// 		options: ['default', 'compact', 'comfortable']
			// 	},
			// 	disabled: {
			// 		customType: 'boolean'
			// 	},
			// 	appendIcon: {
			// 		customType: 'icon'
			// 	},
			// 	prependIcon: {
			// 		customType: 'icon'
			// 	}
			// }
			// To apply type overrides to all components,
			// all: { prop: { customType: 'icon' } },
			// }
		}),
		vue({
			template: {
				transformAssetUrls: {
					'v-img': ['src', ':src'],
					'v-parallax': ['src']
				}
			}
		}),
		Unocss({
			presets: [
				presetIcons({
					prefix: '' // to override the default prefix 'i' added by icones (used in vue-designer's icon-picker)
				})
			]
		}),
		vuetify({
			autoImport: true
			// styles: 'expose'
		}),
		Components({
			dirs: ['src/components']
		})
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	}
})
