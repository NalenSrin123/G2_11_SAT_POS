<script setup>
import { ref } from 'vue'
const completedOrders = ref([
  { id: '#1001', customer: 'John Doe', table: 'Table 12', time: '12:01:30 AM', items: [{ qty: 2, name: 'Margherita Pizza', note: 'Extra cheese' }, { qty: 1, name: 'Caesar Salad' }] },
  { id: '#1002', customer: 'Jane Smith', table: 'Table 8', time: '12:03:30 AM', items: [{ qty: 1, name: 'Spaghetti Carbonara' }, { qty: 2, name: 'Garlic Bread' }] },
  { id: '#1003', customer: 'Bob Wilson', table: 'Table 5', time: '11:51:30 PM', items: [{ qty: 1, name: 'Grilled Salmon', note: 'No lemon' }, { qty: 1, name: 'Steamed Vegetables' }] },
  { id: '#1004', customer: 'Alice Brown', table: 'Table 3', time: '11:48:10 PM', items: [{ qty: 2, name: 'Beef Burger' }, { qty: 2, name: 'French Fries' }] },
  { id: '#1005', customer: 'Tom Hardy', table: 'Table 4', time: '11:45:20 PM', items: [{ qty: 1, name: 'Fried Rice', note: 'Less spicy' }, { qty: 2, name: 'Coca Cola' }] },
  { id: '#1006', customer: 'Emma Watson', table: 'Table 15', time: '11:30:15 PM', items: [{ qty: 1, name: 'Club Sandwich' }] }
])
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-6">
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <div v-for="order in completedOrders" :key="order.id" class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between min-h-[250px]">
        
        <div>
          <div class="flex justify-between items-center">
            <h3 class="font-bold text-gray-800 text-lg">Order {{ order.id }}</h3>
            <span class="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-medium">Completed</span>
          </div>
          
          <div class="flex gap-4 text-xs text-gray-500 mt-2">
            <span>👤 {{ order.customer }}</span>
            <span class="text-rose-500">📍 {{ order.table }}</span>
          </div>
          
          <hr class="border-gray-100 my-3">
          
          <div class="flex flex-col gap-3 my-2">
            <div v-for="(item, index) in order.items" :key="index" class="flex items-start gap-3">
              <span class="w-5 h-5 flex-shrink-0 flex items-center justify-center bg-orange-100 text-orange-600 rounded-full text-xs font-bold mt-0.5">
                {{ item.qty }}
              </span>
              <div>
                <p class="text-sm font-semibold text-gray-800">{{ item.name }}</p>
                <p v-if="item.note" class="text-xs text-gray-400 italic">Note: {{ item.note }}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <hr class="border-gray-100 my-3">
          <p class="text-xs text-gray-400 font-mono">Ordered: {{ order.time }}</p>
        </div>

      </div>
    </div>

  </div>
</template>