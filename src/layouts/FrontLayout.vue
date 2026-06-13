/* |-------------------------------------------------------------------------- |
File: DefaultLayout.vue
|-------------------------------------------------------------------------- | |
Description: | Base layout wrapper used across standard pages in the
application. | Provides a consistent structure with header, main content area,
and footer. | | Responsibilities: | - Define common UI structure (header /
content / footer) | - Render dynamic page content via
<slot />
| - Serve as default layout for most routes | | Notes: | - Keep layout clean and
reusable | - Replace placeholder header/footer with real components when needed
| - Can be extended (sidebar, navigation, auth guards) | */

<template>
  <div class="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
    <aside
      class="w-full lg:w-72 xl:w-80 bg-white border-b lg:border-b-0 lg:border-r flex flex-col"
    >
      <div class="px-4 py-5 sm:px-6 sm:py-6 lg:p-6">
        <h1 class="text-xl sm:text-2xl font-bold text-blue-700">RestoAdmin</h1>
        <p class="text-sm text-gray-500">Management Suite</p>
      </div>

      <nav class="flex-1 px-3 sm:px-4 pb-4 overflow-x-auto lg:overflow-visible">
        <div class="flex gap-2 lg:block lg:space-y-2 min-w-max lg:min-w-0">
          <SidebarCreateLogo label="Overview" />
          <SidebarCreateLogo label="Menu" />
          <SidebarCreateLogo label="Categories" />
          <SidebarCreateLogo label="Users" />
          <SidebarCreateLogo label="Inventory" />
          <SidebarCreateLogo label="Ingredients" />
          <SidebarCreateLogo label="Units" />
          <SidebarCreateLogo label="Settings" active />
        </div>
      </nav>

      <footer class="p-4 sm:p-6 lg:p-4">
        <div class="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
          <div class="w-10 h-10 shrink-0">
            <img
              src="https://i.pinimg.com/736x/26/8b/ee/268bee9ee88dde842f1e985a0ad7ef85.jpg"
              alt="Manager profile"
              class="w-full h-full rounded-3xl object-cover"
            />
          </div>

          <div class="min-w-0">
            <p class="font-medium truncate">Manager</p>
            <p class="text-xs text-gray-500 truncate">Admin Access</p>
          </div>
        </div>
      </footer>
    </aside>

    <div class="flex-1 flex flex-col">
      <header
        class="bg-white border-b px-4 sm:px-6 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
      >
        <input
          type="text"
          placeholder="Search resources..."
          class="w-full md:max-w-xl lg:max-w-2xl border rounded-lg px-4 py-2"
        />

        <div class="flex items-center justify-end gap-4">
          <button type="button" aria-label="Notifications">🔔</button>

          <img
            src="https://i.pravatar.cc/40"
            alt="User avatar"
            class="w-10 h-10 rounded-lg shrink-0"
          />
        </div>
      </header>

      <main class="p-4 sm:p-6 lg:p-8">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
/**
 * Default layout wrapper
 * Used for general pages (dashboard, content pages, etc.)
 */
import SidebarCreateLogo from "../components/layout/SidebarCreateLogo.vue";
</script>
