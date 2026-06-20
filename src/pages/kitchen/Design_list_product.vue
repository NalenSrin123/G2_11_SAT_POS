<template>
  <div class="max-w-2xl mx-auto p-6 bg-stone-50 min-h-screen">
    <h1 class="text-3xl font-bold text-stone-900 mb-6">Your Epicurean Basket</h1>

    <div class="space-y-4 mb-4">
      <div 
        v-for="item in basketItems" 
        :key="item.id" 
        class="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-stone-100 transition-all duration-200"
      >
        <div class="flex gap-4 items-start sm:items-center w-full sm:w-auto">
          <img 
            :src="item.image" 
            :alt="item.name" 
            class="w-24 h-24 object-cover rounded-xl bg-stone-100 flex-shrink-0"
          />
          <div class="space-y-1">
            <h2 class="text-lg font-bold text-stone-900">{{ item.name }}</h2>
            
            <div class="flex flex-wrap gap-1.5 py-0.5">
              <span 
                v-for="tag in item.tags" 
                :key="tag" 
                class="px-2.5 py-0.5 text-xs font-medium text-stone-600 bg-stone-100 rounded-full"
              >
                {{ tag }}
              </span>
            </div>
            
            <p class="text-sm text-stone-500 line-clamp-2 max-w-md">{{ item.description }}</p>
          </div>
        </div>

        <div class="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto mt-4 sm:mt-0 gap-3 border-t sm:border-t-0 pt-3 sm:pt-0 border-stone-100">
          <span class="text-xl font-bold text-orange-700">
            ${{ (item.price * item.quantity).toFixed(2) }}
          </span>

          <div class="flex items-center gap-3">
            <div class="flex items-center gap-3">
  <div class="flex items-center border border-stone-200 rounded-full p-1 bg-white shadow-sm select-none">
    <button 
      @click="decreaseQty(item.id)" 
      class="w-7 h-7 flex items-center justify-center text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-all duration-150 font-medium text-base"
      aria-label="Decrease quantity"
    >
      <span class="leading-none -mt-0.5">-</span>
    </button>

    <span class="w-9 text-center font-bold text-stone-800 text-sm tracking-wide">
      {{ item.quantity }}
    </span>

    <button 
      @click="increaseQty(item.id)" 
      class="w-7 h-7 flex items-center justify-center text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-all duration-150 font-medium text-base"
      aria-label="Increase quantity"
    >
      <span class="leading-none">＋</span>
    </button>
  </div>
</div>

            <button 
              @click="removeItem(item.id)" 
              class="flex items-center gap-1 text-xs font-medium text-stone-500 hover:text-red-600 transition-colors py-1 px-2 rounded-lg hover:bg-red-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="basketItems.length === 0" class="text-center py-12 bg-white rounded-2xl border border-stone-100 shadow-sm my-6">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-stone-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
      <p class="text-stone-500 font-medium">Your basket is empty.</p>
    </div>

    <div class="bg-stone-100 rounded-xl overflow-hidden transition-all duration-200">
      <button 
        @click="isInstructionsOpen = !isInstructionsOpen"
        class="w-full flex items-center justify-between p-4 text-left font-medium text-stone-700 hover:bg-stone-200/70 transition-colors focus:outline-none"
      >
        <div class="flex items-center gap-2 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
          </svg>
          Add special instructions
        </div>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-4 w-4 transform transition-transform duration-200"
          :class="{ 'rotate-180': isInstructionsOpen }" 
          fill="none" 
          viewBox="0 0 24 24" stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <div v-show="isInstructionsOpen" class="p-4 pt-0 bg-stone-100">
        <textarea 
          v-model="specialInstructions"
          placeholder="E.g., Allergies, delivery preferences, or burger temperature details..."
          class="w-full p-3 text-sm bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-400 placeholder-stone-400 resize-none h-24"
        ></textarea>
      </div>
    </div>

    <div v-if="basketItems.length > 0" class="mt-6 p-4 bg-white rounded-2xl border border-stone-100 shadow-sm space-y-3">
      <div class="flex justify-between text-stone-600 text-sm">
        <span>Subtotal</span>
        <span>${{ subtotal.toFixed(2) }}</span>
      </div>
      <div class="flex justify-between text-lg font-bold text-stone-900 border-t border-stone-100 pt-3">
        <span>Total Est.</span>
        <span>${{ subtotal.toFixed(2) }}</span>
      </div>
      <button class="w-full mt-2 bg-stone-900 text-white text-center py-3 rounded-xl font-semibold hover:bg-stone-800 transition-colors">
        Proceed to Checkout
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// UI Toggles & Inputs
const isInstructionsOpen = ref(false)
const specialInstructions = ref('')

// Reactive Dataset representing image mock states
const basketItems = ref([
  {
    id: 1,
    name: 'Classic Wagyu Burger',
    description: 'Hand-selected wagyu, truffle aioli, aged cheddar.',
    price: 24.00,
    quantity: 1,
    tags: ['Premium Beef', "Chef's Choice"],
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    name: 'Truffle Fries',
    description: 'Double-fried russet potatoes, white truffle oil, parmigiano reggiano.',
    price: 12.00,
    quantity: 1,
    tags: ['Vegetarian'],
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    name: 'Local Craft Amber Ale',
    description: 'Locally brewed with roasted malts and floral hops.',
    price: 8.50,
    quantity: 2,
    tags: ['Artisanal Brew'],
    image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=300&auto=format&fit=crop&q=80'
  }
])

// Computed dynamic calculations
const subtotal = computed(() => {
  return basketItems.value.reduce((acc, item) => acc + (item.price * item.quantity), 0)
})

// Business Logic Functions
const increaseQty = (id) => {
  const item = basketItems.value.find(i => i.id === id)
  if (item) item.quantity++
}

const decreaseQty = (id) => {
  const item = basketItems.value.find(i => i.id === id)
  if (item && item.quantity > 1) {
    item.quantity--
  } else if (item && item.quantity === 1) {
    removeItem(id)
  }
}

const removeItem = (id) => {
  basketItems.value = basketItems.value.filter(item => item.id !== id)
}
</script>

<style scoped>
/* Safety fallback fallback for older browser engines missing line-clamp config */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}
</style>