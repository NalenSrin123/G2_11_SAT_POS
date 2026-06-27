<script setup>
defineProps({
  orders: Array
})

const emit = defineEmits(['mark-completed'])
</script>

<template>
  <div class="container">
    <h2>Cooking Orders</h2>

    <div
      v-for="order in orders"
      :key="order.id"
      class="card"
    >
      <h3>Order #{{ order.id }}</h3>

      <p>{{ order.customer }}</p>
      <p>{{ order.table }}</p>

      <button
        @click="emit('mark-completed', order)"
        style="
          background: green;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        "
      >
        Mark as Completed
      </button>
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