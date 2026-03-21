tailwind.config = {
    theme: {
        extend: {
            colors: {
                'ran-gold': '#FACC15', 
                'ran-gold-dark': '#EAB308',
                'ran-bg': '#0F111A', 
                'ran-section-alt': '#161925',
                'ran-card': '#1E2333',
            },
            fontFamily: {
                'cinzel': ['Cinzel', 'serif'],
                'prompt': ['Kanit', 'sans-serif'],
            },
            backgroundImage: {
                'hero': "url('./assets/hero_bg_1774046481040.png')",
            },
            keyframes: {
                'sweep': {
                    '0%': { left: '-20%', opacity: '0' },
                    '20%': { opacity: '1' },
                    '80%': { opacity: '1' },
                    '100%': { left: '100%', opacity: '0' },
                },
                'pulse-glow': {
                    '0%, 100%': { opacity: '0.4', transform: 'scale(0.9)' },
                    '50%': { opacity: '0.8', transform: 'scale(1.2)' },
                }
            },
            animation: {
                'spin-slow': 'spin 60s linear infinite',
                'spin-slow-reverse': 'spin 40s linear infinite reverse',
                'sweep': 'sweep 3s ease-in-out infinite',
                'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
            }
        }
    }
}
