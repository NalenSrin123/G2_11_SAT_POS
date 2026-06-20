<template>
  <div class="py-4">
    <h2 class="text-xl font-bold text-gray-900 mb-4 tracking-tight">Delivery Info</h2>

    <div class="bg-white rounded-2xl p-4">
      <div class="flex gap-3">

        <!-- Address Block -->
        <div class="flex-1">
          <p class="text-sm text-gray-400 mb-2">Address</p>
          <div
            class="group border-2 rounded-xl p-3 cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md"
            :class="selectedAddress === 'home'
              ? 'border-orange-400 bg-orange-50 shadow-orange-100 shadow-md'
              : 'border-gray-100 bg-gray-100 hover:border-orange-200'"
            @click="selectedAddress = 'home'"
          >
            <div class="flex items-start gap-3">
              <!-- Icon -->
              <div
                class="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300"
                :class="selectedAddress === 'home' ? 'bg-orange-400' : 'bg-gray-200 group-hover:bg-orange-100'"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 transition-colors duration-300"
                  :class="selectedAddress === 'home' ? 'text-white' : 'text-gray-400 group-hover:text-orange-400'"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <!-- Text -->
              <div class="flex-1">
                <p class="text-sm font-semibold transition-colors duration-300"
                  :class="selectedAddress === 'home' ? 'text-orange-500' : 'text-gray-800 group-hover:text-gray-900'"
                >Home</p>
                <p class="text-xs text-gray-400 leading-relaxed">123 Culinary Lane, Suite 400</p>
                <p class="text-xs text-gray-400 leading-relaxed">Gastronomy, NY 10012</p>
              </div>
              <!-- Checkmark -->
              <div
                class="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300"
                :class="selectedAddress === 'home' ? 'border-orange-400 bg-orange-400 scale-110' : 'border-gray-200'"
              >
                <svg v-if="selectedAddress === 'home'" class="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Time Block -->
        <div class="flex-1">
          <p class="text-sm text-gray-400 mb-2">Time</p>
          <div
            class="group border-2 rounded-xl p-3 cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md"
            :class="selectedTime === 'asap'
              ? 'border-orange-400 bg-orange-50 shadow-orange-100 shadow-md'
              : 'border-gray-100 bg-gray-100 hover:border-orange-200'"
            @click="selectedTime = 'asap'"
          >
            <div class="flex items-start gap-3">
              <!-- Icon -->
              <div
                class="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300"
                :class="selectedTime === 'asap' ? 'bg-orange-400' : 'bg-gray-200 group-hover:bg-orange-100'"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 transition-colors duration-300"
                  :class="selectedTime === 'asap' ? 'text-white' : 'text-gray-400 group-hover:text-orange-400'"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <!-- Text -->
              <div class="flex-1">
                <p class="text-sm font-semibold transition-colors duration-300"
                  :class="selectedTime === 'asap' ? 'text-orange-500' : 'text-gray-800 group-hover:text-gray-900'"
                >ASAP Delivery</p>
                <p class="text-xs text-gray-400 leading-relaxed">Estimated: 35–45 mins</p>
              </div>
              <!-- Checkmark -->
              <div
                class="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300"
                :class="selectedTime === 'asap' ? 'border-orange-400 bg-orange-400 scale-110' : 'border-gray-200'"
              >
                <svg v-if="selectedTime === 'asap'" class="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const selectedAddress = ref('home')
const selectedTime = ref('asap')
</script>   