<template>
  <div class="min-h-screen bg-[#0b0f19] text-slate-200 p-6 md:p-12 flex items-center justify-center font-sans">
    
    <div class="w-full max-w-2xl bg-[#111827]/40 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] relative overflow-hidden">
      
      <div class="absolute -right-20 -top-20 w-60 h-60 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none"></div>
      <div class="absolute -left-20 -bottom-20 w-60 h-60 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none"></div>

      <div class="flex items-start justify-between mb-8 pb-6 border-b border-white/5">
        <div>
          <div class="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
            <span class="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
            <span>Preferences</span>
          </div>
          <h1 class="text-2xl font-bold text-white tracking-tight">ការកំណត់ភាសាប្រព័ន្ធ</h1>
          <p class="text-slate-400 text-sm mt-1">ជ្រើសរើស និងរៀបចំភាសាលំនាំដើមសម្រាប់ផ្ទាំង Dashboard របស់អ្នក</p>
        </div>
        <div class="bg-white/5 p-3 rounded-2xl border border-white/10 text-blue-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
          </svg>
        </div>
      </div>

      <div class="space-y-6">
        
        <div class="space-y-3">
          <label class="text-xs font-semibold text-slate-400 uppercase tracking-wider block">ភាសាលំនាំដើម</label>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div 
              @click="currentLang = 'kh'"
              :class="currentLang === 'kh' ? 'border-blue-500/50 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.15)] text-white' : 'border-white/5 bg-white/2 text-slate-400 hover:border-white/10 hover:bg-white/4'"
              class="flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all duration-300 group"
            >
              <div class="flex items-center space-x-4">
                <span class="text-2xl filter drop-shadow-md">🇰🇭</span>
                <div>
                  <h3 class="font-medium text-sm group-hover:text-white transition-colors">ភាសាខ្មែរ</h3>
                  <p class="text-[11px] text-slate-500 mt-0.5">Khmer Standard</p>
                </div>
              </div>
              <div :class="currentLang === 'kh' ? 'border-blue-500 bg-blue-500' : 'border-slate-600'" class="w-4 h-4 rounded-full border flex items-center justify-center transition-all">
                <div v-if="currentLang === 'kh'" class="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
            </div>

            <div 
              @click="currentLang = 'en'"
              :class="currentLang === 'en' ? 'border-blue-500/50 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.15)] text-white' : 'border-white/5 bg-white/2 text-slate-400 hover:border-white/10 hover:bg-white/4'"
              class="flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all duration-300 group"
            >
              <div class="flex items-center space-x-4">
                <span class="text-2xl filter drop-shadow-md">🇺🇸</span>
                <div>
                  <h3 class="font-medium text-sm group-hover:text-white transition-colors">English</h3>
                  <p class="text-[11px] text-slate-500 mt-0.5">United States</p>
                </div>
              </div>
              <div :class="currentLang === 'en' ? 'border-blue-500 bg-blue-500' : 'border-slate-600'" class="w-4 h-4 rounded-full border flex items-center justify-center transition-all">
                <div v-if="currentLang === 'en'" class="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
            </div>

          </div>
        </div>

        <div class="bg-white/1 border border-white/5 p-5 rounded-2xl flex items-center justify-between transition-all hover:bg-white/2">
          <div class="space-y-1 pr-4">
            <h4 class="text-sm font-medium text-white">ស្វែងរកភាសាដោយស្វ័យប្រវត្ត</h4>
            <p class="text-xs text-slate-400 leading-relaxed">ផ្លាស់ប្តូរភាសាកម្មវិធីទៅតាមភាសានៃកម្មវិធីរុករក (Browser) របស់អ្នកប្រើប្រាស់។</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer select-none shrink-0">
            <input type="checkbox" v-model="autoDetect" class="sr-only peer">
            <div class="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-slate-400 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500 peer-checked:after:bg-white"></div>
          </label>
        </div>

        <div class="flex items-center justify-end space-x-4 pt-6 border-t border-white/5">
          <button class="px-5 py-2.5 text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
            បោះបង់
          </button>
          <button 
            @click="handleSave" 
            class="px-6 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 transform active:scale-[0.98] transition-all"
          >
            រក្សាទុកការផ្លាស់ប្តូរ
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentLang = ref('kh')
const autoDetect = ref(true)

const handleSave = () => {
  console.log('Saved Configuration:', { lang: currentLang.value, auto: autoDetect.value })
  alert(`✅ ការកំណត់ត្រូវបានរក្សាទុក! ភាសាបច្ចុប្បន្ន៖ ${currentLang.value === 'kh' ? 'ភាសាខ្មែរ' : 'English'}`)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@300;400;500;600;700&display=swap');

* {
  font-family: 'Kantumruy Pro', sans-serif;
}
</style>