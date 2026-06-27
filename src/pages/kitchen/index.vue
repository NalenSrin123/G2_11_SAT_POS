<script setup>
import { ref } from 'vue'

import Header from './Header.vue'
import Footer from './Footer.vue'

import NewOrders from './NewOrders.vue'
import Cooking from './Cooking.vue'
import Completed from './Completed.vue'

const search = ref('')
const cartCount = ref(2)

const activeTab = ref('new')

const newOrders = ref([
  {
    id: '1001',
    customer: 'John Doe',
    table: 'Table 12',
    items: [
      { qty: 2, name: 'Pizza' },
      { qty: 1, name: 'Salad' }
    ]
  },
  {
    id: '1002',
    customer: 'Jane Smith',
    table: 'Table 8',
    items: [
      { qty: 1, name: 'Burger' }
    ]
  },
  {
    id: '1003',
    customer: 'Michael Brown',
    table: 'Table 5',
    items: [
      { qty: 2, name: 'Fried Rice' }
    ]
  },
  {
    id: '1004',
    customer: 'Emma Wilson',
    table: 'Table 3',
    items: [
      { qty: 1, name: 'Spaghetti' },
      { qty: 2, name: 'Garlic Bread' }
    ]
  },
  {
    id: '1005',
    customer: 'David Lee',
    table: 'Table 10',
    items: [
      { qty: 1, name: 'Chicken Burger' },
      { qty: 1, name: 'French Fries' }
    ]
  },
  {
    id: '1006',
    customer: 'Sophia Taylor',
    table: 'Table 7',
    items: [
      { qty: 2, name: 'Coke' },
      { qty: 1, name: 'Pizza' }
    ]
  },
  {
    id: '1007',
    customer: 'James Anderson',
    table: 'Table 15',
    items: [
      { qty: 1, name: 'Club Sandwich' }
    ]
  },
  {
    id: '1008',
    customer: 'Olivia Martinez',
    table: 'Table 4',
    items: [
      { qty: 2, name: 'Seafood Pizza' }
    ]
  },
  {
    id: '1009',
    customer: 'William Garcia',
    table: 'Table 9',
    items: [
      { qty: 1, name: 'Beef Steak' },
      { qty: 1, name: 'Salad' }
    ]
  },
  {
    id: '1010',
    customer: 'Ava Rodriguez',
    table: 'Table 2',
    items: [
      { qty: 2, name: 'Noodles' },
      { qty: 2, name: 'Iced Tea' }
    ]
  }
])
const cookingOrders = ref([])
const completedOrders = ref([])

const startCooking = (order) => {
  newOrders.value = newOrders.value.filter(
    item => item.id !== order.id
  )

  cookingOrders.value.push(order)

  activeTab.value = 'cooking'
}

const markCompleted = (order) => {
  cookingOrders.value = cookingOrders.value.filter(
    item => item.id !== order.id
  )

  completedOrders.value.push(order)

  activeTab.value = 'completed'
}
</script>

<template>
  <div class="page-container">

    <!-- Header -->
    <Header
      :cartCount="cartCount"
      :search="search"
      @search="search = $event"
    />

    <!-- Tabs -->
    <div class="tabs">
      <button
        :class="{ active: activeTab === 'new' }"
        @click="activeTab = 'new'"
      >
        New Orders ({{ newOrders.length }})
      </button>

      <button
        :class="{ active: activeTab === 'cooking' }"
        @click="activeTab = 'cooking'"
      >
        Cooking ({{ cookingOrders.length }})
      </button>

      <button
        :class="{ active: activeTab === 'completed' }"
        @click="activeTab = 'completed'"
      >
        Completed ({{ completedOrders.length }})
      </button>
    </div>

    <!-- Content -->
    <div class="content">
      <NewOrders
        v-if="activeTab === 'new'"
        :orders="newOrders"
        @start-cooking="startCooking"
      />

      <Cooking
        v-if="activeTab === 'cooking'"
        :orders="cookingOrders"
        @mark-completed="markCompleted"
      />

      <Completed
        v-if="activeTab === 'completed'"
        :orders="completedOrders"
      />
    </div>

    <!-- Footer -->
    <Footer />

  </div>
</template>

<style scoped>
.page-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f8fafc;
}

.content {
  flex: 1;
}

.tabs {
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 20px;
  background: white;
  border-bottom: 1px solid #e5e7eb;
}

.tabs button {
  padding: 10px 24px;
  border: none;
  border-radius: 8px;
  background: #f3f4f6;
  cursor: pointer;
  font-weight: 600;
}

.tabs button.active {
  background: #ea580c;
  color: white;
}
</style>