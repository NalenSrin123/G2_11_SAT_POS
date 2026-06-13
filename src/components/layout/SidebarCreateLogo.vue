<template>
  <div
    :class="[
      'px-4 py-3 rounded-lg cursor-pointer transition whitespace-nowrap',
      active
        ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
        : 'hover:bg-gray-100 lg:border-r-4 lg:border-transparent',
    ]"
  >
    {{ label }}
  </div>
</template>

<script setup>
defineProps({
  label: String,
  active: Boolean,
});
</script>
