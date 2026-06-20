<script setup>
import { ref } from 'vue';

const orders = ref([
  {
    id: '1001',
    customer: 'John Doe',
    table: 'Table 12',
    time: '9:10:50 AM',
    items: [
      { qty: 2, name: 'Margherita Pizza', note: 'Extra cheese' },
      { qty: 1, name: 'Caesar Salad' }
    ]
  },
  {
    id: '1002',
    customer: 'Jane Smith',
    table: 'Table 8',
    time: '9:12:50 AM',
    items: [
      { qty: 1, name: 'Spaghetti Carbonara' },
      { qty: 2, name: 'Garlic Bread' }
    ]
  }
]);
</script>

<template>
  <div class="min-h-screen bg-slate-50 p-8">
    <div class="flex flex-wrap gap-6">
      
      <div v-for="order in orders" :key="order.id" 
           class="w-full max-w-sm bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        
        <div class="flex justify-between items-start mb-4">
          <h2 class="text-xl font-bold text-gray-900">Order #{{ order.id }}</h2>
          <span class="bg-blue-50 text-blue-600 text-xs font-medium px-2.5 py-1 rounded-md border border-blue-100">
            New Order
          </span>
        </div>

        <div class="flex gap-4 text-gray-500 text-sm mb-6">
          <span class="flex items-center gap-1.5">👤 {{ order.customer }}</span>
          <span class="flex items-center gap-1.5">📍 {{ order.table }}</span>
        </div>

        <div class="space-y-4 mb-6">
          <div v-for="item in order.items" :key="item.name" class="flex items-start gap-3">
            <span class="bg-orange-50 text-orange-600 font-bold rounded-full w-6 h-6 flex items-center justify-center text-xs shrink-0">
              {{ item.qty }}
            </span>
            <div>
              <p class="font-medium text-gray-800">{{ item.name }}</p>
              <p v-if="item.note" class="text-xs text-gray-400 italic">Note: {{ item.note }}</p>
            </div>
          </div>
        </div>

        <div class="border-t border-gray-100 pt-4">
          <p class="text-xs text-gray-400 mb-4">Ordered: {{ order.time }}</p>
          <button class="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all">
            ✓ Start Cooking
          </button>
        </div>
        
      </div>
    </div>
  </div>
</template>