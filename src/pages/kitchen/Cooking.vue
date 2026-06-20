<template>
  <div class="bg-gray-100 min-h-screen flex items-center justify-center p-6">
    <div class="w-full max-w-xl bg-white rounded-3xl shadow-lg overflow-hidden">
      
      <!-- Header -->
      <div class="p-6 flex justify-between items-start">
        <div>
          <h2 class="text-3xl font-bold text-slate-900">
            Order #1003
          </h2>

          <div class="flex items-center gap-6 mt-4 text-gray-500">
            <div class="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5.121 17.804A9 9 0 1118.88 17.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>Bob Wilson</span>
            </div>

            <div class="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>Table 5</span>
            </div>
          </div>
        </div>

        <span
          class="px-6 py-2 rounded-full bg-orange-50 border border-orange-200 text-orange-600 font-medium"
        >
          Cooking
        </span>
      </div>

      <div class="border-t"></div>

      <!-- Items -->
      <div class="p-6 space-y-8">
        <div
          v-for="item in orderItems"
          :key="item.id"
          class="flex gap-4"
        >
          <div
            class="w-12 h-12 rounded-full bg-orange-50 text-orange-600 font-bold flex items-center justify-center"
          >
            {{ item.qty }}
          </div>

          <div>
            <h3 class="text-2xl font-semibold text-slate-900">
              {{ item.name }}
            </h3>

            <p
              v-if="item.note"
              class="mt-2 italic text-gray-500"
            >
              Note: {{ item.note }}
            </p>
          </div>
        </div>

        <div class="border-t"></div>

        <!-- Footer -->
        <div class="flex justify-between items-center">
          <p class="text-gray-500">
            Ordered: 10:31:55 PM
          </p>

          <div
            class="bg-gray-100 rounded-2xl px-5 py-3 flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <span class="font-bold text-lg">
              10:19
            </span>
          </div>
        </div>

        <!-- Button -->
        <button
          class="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl font-semibold text-xl flex items-center justify-center gap-3 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="3"
              d="M5 13l4 4L19 7"
            />
          </svg>

          Mark Ready
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const orderItems = ref([
  {
    id: 1,
    qty: 1,
    name: "Grilled Salmon",
    note: "No lemon",
  },
  {
    id: 2,
    qty: 1,
    name: "Steamed Vegetables",
    note: "",
  },
]);
</script>