<template>
    <div class="w-[260px] h-screen bg-gray-100 p-4 flex flex-col">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-xl font-bold text-gray-800">
          Order Summary
        </h1>
  
        <span class="px-2 py-1 text-[10px] font-semibold bg-gray-200 text-gray-500 rounded-full">
          TABLE 12
        </span>
      </div>
  
      <!-- Products -->
      <div class="space-y-4 overflow-y-auto flex-1">
        <div
          v-for="item in visibleOrders"
          :key="item.id"
          class="bg-white rounded-xl p-3 shadow-sm flex gap-3"
        >
          <img
            :src="item.image"
            :alt="item.name"
            class="w-14 h-14 rounded-lg object-cover"
          />
  
          <div class="flex-1 min-w-0">
            <h3 class="text-sm font-medium text-gray-800">
              {{ item.name }}
            </h3>
  
            <p class="text-xs text-gray-400 mt-1">
              x {{ item.quantity }} • {{ item.option }}
            </p>
          </div>
  
          <div class="text-orange-600 font-semibold text-sm">
            ${{ item.price.toFixed(2) }}
          </div>
        </div>
  
        <!-- Show More Button -->
        <button
          v-if="visibleCount < orders.length"
          @click="showMore"
          class="w-full py-2 rounded-lg bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition-colors"
        >
          Show More ({{ orders.length - visibleCount }} left)
        </button>
      </div>
  
      <!-- Summary -->
      <div class="border-t border-gray-300 pt-4 mt-4 text-sm">
        <div class="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>${{ subtotal.toFixed(2) }}</span>
        </div>
  
        <div class="flex justify-between mb-2">
          <span>Tax (8%)</span>
          <span>${{ tax.toFixed(2) }}</span>
        </div>
  
        <div class="flex justify-between mb-4">
          <span>Service Charge</span>
          <span>${{ serviceCharge.toFixed(2) }}</span>
        </div>
  
        <div class="border-t pt-4 flex justify-between items-center">
          <span class="text-xl font-bold">
            Total Due
          </span>
  
          <span class="text-2xl font-bold text-orange-600">
            ${{ total.toFixed(2) }}
          </span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed, ref } from 'vue'
  
  // Generate unique IDs for each item
  let idCounter = 0
  const generateId = () => ++idCounter
  
  const orders = ref([
    {
      id: generateId(),
      name: 'Artisan Green Bowl',
      quantity: 1,
      option: 'Extra Dressing',
      price: 18.5,
      image:
        'https://i.pinimg.com/736x/eb/cb/c6/ebcbc6aaa9deca9d6efc1efc93b66945.jpg',
    },
    {
      id: generateId(),
      name: 'Wagyu Bistro Burger',
      quantity: 1,
      option: 'Medium Rare',
      price: 24,
      image:
        'https://i.pinimg.com/736x/78/1d/f7/781df7a0685b853382bd394e0bea141d.jpg',
    },
    {
      id: generateId(),
      name: 'Signature Espresso Martini',
      quantity: 2,
      option: 'Gold Selection',
      price: 32,
      image:
        'https://i.pinimg.com/736x/95/f0/18/95f018ba22aa548f7e366d30b061562b.jpg',
    },
    {
      id: generateId(),
      name: 'Artisan Green Bowl',
      quantity: 1,
      option: 'Extra Dressing',
      price: 18.5,
      image:
        'https://i.pinimg.com/736x/eb/cb/c6/ebcbc6aaa9deca9d6efc1efc93b66945.jpg',
    },
    {
      id: generateId(),
      name: 'Wagyu Bistro Burger',
      quantity: 1,
      option: 'Medium Rare',
      price: 24,
      image:
        'https://i.pinimg.com/736x/78/1d/f7/781df7a0685b853382bd394e0bea141d.jpg',
    },
    {
      id: generateId(),
      name: 'Signature Espresso Martini',
      quantity: 2,
      option: 'Gold Selection',
      price: 32,
      image:
        'https://i.pinimg.com/736x/95/f0/18/95f018ba22aa548f7e366d30b061562b.jpg',
    },
    {
      id: generateId(),
      name: 'Artisan Green Bowl',
      quantity: 1,
      option: 'Extra Dressing',
      price: 18.5,
      image:
        'https://i.pinimg.com/736x/eb/cb/c6/ebcbc6aaa9deca9d6efc1efc93b66945.jpg',
    },
    {
      id: generateId(),
      name: 'Wagyu Bistro Burger',
      quantity: 1,
      option: 'Medium Rare',
      price: 24,
      image:
        'https://i.pinimg.com/736x/78/1d/f7/781df7a0685b853382bd394e0bea141d.jpg',
    },
    {
      id: generateId(),
      name: 'Signature Espresso Martini',
      quantity: 2,
      option: 'Gold Selection',
      price: 32,
      image:
        'https://i.pinimg.com/736x/95/f0/18/95f018ba22aa548f7e366d30b061562b.jpg',
    },
    {
      id: generateId(),
      name: 'Artisan Green Bowl',
      quantity: 1,
      option: 'Extra Dressing',
      price: 18.5,
      image:
        'https://i.pinimg.com/736x/eb/cb/c6/ebcbc6aaa9deca9d6efc1efc93b66945.jpg',
    },
    {
      id: generateId(),
      name: 'Wagyu Bistro Burger',
      quantity: 1,
      option: 'Medium Rare',
      price: 24,
      image:
        'https://i.pinimg.com/736x/78/1d/f7/781df7a0685b853382bd394e0bea141d.jpg',
    },
    {
      id: generateId(),
      name: 'Signature Espresso Martini',
      quantity: 2,
      option: 'Gold Selection',
      price: 32,
      image:
        'https://i.pinimg.com/736x/95/f0/18/95f018ba22aa548f7e366d30b061562b.jpg',
    },
  ])
  
  // Pagination state
  const visibleCount = ref(3) // Start with 3 items visible
  
  // Computed: visible orders based on pagination
  const visibleOrders = computed(() => {
    return orders.value.slice(0, visibleCount.value)
  })
  
  // Show more function
  const showMore = () => {
    visibleCount.value += 3 // Show 3 more items each time
    // Cap at total orders length
    if (visibleCount.value > orders.value.length) {
      visibleCount.value = orders.value.length
    }
  }
  
  const subtotal = computed(() =>
    orders.value.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )
  )
  
  const tax = computed(() => subtotal.value * 0.08)
  
  const serviceCharge = ref(4)
  
  const total = computed(() =>
    subtotal.value + tax.value + serviceCharge.value
  )
  </script>