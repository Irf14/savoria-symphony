
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Custom colors for Savoria
				gold: {
					DEFAULT: '#D4AF37',
					light: '#F7DF8C',
					dark: '#996515'
				},
				savoria: {
					black: '#0A0A0A',
					dark: '#1A1A1A',
					muted: '#2A2A2A',
					thai: '#8B5742',
					chinese: '#C12D00',
					indian: '#E49B5D',
					bengali: '#335C67',
					continental: '#7F5C53'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-out': {
					'0%': { opacity: '1', transform: 'translateY(0)' },
					'100%': { opacity: '0', transform: 'translateY(10px)' }
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'scale-up': {
					'0%': { transform: 'scale(0.9)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'gold-shimmer': {
					'0%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
					'100%': { backgroundPosition: '0% 50%' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'fade-out': 'fade-out 0.5s ease-out',
				'slide-in-right': 'slide-in-right 0.5s ease-out',
				'scale-up': 'scale-up 0.5s ease-out',
				'gold-shimmer': 'gold-shimmer 3s ease-in-out infinite'
			},
			fontFamily: {
				'playfair': ['"Playfair Display"', 'serif'],
				'cormorant': ['"Cormorant Garamond"', 'serif'],
				'lato': ['"Lato"', 'sans-serif']
			},
			backgroundImage: {
				'gold-gradient': 'linear-gradient(45deg, #D4AF37 0%, #F7DF8C 50%, #D4AF37 100%)',
				'thai-gradient': 'linear-gradient(to right, #8B5742, #D4AF37)',
				'chinese-gradient': 'linear-gradient(to right, #C12D00, #D4AF37)',
				'indian-gradient': 'linear-gradient(to right, #E49B5D, #D4AF37)',
				'bengali-gradient': 'linear-gradient(to right, #335C67, #D4AF37)',
				'continental-gradient': 'linear-gradient(to right, #7F5C53, #D4AF37)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
