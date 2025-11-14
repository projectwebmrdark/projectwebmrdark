# Mr.Dark AI Agent Platform

The ultimate AI assistant platform that combines the power of multiple AI models (Codex, GPT, Claude, Cursor, Manus) into one unified interface.

## Features

- 🤖 **Multi-Model Support** - Choose from GPT-4, Claude 3, Gemini, and more
- 💻 **Code Execution** - Run Python, JavaScript, and other languages in isolated sandboxes
- 🌐 **Browser Automation** - Automate web browsing, scraping, and form filling
- 📊 **Data Analysis** - Analyze data with pandas and create visualizations
- 🔍 **Web Search** - Search the web for real-time information
- 🎨 **Image Generation** - Generate images with DALL-E and Stable Diffusion
- 💬 **Real-time Streaming** - Get responses as they're generated
- 🔐 **Secure Authentication** - Built with Supabase Auth
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: tRPC, Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **AI**: OpenAI API / Custom AI API
- **UI Components**: shadcn/ui
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Supabase account
- OpenAI API key or custom AI API key

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/projectwebmrdark/projectwebmrdark.git
cd mrdark-nextjs
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:

Create a \`.env.local\` file:

\`\`\`env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# OpenAI / External AI API
OPENAI_API_KEY=your_openai_api_key
# OR
VC_API_KEY=your_vc_api_key
VC_API_URL=https://api.example.com/v1

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="Mr.Dark AI Agent Platform"
\`\`\`

4. Set up the database:
- Go to Supabase SQL Editor
- Run \`supabase-schema.sql\`

5. Run development server:
\`\`\`bash
npm run dev
\`\`\`

## Deployment to Vercel

1. Push to GitHub:
\`\`\`bash
git add .
git commit -m "Deploy"
git push origin main
\`\`\`

2. Import to Vercel:
- Go to vercel.com
- Import GitHub repository
- Add environment variables
- Deploy!

## Database Schema

See \`supabase-schema.sql\` for complete schema with RLS policies.

Tables:
- sessions
- messages
- files
- api_keys
- tools
- tool_executions
- usage_stats

## License

MIT License

---

Built with ❤️ by Mr.Dark team
