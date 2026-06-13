<template>
  <div class="min-h-screen bg-[#FDFBF9] font-sans antialiased text-[#1A1A1A]">
    
    <header class="relative w-full h-[100vh] md:h-[100vh] overflow-hidden bg-gray-900">
      <img 
        src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1600&q=80" 
        alt="Delicious Double Cheeseburger" 
        class="absolute inset-0 w-full h-full object-cover object-center opacity-90"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>

      <div class="relative max-w-7xl mx-auto h-full flex flex-col justify-center px-6 lg:px-12 z-10 text-white">
        <div>
          <span class="inline-block bg-[#FF5A36] text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
            New Seasonal Special
          </span>
        </div>
        
        <h1 class="text-2xl md:text-4xl font-black tracking-tight leading-tight max-w-2xl mb-4">
          Taste the <span class="text-[#FF9F87]">Extraordinary</span>
        </h1>
        
        <p class="text-sm md:text-base text-gray-200 max-w-md mb-8 font-light leading-relaxed">
          Experience a curated selection of gourmet flavors delivered. Discover the best local kitchen straight to your doorstep.
        </p>
        
        <div class="flex flex-wrap gap-4">
          <button class="flex items-center justify-center bg-[#C23A00] hover:bg-[#A03000] text-white font-semibold px-6 py-3 rounded-xl transition duration-300 transform active:scale-95 group">
            Order Now
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
          
          <button class="bg-white/80 hover:bg-white text-gray-800 font-semibold px-6 py-3 rounded-xl backdrop-blur-sm transition duration-300 transform active:scale-95">
            Explore Menu
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-6 lg:px-12 py-16">
      
      <div class="flex justify-between items-end mb-10">
        <div>
          <h2 class="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 mb-1">
            Explore Categories
          </h2>
          <p class="text-sm text-gray-500">
            Find exactly what you're craving today.
          </p>
        </div>
        
        <a href="#" class="flex items-center text-sm font-semibold text-[#C23A00] hover:text-[#A03000] transition-colors group">
          View All Categories
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        <div class="md:col-span-6 relative rounded-3xl overflow-hidden group cursor-pointer h-[420px] md:h-auto shadow-md">
          <img 
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80" 
            alt="Artisanal Pizza" 
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
          <div class="absolute bottom-0 left-0 p-6 md:p-8 text-white w-full">
            <h3 class="text-xl md:text-2xl font-bold mb-1">Artisanal Pizza</h3>
            <p class="text-xs text-gray-300">12 Local Kitchens</p>
          </div>
        </div>

        <div class="md:col-span-6 flex flex-col gap-6">
          
          <div class="grid grid-cols-2 gap-6">
            <div class="relative rounded-2xl overflow-hidden group cursor-pointer h-[180px] shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80" 
                alt="Asian Fusion Ramen" 
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div class="absolute bottom-0 left-0 p-4 text-white">
                <h3 class="text-sm md:text-base font-bold">Asian Fusion</h3>
              </div>
            </div>

            <div class="relative rounded-2xl overflow-hidden group cursor-pointer h-[180px] shadow-sm">
              <img 
                src="https://i.pinimg.com/736x/0e/c2/89/0ec289492947872976c5c52215280faa.jpg" 
                alt="Sweet Treats" 
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div class="absolute bottom-0 left-0 p-4 text-white">
                <h3 class="text-sm md:text-base font-bold">Sweet Treats</h3>
              </div>
            </div>
          </div>

          <div class="relative rounded-2xl overflow-hidden group cursor-pointer h-[216px] shadow-sm">
            <img 
              src="https://i.pinimg.com/1200x/c8/be/ab/c8beab3e09f2dd12ad6629109e42b0ee.jpg" 
              alt="Craft Drinks" 
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div class="absolute bottom-0 left-0 p-6 text-white">
              <h3 class="text-lg md:text-xl font-bold mb-0.5">Craft Drinks</h3>
              <p class="text-xs text-gray-300">Signature Cocktails & Juices</p>
            </div>
          </div>

        </div>

      </div>
    </main>
  </div>
</template>

<script setup>
// Purely presentational component matching your UI. 
// You can seamlessly add state management/props here as needed.
</script>

<style scoped>
/* Tailwind handles the design completely, but adding smooth rendering over scrolls */
html {
  scroll-behavior: smooth;
}
</style>