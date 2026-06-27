<script setup>
defineProps({
  orders: Array
})

const emit = defineEmits(['start-cooking'])
</script>

<template>
  <div class="container">
    <h2>New Orders</h2>

    <div
      v-for="order in orders"
      :key="order.id"
      class="card"
    >
      <h3>Order #{{ order.id }}</h3>

      <p>{{ order.customer }}</p>
      <p>{{ order.table }}</p>

      <button
        @click="emit('start-cooking', order)"
        style="
          background: orange;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        "
      >
        Start Cooking
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