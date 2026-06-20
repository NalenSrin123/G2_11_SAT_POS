<template>
  <div class="py-4">
    <h2 class="text-xl font-bold text-gray-900 mb-4 tracking-tight">Payment Method</h2>

    <div class="bg-white rounded-2xl p-4">

      <!-- Payment Options -->
      <div class="flex gap-3 mb-6">

        <!-- Apple Pay -->
        <div
          class="group flex-1 border-2 rounded-2xl py-5 px-3 cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md flex flex-col items-center gap-2"
          :class="selectedPayment === 'applepay'
            ? 'border-orange-400 bg-orange-50 shadow-orange-100 shadow-md'
            : 'border-gray-100 bg-gray-50 hover:border-orange-200'"
          @click="selectedPayment = 'applepay'"
        >
          <!-- Grid dots icon -->
          <svg class="w-6 h-6 transition-colors duration-300"
            :class="selectedPayment === 'applepay' ? 'text-orange-500' : 'text-gray-400 group-hover:text-orange-400'"
            fill="currentColor" viewBox="0 0 24 24">
            <circle cx="5" cy="5" r="1.5"/>
            <circle cx="12" cy="5" r="1.5"/>
            <circle cx="19" cy="5" r="1.5"/>
            <circle cx="5" cy="12" r="1.5"/>
            <circle cx="12" cy="12" r="1.5"/>
            <circle cx="19" cy="12" r="1.5"/>
            <circle cx="5" cy="19" r="1.5"/>
            <circle cx="12" cy="19" r="1.5"/>
            <circle cx="19" cy="19" r="1.5"/>
          </svg>
          <span class="text-xs font-semibold transition-colors duration-300"
            :class="selectedPayment === 'applepay' ? 'text-orange-500' : 'text-gray-500 group-hover:text-gray-700'"
          >Apple Pay</span>
        </div>

        <!-- Card -->
        <div
          class="group flex-1 border-2 rounded-2xl py-5 px-3 cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md flex flex-col items-center gap-2"
          :class="selectedPayment === 'card'
            ? 'border-orange-400 bg-orange-50 shadow-orange-100 shadow-md'
            : 'border-gray-100 bg-gray-50 hover:border-orange-200'"
          @click="selectedPayment = 'card'"
        >
          <svg class="w-6 h-6 transition-colors duration-300"
            :class="selectedPayment === 'card' ? 'text-orange-500' : 'text-gray-400 group-hover:text-orange-400'"
            fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          <span class="text-xs font-semibold transition-colors duration-300"
            :class="selectedPayment === 'card' ? 'text-orange-500' : 'text-gray-500 group-hover:text-gray-700'"
          >Card</span>
        </div>

        <!-- Wallet -->
        <div
          class="group flex-1 border-2 rounded-2xl py-5 px-3 cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md flex flex-col items-center gap-2"
          :class="selectedPayment === 'wallet'
            ? 'border-orange-400 bg-orange-50 shadow-orange-100 shadow-md'
            : 'border-gray-100 bg-gray-50 hover:border-orange-200'"
          @click="selectedPayment = 'wallet'"
        >
          <svg class="w-6 h-6 transition-colors duration-300"
            :class="selectedPayment === 'wallet' ? 'text-orange-500' : 'text-gray-400 group-hover:text-orange-400'"
            fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 8h18a1 1 0 011 1v9a2 2 0 01-2 2H4a2 2 0 01-2-2V9a1 1 0 011-1z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 8V6a2 2 0 012-2h14a2 2 0 012 2v2" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M17 13h1a1 1 0 010 2h-1a1 1 0 010-2z" />
          </svg>
          <span class="text-xs font-semibold transition-colors duration-300"
            :class="selectedPayment === 'wallet' ? 'text-orange-500' : 'text-gray-500 group-hover:text-gray-700'"
          >Wallet</span>
        </div>

      </div>

      <!-- Card Form -->
      <transition name="fade">
        <div v-if="selectedPayment === 'card'" class="flex flex-col gap-4 mb-6">

          <div class="flex gap-3">
            <div class="flex-1">
              <label class="text-sm text-gray-500 font-medium mb-1.5 block">Cardholder Name</label>
              <input
                v-model="cardName"
                type="text"
                placeholder="John Doe"
                class="w-full bg-gray-100 border-0 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all duration-200"
              />
            </div>
            <div class="flex-1">
              <label class="text-sm text-gray-500 font-medium mb-1.5 block">Card Number</label>
              <input
                v-model="cardNumber"
                type="text"
                placeholder="**** **** **** 1234"
                maxlength="19"
                class="w-full bg-gray-100 border-0 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all duration-200"
              />
            </div>
          </div>

          <div class="flex gap-3">
            <div class="flex-1">
              <label class="text-sm text-gray-500 font-medium mb-1.5 block">Expiry Date</label>
              <input
                v-model="expiry"
                type="text"
                placeholder="MM/YY"
                maxlength="5"
                class="w-full bg-gray-100 border-0 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all duration-200"
              />
            </div>
            <div class="flex-1">
              <label class="text-sm text-gray-500 font-medium mb-1.5 block">CVV</label>
              <input
                v-model="cvv"
                type="password"
                placeholder="123"
                maxlength="3"
                class="w-full bg-gray-100 border-0 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all duration-200"
              />
            </div>
          </div>

        </div>
      </transition>

    </div>

    <!-- Place Order — outside white card -->
    <div class="mt-4">
      <button class="w-full bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-semibold text-sm py-4 rounded-2xl flex items-center justify-center gap-2 transition-all duration-200 shadow-md shadow-orange-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        Place Order • 
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedPayment = ref('applepay')
const cardName = ref('')
const cardNumber = ref('')
const expiry = ref('')
const cvv = ref('')
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>