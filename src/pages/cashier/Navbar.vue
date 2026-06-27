<script setup>
import { ref } from "vue";
import { Search, Bell, RefreshCw } from "lucide-vue-next";

defineProps({
  title: {
    type: String,
    default: "Marketplace Terminal",
  },
});

const TABS = ["Floor Plan", "Staffing", "Inventory"];
const activeTab = ref("Floor Plan");
const query = ref("");
</script>
<template>
  <header class="w-full bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between gap-6 flex-wrap">
    <!-- Left: title + tabs -->
    <div class="flex items-center gap-8">
      <h1 class="text-2xl font-bold text-orange-600 tracking-tight whitespace-nowrap">
        {{ title }}
      </h1>

      <nav class="flex items-center gap-6">
        <button
          v-for="tab in TABS"
          :key="tab"
          @click="activeTab = tab"
          class="relative pb-1 text-sm font-medium transition-colors"
          :class="
            tab === activeTab ? 'text-orange-600' : 'text-gray-500 hover:text-gray-800'
          "
        >
          {{ tab }}
          <span v-if="tab === activeTab" class="absolute left-0 -bottom-0.5 h-0.5 w-full bg-orange-600 rounded-full" />
        </button>
      </nav>
    </div>

    <!-- Right: search + icons -->
    <div class="flex items-center gap-3">
      <div
        class="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 w-64 focus-within:ring-2 focus-within:ring-orange-200 transition-shadow">
        <Search class="w-4 h-4 text-gray-400 flex-shrink-0" />
        <input v-model="query" placeholder="Search tables or servers..."
          class="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 w-full" />
      </div>

      <button @click="$router.push('/Design_List_Product')" aria-label="Notifications"
        class="relative w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
        <Bell class="w-4 h-4" />
        <span class="absolute top-2 right-2.5 w-1.5 h-1.5 rounded-full bg-orange-600" />
      </button>

      <button aria-label="Refresh"
        class="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:rotate-90 transition-all duration-300">
        <RefreshCw class="w-4 h-4" />
      </button>
    </div>
  </header>
</template>
~
