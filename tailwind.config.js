/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
	content: ["./src/**/*.{html,ts}"],

	theme: {
		colors: {
			...colors,
		},
		spacing: {
			...defaultTheme.spacing,
		},
		fontSize: {
			...defaultTheme.fontSize,
		},
		borderRadius: {
			...defaultTheme.borderRadius,
		},
		boxShadow: {
			...defaultTheme.boxShadow,
		},
		fontFamily: {
			...defaultTheme.fontFamily,
			inter: ['Inter', 'sans-serif'],
			roboto: ['Roboto', 'sans-serif'],
		},

		extend: {
			colors: {
				primary: {
					50: '#f0fdf4',
					100: '#dcfce7',
					200: '#bbf7d0',
					300: '#86efac',
					400: '#4ade80',
					500: '#22c55e',
					600: '#16a34a',
					700: '#15803d',
					800: '#166534',
					900: '#14532d',
				},
				accent: '#10b981',
				danger: '#ef4444',
				'warn-bg': '#fef2f2',
				surface: '#ffffff',
				'surface-alt': '#f8fdf9',
				text: '#1a1a1a',
				'text-muted': '#6b7280',
			},

			animation: {
				'fade-in': 'fadeIn 0.5s ease-out',
				'slide-up': 'slideUp 0.4s ease-out',
				'slide-in-left': 'slideInLeft 0.4s ease-out',
				'scale-in': 'scaleIn 0.3s ease-out',
				'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
				'bounce-in': 'bounceIn 0.6s ease-out',
			},

			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				slideUp: {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				slideInLeft: {
					'0%': { opacity: '0', transform: 'translateX(-20px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' },
				},
				scaleIn: {
					'0%': { opacity: '0', transform: 'scale(0.95)' },
					'100%': { opacity: '1', transform: 'scale(1)' },
				},
				pulseSoft: {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.02)' },
				},
				bounceIn: {
					'0%': { opacity: '0', transform: 'scale(0.3)' },
					'50%': { transform: 'scale(1.05)' },
					'70%': { transform: 'scale(0.95)' },
					'100%': { opacity: '1', transform: 'scale(1)' },
				},
			},
		},
	},

	plugins: [],

	corePlugins: {
		preflight: true,
	},
};
