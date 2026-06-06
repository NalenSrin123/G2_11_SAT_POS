<template>
  <div class="min-h-screen bg-gray-50 flex items-start justify-center py-10 px-4">
    <div class="w-full max-w-2xl">

      <!-- Page Header -->
      <div class="mb-6">
        <h1 class="text-xl font-semibold text-gray-900">Create page unit</h1>
        <p class="text-sm text-gray-500 mt-1">
          Define a new measurement unit for inventory tracking
        </p>
      </div>

      <!-- Card -->
      <div class="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">

        <!-- Name + Category -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Unit name</label>
            <input
              v-model="form.name"
              type="text"
              placeholder="e.g. Grams"
              class="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">short code</label>
            <select
              v-model="form.category"
              class="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none cursor-pointer"
            >
              <option value="" disabled>e.g. g</option>
              <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
          </div>
        </div>

        <!-- Description -->
        <div class="mb-5">
          <label class="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
          <textarea
            v-model="form.description"
            :maxlength="300"
            rows="4"
            placeholder="Explain the purpose of this "
            class="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
          ></textarea>
        </div>

       
        <!-- Divider -->
        <div class="border-t border-gray-100 mb-6"></div>

        <!-- Validation Error -->
        <div v-if="formError" class="mb-4 px-4 py-3 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2">
          <svg class="w-4 h-4 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          <p class="text-sm text-red-600">{{ formError }}</p>
        </div>

        <!-- Footer Actions -->
        <div class="flex items-center justify-end gap-3">
          <button
            @click="handleCancel"
            class="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition active:scale-95"
          >
            Cancel
          </button>
          <button
            @click="handleSave"
            :disabled="isSaving"
            class="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition active:scale-95 flex items-center gap-2"
          >
            <svg v-if="isSaving" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
            <svg v-else class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            {{ isSaving ? 'Saving...' : 'Save unit' }}
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const categories = ['Appetizers', 'Main course', 'Desserts', 'Beverages', 'Sides', 'Specials']

const form = reactive({
  name: '',
  category: '',
  description: '',
  price: '',
  available: true,
})

const fileInput = ref(null)
const previewUrl = ref(null)
const imageFile = ref(null)
const isDragging = ref(false)
const imageError = ref('')
const formError = ref('')
const isSaving = ref(false)

function triggerFileInput() {
  fileInput.value?.click()
}

function handleFileChange(event) {
  const file = event.target.files[0]
  loadImage(file)
}

function handleDrop(event) {
  isDragging.value = false
  const file = event.dataTransfer.files[0]
  loadImage(file)
}

function loadImage(file) {
  imageError.value = ''
  if (!file) return
  if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
    imageError.value = 'Only PNG, JPG, and WebP files are accepted.'
    return
  }
  if (file.size > 5 * 1024 * 1024) {
    imageError.value = 'Image must be under 5MB.'
    return
  }
  imageFile.value = file
  previewUrl.value = URL.createObjectURL(file)
}

function removeImage() {
  previewUrl.value = null
  imageFile.value = null
  imageError.value = ''
  if (fileInput.value) fileInput.value.value = ''
}

function handleCancel() {
  Object.assign(form, { name: '', category: '', description: '', price: '', available: true })
  removeImage()
  formError.value = ''
}

async function handleSave() {
  formError.value = ''
  if (!form.name.trim()) { formError.value = 'Menu name is required.'; return }
  if (!form.category) { formError.value = 'Please select a category.'; return }
  if (!form.price || isNaN(form.price) || Number(form.price) < 0) {
    formError.value = 'Please enter a valid price.'; return
  }

  isSaving.value = true
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1200))
  isSaving.value = false

  alert(`Menu item "${form.name}" saved successfully!`)
  handleCancel()
}
</script>