<template>
    <div class="min-h-screen bg-slate-100 flex flex-col items-center justify-center px-4 py-10">
        <div class="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-8">
            <RotateCcw class="w-8 h-8 text-white" />
        </div>
        <div class="w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-sm p-8 md:p-12">
            <h1 class="text-3xl md:text-5xl font-bold text-center text-slate-900">
                Reset Your Password
            </h1>
            <p class="text-center text-slate-500 text-base md:text-xl mt-4 leading-relaxed">
                Enter your email address and we'll send you a secure link to reset your password.
            </p>
            <div class="mt-10">
                <label for="email" class="block text-base font-medium text-slate-700 mb-3">
                    Email Address
                </label>
                <div class="relative">
                    <Mail class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input placeholder="name@company.com"
                        class="w-full h-14 pl-12 pr-4 border border-slate-300 rounded-lg text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
            </div>
            <button
                class="w-full h-14 mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-lg transition-colors">
                Send Reset Link
            </button>
            <div class="border-t border-slate-200 my-8"></div>
            <div class="flex justify-center">
                <a href="#" class="flex items-center gap-2 text-blue-700 font-semibold hover:text-blue-800">
                    <span>←</span>
                    <span>Back to Login</span>
                </a>
            </div>
        </div>
        <div
            class="mt-10 flex items-center gap-2 text-slate-400 uppercase tracking-[0.2em] text-xs md:text-sm font-semibold">
            <ShieldCheck class="w-4 h-4" />
            <span>Secure Encrypted Authentication</span>
        </div>
    </div>
</template>

<script setup>
// import { RotateCcw, Mail, ShieldCheck } from "lucide-vue-next";


</script>
<style scoped>


</style>