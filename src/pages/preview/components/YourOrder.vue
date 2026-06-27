<template>
  <div class="min-h-screen w-full bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
    <div class="mx-auto flex w-full max-w-xl flex-col gap-4 sm:gap-6">
      <div class="flex items-center justify-between">
        <h5 class="text-xl font-semibold leading-none text-heading sm:text-2xl">
          Your order
        </h5>
      </div>

      <div
        class="overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-200"
      >
        <ul class="divide-y divide-slate-200">
          <li
            v-for="item in items"
            :key="item.name"
            class="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:gap-5 sm:p-6"
          >
            <img
              class="h-20 w-20 shrink-0 rounded-2xl object-cover sm:h-24 sm:w-24"
              :src="item.image"
              :alt="item.name"
            />

            <div class="min-w-0 flex-1">
              <p class="truncate font-medium text-heading">{{ item.name }}</p>
              <p class="mt-1 text-sm text-slate-600">Qty: {{ item.qty }}</p>
              <p class="mt-1 text-sm text-slate-600">{{ item.note }}</p>
            </div>

            <div class="text-left font-medium text-heading sm:text-right">
              {{ item.price }}
            </div>
          </li>
        </ul>

        <div class="border-t border-slate-200 bg-slate-50 p-4 sm:p-6">
          <div class="space-y-3">
            <div class="flex items-center justify-between gap-4">
              <p class="font-medium text-slate-900">Price</p>
              <p class="font-medium text-slate-900">
                ${{ subtotal.toFixed(2) }}
              </p>
            </div>
            <div class="flex items-center justify-between gap-4">
              <p class="font-medium text-slate-900">Tax</p>
              <p class="font-medium text-slate-900">${{ tax.toFixed(2) }}</p>
            </div>
            <div class="flex items-center justify-between gap-4">
              <p class="font-medium text-slate-900">Delivery Fee</p>
              <p class="font-medium text-red-500">Free</p>
            </div>
            <div
              class="flex items-center justify-between gap-4 border-t border-slate-200 pt-3"
            >
              <h1 class="text-lg font-semibold text-slate-900 sm:text-xl">
                Total
              </h1>
              <h1 class="text-lg font-semibold text-slate-900 sm:text-xl">
                ${{ total.toFixed(2) }}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div
        class="rounded-2xl border border-rose-100 bg-rose-50 p-4 text-sm text-rose-900 shadow-sm sm:p-5"
      >
        <p>Your order is protected by our Quality Guarantee.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const items = [
  {
    name: "Burger",
    qty: 1,
    note: "No onion and tomato",
    price: "$10.00",
    amount: 10,
    image: new URL("../../../assets/image/order_burger.jpeg", import.meta.url)
      .href,
  },
  {
    name: "Pizza",
    qty: 1,
    note: "Much cheese and spicy",
    price: "$20.00",
    amount: 20,
    image: new URL("../../../assets/image/order_pizza.jpeg", import.meta.url)
      .href,
  },
];

const subtotal = computed(() =>
  items.reduce((sum, item) => sum + item.amount, 0),
);
const tax = computed(() => subtotal.value * 0.1);
const total = computed(() => subtotal.value + tax.value);
</script>

<style></style>
