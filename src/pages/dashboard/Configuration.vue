<template>
  <div class="min-h-screen bg-[#0d0f14] text-[#e8eaf2] font-sans">
    <main class="max-w-4xl mx-auto px-10 py-12">

      <!-- HEADER -->
      <div class="mb-10">
        <p class="text-xs uppercase tracking-widest text-gray-400 mb-2">
          System · Configuration
        </p>

        <h1 class="text-4xl font-bold mb-2">
          Configuration Hub
        </h1>

        <p class="text-sm text-gray-400 max-w-md">
          Manage system settings, integrations, and configurations.
        </p>
      </div>

      <!-- FEATURE -->
      <div class="flex gap-6 bg-[#13161e] border border-white/10 rounded-2xl p-6 mb-6">

        <div class="w-20 h-20 bg-[#1a1e29] rounded-xl flex items-center justify-center">
          <svg class="w-10 h-10 text-indigo-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"/>
            <path d="M2 12h20M12 2a15 15 0 0 1 0 20a15 15 0 0 1 0-20z"/>
          </svg>
        </div>

        <div>
          <h2 class="text-xl font-semibold mb-1">Language Settings</h2>
          <p class="text-sm text-gray-400 mb-3">
            Set admin and customer language preferences.
          </p>

          <button class="bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-2 rounded-lg text-sm">
            Configure
          </button>
        </div>
      </div>

      <!-- GRID -->
      <div class="grid grid-cols-2 gap-4 mb-10">

        <div v-for="(item, i) in cards" :key="i"
          class="bg-[#13161e] border border-white/10 rounded-xl p-5 hover:bg-[#1a1e29]">

          <div class="mb-3" v-html="item.icon"></div>

          <h3 class="font-semibold mb-1">{{ item.title }}</h3>
          <p class="text-sm text-gray-400 mb-2">{{ item.desc }}</p>

          <span v-if="item.tag"
            class="text-xs bg-white/10 px-2 py-1 rounded text-gray-300">
            {{ item.tag }}
          </span>

        </div>

      </div>

      <!-- ADVANCED SYSTEM SETTINGS (FIXED ICON ALIGNMENT) -->
      <p class="text-xs uppercase tracking-widest text-gray-400 mb-3">
        Advanced System Settings
      </p>

      <div class="bg-[#13161e] border border-white/10 rounded-xl overflow-hidden">

        <div v-for="(a, i) in advanced" :key="i"
          class="flex items-center justify-between px-5 py-4 border-b border-white/10 last:border-none hover:bg-[#1a1e29]">

          <!-- LEFT SIDE -->
          <div class="flex items-center gap-4">

            <!-- FIXED ICON BOX -->
            <div class="w-10 h-10 bg-[#1a1e29] rounded-lg flex items-center justify-center shrink-0">
              <span class="w-5 h-5 flex items-center justify-center" v-html="a.icon"></span>
            </div>

            <!-- TEXT -->
            <div>
              <p class="text-sm font-medium">{{ a.title }}</p>
              <p class="text-xs text-gray-400">{{ a.sub }}</p>
            </div>

          </div>

          <!-- ARROW -->
          <svg class="w-4 h-4 text-gray-500 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="m9 5 7 7-7 7"/>
          </svg>

        </div>

      </div>

    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cards: [
        {
          icon: `<svg class="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>`,
          title: "Profile Branding",
          desc: "Update logo and branding"
        },
        {
          icon: `<svg class="w-6 h-6 text-red-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M12 2l7 7-7 13-7-13 7-7z"/></svg>`,
          title: "Security & Access",
          desc: "Manage authentication",
          tag: "Protected"
        },
        {
          icon: `<svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M12 2v20"/></svg>`,
          title: "Notifications",
          desc: "Alerts & messaging"
        },
        {
          icon: `<svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M4 12h16"/></svg>`,
          title: "API Integrations",
          desc: "External services",
          tag: "AWS / GOOG"
        }
      ],

      advanced: [
        {
          icon: `<svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M4 4h16v16H4z"/></svg>`,
          title: "Data Backups",
          sub: "Last backup: 2 hours ago"
        },
        {
          icon: `<svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M12 4v16"/></svg>`,
          title: "Audit Logs",
          sub: "Track system activity"
        },
        {
          icon: `<svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M3 12h18"/></svg>`,
          title: "Financial Rules",
          sub: "VAT, tips, service charge"
        }
      ]
    }
  }
}
</script>

<style>
body {
  margin: 0;
  background: #0d0f14;
  font-family: system-ui, sans-serif;
}
</style>