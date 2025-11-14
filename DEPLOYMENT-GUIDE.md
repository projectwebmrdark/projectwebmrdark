# 🚀 Mr.Dark AI Agent Platform - Deployment Guide

## 📋 Table of Contents
1. [Supabase Setup](#supabase-setup)
2. [Vercel Environment Variables](#vercel-environment-variables)
3. [Final Configuration](#final-configuration)

---

## 1️⃣ Supabase Setup

### Step 1: Create Supabase Project
1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Fill in:
   - **Name**: `mrdark-ai-agent`
   - **Database Password**: (สร้าง password ที่แข็งแรง)
   - **Region**: Southeast Asia (Singapore)
4. Click "Create new project"
5. รอ 2-3 นาทีจนโปรเจคพร้อม

### Step 2: Run Database Schema
1. ไปที่ **SQL Editor** (เมนูซ้าย)
2. Click "New Query"
3. Copy ทั้งหมดจากไฟล์ `supabase-schema.sql` (อยู่ใน root ของโปรเจค)
4. Paste ลงใน SQL Editor
5. Click "Run" (หรือกด Ctrl+Enter)
6. ตรวจสอบว่าไม่มี error

### Step 3: Get Supabase Credentials
1. ไปที่ **Project Settings** (ไอคอนเฟือง)
2. ไปที่ **API** tab
3. Copy ค่าเหล่านี้:

```
Project URL: https://xxxxxxxxxxxxx.supabase.co
anon public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Step 4: Enable Google OAuth (Optional)
1. ไปที่ **Authentication** → **Providers**
2. เปิด **Google**
3. ใส่ Google OAuth credentials (ถ้ามี)
4. หรือข้ามไปก่อน ใช้ Email/Password ก็ได้

### Step 5: Configure Auth URLs
1. ไปที่ **Authentication** → **URL Configuration**
2. เพิ่ม Redirect URLs:

```
http://localhost:3000/auth/callback
https://your-app.vercel.app/auth/callback
```

(แทนที่ `your-app.vercel.app` ด้วย domain จริงของคุณหลัง deploy)

---

## 2️⃣ Vercel Environment Variables

### Step 1: Go to Vercel Dashboard
1. ไปที่ https://vercel.com/dashboard
2. เลือกโปรเจค **projectwebmrdark**
3. ไปที่ **Settings** → **Environment Variables**

### Step 2: Add Environment Variables

Copy-Paste ทีละตัว:

#### 🔹 NEXT_PUBLIC_SUPABASE_URL
```
NEXT_PUBLIC_SUPABASE_URL
```
**Value**: (Paste Project URL จาก Supabase)
```
https://xxxxxxxxxxxxx.supabase.co
```
**Environment**: Production, Preview, Development (เลือกทั้ง 3)

---

#### 🔹 NEXT_PUBLIC_SUPABASE_ANON_KEY
```
NEXT_PUBLIC_SUPABASE_ANON_KEY
```
**Value**: (Paste anon public key จาก Supabase)
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
**Environment**: Production, Preview, Development (เลือกทั้ง 3)

---

#### 🔹 SUPABASE_SERVICE_ROLE_KEY
```
SUPABASE_SERVICE_ROLE_KEY
```
**Value**: (Paste service_role key จาก Supabase)
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
**Environment**: Production, Preview, Development (เลือกทั้ง 3)

---

#### 🔹 OPENAI_API_KEY (หรือ VC_API_KEY)
```
OPENAI_API_KEY
```
**Value**: (Paste OpenAI API key ของคุณ)
```
sk-proj-...
```
**Environment**: Production, Preview, Development (เลือกทั้ง 3)

**หรือถ้าใช้ Custom AI API:**
```
VC_API_KEY
```
**Value**: (Paste API key ของคุณ)
```
your-custom-api-key
```

---

#### 🔹 VC_API_URL (ถ้าใช้ Custom AI API)
```
VC_API_URL
```
**Value**: (Paste API URL ของคุณ)
```
https://api.example.com/v1
```
**Environment**: Production, Preview, Development (เลือกทั้ง 3)

---

#### 🔹 NEXT_PUBLIC_APP_NAME
```
NEXT_PUBLIC_APP_NAME
```
**Value**:
```
Mr.Dark AI Agent Platform
```
**Environment**: Production, Preview, Development (เลือกทั้ง 3)

---

### Step 3: Redeploy
หลังจากเพิ่ม Environment Variables แล้ว:
1. ไปที่ **Deployments** tab
2. เลือก deployment ล่าสุด
3. Click **⋯** (three dots) → **Redeploy**
4. Click "Redeploy"

---

## 3️⃣ Final Configuration

### Update Supabase Auth Redirect URL
หลังจาก Deploy สำเร็จ:
1. Copy URL ของ Vercel (เช่น `https://projectwebmrdark.vercel.app`)
2. กลับไปที่ **Supabase** → **Authentication** → **URL Configuration**
3. เพิ่ม:
```
https://projectwebmrdark.vercel.app/auth/callback
```

---

## ✅ Verification Checklist

- [ ] Supabase project สร้างเสร็จ
- [ ] Database schema รันสำเร็จ (ไม่มี error)
- [ ] Supabase credentials ได้แล้ว (URL, anon key, service_role key)
- [ ] Vercel environment variables เพิ่มครบทั้ง 6 ตัว
- [ ] Redeploy Vercel แล้ว
- [ ] Supabase Auth redirect URL อัพเดทแล้ว
- [ ] เปิดเว็บไซต์ได้แล้ว
- [ ] สมัครสมาชิกได้
- [ ] Login ได้
- [ ] Chat ได้

---

## 🐛 Troubleshooting

### ปัญหา: "Missing AI API key"
- ตรวจสอบว่าเพิ่ม `OPENAI_API_KEY` หรือ `VC_API_KEY` แล้ว
- Redeploy Vercel

### ปัญหา: "Unauthorized" เมื่อ Login
- ตรวจสอบ Supabase Auth redirect URL
- ตรวจสอบ `NEXT_PUBLIC_SUPABASE_URL` และ `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### ปัญหา: Database error
- ตรวจสอบว่ารัน `supabase-schema.sql` แล้ว
- ตรวจสอบ `SUPABASE_SERVICE_ROLE_KEY`

### ปัญหา: Build failed
- ดู build logs ใน Vercel
- ตรวจสอบว่า environment variables ครบ

---

## 📞 Support

หากมีปัญหา:
1. ตรวจสอบ Vercel build logs
2. ตรวจสอบ Browser console (F12)
3. ตรวจสอบ Supabase logs

---

**🎉 Deployment Complete!**

เมื่อทำตามขั้นตอนครบแล้ว เว็บไซต์ของคุณจะพร้อมใช้งานที่:
`https://projectwebmrdark.vercel.app`
