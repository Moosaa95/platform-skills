import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
			  'primary': { 
				50: '#f9fbfe', 
				100: '#e7f1fc', 
				200: '#c9dff7', 
				300: '#9fc7f1', 
				400: '#69a7ea', 
				500: '#2781e0', 
				600: '#165598', 
				700: '#09233e', 
				800: '#040f1c', 
				900: '#010407', 
				950: '#000000', 
			  },
			'secondary': { 
				50: '#fffdfc', 
				100: '#fff7f3', 
				200: '#ffeee4', 
				300: '#ffe0d0', 
				400: '#ffcfb5', 
				500: '#ffba95', 
				600: '#ffa16f', 
				700: '#ff8442', 
				800: '#ab3c00', 
				900: '#511c00', 
				950: '#331200', 
			  },
			'accent-color': { 
				50: '#fffcfb', 
				100: '#fff5ef', 
				200: '#ffe8db', 
				300: '#ffd7bf', 
				400: '#ffc09b', 
				500: '#ffa470', 
				600: '#ff833c', 
				700: '#ff5d00', 
				800: '#8e3400', 
				900: '#4a1b00', 
				950: '#331300', 
			  },
			'neutral': { 
				50: '#ffffff', 
				100: '#fefeff', 
				200: '#fcfdff', 
				300: '#fafcff', 
				400: '#f7fbff', 
				500: '#f4f9ff', 
				600: '#eff7ff', 
				700: '#ebf4ff', 
				800: '#0073f6', 
				900: '#002f64', 
				950: '#001833', 
			  },
			'gray': { 
				50: '#fcfcfd', 
				100: '#f1f3f6', 
				200: '#e0e4ea', 
				300: '#c8ced9', 
				400: '#a8b3c4', 
				500: '#8292aa', 
				600: '#5b6b86', 
				700: '#384252', 
				800: '#242b35', 
				900: '#191d24', 
				950: '#15181e', 
			  },
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		  sidebar: {
			  DEFAULT: 'hsl(var(--sidebar-background))',
			  foreground: 'hsl(var(--sidebar-foreground))',
			  primary: 'hsl(var(--sidebar-primary))',
			  'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
			  accent: 'hsl(var(--sidebar-accent))',
			  'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
			  border: 'hsl(var(--sidebar-border))',
			  ring: 'hsl(var(--sidebar-ring))'
		  }
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
