<template>
  <New_Dashboard>
  <div class="min-h-screen bg-slate-50  flex justify-center items-start">

    <div class="w-full max-w-5xl bg-white rounded-xl shadow-sm border border-slate-100 p-6">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 class="text-2xl font-bold text-slate-900 tracking-tight">User Directory</h1>
          <p class="text-sm text-slate-500 mt-1">Manage, audit, and oversee all active accounts within the workspace.</p>
        </div>
        <div class="flex items-center gap-3">
          <button class="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
            <DownloadIcon class="w-4 h-4" />
            Export CSV
          </button>
          <button class="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
            <UserPlusIcon class="w-4 h-4" />
            Add New User
          </button>
        </div>
      </div>

      <div class="flex justify-between items-center border-b border-slate-100 pb-4 mb-4">
        <div class="flex bg-slate-100/80 p-1 rounded-lg">
          <button 
            v-for="tab in ['All Users', 'Admins', 'Editors']" 
            :key="tab"
            @click="currentTab = tab"
            :class="[
              'px-4 py-1.5 text-sm font-medium rounded-md transition-all',
              currentTab === tab 
                ? 'bg-white text-blue-700 shadow-sm' 
                : 'text-slate-600 hover:text-slate-900'
            ]"
          >
            {{ tab }}
          </button>
        </div>

        <button class="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
          <SlidersHorizontalIcon class="w-4 h-4 text-slate-500" />
          Filter
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-slate-100 text-xs font-semibold text-slate-400 tracking-wider uppercase bg-slate-50/50">
              <th class="p-4 w-12">
                <input type="checkbox" class="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4" />
              </th>
              <th class="p-4">User</th>
              <th class="p-4">Email</th>
              <th class="p-4">Role</th>
              <th class="p-4">Date Joined</th>
              <th class="p-4">Status</th>
              <th class="p-4 w-12"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 text-sm">
            <tr v-for="user in filteredUsers" :key="user.email" class="hover:bg-slate-50/50 transition-colors">
              <td class="p-4">
                <input type="checkbox" class="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4" />
              </td>
              <td class="p-4">
                <div class="flex items-center gap-3">
                  <img :src="user.avatar" :alt="user.name" class="w-10 h-10 rounded-full object-cover border border-slate-100" />
                  <div>
                    <div class="font-semibold text-slate-800">{{ user.name }}</div>
                    <div class="text-xs text-slate-500">{{ user.title }}</div>
                  </div>
                </div>
              </td>
              <td class="p-4 text-slate-600 font-medium">
                {{ user.email }}
              </td>
              <td class="p-4 text-slate-700 font-semibold">
                {{ user.role }}
              </td>
              <td class="p-4 text-slate-500">
                {{ user.dateJoined }}
              </td>
              <td class="p-4">
                <span :class="[
                  'px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide inline-block',
                  statusStyles[user.status]
                ]">
                  {{ user.status }}
                </span>
              </td>
              <td class="p-4 text-right">
                <button class="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors">
                  <MoreVerticalIcon class="w-5 h-5" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 pt-4 border-t border-slate-100">
        <p class="text-sm text-slate-500">
          Showing <span class="font-medium text-slate-700">1 to 4</span> of <span class="font-medium text-slate-700">12,842</span> users
        </p>
        
        <div class="flex items-center gap-1.5">
          <button class="p-2 border border-slate-200 rounded-lg text-slate-400 bg-slate-50 cursor-not-allowed" disabled>
            <ChevronLeftIcon class="w-4 h-4" />
          </button>
          
          <button class="px-3.5 py-1.5 text-sm font-semibold rounded-lg bg-blue-600 text-white shadow-sm">1</button>
          <button class="px-3.5 py-1.5 text-sm font-medium rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50">2</button>
          <button class="px-3.5 py-1.5 text-sm font-medium rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50">3</button>
          
          <span class="text-slate-400 px-1">...</span>
          
          <button class="px-3.5 py-1.5 text-sm font-medium rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50">321</button>
          
          <button class="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
            <ChevronRightIcon class="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  </div>
  </New_Dashboard>
</template>

<script setup>
import { ref, computed } from 'vue'
import New_Dashboard from './New_Dashboard.vue'
// import { 
//   Download as DownloadIcon, 
//   UserPlus as UserPlusIcon, 
//   SlidersHorizontal as SlidersHorizontalIcon, 
//   MoreVertical as MoreVerticalIcon,
//   ChevronLeft as ChevronLeftIcon,
//   ChevronRight as ChevronRightIcon 
// } from 'lucide-vue-next'

const currentTab = ref('All Users')

// Mapping state colors exactly to your mockup design
const statusStyles = {
  Active: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
  Away: 'bg-indigo-50 text-indigo-600 border border-indigo-100',
  Suspended: 'bg-rose-50 text-rose-600 border border-rose-100'
}

// Fixed UI Typographic glitches from mockup image (e.g. "oan 05, 2024" -> "Jan 05, 2024")
const users = ref([
  {
    name: 'Sarah Jenkins',
    title: 'Creative Director',
    email: 'sarah.j@company.com',
    role: 'Admin',
    dateJoined: 'Oct 24, 2023',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120'
  },
  {
    name: 'Marcus Thorne',
    title: 'Lead Developer',
    email: 'm.thorne@company.com',
    role: 'Editor',
    dateJoined: 'Dec 12, 2023',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120'
  },
  {
    name: 'David Cho',
    title: 'Product Manager',
    email: 'd.cho@company.com',
    role: 'Editor',
    dateJoined: 'Jan 05, 2024',
    status: 'Away',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120'
  },
  {
    name: 'Elena Rodriguez',
    title: 'Security Ops',
    email: 'elena.rod@company.com',
    role: 'Admin',
    dateJoined: 'Feb 14, 2024',
    status: 'Suspended',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120'
  }
])

// Filtering logic hooked into the tab bar toggles
const filteredUsers = computed(() => {
  if (currentTab.value === 'All Users') return users.value
  if (currentTab.value === 'Admins') return users.value.filter(u => u.role === 'Admin')
  if (currentTab.value === 'Editors') return users.value.filter(u => u.role === 'Editor')
  return users.value
})
</script>