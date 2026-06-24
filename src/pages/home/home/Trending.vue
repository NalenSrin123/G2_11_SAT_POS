<template>
  <div class="px-3 sm:px-7 lg:px-14 bg-white">
  <h1 class="font-bold text-2xl sm:text-3xl lg:text-4xl text-black">Trending Now</h1>
  <p class="text-[#7f5539]">Most ordered items this week in your area.</p>
  <div class="min-h-auto justify-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-15 py-5">
    <div 
        v-for="item in items":key="item.id"
     class="w-full bg-white rounded-2xl shadow-lg overflow-hidden relative transform duration-300 hover:scale-105">
        <h1 class=" absolute mt-3 rounded-2xl bg-white px-2 py-1 mx-4 font-medium text-[#1b263b]">{{ item.tags[0] }}</h1>
          <h1
  v-if="item.badge"
  class="absolute top-3 left-35 bg-[#eb5e28] px-2 py-1 rounded-2xl text-[#1b263b]"
>
  {{ item.badge }}
</h1>
      <img
        :src="item.image"
        alt="Card Image"
        class="w-full h-40 sm:h-52 md:h-60 object-cover "
      />
      

      <div class="p-4 sm:p-6">
      <div class="flex justify-between items-center">
  <h2 class="text-2xl text-[#1b263b]">
    {{ item.name }}
  </h2>

  <p class="font-semibold text-orange-800 text-base sm:text-lg lg:text-xl">
    ${{ item.price }}
  </p>
</div>
        <p class="text-sm sm:text-base text-[#7f5539] mt-3 line-clamp-2">
           {{ item.description.substring(0, 100) }}...
        </p>

        <div  class="flex justify-between items-center mt-10">
            <h1 class="text-xl font-semibold text-[#7f5539] flex">
              <Star fill="currentColor" stroke-width="0" class="text-yellow-400 w-4 h-4 sm:w-5 sm:h-5" />
              {{ item.rating }}
              <span class="text-[15px] text-[#7f5539] font-normal">
                ({{ item.reviews }}+)
              </span>
            </h1>
           
          <button class="group bg-gray-500 hover:bg-gray-600 rounded-full text-white p-3 sm:p-4 shadow-md transition-all duration-300 hover:scale-105">
    <i class="fa-solid fa-cart-shopping text-lg sm:text-xl transition-transform duration-300 group-hover:rotate-12"></i>
</button>
        </div>
       
      </div>
    </div>
  </div>
  </div>
</template>

<script setup>
import { Star, ShoppingCart } from 'lucide-vue-next'
    const items = [
  {
    id: 1,
    name: "Truffle Mushroom Linguine",
    price: 22.0,
    rating: 4.9,
    reviews: 120,
    description:
      "Wild seasonal mushrooms, aromatic black truffle oil, and hand-pressed pasta tossed in a creamy parmesan sauce for a rich earthy flavor.",
    tags: ["Vegetarian"],
    badge: "Popular",
    image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg"
  },
  {
    id: 2,
    name: "Signature Salmon Poke",
    price: 18.5,
    rating: 4.8,
    reviews: 85,
    description:
      "Fresh Atlantic salmon, creamy avocado, crunchy edamame, and sushi rice topped with house-made citrus ponzu and sesame seeds.",
    tags: ["Gluten-free"],
    image: "https://www.foodandwine.com/thmb/fjNakOY7IcuvZac1hR3JcSo7vzI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/FAW-recipes-pasta-sausage-basil-and-mustard-hero-06-cfd1c0a2989e474ea7e574a38182bbee.jpg"
  },
  {
    id: 3,
    name: "Mediterranean Mezze",
    price: 16.0,
    rating: 4.7,
    reviews: 92,
    description:
      "A colorful assortment of charred peppers, house-made hummus, warm pita bread, Kalamata olives, and fresh herbs for sharing.",
    tags: ["Vegan"],
    image: "https://www.orientalkopi.asia/wp-content/uploads/2025/06/5-Must-Try-Traditional-Malaysian-Food-for-Lunch-in-Malaysia.jpg"
  },
];

</script>