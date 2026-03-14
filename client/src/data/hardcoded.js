// 18+ high quality seed prompts, distributed across 6 trends
export const TRENDS = [
    {
        id: "holi-2025", slug: "holi-2025", title: "Holi 2025", emoji: "🎨",
        description: "Festival of Colors — vibrant, joyful, cinematic poster prompts",
        category: "festival", tags: ["holi", "colors", "festival", "india", "spring"],
        coverImage: "/placeholders/holi-cover.jpg", isTrending: true, posterCount: 4
    },
    {
        id: "ipl-2025", slug: "ipl-2025", title: "IPL 2025 🏏", emoji: "🏏",
        description: "Cricket fever — stadium energy, team spirit, championship vibes",
        category: "sports", tags: ["ipl", "cricket", "india", "t20", "sports"],
        coverImage: "/placeholders/ipl-cover.jpg", isTrending: true, posterCount: 4
    },
    {
        id: "eid-2025", slug: "eid-2025", title: "Eid Mubarak 2025", emoji: "🌙",
        description: "Elegant, luxurious Eid celebration poster prompts",
        category: "festival", tags: ["eid", "celebration", "moon", "gold"],
        coverImage: "/placeholders/eid-cover.jpg", isTrending: false, posterCount: 3
    },
    {
        id: "mothers-day-2025", slug: "mothers-day-2025", title: "Mother's Day", emoji: "💐",
        description: "Heartfelt, elegant poster prompts for Mother's Day",
        category: "occasion", tags: ["mothers-day", "love", "flowers", "family"],
        coverImage: "/placeholders/mothers-day-cover.jpg", isTrending: false, posterCount: 3
    },
    {
        id: "diwali-2025", slug: "diwali-2025", title: "Diwali 2025 ✨", emoji: "🪔",
        description: "Diyas, fireworks, golden light — festive poster magic",
        category: "festival", tags: ["diwali", "lights", "festival", "india"],
        coverImage: "/placeholders/diwali-cover.jpg", isTrending: false, posterCount: 4
    },
    {
        id: "new-year-2026", slug: "new-year-2026", title: "New Year 2026 🎉", emoji: "🎉",
        description: "Countdown, confetti, fireworks — new year energy",
        category: "seasonal", tags: ["new-year", "celebration", "fireworks"],
        coverImage: "/placeholders/newyear-cover.jpg", isTrending: false, posterCount: 3
    }
];

export const POSTERS = [
    // Holi 2025
    {
        id: "holi-001", trendId: "holi-2025", title: "Cinematic Holi Burst",
        prompt: "A stunning cinematic photograph of a young Indian woman celebrating Holi, surrounded by explosive clouds of vibrant pink, orange, yellow, and turquoise powder. She is laughing with pure joy, arms outstretched, wearing a white kurta now drenched in colors. Golden hour lighting, shallow depth of field, shot on Sony A7IV with 85mm f/1.4 lens. Bokeh background of a blurred crowd celebrating. --ar 4:5 --style raw --v 6.1",
        negativePrompt: "blurry face, overexposed, dark, sad expression, ugly, deformed",
        tags: ["portrait", "cinematic", "golden-hour", "photorealistic"],
        style: "photorealistic", aspectRatio: "4:5",
        previewImage: "/placeholders/holi-001.jpg",
        copyCount: 342, likes: 128
    },
    {
        id: "holi-002", trendId: "holi-2025", title: "3D Pixar Style Holi",
        prompt: "A cute 3D cute animated illustration in Pixar style. Two little Indian kids, a boy and a girl, happily throwing colorful gulal (Holi powder) at each other in a decorated courtyard. Vibrant colors, expressive big eyes, soft studio lighting, high detail. Floating color particles in the air. 8k, octane render.",
        negativePrompt: "realistic, scary, low poly, bad anatomy",
        tags: ["3d", "pixar", "kids", "cute"],
        style: "3d", aspectRatio: "1:1",
        previewImage: "/placeholders/holi-002.jpg",
        copyCount: 156, likes: 89
    },
    {
        id: "holi-003", trendId: "holi-2025", title: "Watercolor Holi Postcard",
        prompt: "A beautiful expressive watercolor painting of hands holding traditional silver thalis filled with bright pigment powders for Holi. Splashes of liquid watercolor on the paper edges. Artistic, flowing, elegant, bright pinks, greens, and yellows. Minimalist background.",
        negativePrompt: "photograph, digital art, hard edges",
        tags: ["watercolor", "artistic", "elegant"],
        style: "watercolor", aspectRatio: "16:9",
        previewImage: "/placeholders/holi-003.jpg",
        copyCount: 88, likes: 45
    },
    {
        id: "holi-004", trendId: "holi-2025", title: "Neon Cyberpunk Holi",
        prompt: "Cyberpunk Holi festival in a futuristic neo-Mumbai. Neon signs glowing through thick clouds of luminescent, glowing powder (pink neon, electric blue, radioactive green). A cyberpunk character in a futuristic saree dancing in the colorful mist. Raining beautifully. Blade Runner aesthetics mixed with Indian culture. 8k resolution.",
        negativePrompt: "traditional, daylight, boring, flat",
        tags: ["cyberpunk", "neon", "futuristic"],
        style: "cinematic", aspectRatio: "9:16",
        previewImage: "/placeholders/holi-004.jpg",
        copyCount: 210, likes: 180
    },

    // IPL 2025
    {
        id: "ipl-001", trendId: "ipl-2025", title: "Epic Stadium Drone Shot",
        prompt: "Cinematic ultra-wide drone shot looking down into a massive packed cricket stadium at night. Brilliant floodlights cutting through the humid air. The pitch glows green. 100,000 fans in the stands holding glowing blue and yellow phones. Epic, grandiose, sports photography, sharp focus. --ar 16:9",
        negativePrompt: "empty seats, daylight, baseball, soccer",
        tags: ["stadium", "sports", "drone", "epic"],
        style: "photorealistic", aspectRatio: "16:9",
        previewImage: "/placeholders/ipl-001.jpg",
        copyCount: 450, likes: 320
    },
    {
        id: "ipl-002", trendId: "ipl-2025", title: "The Winning Hit Illustration",
        prompt: "Dynamic vector illustration of a cricket batsman hitting a powerful six. Action pose, motion blur trails. Background features a roaring crowd in pop-art style dots. Bold typography space. Vibrant team colors (blue and gold). Clean lines, esports logo style.",
        negativePrompt: "photographic, realistic, messy, low resolution",
        tags: ["illustration", "vector", "action"],
        style: "illustration", aspectRatio: "4:5",
        previewImage: "/placeholders/ipl-002.jpg",
        copyCount: 180, likes: 95
    },
    {
        id: "ipl-003", trendId: "ipl-2025", title: "Trophy Celebration 3D",
        prompt: "3D golden cricket cup trophy surrounded by floating confetti and bursting fireworks. Studio lighting, highly detailed gold reflection, depth of field. Epic sports championship aesthetic. Rendered in Unreal Engine 5. 8k.",
        negativePrompt: "flat design, 2d, dull, low quality",
        tags: ["3d", "trophy", "gold", "championship"],
        style: "3d", aspectRatio: "1:1",
        previewImage: "/placeholders/ipl-003.jpg",
        copyCount: 220, likes: 140
    },
    {
        id: "ipl-004", trendId: "ipl-2025", title: "Vintage Cricket Poster",
        prompt: "A vintage 1970s style poster of a cricket bowler in action. Distressed texture, faded pastel colors, retro typography layout. Classic sports illustration aesthetic, halftone patterns.",
        negativePrompt: "modern, clean, digital, neon",
        tags: ["vintage", "retro", "classic"],
        style: "illustration", aspectRatio: "9:16",
        previewImage: "/placeholders/ipl-004.jpg",
        copyCount: 110, likes: 65
    },

    // Eid 2025
    {
        id: "eid-001", trendId: "eid-2025", title: "Golden Crescent Mosque",
        prompt: "A breathtaking glowing crescent moon hanging above a beautiful silhouette of a mosque. The sky is a gradient of deep twilight blue to majestic purple. Little golden stars sparkling. Eid Mubarak celebration vibes. Elegant, premium, minimal, Islamic art inspired. --ar 4:5",
        negativePrompt: "text, messy, chaotic, daylight",
        tags: ["elegant", "moon", "mosque", "night"],
        style: "illustration", aspectRatio: "4:5",
        previewImage: "/placeholders/eid-001.jpg",
        copyCount: 540, likes: 410
    },
    {
        id: "eid-002", trendId: "eid-2025", title: "Lanterns & Dates Still Life",
        prompt: "Photorealistic close up of traditional ornate metal Eid lanterns (fanous) glowing warmly on a rustic wooden table. Next to them, a silver plate of premium dates and a cup of tea. Soft bokeh background of a festive home. Warm golden hour lighting. highly detailed.",
        negativePrompt: "ugly, cartoon, drawn, low res",
        tags: ["photorealistic", "still-life", "lanterns", "warm"],
        style: "photorealistic", aspectRatio: "16:9",
        previewImage: "/placeholders/eid-002.jpg",
        copyCount: 230, likes: 160
    },
    {
        id: "eid-003", trendId: "eid-2025", title: "Abstract Gold Geometry",
        prompt: "Abstract geometric Islamic art pattern in deep emerald green and luxury shiny gold. 3D extruded shapes, incredibly satisfying interlocking star patterns. Studio lighting reflecting off the gold foil. High-end, sophisticated banner background. 8k.",
        negativePrompt: "flat, low quality, asymmetrical",
        tags: ["3d", "abstract", "geometric", "gold"],
        style: "3d", aspectRatio: "16:9",
        previewImage: "/placeholders/eid-003.jpg",
        copyCount: 310, likes: 195
    },

    // Mother's Day 2025
    {
        id: "mom-001", trendId: "mothers-day-2025", title: "Soft Peony Bouquet",
        prompt: "A beautiful, bright overhead shot of a luxurious bouquet of pink and white peonies wrapped in rustic brown paper. A blank elegant handwritten card resting on top. Soft morning light coming from a window, bright airy aesthetic, pastel colors. Photorealistic interior photography.",
        negativePrompt: "dark, moody, withered flowers, ugly",
        tags: ["flowers", "photography", "pastel", "bright"],
        style: "photorealistic", aspectRatio: "4:5",
        previewImage: "/placeholders/mom-001.jpg",
        copyCount: 280, likes: 210
    },
    {
        id: "mom-002", trendId: "mothers-day-2025", title: "Generations Illustration",
        prompt: "A heartwarming, cozy 2D flat vector illustration of three generations of women holding hands (grandmother, mother, daughter) walking in a beautiful spring park. Warm pastel colors, sunset lighting. Emotional, tender, storybook illustration style.",
        negativePrompt: "3d, photorealistic, creepy, harsh lines",
        tags: ["illustration", "vector", "family", "cozy"],
        style: "illustration", aspectRatio: "16:9",
        previewImage: "/placeholders/mom-002.jpg",
        copyCount: 150, likes: 115
    },
    {
        id: "mom-003", trendId: "mothers-day-2025", title: "Watercolor Floral Frame",
        prompt: "An elegant blank center frame surrounded by beautiful loose watercolor spring flowers (roses, tulips, baby's breath). Blush pink, sage green, and soft lavender. Clean white background. Perfect for adding text later. High quality watercolor illustration.",
        negativePrompt: "text, dark background, messy, thick paint",
        tags: ["watercolor", "frame", "floral", "elegant"],
        style: "watercolor", aspectRatio: "1:1",
        previewImage: "/placeholders/mom-003.jpg",
        copyCount: 420, likes: 280
    },

    // Diwali 2025
    {
        id: "diwali-001", trendId: "diwali-2025", title: "River of Diyas",
        prompt: "A cinematic, majestic wide shot of a calm river at night reflecting thousands of floating glowing clay diyas (oil lamps). Fireworks bursting softly in the distant night sky over a beautiful ancient Indian temple. Magical vibe, highly detailed, photorealistic. --ar 16:9",
        negativePrompt: "daylight, modern city, low quality",
        tags: ["photorealistic", "diyas", "night", "cinematic"],
        style: "photorealistic", aspectRatio: "16:9",
        previewImage: "/placeholders/diwali-001.jpg",
        copyCount: 650, likes: 520
    },
    {
        id: "diwali-002", trendId: "diwali-2025", title: "Rangoli Mandala 3D",
        prompt: "An incredibly intricate 3D extruded Rangoli mandala design made of bright colored powder and fresh marigold flowers. Arranged on dark polished marble that reflects the glowing diyas placed around the edges. Top-down view, centered, symmetrical, studio lighting. 8k.",
        negativePrompt: "messy, asymmetrical, flat 2d",
        tags: ["3d", "rangoli", "symmetrical", "flowers"],
        style: "3d", aspectRatio: "1:1",
        previewImage: "/placeholders/diwali-002.jpg",
        copyCount: 380, likes: 290
    },
    {
        id: "diwali-003", trendId: "diwali-2025", title: "Sparkler Magic Girl",
        prompt: "A gorgeous anime style illustration of a young girl laughing and writing 'Happy Diwali' in the air with a glowing sparkler. She is wearing a beautiful lehenga. Night sky background filled with gentle bokeh from string lights. Makoto Shinkai style, emotional, vibrant.",
        negativePrompt: "ugly, photorealistic, scary",
        tags: ["anime", "sparkler", "girl", "magical"],
        style: "anime", aspectRatio: "9:16",
        previewImage: "/placeholders/diwali-003.jpg",
        copyCount: 290, likes: 210
    },
    {
        id: "diwali-004", trendId: "diwali-2025", title: "Minimalist Gold Diyas",
        prompt: "Extremely minimalist, elegant design. Three stylized vector diyas melting into gold foil. Deep charcoal black background. Luxurious, high end corporate Diwali greeting card aesthetic. Clean paths, simple curves.",
        negativePrompt: "cluttered, messy, 3d, realistic, colorful",
        tags: ["minimalist", "vector", "luxury", "gold"],
        style: "illustration", aspectRatio: "16:9",
        previewImage: "/placeholders/diwali-004.jpg",
        copyCount: 160, likes: 90
    },

    // New Year 2026
    {
        id: "ny-001", trendId: "new-year-2026", title: "Neon Cyberpunk NYE",
        prompt: "First person perspective looking up at massive holographic neon numbers floating in a cyberpunk mega-city counting down to midnight. Massive explosive neon fireworks. Flying cars, neon raining, extremely vibrant, bladerunner aesthetic. 8k, highly detailed. --ar 9:16",
        negativePrompt: "daylight, nature, boring, low resolution",
        tags: ["cyberpunk", "neon", "fireworks", "sci-fi"],
        style: "cinematic", aspectRatio: "9:16",
        previewImage: "/placeholders/ny-001.jpg",
        copyCount: 320, likes: 250
    },
    {
        id: "ny-002", trendId: "new-year-2026", title: "Luxury Champagne Toast",
        prompt: "Two crystal champagne flutes clinking together in front of a massive window overlooking a city skyline exploding with golden fireworks. Sharp focus on the bubbles in the glass, beautiful golden hour depth of field bokeh in the background. Photorealistic product photography.",
        negativePrompt: "dark, messy, people showing, ugly",
        tags: ["photorealistic", "luxury", "champagne", "celebration"],
        style: "photorealistic", aspectRatio: "16:9",
        previewImage: "/placeholders/ny-002.jpg",
        copyCount: 275, likes: 180
    },
    {
        id: "ny-003", trendId: "new-year-2026", title: "Typography Calendar Flip",
        prompt: "A stylish 3D isometric illustration of a sleek modern calendar flipping from 2025 to 2026. The 2026 page is glowing with a slick holographic gradient. A cup of coffee and some confetti on the minimal desk. Pastel background, clean aesthetic.",
        negativePrompt: "messy, photographic, people",
        tags: ["3d", "isometric", "typography", "clean"],
        style: "3d", aspectRatio: "1:1",
        previewImage: "/placeholders/ny-003.jpg",
        copyCount: 410, likes: 330
    }
];
