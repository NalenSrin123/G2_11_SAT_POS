<template>
  <div class="min-h-screen bg-stone-50">
    <Header :cart-count="3" /> <main class="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
      <div class="lg:col-span-8">
        <h1 class="text-3xl font-bold text-stone-900 mb-6">Your Epicurean Basket</h1>
        <Design_list_product /> 
      </div>
    </main>
  </div>
</template>

<script setup>
import Header from '@/pages/kitchen/Header.vue'
import Design_list_product from '@/pages/kitchen/Design_list_product.vue'
// import OrderSummary from '@/pages/order/OrderSummary.vue'
</script>