<template>
  <div class=" p-6 bg-white  text-black w-full">

    <div class="text-sm text-gray-500 mb-6">
      Home > Menu > Classic Wagyu Burger
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">

      <div>

        <img
          :src="selectedImage"
          class="w-full h-[500px] object-cover rounded-xl"
        />

        <div class="flex gap-3 mt-4">
          <img
            v-for="(img,index) in images"
            :key="index"
            :src="img"
            @click="selectedImage = img"
            class="w-24 h-24 rounded-lg object-cover cursor-pointer border-2"
            :class="selectedImage === img ? 'border-orange-500' : 'border-transparent hover:border-orange-500'"
          />
        </div>

      </div>

      <div>

        <span
          class="bg-orange-100 text-orange-600 text-xs px-3 py-1 rounded-full"
        >
          CHEF'S SIGNATURE
        </span>

        <h1 class="text-4xl font-bold mt-3">
          Classic Wagyu Burger
        </h1>

        <p class="text-5xl font-bold text-orange-700 mt-2">
          $24.00
        </p>

        <p class="text-gray-600 mt-4 leading-7">
          Our signature A5 Wagyu blend patty,
          perfectly seared and served on a toasted
          brioche bun.
        </p>

        <div class="flex gap-2 mt-4">
          <span class="px-3 py-1 bg-gray-100 rounded-full text-sm">
            House Favorite
          </span>

          <span class="px-3 py-1 bg-gray-100 rounded-full text-sm">
            Premium Cut
          </span>

          <span class="px-3 py-1 bg-gray-100 rounded-full text-sm">
            Artisan Bun
          </span>
        </div>

        <div class="mt-8">

          <h3 class="font-semibold mb-3">
            Choice of Side
          </h3>

          <label
            class="flex justify-between items-center border rounded-xl p-4 mb-3 cursor-pointer"
            :class="selectedSide === 'Fries' ? 'border-orange-500 bg-orange-50/30' : 'border-gray-200'"
          >
            <div class="flex items-center gap-3">
              <input
                type="radio"
                value="Fries"
                v-model="selectedSide"
                class="accent-orange-600"
              />
              <span>Truffle Fries</span>
            </div>

            <span class="text-orange-600">
              +$0.00
            </span>
          </label>

          <label
            class="flex justify-between items-center border rounded-xl p-4 cursor-pointer"
            :class="selectedSide === 'Salad' ? 'border-orange-500 bg-orange-50/30' : 'border-gray-200'"
          >
            <div class="flex items-center gap-3">
              <input
                type="radio"
                value="Salad"
                v-model="selectedSide"
                class="accent-orange-600"
              />
              <span>Garden Salad</span>
            </div>

            <span class="text-orange-600">
              +$0.00
            </span>
          </label>

        </div>

        <div class="mt-8">

          <h3 class="font-semibold mb-3">
            Extra Toppings
          </h3>

          <div
            v-for="item in toppings"
            :key="item.name"
            class="flex justify-between py-2"
          >
            <label class="flex gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                :value="item"
                v-model="selectedToppings"
                class="accent-orange-600"
              />
              {{ item.name }}
            </label>

            <span>
              +${{ item.price }}
            </span>
          </div>

        </div>

        <div class="mt-8">
          <h3 class="font-semibold mb-3">
            Special Instructions
          </h3>

          <textarea
            v-model="specialInstructions"
            class="w-full border rounded-xl p-4 h-28 focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Allergies, rare or well done..."
          />
        </div>

        <div class="mt-8 flex items-center justify-between">

          <div
            class="flex items-center gap-5 bg-gray-100 rounded-full px-5 py-3"
          >
            <button
              @click="decrease"
              class="text-orange-600 text-xl font-bold focus:outline-none select-none"
            >
              -
            </button>

            <span class="font-medium min-w-[20px] text-center">
              {{ quantity }}
            </span>

            <button
              @click="increase"
              class="text-orange-600 text-xl font-bold focus:outline-none select-none"
            >
              +
            </button>
          </div>

          <div class="text-right">
            <p class="text-xs text-gray-400 uppercase">
              Total Price
            </p>

            <p class="text-3xl font-bold">
              ${{ totalPrice.toFixed(2) }}
            </p>
          </div>

        </div>

        <button
          @click="addToCart"
          class="w-full mt-5 bg-orange-700 hover:bg-orange-800 text-white py-4 rounded-xl font-semibold transition-colors duration-200"
        >
          Add To Cart
        </button>

      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const basePrice = 24.00

const images = [
  'https://i.pinimg.com/736x/2e/60/8e/2e608eafb3a88e6db2abefab8f498c79.jpg',
  'https://i.pinimg.com/1200x/23/6b/a5/236ba56962a3ba362a47fcbc634f206e.jpg',
  'https://i.pinimg.com/736x/1c/7c/c7/1c7cc7d5e55a9e91fb591b9eef9c6610.jpg'
]

const toppings = [
  { name: 'Applewood Bacon', price: '3.50' },
  { name: 'Sliced Avocado', price: '2.50' },
  { name: 'Double Patty', price: '12.00' }
]

// State Reactivity
const selectedImage = ref(images[0])
const selectedSide = ref('Fries')
const selectedToppings = ref([])
const specialInstructions = ref('')
const quantity = ref(1)

// Dynamic Math Logic
const totalPrice = computed(() => {
  const toppingsCost = selectedToppings.value.reduce((acc, currentItem) => {
    return acc + parseFloat(currentItem.price)
  }, 0)
  
  return (basePrice + toppingsCost) * quantity.value
})

// Quantity Control Functions
const increase = () => {
  quantity.value++
}

const decrease = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

// Action Submission Placeholder
const addToCart = () => {
  const orderItem = {
    name: 'Classic Wagyu Burger',
    side: selectedSide.value,
    toppings: selectedToppings.value.map(t => t.name),
    instructions: specialInstructions.value,
    quantity: quantity.value,
    finalPrice: totalPrice.value
  }
  console.log('Added Payload data:', orderItem)
  alert(`Added ${quantity.value} item(s) to cart! Total: $${totalPrice.value.toFixed(2)}`)
}
</script>