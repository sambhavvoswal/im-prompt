/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'bg-primary': '#0f0f13',
                'bg-card': '#1a1a24',
                'bg-card-hover': '#22222f',
                'accent-primary': '#7c3aed',
                'accent-secondary': '#06b6d4',
                'text-primary': '#f8fafc',
                'text-muted': '#94a3b8',
                'border': '#2d2d3d',
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
