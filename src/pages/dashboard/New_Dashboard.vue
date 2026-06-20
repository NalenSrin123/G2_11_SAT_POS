<template>
  <div class="flex h-screen bg-slate-50 font-sans text-slate-800">
    <!-- Sidebar -->
    <aside
      class="w-64 bg-white border-r border-slate-200 flex flex-col justify-between h-full"
    >
      <div>
        <div class="p-6 border-b border-slate-100">
          <h1 class="text-xl font-bold text-blue-900 tracking-wide">
            Admin Panel
          </h1>
          <p class="text-xs text-slate-400 mt-0.5">Management Suite</p>
        </div>

        <nav class="p-4 space-y-1 text-sm font-normal">
          <router-link
            to="/overview_page"
            class="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition"
          >
            <span class="material-icons text-slate-400">dashboard</span>
            <span>Overview</span>
          </router-link>

          <router-link
            to="/menu_list"
            class="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition"
          >
            <span class="material-icons text-slate-400">restaurant_menu</span>
            <span>Menu List</span>
          </router-link>

          <router-link
            to="/create_menu"
            class="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition"
          >
            <span class="material-icons text-slate-400">add_box</span>
            <span>Create Menu</span>
          </router-link>

          <router-link
            to="/categorylist"
            class="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition"
          >
            <span class="material-icons text-slate-400">category</span>
            <span>Category List</span>
          </router-link>

          <router-link
            to="/createcategory"
            class="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition"
          >
            <span class="material-icons text-slate-400">post_add</span>
            <span>Create Category</span>
          </router-link>

          <router-link
            to="/user_list"
            class="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition"
          >
            <span class="material-icons text-slate-400">people</span>
            <span>User List</span>
          </router-link>

          <router-link
            to="/create-user"
            class="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition"
          >
            <span class="material-icons text-slate-400">person_add</span>
            <span>Create User</span>
          </router-link>
        </nav>
      </div>

      <div class="p-4 border-t border-slate-100 flex items-center space-x-3">
        <div
          class="w-10 h-10 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center text-slate-500"
        >
          <span class="material-icons text-2xl">account_circle</span>
        </div>

        <div>
          <h4 class="text-sm font-semibold text-slate-700">Alex Morgan</h4>
          <p class="text-xs text-slate-400">System Admin</p>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header -->
      <header
        class="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8"
      >
        <div class="flex items-center">
          <h2 class="text-xl font-bold text-blue-900">Workspace Admin</h2>
        </div>

        <div class="w-96 relative">
          <span
            class="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg"
          >
            search
          </span>

          <input
            type="text"
            placeholder="Search..."
            class="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:border-blue-400"
          />
        </div>

        <div class="flex items-center space-x-4">
          <button
            class="p-1.5 rounded-full text-slate-500 hover:bg-slate-50 relative"
          >
            <span class="material-icons text-xl"> notifications </span>

            <span
              class="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"
            ></span>
          </button>

          <button class="p-1.5 rounded-full text-slate-500 hover:bg-slate-50">
            <span class="material-icons text-xl"> settings </span>
          </button>

          <button class="p-1.5 rounded-full text-slate-500 hover:bg-slate-50">
            <span class="material-icons text-xl"> help_outline </span>
          </button>

          <div class="h-5 w-px bg-slate-200"></div>

          <button
            class="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center"
          >
            <span class="material-icons"> account_circle </span>
          </button>
        </div>
      </header>

      <!-- Content From Other Pages -->
      <main class="flex-1 overflow-auto p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
</style>
