<template>
  <div class="page">
    <div class="card">
      <!-- Header -->
      <div class="card-header">
        <h1 class="title">Welcome Back</h1>
        <p class="subtitle">Enter your credentials to access your<br />workspace</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" novalidate class="form">

        <!-- Email -->
        <div class="field">
          <label for="email">Email Address</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="name@company.com"
            autocomplete="email"
            :class="{ 'input-error': errors.email }"
            @blur="validateField('email')"
          />
          <span v-if="errors.email" class="error-msg">{{ errors.email }}</span>
        </div>

        <!-- Password -->
        <div class="field">
          <div class="label-row">
            <label for="password">Password</label>
            <a href="#" class="forgot-link">Forgot Password?</a>
          </div>
          <div class="input-wrap">
            <input
              id="password"
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="current-password"
              :class="{ 'input-error': errors.password }"
              @blur="validateField('password')"
            />
            <button
              type="button"
              class="eye-toggle"
              @click="showPassword = !showPassword"
              :aria-label="showPassword ? 'Hide password' : 'Show password'"
            >
              <!-- Eye open -->
              <svg v-if="!showPassword" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              <!-- Eye closed -->
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
              </svg>
            </button>
          </div>
          <span v-if="errors.password" class="error-msg">{{ errors.password }}</span>
        </div>

        <!-- Remember checkbox -->
        <div class="remember-row">
          <label class="check-label">
            <input type="checkbox" v-model="form.remember" class="check-input" />
            <span class="check-box"></span>
            Remember this device for 30 days
          </label>
        </div>

        <!-- Sign In button -->
        <button type="submit" class="btn-signin" :disabled="loading">
          <span v-if="!loading">Sign In</span>
          <span v-else class="spinner" aria-label="Loading"></span>
        </button>

      </form>

      <!-- Divider -->
      <div class="divider">
        <span class="divider-line"></span>
        <span class="divider-text">OR CONTINUE WITH</span>
        <span class="divider-line"></span>
      </div>

      <!-- Google SSO -->
      <button class="btn-google" @click="handleGoogle" type="button">
        <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Google Workspace
      </button>

      <!-- Sign up -->
      <p class="signup-text">
        Don't have an account?
        <a href="#" class="signup-link">Create an Account</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const form = reactive({ email: '', password: '', remember: false })
const errors = reactive({ email: '', password: '' })
const showPassword = ref(false)
const loading = ref(false)

function validateField(field) {
  if (field === 'email') {
    if (!form.email) {
      errors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = 'Enter a valid email address.'
    } else {
      errors.email = ''
    }
  }
  if (field === 'password') {
    if (!form.password) {
      errors.password = 'Password is required.'
    } else if (form.password.length < 6) {
      errors.password = 'Minimum 6 characters.'
    } else {
      errors.password = ''
    }
  }
}

function validate() {
  validateField('email')
  validateField('password')
  return !errors.email && !errors.password
}

async function handleSubmit() {
  if (!validate()) return
  loading.value = true
  await new Promise(r => setTimeout(r, 1500))
  loading.value = false
  alert(`Signed in as ${form.email}`)
}

function handleGoogle() {
  alert('Redirecting to Google Workspace SSO…')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.page {
  font-family: 'Outfit', sans-serif;
  min-height: 100vh;
  background: linear-gradient(145deg, #eef2fb 0%, #dde6f9 50%, #e8edf8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

/* ── Card ── */
.card {
  background: #ffffff;
  border: 1.5px dashed #93b4f0;
  border-radius: 10px;
  padding: 44px 52px 36px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 2px 6px rgba(37,99,235,.06), 0 12px 40px rgba(37,99,235,.08);
  animation: fadeUp .45s cubic-bezier(.16,1,.3,1) both;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Header ── */
.card-header {
  text-align: center;
  margin-bottom: 32px;
}

.title {
  font-size: 26px;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -0.5px;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 14px;
  color: #64748b;
  line-height: 1.55;
}

/* ── Form ── */
.form {
  display: flex;
  flex-direction: column;
  gap: 0;
}

/* ── Fields ── */
.field {
  margin-bottom: 18px;
}

.field label {
  display: block;
  font-size: 13.5px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 6px;
}

.field input[type="email"],
.field input[type="password"],
.field input[type="text"] {
  width: 100%;
  padding: 10px 14px;
  border: 1.5px solid #d1d9e6;
  border-radius: 7px;
  font-size: 14px;
  color: #111827;
  font-family: inherit;
  outline: none;
  background: #fff;
  transition: border-color .18s, box-shadow .18s;
}

.field input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37,99,235,.13);
}

.field input.input-error {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239,68,68,.1);
}

.error-msg {
  display: block;
  font-size: 12px;
  color: #ef4444;
  margin-top: 4px;
}

/* ── Password row ── */
.label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.forgot-link {
  font-size: 13px;
  font-weight: 500;
  color: #2563eb;
  text-decoration: none;
}
.forgot-link:hover { text-decoration: underline; }

.input-wrap {
  position: relative;
}
.input-wrap input {
  padding-right: 42px;
}
.eye-toggle {
  position: absolute;
  right: 11px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #94a3b8;
  display: flex;
  align-items: center;
  padding: 0;
  transition: color .15s;
}
.eye-toggle svg { width: 18px; height: 18px; }
.eye-toggle:hover { color: #475569; }

/* ── Remember ── */
.remember-row {
  margin-bottom: 22px;
}

.check-label {
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 13.5px;
  color: #475569;
  cursor: pointer;
  user-select: none;
}

.check-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.check-box {
  width: 16px;
  height: 16px;
  border: 1.5px solid #c5d0e0;
  border-radius: 3px;
  background: #fff;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color .15s, background .15s;
}

.check-input:checked + .check-box {
  background: #2563eb;
  border-color: #2563eb;
}

.check-input:checked + .check-box::after {
  content: '';
  display: block;
  width: 9px;
  height: 5px;
  border-left: 2px solid #fff;
  border-bottom: 2px solid #fff;
  transform: rotate(-45deg) translate(1px, -1px);
}

/* ── Sign In Button ── */
.btn-signin {
  width: 100%;
  padding: 11px;
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  letter-spacing: 0.2px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  transition: background .15s, transform .1s, box-shadow .15s;
  box-shadow: 0 2px 8px rgba(37,99,235,.30);
}
.btn-signin:hover:not(:disabled) {
  background: #1d4ed8;
  box-shadow: 0 4px 14px rgba(37,99,235,.38);
}
.btn-signin:active:not(:disabled) { transform: scale(.98); }
.btn-signin:disabled { opacity: .7; cursor: not-allowed; }

.spinner {
  width: 19px;
  height: 19px;
  border: 2.5px solid rgba(255,255,255,.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin .7s linear infinite;
  display: inline-block;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ── Divider ── */
.divider {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 24px 0;
}
.divider-line {
  flex: 1;
  height: 1px;
  background: #e2e8f0;
}
.divider-text {
  font-size: 11.5px;
  font-weight: 500;
  color: #94a3b8;
  letter-spacing: .6px;
  white-space: nowrap;
}

/* ── Google Button ── */
.btn-google {
  width: 100%;
  padding: 11px;
  background: #fff;
  border: 1.5px solid #d1d9e6;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  font-family: inherit;
  color: #374151;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: background .15s, border-color .15s;
}
.btn-google:hover {
  background: #f8faff;
  border-color: #93b4f0;
}

/* ── Sign Up ── */
.signup-text {
  text-align: center;
  font-size: 13.5px;
  color: #64748b;
  margin-top: 24px;
}
.signup-link {
  color: #2563eb;
  font-weight: 500;
  text-decoration: none;
}
.signup-link:hover { text-decoration: underline; }

/* ── Responsive ── */
@media (max-width: 480px) {
  .card { padding: 32px 24px 28px; }
}
</style>
