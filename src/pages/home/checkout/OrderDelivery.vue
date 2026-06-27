<script setup>
import YourOrder from '../../preview/components/YourOrder.vue'
import DeliveryInfo from '../../preview/components/DeliveryInfo.vue'
import PaymentMethod from '../../preview/components/PaymentMethod.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-7xl mx-auto">
      <div class="grid lg:grid-cols-3 gap-6">

        <!-- Left -->
        <div class="lg:col-span-1">
          <YourOrder />
        </div>

        <!-- Right -->
        <div class="lg:col-span-2 space-y-6">
          <DeliveryInfo />
          <PaymentMethod />
        </div>

      </div>
    </div>
  </div>
</template>
