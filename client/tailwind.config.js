/** @type {import('tailwindcss').Config} */

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'bg-primary': '#121212',
                'bg-card': '#1A1A1A',
                'bg-card-hover': '#242424',
                'accent-primary': '#D4AF37',
                'accent-secondary': '#FDE047',
                'text-primary': '#F3F4F6',
                'text-muted': '#9CA3AF',
                'border': '#374151',
                'success': '#10b981',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                headings: ['"Plus Jakarta Sans"', 'sans-serif'],
                mono: ['"JetBrains Mono"', 'monospace'],
            }
        },
    },
    plugins: [],
}
