<script setup>
import SidebarCashier from "../../components/layout/Sidebar_cashier.vue";
import Navbar from "../cashier/Navbar.vue";
</script>
<template>
  <div class="flex h-screen bg-[#F8F9FA] overflow-hidden">
    <SidebarCashier />
    <div class="flex-1 flex flex-col overflow-hidden">
      <Navbar title="Kitchen Management" />

      <main class="flex-1 overflow-y-auto p-6 bg-gray-50/50">
        <router-view />
      </main>
    </div>
  </div>
</template>
