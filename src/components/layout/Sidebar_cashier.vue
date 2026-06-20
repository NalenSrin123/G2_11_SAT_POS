<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import {
  Clock,
  CheckCircle2,
  Archive,
  CreditCard,
  Settings,
  LogOut,
} from "lucide-vue-next";

const props = defineProps({
  brand: {
    type: String,
    default: "Bistro POS",
  },
  terminal: {
    type: String,
    default: "Terminal 01",
  },
  user: {
    type: Object,
    default: () => ({ name: "Felix K.", role: "Lead Server" }),
  },
});
// src/components/layout/Sidebar_cashier.vue
const NAV_ITEMS = [
  { label: "New Orders", icon: Clock, count: 2, key: "new", path: "/kitchen/new-orders" },
  { label: "Cooking", icon: Clock, count: 1, key: "cooking", path: "/kitchen/cooking" },
  { label: "Ready", icon: CheckCircle2, count: 1, key: "ready", path: "/kitchen/ready" },
  {
    label: "Completed",
    icon: Archive,
    count: 0,
    key: "completed",
    path: "/kitchen/completed",
  },
];
const route = useRoute();
const initials = computed(() =>
  props.user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
);
</script>
<template>
  <aside
    class="w-60 h-screen bg-white border-r border-gray-200 px-5 py-6 flex flex-col flex-shrink-0"
  >
    <div class="mb-8 px-2">
      <h2 class="text-xl font-bold text-orange-600 tracking-tight">
        {{ brand }}
      </h2>
      <p class="text-xs text-gray-400 mt-0.5">{{ terminal }}</p>
    </div>

    <nav class="flex flex-col gap-1">
      <router-link
        v-for="item in NAV_ITEMS"
        :key="item.key"
        :to="item.path"
        class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors"
        :class="
          route.path === item.path
            ? 'bg-orange-600 text-white shadow-sm'
            : 'text-gray-600 hover:bg-gray-50'
        "
      >
        <component :is="item.icon" class="w-4 h-4" />
        <span class="flex-1">{{ item.label }}</span>

        <span
          v-if="item.count > 0"
          class="text-xs px-2 py-0.5 rounded-full font-bold"
          :class="
            route.path === item.path
              ? 'bg-white text-orange-600'
              : 'bg-gray-100 text-gray-600'
          "
        >
          {{ item.count }}
        </span>
      </router-link>
    </nav>

    <div class="flex-1" />

    <button
      class="w-full flex items-center justify-center gap-2 bg-red-800 hover:bg-red-900 text-white font-semibold text-sm py-3 rounded-xl mb-6 transition-colors shadow-sm"
    >
      <CreditCard class="w-4 h-4" />
      Quick Pay
    </button>
    <div class="flex flex-col gap-1 mb-4">
      <button
        class="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors"
      >
        <Settings class="w-4 h-4" />
        Settings
      </button>
      <button
        class="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors"
      >
        <LogOut class="w-4 h-4" />
        Logout
      </button>
    </div>

    <div class="flex items-center gap-3 px-2 pt-4 border-t border-gray-100">
      <div
        class="w-9 h-9 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-xs font-bold flex-shrink-0"
      >
        {{ initials }}
      </div>
      <div>
        <p class="text-sm font-semibold text-gray-800 leading-tight">
          {{ user.name }}
        </p>
        <p class="text-xs text-gray-400 leading-tight">{{ user.role }}</p>
      </div>
    </div>
  </aside>
</template>
