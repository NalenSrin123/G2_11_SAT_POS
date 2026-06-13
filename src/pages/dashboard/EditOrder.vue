<template>
  <div class="min-h-screen bg-slate-100 p-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <p class="text-sm text-gray-500">Orders > Edit Order</p>
        <h1 class="text-3xl font-bold">Edit Order #ORD-8824</h1>
      </div>

      <div class="flex gap-3">
        <button
          class="px-5 py-2 border rounded-lg bg-white hover:bg-gray-50"
        >
          Cancel
        </button>

        <button
          class="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </div>

    <!-- Content -->
    <div class="grid grid-cols-12 gap-6">

      <!-- Left -->
      <div class="col-span-8 space-y-6">

        <!-- Customer Information -->
        <div class="bg-white rounded-xl p-6 shadow-sm">
          <h2 class="text-xl font-semibold mb-5">
            Customer Information
          </h2>

          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label class="text-sm text-gray-600">Full Name</label>
              <input
                type="text"
                class="w-full border rounded-lg px-3 py-2 mt-1"
                v-model="customer.name"
              />
            </div>

            <div>
              <label class="text-sm text-gray-600">Phone Number</label>
              <input
                type="text"
                class="w-full border rounded-lg px-3 py-2 mt-1"
                v-model="customer.phone"
              />
            </div>
          </div>

          <div>
            <label class="text-sm text-gray-600">Email Address</label>
            <input
              type="email"
              class="w-full border rounded-lg px-3 py-2 mt-1"
              v-model="customer.email"
            />
          </div>
        </div>

        <!-- Order Details -->
        <div class="bg-white rounded-xl p-6 shadow-sm">
          <h2 class="text-xl font-semibold mb-5">
            Order Details
          </h2>

          <div class="grid grid-cols-3 gap-4">
            <div>
              <label class="text-sm text-gray-600">
                Order Status
              </label>

              <select
                v-model="order.status"
                class="w-full border rounded-lg px-3 py-2 mt-1"
              >
                <option>In Preparation</option>
                <option>Completed</option>
              </select>
            </div>

            <div>
              <label class="text-sm text-gray-600">
                Table Number
              </label>

              <input
                type="text"
                v-model="order.table"
                class="w-full border rounded-lg px-3 py-2 mt-1"
              />
            </div>

            <div>
              <label class="text-sm text-gray-600">
                Order Type
              </label>

              <select
                v-model="order.type"
                class="w-full border rounded-lg px-3 py-2 mt-1"
              >
                <option>Dine In</option>
                <option>Takeaway</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Right -->
      <div class="col-span-4 space-y-6">

        <!-- Order Items -->
        <div class="bg-white rounded-xl p-6 shadow-sm">
          <div class="flex justify-between items-center mb-5">
            <h2 class="font-semibold text-lg">
              Order Items ({{ items.length }})
            </h2>

            <button class="text-blue-600 text-sm font-medium">
              + Add Item
            </button>
          </div>

          <div
            v-for="item in items"
            :key="item.id"
            class="flex gap-3 mb-4"
          >
            <img
              :src="item.image"
              class="w-16 h-16 rounded-lg object-cover"
            />

            <div class="flex-1">
              <h3 class="font-medium">
                {{ item.name }}
              </h3>
[6/13/2026 12:37 PM] Chea Narin: <p class="text-gray-500 text-sm">
                ${{ item.price }}
              </p>

              <div class="flex items-center gap-3 mt-2">
                <button
                  class="w-7 h-7 border rounded"
                  @click="decrease(item)"
                >
                  -
                </button>

                <span>{{ item.qty }}</span>

                <button
                  class="w-7 h-7 border rounded"
                  @click="item.qty++"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <hr class="my-4" />

          <div class="space-y-3">
            <div class="flex justify-between">
              <span>Subtotal</span>
              <span>${{ subtotal.toFixed(2) }}</span>
            </div>

            <div class="flex justify-between">
              <span>Tax (8%)</span>
              <span>${{ tax.toFixed(2) }}</span>
            </div>

            <div
              class="flex justify-between text-xl font-bold text-blue-600"
            >
              <span>Total</span>
              <span>${{ total.toFixed(2) }}</span>
            </div>
          </div>
        </div>

        <!-- Note -->
        <div class="bg-white rounded-xl p-6 shadow-sm">
          <h2 class="font-semibold text-lg mb-4">
            Internal Notes
          </h2>

          <textarea
            rows="5"
            v-model="note"
            class="w-full border rounded-lg p-3"
          ></textarea>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const customer = ref({
  name: "Jonathan Miller",
  phone: "+1 (555) 012-3456",
  email: "j.miller@example.com",
});

const order = ref({
  status: "In Preparation",
  table: "12",
  type: "Dine In",
});

const note = ref("");

const items = ref([
  {
    id: 1,
    name: "Cheeseburger",
    price: 12,
    qty: 1,
    image: "https://picsum.photos/80?1",
  },
  {
    id: 2,
    name: "Pizza Margherita",
    price: 18,
    qty: 1,
    image: "https://picsum.photos/80?2",
  },
  {
    id: 3,
    name: "Fried Chicken",
    price: 15,
    qty: 2,
    image: "https://picsum.photos/80?3",
  },
]);

const subtotal = computed(() =>
  items.value.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  )
);

const tax = computed(() => subtotal.value * 0.08);

const total = computed(() => subtotal.value + tax.value);

const decrease = (item) => {
  if (item.qty > 1) {
    item.qty--;
  }
};
</script>