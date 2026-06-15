<template>
<new_-dashboard>
  <div class="min-h-screen bg-gray-50 p-6">

    <!-- Breadcrumb -->
    <div class="flex items-center gap-2 text-sm text-gray-500 mb-4">
      <router-link to="/dashboard" class="hover:text-blue-600 transition">Dashboard</router-link>
      <span>›</span>
      <router-link to="/dashboard/category" class="hover:text-blue-600 transition">Category Management</router-link>
      <span>›</span>
      <span class="text-blue-600 font-medium">Create Category</span>
    </div>

    <!-- Page Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Create New Category</h1>
      <p class="text-sm text-gray-500 mt-1">Organize your resources by defining a new workspace category.</p>
    </div>

    <!-- Main Card -->
    <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">

        <!-- Left: Inputs -->
        <div class="flex flex-col gap-5">
          <!-- Category Name -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">
              Category Name <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.name"
              type="text"
              placeholder="e.g. Premium Entrees"
              class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition"
            />
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Description</label>
            <textarea
              v-model="form.description"
              rows="5"
              placeholder="Provide a brief summary of what this category includes..."
              class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition resize-none"
            ></textarea>
          </div>
        </div>

        <!-- Right: Config + Upload -->
        <div class="flex flex-col gap-4">

          <!-- Configuration Box -->
          <div class="border border-gray-200 rounded-xl p-4 bg-gray-50">
            <p class="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4">Configuration</p>

            <!-- Active Status -->
            <div class="flex items-center justify-between mb-4">
              <div>
                <p class="text-sm font-semibold text-gray-700">Active Status</p>
                <p class="text-xs text-gray-400">Visible to users immediately</p>
              </div>
              <button
                @click="form.isActive = !form.isActive"
                :class="form.isActive ? 'bg-blue-500' : 'bg-gray-300'"
                class="relative w-10 h-6 rounded-full transition-colors duration-200 focus:outline-none"
              >
                <span
                  :class="form.isActive ? 'translate-x-4' : 'translate-x-1'"
                  class="absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200"
                ></span>
              </button>
            </div>

            <!-- External Visibility -->
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-semibold text-gray-700">External Visibility</p>
                <p class="text-xs text-gray-400">Allow search engine indexing</p>
              </div>
              <button
                @click="form.isExternal = !form.isExternal"
                :class="form.isExternal ? 'bg-blue-500' : 'bg-gray-300'"
                class="relative w-10 h-6 rounded-full transition-colors duration-200 focus:outline-none"
              >
                <span
                  :class="form.isExternal ? 'translate-x-4' : 'translate-x-1'"
                  class="absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200"
                ></span>
              </button>
            </div>
          </div>

          <!-- Image Upload -->
          <div
            @click="triggerUpload"
            @dragover.prevent
            @drop.prevent="handleDrop"
            class="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition min-h-[130px] relative overflow-hidden"
          >
            <input
              ref="fileInput"
              type="file"
              accept="image/jpeg,image/png"
              class="hidden"
              @change="handleFileChange"
            />

            <template v-if="!previewUrl">
              <svg class="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              <p class="text-sm font-semibold text-gray-600">Upload Hero Image</p>
              <p class="text-xs text-gray-400">JPG, PNG (Max 5MB)</p>
            </template>

            <template v-else>
              <img :src="previewUrl" alt="Preview" class="w-full h-32 object-cover" />
              <button
                @click.stop="removeImage"
                class="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center transition"
              >✕</button>
            </template>
          </div>

        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-gray-100 my-6"></div>

      <!-- Actions -->
      <div class="flex justify-end gap-3">
        <button
          @click="handleCancel"
          class="px-5 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
        >
          Cancel
        </button>
        <button
          @click="handleSave"
          :disabled="isSaving"
          class="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition flex items-center gap-2"
        >
          <svg v-if="isSaving" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
          </svg>
          <span>{{ isSaving ? 'Saving...' : 'Save Category ✓' }}</span>
        </button>
      </div>
    </div>

    <!-- Info Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-white border border-gray-200 rounded-xl p-4 flex gap-3 items-start shadow-sm">
        <span class="text-xl">🔍</span>
        <div>
          <p class="text-sm font-bold text-gray-800">SEO Friendly</p>
          <p class="text-xs text-gray-500 mt-1 leading-relaxed">Category slugs are automatically generated to improve search engine rankings.</p>
        </div>
      </div>
      <div class="bg-white border border-gray-200 rounded-xl p-4 flex gap-3 items-start shadow-sm">
        <span class="text-xl">🔄</span>
        <div>
          <p class="text-sm font-bold text-gray-800">Cloud Sync</p>
          <p class="text-xs text-gray-500 mt-1 leading-relaxed">Changes will propagate across all linked regional workstations in real-time.</p>
        </div>
      </div>
      <div class="bg-white border border-gray-200 rounded-xl p-4 flex gap-3 items-start shadow-sm">
        <span class="text-xl">🔒</span>
        <div>
          <p class="text-sm font-bold text-gray-800">Protected</p>
          <p class="text-xs text-gray-500 mt-1 leading-relaxed">Only administrators with 'Write' permissions can modify these settings.</p>
        </div>
      </div>
    </div>
  </div>
</new_-dashboard>
</template>

<script setup>
import New_Dashboard from './New_Dashboard.vue';


</script>
<script>

export default {
  name: 'CreateCategory',

  data() {
    return {
      form: {
        name: '',
        description: '',
        isActive: true,
        isExternal: false,
        image: null,
      },
      previewUrl: null,
      isSaving: false,
    }
  },

  methods: {
    triggerUpload() {
      this.$refs.fileInput.click()
    },

    handleFileChange(e) {
      const file = e.target.files[0]
      if (file) this.setImage(file)
    },

    handleDrop(e) {
      const file = e.dataTransfer.files[0]
      if (file) this.setImage(file)
    },

    setImage(file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB.')
        return
      }
      this.form.image = file
      this.previewUrl = URL.createObjectURL(file)
    },

    removeImage() {
      this.form.image = null
      this.previewUrl = null
      this.$refs.fileInput.value = ''
    },

    handleCancel() {
      this.$router.push('/dashboard/category')
    },

    async handleSave() {
      if (!this.form.name.trim()) {
        alert('Category name is required.')
        return
      }
      this.isSaving = true
      try {
        // TODO: replace with real API call
        // const formData = new FormData()
        // formData.append('name', this.form.name)
        // formData.append('description', this.form.description)
        // formData.append('isActive', this.form.isActive)
        // formData.append('isExternal', this.form.isExternal)
        // if (this.form.image) formData.append('image', this.form.image)
        // await api.post('/categories', formData)
        await new Promise(r => setTimeout(r, 800))
        this.$router.push('/dashboard/category')
      } catch (err) {
        console.error('Failed to create category:', err)
        alert('Something went wrong. Please try again.')
      } finally {
        this.isSaving = false
      }
    },
  },
}
</script>