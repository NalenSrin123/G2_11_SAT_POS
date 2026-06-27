<script setup>
defineProps({
  orders: Array
})
</script>

<template>
  <div class="container">
    <h2>Completed Orders</h2>

    <div
      v-for="order in orders"
      :key="order.id"
      class="card"
    >
      <h3>Order #{{ order.id }}</h3>

      <p>{{ order.customer }}</p>
      <p>{{ order.table }}</p>

      <h4>✅ Completed</h4>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
}

.card {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  background: white;
}
</style>