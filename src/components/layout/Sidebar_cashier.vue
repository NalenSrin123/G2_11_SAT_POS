<script setup>
import { ref, computed } from "vue";
import {
  ClipboardList,
  ShoppingCart,
  History,
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

const NAV_ITEMS = [
  { label: "Live Orders", icon: ClipboardList },
  { label: "New Order", icon: ShoppingCart },
  { label: "History", icon: History },
];

const active = ref("Live Orders");

const initials = computed(() =>
  props.user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
);
</script>

<template>
  <aside class="w-60 h-screen bg-white border-r border-gray-200 px-5 py-6 flex flex-col flex-shrink-0">
    <!-- Brand -->
    <div class="mb-8 px-2">
      <h2 class="text-xl font-bold text-orange-600 tracking-tight">
        {{ brand }}
      </h2>
      <p class="text-xs text-gray-400 mt-0.5">{{ terminal }}</p>
    </div>

    <!-- Nav -->
    <nav class="flex flex-col gap-1">
      <button
        v-for="item in NAV_ITEMS"
        :key="item.label"
        @click="active = item.label"
        class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors"
        :class="
          item.label === active
            ? 'bg-orange-600 text-white shadow-sm'
            : 'text-gray-600 hover:bg-gray-50'
        "
      >
        <component :is="item.icon" class="w-4 h-4" />
        {{ item.label }}
      </button>
    </nav>

    <!-- Spacer pushes everything below to the bottom -->
    <div class="flex-1" />

    <!-- Quick Pay -->
    <button
      class="w-full flex items-center justify-center gap-2 bg-red-800 hover:bg-red-900 text-white font-semibold text-sm py-3 rounded-xl mb-6 transition-colors shadow-sm"
    >
      <CreditCard class="w-4 h-4" />
      Quick Pay
    </button>

    <!-- Secondary links -->
    <div class="flex flex-col gap-1 mb-4">
      <button class="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors">
        <Settings class="w-4 h-4" />
        Settings
      </button>
      <button class="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors">
        <LogOut class="w-4 h-4" />
        Logout
      </button>
    </div>

    <!-- User -->
    <div class="flex items-center gap-3 px-2 pt-4 border-t border-gray-100">
      <div class="w-9 h-9 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
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