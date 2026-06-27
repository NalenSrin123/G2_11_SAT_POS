<template>
  <Header/>
  <section class="max-w-8xl mx-auto px-4 py-8 bg-white text-black font-sans min-h-screen ">
    
    <h2 class="text-2xl md:text-3xl font-bold mb-6 text-gray-900">Explore Our Menu</h2>

    <div class="flex overflow-x-auto pb-3 mb-6 gap-2 no-scrollbar scroll-smooth -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap">
      <button 
        v-for="category in categories" 
        :key="category"
        @click="activeCategory = category"
        :class="[
          'px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 whitespace-nowrap',
          activeCategory === category 
            ? 'bg-amber-700 text-white shadow-sm' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        ]"
      >
        {{ category }}
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
      
      <aside class="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 lg:sticky lg:top-4 w-full">
        <h3 class="text-lg md:text-xl font-bold mb-4 lg:mb-6 text-gray-900">Filters</h3>

        <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6 sm:gap-4 lg:gap-0">
          
          <div class="lg:mb-6">
            <span class="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Price Range</span>
            <div class="space-y-2.5">
              <label 
                v-for="price in priceOptions" 
                :key="price.value" 
                class="flex items-center text-sm text-gray-600 cursor-pointer select-none"
              >
                <input 
                  type="radio" 
                  name="price-range"
                  :value="price.value"
                  v-model="selectedPriceRange"
                  class="w-4 h-4 text-amber-700 border-gray-300 focus:ring-amber-500 accent-amber-700 mr-3"
                >
                {{ price.label }}
              </label>
            </div>
          </div>

          <div class="sm:border-l sm:border-gray-100 sm:pl-4 lg:border-l-0 lg:pl-0 lg:border-t lg:pt-6 lg:mb-6">
            <span class="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Dietary</span>
            <div class="flex flex-wrap gap-1.5">
              <button
                @click="selectedDietary = 'All'"
                :class="[
                  'px-3 py-1.5 border rounded-lg text-xs font-medium transition duration-150',
                  selectedDietary === 'All'
                    ? 'bg-amber-700 text-white border-amber-700 shadow-sm'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-amber-700 hover:text-amber-700'
                ]"
              >
                All
              </button>
              
              <button 
                v-for="diet in dietaryOptions" 
                :key="diet"
                @click="selectedDietary = diet"
                :class="[
                  'px-3 py-1.5 border rounded-lg text-xs font-medium transition duration-150',
                  selectedDietary === diet
                    ? 'bg-amber-700 text-white border-amber-700 shadow-sm'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-amber-700 hover:text-amber-700'
                ]"
              >
                {{ diet }}
              </button>
            </div>
          </div>

          <div class="sm:border-l sm:border-gray-100 sm:pl-4 lg:border-l-0 lg:pl-0 lg:border-t lg:pt-6">
            <span class="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Customer Ratings</span>
            <div class="space-y-2.5">
              <label class="flex items-center text-sm text-gray-600 cursor-pointer select-none">
                <input 
                  type="radio" 
                  name="rating" 
                  value="all"
                  v-model="selectedRating"
                  class="text-amber-700 focus:ring-amber-500 mr-3 h-4 w-4 accent-amber-700"
                >
                All Ratings
              </label>

              <label v-for="rate in ratings" :key="rate" class="flex items-center text-sm text-gray-600 cursor-pointer select-none">
                <input 
                  type="radio" 
                  name="rating" 
                  :value="rate"
                  v-model="selectedRating"
                  class="text-amber-700 focus:ring-amber-500 mr-3 h-4 w-4 accent-amber-700"
                >
                {{ rate }} & up <span class="text-amber-500 ml-1">★</span>
              </label>
            </div>
          </div>
          
        </div>
      </aside>

      <div class="lg:col-span-3 flex flex-col justify-between">
        
        <div class="flex-1">
          <div v-if="paginatedMenuItems.length > 0" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 content-start">
            <div 
              v-for="item in paginatedMenuItems" 
              :key="item.id" 
              class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col justify-between group hover:shadow-md transition duration-200"
            >
              <div class="relative overflow-hidden aspect-3/3 bg-gray-100 w-full">
                <img :src="item.image" :alt="item.name" class="w-full h-full object-cover group-hover:scale-105 transition duration-300">
                <span 
                  v-if="item.badge" 
                  :class="[
                    'absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-md text-white shadow-sm',
                    item.badge === 'Bestseller' ? 'bg-amber-600' : 'bg-emerald-600'
                  ]"
                >
                  {{ item.badge }}
                </span>
              </div>

              <div class="p-5 flex-1 flex flex-col justify-between bg-white">
                <div class="mb-4">
                  <div class="flex justify-between items-start mb-1 gap-1">
                    <h4 class="font-bold text-base text-gray-900 truncate" :title="item.name">{{ item.name }}</h4>
                    <span class="font-bold text-amber-700 shrink-0">${{ item.price.toFixed(2) }}</span>
                  </div>
                  
                  <div class="flex items-center gap-1 mb-2">
                    <span class="text-amber-500 text-xs">★</span>
                    <span class="text-xs font-semibold text-gray-700">{{ item.rating.toFixed(1) }}</span>
                  </div>

                  <p class="text-xs text-gray-500 line-clamp-2">{{ item.description }}</p>
                </div>

                <div class="flex justify-between items-center pt-3 border-t border-gray-100 gap-2">
                  <div class="flex gap-1 overflow-hidden flex-wrap items-center">
                    <span v-for="diet in item.dietary" :key="diet" class="bg-emerald-50 text-emerald-700 text-[10px] font-semibold px-2 py-0.5 rounded whitespace-nowrap">
                      {{ diet }}
                    </span>
                    <span v-for="tag in item.tags" :key="tag" class="bg-gray-100 text-gray-500 text-[10px] font-medium px-2 py-0.5 rounded whitespace-nowrap">
                      {{ tag }}
                    </span>
                  </div>
                  <button class="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 shadow-sm transition shrink-0" aria-label="Add to cart">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="flex flex-col items-center justify-center py-24 px-4 text-center text-gray-400 bg-white rounded-2xl border border-dashed border-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="text-sm max-w-xs">មិនមានមុខម្ហូបក្នុងតម្លៃ របបអាហារ ពិន្ទុ និងប្រភេទដែលអ្នកចង់បានទេ!</p>
          </div>
        </div>

        <div class="flex justify-center items-center gap-2 mt-8 pt-4 border-t border-gray-100">
          <button 
            @click="currentPage > 1 ? currentPage-- : null"
            :disabled="currentPage === 1"
            class="p-2 border border-gray-200 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed text-gray-600 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button 
            v-for="page in totalPages" 
            :key="page"
            @click="currentPage = page"
            :class="[
              'w-9 h-9 flex items-center justify-center rounded-lg text-sm font-semibold transition duration-150',
              currentPage === page 
                ? 'bg-amber-700 text-white shadow-sm' 
                : 'border border-gray-200 text-gray-700 hover:bg-gray-100'
            ]"
          >
            {{ page }}
          </button>

          <button 
            v-if="totalPages === 0" 
            disabled 
            class="w-9 h-9 flex items-center justify-center rounded-lg text-sm font-semibold bg-amber-700 text-white"
          >
            1
          </button>

          <button 
            @click="currentPage < totalPages ? currentPage++ : null"
            :disabled="currentPage === totalPages || totalPages === 0"
            class="p-2 border border-gray-200 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed text-gray-600 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  </section>
  <Footer/>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import Header from '../kitchen/Header.vue'
import Footer from '../kitchen/Footer.vue'

// --- គ្រប់គ្រងទំព័រ (Pagination) ---
const currentPage = ref(1)
const itemsPerPage = ref(6)

// --- កំណត់ស្ថានភាពចម្រោះ (Filter States) ---
const activeCategory = ref('All Categories')
const categories = ['All Categories', 'Burgers', 'Drinks', 'Sides', 'Salads', 'Desserts']

const selectedDietary = ref('All')
const dietaryOptions = ['Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free']

const selectedRating = ref('all') 
const ratings = ['4.5', '4.0']

const selectedPriceRange = ref('all')
const priceOptions = [
  { value: 'all', label: 'All Prices' },
  { value: 'under-15', label: 'Under $15' },
  { value: '15-30', label: '$15 - $30' },
  { value: 'over-30', label: 'Over $30' }
]

// --- បញ្ជីទិន្នន័យមុខម្ហូប (Menu Items) ---
const menuItems = ref([
  {
    id: 1,
    name: 'Classic Wagyu',
    price: 24.00,
    rating: 4.8,
    category: 'Burgers',
    description: 'Premium Wagyu beef patty, aged cheddar, caramelized onions, and house sauce.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60',
    badge: 'Bestseller',
    tags: ['GF Available'],
    dietary: ['Gluten-Free']
  },
  {
    id: 2,
    name: 'Artisan Caesar',
    price: 18.50,
    rating: 4.2,
    category: 'Salads',
    description: 'Crisp baby romaine, 24-month aged parmesan, sourdough croutons, and grilled chicken.',
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500&auto=format&fit=crop&q=60',
    badge: '',
    tags: ['Vegetarian'],
    dietary: ['Nut-Free']
  },
  {
    id: 3,
    name: 'Botanical Gin',
    price: 16.00,
    rating: 4.6,
    category: 'Drinks',
    description: 'Small-batch gin infused with lavender and elderflower, topped with tonic.',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500&auto=format&fit=crop&q=60',
    badge: '',
    tags: ['Signature'],
    dietary: ['Vegan', 'Dairy-Free']
  },
  {
    id: 4,
    name: 'Honey Glazed Ribs',
    price: 29.00,
    rating: 4.7,
    category: 'Sides',
    description: 'Slow-cooked baby back ribs with a house-made honey barbecue glaze.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=60',
    badge: '',
    tags: ['Chef Special'],
    dietary: ['Gluten-Free']
  },
  {
    id: 5,
    name: 'Harvest Bowl',
    price: 17.00,
    rating: 4.4,
    category: 'Salads',
    description: 'Roasted seasonal vegetables, quinoa, avocado, and a zesty tahini dressing.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=60',
    badge: 'New',
    tags: ['GF'],
    dietary: ['Vegan', 'Gluten-Free', 'Dairy-Free']
  },
  {
    id: 6,
    name: 'Hazelnut Donuts',
    price: 12.00,
    rating: 3.9,
    category: 'Desserts',
    description: 'Freshly fried artisanal donuts with chocolate ganache and roasted hazelnuts.',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500&auto=format&fit=crop&q=60',
    badge: '',
    tags: ['Sweet'],
    dietary: [] 
  },
  {
    id: 7,
    name: 'Bacon Cheeseburger',
    price: 26.50,
    rating: 4.5,
    category: 'Burgers',
    description: 'Crispy bacon, double beef patty, cheddar cheese, and signature smoky sauce.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
    badge: 'Bestseller',
    tags: ['Meat Lover'],
    dietary: ['Nut-Free']
  },
  {
    id: 8,
    name: 'Iced Matcha Latte',
    price: 6.50,
    rating: 4.1,
    category: 'Drinks',
    description: 'Premium ceremonial grade Uji matcha whisked with creamy oat milk over ice.',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=500',
    badge: 'New',
    tags: [],
    dietary: ['Vegan', 'Dairy-Free']
  }
])

// --- មុខងារផ្ទៀងផ្ទាត់ចន្លោះតម្លៃ ---
const checkPriceMatch = (price, range) => {
  if (range === 'under-15') return price < 15
  if (range === '15-30') return price >= 15 && price <= 30
  if (range === 'over-30') return price > 30
  return true
}

// --- មុខងារចម្រោះរួមគ្នា ប្រកបដោយសុវត្ថិភាព (Safe Filter Implementation) ---
const filteredItems = computed(() => {
  return menuItems.value.filter(item => {
    const matchesCategory = activeCategory.value === 'All Categories' || item.category === activeCategory.value
    
    const matchesPriceRange = checkPriceMatch(item.price, selectedPriceRange.value)
    
    // បន្ថែម Array.isArray() ការពារកុំឱ្យគាំងទិន្នន័យពេលចុច Desserts ឬ Sides ដែលគ្មានផ្ទុកលក្ខខណ្ឌ Dietary
    const matchesDietary = selectedDietary.value === 'All' || 
                           (Array.isArray(item.dietary) && item.dietary.includes(selectedDietary.value))
    
    const matchesRating = selectedRating.value === 'all' || item.rating >= parseFloat(selectedRating.value)
    
    return matchesCategory && matchesPriceRange && matchesDietary && matchesRating
  })
})

// គណនាចំនួនទំព័រសរុប
const totalPages = computed(() => {
  return Math.ceil(filteredItems.value.length / itemsPerPage.value)
})

// កាត់យកទិន្នន័យមកបង្ហាញតាមទំព័រនីមួយៗ
const paginatedMenuItems = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value
  const endIndex = startIndex + itemsPerPage.value
  return filteredItems.value.slice(startIndex, endIndex)
})

// រាល់ពេលប្តូរលក្ខខណ្ឌចម្រោះ ត្រូវរុញអ្នកប្រើប្រាស់មកទំព័រទី ១ វិញ
watch([activeCategory, selectedPriceRange, selectedDietary, selectedRating], () => {
  currentPage.value = 1
})
</script>

<style scoped>
/* លុបរបារ Scrollbar ចេញពីផ្ទាំង Categories លើទូរស័ព្ទដើម្បីភាពស្រស់ស្អាត */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>