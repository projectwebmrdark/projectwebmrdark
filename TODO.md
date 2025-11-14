# Mr.Dark AI Agent Platform (Next.js) - TODO List

## Phase 1: โครงสร้างพื้นฐาน
- [x] สร้างโปรเจค Next.js
- [x] ติดตั้ง dependencies (tRPC, Supabase, OpenAI, shadcn/ui)
- [x] ตั้งค่า tRPC configuration
- [x] ตั้งค่า Supabase client
- [x] ตั้งค่า Environment variables
- [x] สร้างโครงสร้างโฟลเดอร์

## Phase 2: Database Schema (Supabase)
- [ ] สร้าง users table
- [ ] สร้าง sessions table
- [ ] สร้าง messages table
- [ ] สร้าง files table
- [ ] สร้าง api_keys table
- [ ] สร้าง tools table
- [ ] สร้าง tool_executions table
- [ ] สร้าง usage_stats table
- [ ] ตั้งค่า Row Level Security (RLS)
- [ ] สร้าง Database functions และ triggers

## Phase 3: tRPC API
- [x] สร้าง tRPC router structure
- [x] สร้าง auth router (logout, me)
- [x] สร้าง sessions router (create, list, get, update, delete)
- [x] สร้าง messages router (create, list)
- [x] สร้าง files router (list, delete)
- [ ] สร้าง file upload API route
- [ ] สร้าง apiKeys router (create, list, delete)
- [ ] สร้าง tools router (list, execute)
- [ ] สร้าง stats router (usage, quota)

## Phase 4: AI Agent Core
- [ ] สร้าง OpenAI client wrapper
- [ ] สร้าง streaming chat handler
- [ ] สร้าง function calling system
- [ ] สร้าง tool registry
- [ ] เชื่อมต่อ External AI API (VC_API_KEY)
- [ ] สร้าง context management
- [ ] สร้าง token counting

## Phase 5: Tool System
- [ ] สร้าง base tool interface
- [ ] พัฒนา Code Execution tool
- [ ] พัฒนา Web Search tool
- [ ] พัฒนา Browser Automation tool
- [ ] พัฒนา File Operations tool
- [ ] พัฒนา Image Generation tool
- [ ] สร้าง tool execution sandbox

## Phase 6: Frontend UI/UX
- [x] ออกแบบ color palette และ theme system
- [x] สร้าง Landing Page
- [x] สร้าง Chat Interface
- [x] สร้าง Message List component
- [x] สร้าง Input Area component
- [x] สร้าง Sidebar navigation
- [x] สร้าง Theme switcher (dark/light)
- [ ] สร้าง File Upload component
- [ ] สร้าง Execution Viewer
- [ ] สร้าง Tool Execution Panel
- [ ] สร้าง Settings Page
- [ ] สร้าง API Key Management UI
- [ ] สร้าง Quota Display

## Phase 7: Authentication & Authorization
- [x] ตั้งค่า Supabase Auth
- [x] สร้าง Login/Signup pages
- [x] สร้าง Protected routes (middleware)
- [x] สร้าง Auth callback route
- [x] สร้าง Session management
- [ ] สร้าง User profile page

## Phase 8: Testing
- [ ] ทดสอบ Chat functionality
- [ ] ทดสอบ Streaming responses
- [ ] ทดสอบ Tool execution
- [ ] ทดสอบ File upload/download
- [ ] ทดสอบ API key management
- [ ] ทดสอบ Quota tracking
- [ ] ทดสอบ Authentication flow
- [ ] ทดสอบ Responsive design
- [ ] ทดสอบ Error handling

## Phase 9: Deployment
- [ ] ตั้งค่า Environment variables บน Vercel
- [ ] ตั้งค่า Supabase production database
- [ ] Push code ไป GitHub
- [ ] Deploy ไป Vercel
- [ ] ทดสอบ Production environment
- [ ] ตั้งค่า Custom domain (ถ้าต้องการ)

## Phase 10: Documentation
- [ ] สร้างคู่มือการใช้งาน
- [ ] สร้างคู่มือ API
- [ ] สร้างคู่มือ Deployment
- [ ] สร้าง README.md
- [ ] สร้าง CHANGELOG.md
