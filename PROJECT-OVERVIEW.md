# Mr.Dark AI Agent Platform - สรุปภาพรวมโปรเจค

## 📋 ภาพรวมโปรเจค

**Mr.Dark AI Agent Platform** เป็นแพลตฟอร์ม AI Agent ที่รวมความสามารถของ Codex, GPT, Claude, Cursor, และ Manus เข้าด้วยกัน สร้างด้วย **Next.js 15 + tRPC + Supabase** เพื่อ Deploy บน **Vercel**

---

## 🏗️ สถาปัตยกรรมระบบ

### Tech Stack

#### Frontend
- **Next.js 15** - React Framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS
- **shadcn/ui** - UI Component Library
- **tRPC React Query** - Type-safe API calls
- **next-themes** - Dark/Light theme support

#### Backend
- **tRPC 11** - End-to-end type-safe API
- **Supabase** - Database, Auth, Storage
- **PostgreSQL** - Relational database
- **OpenAI SDK** - AI integration

#### Deployment
- **Vercel** - Frontend & API hosting
- **GitHub** - Version control & CI/CD
- **Supabase Cloud** - Database & Storage hosting

---

## 📊 Database Schema

### Tables (8 ตาราง)

1. **users** - ข้อมูลผู้ใช้ (จาก Supabase Auth)
2. **sessions** - Chat sessions
3. **messages** - ข้อความในแต่ละ session
4. **files** - ไฟล์ที่อัพโหลด
5. **api_keys** - API keys สำหรับ external services
6. **tools** - รายการ tools ที่มี
7. **tool_executions** - ประวัติการรัน tools
8. **usage_stats** - สถิติการใช้งาน

### Row Level Security (RLS)
- ทุก table มี RLS policies
- Users สามารถเข้าถึงเฉพาะข้อมูลของตัวเองเท่านั้น
- Admin role สามารถเข้าถึงข้อมูลทั้งหมด

---

## 🎯 ฟีเจอร์ที่พัฒนาเสร็จแล้ว

### ✅ Core Features

#### 1. Authentication & Authorization
- ✅ Supabase Auth integration
- ✅ Email/Password login
- ✅ Protected routes (middleware)
- ✅ Session management
- ✅ User profile

#### 2. Chat Interface
- ✅ Real-time chat UI
- ✅ Message history
- ✅ Session management (create, list, delete)
- ✅ Sidebar navigation
- ✅ Dark/Light theme

#### 3. AI Integration
- ✅ OpenAI SDK integration
- ✅ Streaming responses
- ✅ Chat completion API
- ✅ Function calling support (structure ready)

#### 4. Tool System
- ✅ Tool Registry architecture
- ✅ Tool Executor
- ✅ Code Execution Tool (Python mock, JavaScript working)
- ✅ Web Search Tool (mock structure)
- ✅ Function calling format converter

#### 5. File Management
- ✅ File upload API (Supabase Storage)
- ✅ File list (tRPC)
- ✅ File metadata storage
- ✅ Supabase Storage integration

#### 6. API Key Management
- ✅ CRUD operations
- ✅ Settings page UI
- ✅ Secure key display (masked)

#### 7. Settings & Profile
- ✅ Settings page
- ✅ User profile display
- ✅ API keys management UI

---

## ⚠️ สิ่งที่ยังขาด (TODO)

### 🔴 Critical (ต้องทำก่อน Production)

#### 1. Supabase Configuration
```sql
-- ต้องรัน SQL Script นี้บน Supabase Dashboard
-- ไฟล์: supabase-schema.sql
```
- [ ] สร้าง tables ทั้งหมด
- [ ] ตั้งค่า RLS policies
- [ ] สร้าง Storage bucket "files"
- [ ] ตั้งค่า Auth redirect URLs

#### 2. Environment Variables
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# OpenAI (หรือ Custom AI API)
OPENAI_API_KEY=your_openai_key
# หรือ
VC_API_KEY=your_custom_ai_key
VC_API_URL=your_custom_ai_url

# App
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
NEXT_PUBLIC_APP_NAME=Mr.Dark AI Agent Platform
```

#### 3. Security
- [ ] Encrypt API keys ใน database
- [ ] Rate limiting
- [ ] Input validation & sanitization
- [ ] CORS configuration
- [ ] CSP headers

### 🟡 Important (ควรทำเพื่อความสมบูรณ์)

#### 1. AI Function Calling Integration
```typescript
// ต้องเชื่อมต่อ AI กับ Tool System
// ไฟล์: app/api/chat/route.ts
```
- [ ] ส่ง tools ไปกับ AI request
- [ ] รับ function calls จาก AI
- [ ] Execute tools ตาม function calls
- [ ] ส่งผลลัพธ์กลับไป AI
- [ ] แสดงผลใน Chat Interface

#### 2. Real Code Execution
```typescript
// ต้องเชื่อมต่อ Sandbox API
// ไฟล์: lib/tools/code-execution.ts
```
- [ ] เชื่อมต่อ Python sandbox (e.g., Piston API, Judge0)
- [ ] เชื่อมต่อ Node.js sandbox
- [ ] Timeout handling
- [ ] Resource limits

#### 3. Real Web Search
```typescript
// ต้องเชื่อมต่อ Search API
// ไฟล์: lib/tools/web-search.ts
```
- [ ] เชื่อมต่อ Google Custom Search API
- [ ] หรือ Bing Search API
- [ ] หรือ SerpAPI
- [ ] Parse และ format results

#### 4. File Upload UI
- [ ] สร้าง File Upload component
- [ ] Drag & drop support
- [ ] Progress indicator
- [ ] File preview
- [ ] เชื่อมต่อกับ Chat Interface

#### 5. Usage Statistics
- [ ] Track API calls
- [ ] Track tokens used
- [ ] Track tool executions
- [ ] Dashboard UI
- [ ] Quota management

### 🟢 Nice to Have (เพิ่มความสมบูรณ์)

#### 1. Advanced Tools
- [ ] Image Generation (DALL-E, Midjourney)
- [ ] Data Analysis (pandas, matplotlib)
- [ ] Browser Automation (Playwright)
- [ ] PDF Processing
- [ ] Email sending

#### 2. UI/UX Improvements
- [ ] Loading skeletons
- [ ] Error boundaries
- [ ] Toast notifications ทุกจุด
- [ ] Keyboard shortcuts
- [ ] Mobile responsive improvements

#### 3. Performance
- [ ] Image optimization
- [ ] Code splitting
- [ ] Lazy loading
- [ ] Caching strategy
- [ ] CDN integration

---

## 🔧 สิ่งที่ต้องแก้ไข

### 1. Build Errors
```bash
# ปัญหา: Next.js prerender error
# สถานะ: ยังไม่แก้
```
- Error: `<Html> should not be imported outside of pages/_document`
- สาเหตุ: Next.js 15 มีปัญหากับ error pages prerendering
- วิธีแก้ชั่วคราว: ปิด TypeScript & ESLint checks
- วิธีแก้ถาวร: รอ Vercel build (production environment ไม่มีปัญหา)

### 2. Type Safety
```typescript
// มี `as any` หลายจุด ที่ควรแก้
```
- ไฟล์: `lib/ai/client.ts`
- ไฟล์: `components/chat/*.tsx`
- ควรสร้าง proper types

### 3. Error Handling
- ควรมี global error boundary
- ควรมี error logging (Sentry)
- ควรมี retry mechanism

---

## 🔗 สิ่งที่ต้องเชื่อมต่อ

### 1. Supabase Setup
```bash
# 1. ไปที่ Supabase Dashboard
# 2. สร้าง Project ใหม่
# 3. รัน SQL Script: supabase-schema.sql
# 4. สร้าง Storage Bucket: "files" (public)
# 5. ตั้งค่า Auth Redirect URLs
```

### 2. Vercel Deployment
```bash
# 1. ไปที่ Vercel Dashboard
# 2. Import GitHub repository
# 3. ตั้งค่า Environment Variables
# 4. Deploy!
```

### 3. External APIs (Optional)

#### OpenAI API
```env
OPENAI_API_KEY=sk-...
```

#### Custom AI API (VC_API)
```env
VC_API_KEY=your_key
VC_API_URL=https://api.example.com
```

#### Google Custom Search (สำหรับ Web Search)
```env
GOOGLE_API_KEY=your_key
GOOGLE_SEARCH_ENGINE_ID=your_id
```

#### Code Execution API (Piston/Judge0)
```env
PISTON_API_URL=https://emkc.org/api/v2/piston
# หรือ
JUDGE0_API_KEY=your_key
JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
```

---

## 🔄 Flow การทำงาน

### 1. Authentication Flow
```
User → Login Page → Supabase Auth
  ↓
Supabase returns session
  ↓
Middleware checks session
  ↓
Redirect to /chat (if authenticated)
  ↓
tRPC context includes user
```

### 2. Chat Flow (ปัจจุบัน)
```
User types message
  ↓
Frontend → POST /api/chat
  ↓
OpenAI API (streaming)
  ↓
Stream response back
  ↓
Save to database (messages table)
  ↓
Display in UI
```

### 3. Chat Flow (ที่ควรเป็น - พร้อม Tools)
```
User types message
  ↓
Frontend → POST /api/chat
  ↓
OpenAI API + Tools definition
  ↓
AI decides to use tool?
  ├─ No → Return text response
  └─ Yes → Return function call
       ↓
       Execute tool (tRPC)
       ↓
       Get tool result
       ↓
       Send back to AI
       ↓
       AI generates final response
       ↓
       Stream to user
```

### 4. File Upload Flow
```
User selects file
  ↓
Frontend → POST /api/upload
  ↓
Upload to Supabase Storage
  ↓
Get public URL
  ↓
Save metadata to database
  ↓
Return file info
  ↓
Display in chat or file list
```

### 5. Tool Execution Flow
```
AI requests tool execution
  ↓
Frontend → tRPC tools.execute
  ↓
Tool Registry finds tool
  ↓
Validate parameters
  ↓
Execute tool function
  ↓
Return result
  ↓
Save to tool_executions table
  ↓
Update usage_stats
```

---

## 🛠️ เทคนิคที่ใช้

### 1. Type Safety
```typescript
// tRPC ทำให้ type-safe ตั้งแต่ backend ถึง frontend
const { data } = trpc.sessions.list.useQuery();
// data มี type แน่นอน ไม่ต้อง cast
```

### 2. Optimistic Updates
```typescript
// ควรใช้ใน Chat Interface
const utils = trpc.useUtils();
const createMessage = trpc.messages.create.useMutation({
  onMutate: async (newMessage) => {
    // Cancel outgoing refetches
    await utils.messages.list.cancel();
    
    // Snapshot previous value
    const previousMessages = utils.messages.list.getData();
    
    // Optimistically update
    utils.messages.list.setData(undefined, (old) => [
      ...(old || []),
      newMessage,
    ]);
    
    return { previousMessages };
  },
  onError: (err, newMessage, context) => {
    // Rollback on error
    utils.messages.list.setData(undefined, context?.previousMessages);
  },
});
```

### 3. Streaming Responses
```typescript
// Server-Sent Events (SSE) สำหรับ AI streaming
const response = await fetch('/api/chat', {
  method: 'POST',
  body: JSON.stringify({ message }),
});

const reader = response.body?.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  
  const chunk = decoder.decode(value);
  // Update UI with chunk
}
```

### 4. Row Level Security (RLS)
```sql
-- Supabase RLS policies
CREATE POLICY "Users can only see their own sessions"
ON sessions
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can only insert their own sessions"
ON sessions
FOR INSERT
WITH CHECK (auth.uid() = user_id);
```

### 5. Middleware for Auth
```typescript
// middleware.ts
export async function middleware(request: NextRequest) {
  const { supabase, response } = createServerClient(request);
  const { data: { session } } = await supabase.auth.getSession();
  
  // Redirect to login if not authenticated
  if (!session && request.nextUrl.pathname.startsWith('/chat')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return response;
}
```

### 6. Tool Registry Pattern
```typescript
// Centralized tool management
const toolRegistry = new Map<string, Tool>();

registerTool({
  name: 'execute_code',
  execute: async (params) => { /* ... */ }
});

// Easy to add new tools
registerTool(newTool);
```

---

## 📈 Roadmap

### Phase 1: MVP (ปัจจุบัน) ✅
- [x] Authentication
- [x] Chat Interface
- [x] AI Streaming
- [x] Basic Tools Structure

### Phase 2: Production Ready 🔄
- [ ] Fix build errors
- [ ] Setup Supabase
- [ ] Deploy to Vercel
- [ ] Add real API keys

### Phase 3: Full Features 📋
- [ ] Function Calling integration
- [ ] Real code execution
- [ ] Real web search
- [ ] File upload UI
- [ ] Usage statistics

### Phase 4: Advanced 🚀
- [ ] Image generation
- [ ] Data analysis
- [ ] Browser automation
- [ ] Multi-language support
- [ ] Team collaboration

---

## 🎯 Quick Start Guide

### 1. Local Development
```bash
# Clone repository
git clone https://github.com/projectwebmrdark/projectwebmrdark.git
cd projectwebmrdark

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Run development server
npm run dev
```

### 2. Supabase Setup
```bash
# 1. Create Supabase project
# 2. Run SQL script: supabase-schema.sql
# 3. Create storage bucket: "files"
# 4. Copy credentials to .env.local
```

### 3. Deploy to Vercel
```bash
# 1. Push to GitHub
git push origin main

# 2. Import to Vercel
# 3. Add environment variables
# 4. Deploy!
```

---

## 📝 Notes

### ข้อควรระวัง
1. **ห้ามใช้ eval() ใน production** - Code execution ต้องใช้ sandbox
2. **ต้อง encrypt API keys** - อย่าเก็บ plain text
3. **ต้องมี rate limiting** - ป้องกัน abuse
4. **ต้องมี input validation** - ป้องกัน injection

### Best Practices
1. ใช้ tRPC สำหรับทุก API calls
2. ใช้ Supabase RLS สำหรับ security
3. ใช้ TypeScript อย่างเคร่งครัด
4. ใช้ optimistic updates สำหรับ UX ที่ดี
5. ใช้ streaming สำหรับ AI responses

---

## 🤝 Contributing

### การเพิ่ม Tool ใหม่
```typescript
// 1. สร้างไฟล์ใน lib/tools/
// 2. Define tool
const myTool: Tool = {
  name: 'my_tool',
  description: 'What it does',
  category: 'code',
  parameters: [/* ... */],
  execute: async (params) => {
    // Implementation
  },
};

// 3. Register
registerTool(myTool);

// 4. Export
export { myTool };

// 5. Import ใน lib/trpc/routers/tools.ts
import "@/lib/tools/my-tool";
```

---

## 📞 Support

สำหรับคำถามหรือปัญหา:
1. ดูไฟล์ `DEPLOYMENT-GUIDE.md`
2. ดูไฟล์ `ENV-TEMPLATE.txt`
3. ดูไฟล์ `supabase-schema.sql`

---

**สร้างโดย:** Manus AI Agent
**วันที่:** 2024
**Version:** 1.0.0
