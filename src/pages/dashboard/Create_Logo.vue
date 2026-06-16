<template>
  <FrontendLayout>
    <form @submit.prevent="saveLogo">
      <div>
        <p class="text-sm text-gray-500 mb-3">
          Settings > Branding >
          <span class="text-blue-600"> Create New Logo </span>
        </p>

        <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
          Create New Logo
        </h1>

        <p class="text-gray-500 mb-8 max-w-2xl">
          Define a new brand asset for your restaurant outlets and menus.
        </p>

        <p
          v-if="statusMessage"
          class="mb-6 rounded-lg border px-4 py-3 text-sm"
          :class="statusType === 'success'
            ? 'border-green-200 bg-green-50 text-green-700'
            : 'border-red-200 bg-red-50 text-red-700'"
        >
          {{ statusMessage }}
        </p>

        <div class="grid grid-cols-1 xl:grid-cols-12 gap-6 xl:gap-8">
          <div class="xl:col-span-8 bg-white border rounded-xl p-4 sm:p-6 lg:p-8">
            <div class="mb-6">
              <label class="block mb-2 font-medium" for="logo-name">
                Logo Name
              </label>

              <input
                id="logo-name"
                v-model.trim="form.name"
                type="text"
                placeholder="e.g. Primary Horizontal Blue"
                class="w-full border rounded-lg px-4 py-3"
              />
            </div>

            <div class="mb-6">
              <label class="block mb-2 font-medium" for="logo-type">
                Logo Type
              </label>

              <select
                id="logo-type"
                v-model="form.type"
                class="w-full border rounded-lg px-4 py-3"
              >
                <option disabled value="">Select type...</option>
                <option value="horizontal">Horizontal</option>
                <option value="square">Square</option>
                <option value="icon">Icon</option>
              </select>
            </div>

            <div class="mb-8">
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                <label class="font-medium" for="logo-priority">
                  Display Priority
                </label>

                <span class="w-fit bg-blue-100 text-blue-700 px-2 rounded">
                  {{ form.priority }}
                </span>
              </div>

              <input
                id="logo-priority"
                v-model.number="form.priority"
                type="range"
                min="1"
                max="10"
                class="w-full"
              />
            </div>

            <div>
              <label class="block mb-2 font-medium">Logo Asset</label>

              <div
                class="border-2 border-dashed rounded-xl p-6 sm:p-10 lg:p-12 text-center transition"
                :class="isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'"
                @dragover.prevent="isDragging = true"
                @dragleave="isDragging = false"
                @drop.prevent="handleDrop"
              >
                <div
                  class="w-16 h-16 bg-blue-100 rounded-xl mx-auto mb-5 flex items-center justify-center overflow-hidden"
                >
                  <img
                    v-if="previewUrl"
                    :src="previewUrl"
                    alt="Logo preview"
                    class="w-full h-full object-cover"
                  />
                  <span v-else class="text-sm font-semibold text-blue-600">Logo</span>
                </div>

                <p class="font-medium break-words">
                  {{ selectedFile ? selectedFile.name : 'Drag and drop your logo here' }}
                </p>

                <p class="text-gray-500 mb-6">SVG, PNG, JPG (max. 5MB)</p>

                <input
                  ref="fileInput"
                  type="file"
                  accept="image/png,image/jpeg,image/svg+xml"
                  class="hidden"
                  @change="handleFileSelect"
                />

                <button
                  type="button"
                  class="w-full sm:w-auto px-6 py-2 border rounded-lg"
                  @click="openFilePicker"
                >
                  Or browse files
                </button>
              </div>
            </div>

            <hr class="my-8" />

            <div class="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                class="bg-blue-600 text-white px-10 py-3 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed"
                :disabled="saving"
              >
                {{ saving ? 'Saving...' : 'Save Logo' }}
              </button>

              <button
                type="button"
                class="border px-10 py-3 rounded-lg"
                @click="resetForm"
              >
                Cancel
              </button>
            </div>
          </div>

          <div class="xl:col-span-4 space-y-6">
            <div class="bg-white border rounded-xl p-4 sm:p-5">
              <div class="flex items-center gap-2 mb-4">
                <span aria-hidden="true">👁</span>
                <span class="font-semibold">Real-time Preview</span>
              </div>

              <div
                class="border rounded-lg h-60 sm:h-72 flex items-center justify-center text-gray-400 overflow-hidden bg-gray-50"
              >
                <img
                  v-if="previewUrl"
                  :src="previewUrl"
                  alt="Logo preview"
                  class="w-full h-full object-contain"
                />
                <span v-else>No image uploaded yet</span>
              </div>

              <div class="mt-4 border rounded-lg p-4">
                <div class="flex justify-between text-sm gap-4">
                  <span class="text-gray-500">VISIBILITY STATUS</span>

                  <span class="text-blue-600 font-semibold">DRAFT</span>
                </div>

                <p class="text-sm text-gray-500 mt-2">
                  New logos are saved as drafts until approved by the Brand
                  Manager.
                </p>

                <p class="text-sm text-gray-500 mt-3" v-if="latestDraft">
                  Latest saved draft:
                  <span class="font-medium text-gray-700">{{ latestDraft.name }}</span>
                </p>

                <p class="text-sm text-gray-500 mt-1">
                  Stored drafts:
                  <span class="font-medium text-gray-700">{{ savedDrafts.length }}</span>
                </p>
              </div>
            </div>

            <div class="bg-white border rounded-xl p-4 sm:p-5">
              <h3 class="font-semibold text-blue-600 mb-4">Logo Requirements</h3>

              <ul class="space-y-3 text-sm text-gray-600">
                <li>- Use SVGs for best scaling on high-resolution menu screens.</li>
                <li>- Minimum resolution of 512x512px for raster formats.</li>
                <li>- Maintain at least 40px safe zone around the emblem.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </form>
  </FrontendLayout>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import FrontendLayout from '../../layouts/FrontLayout.vue'
import { readLogoDrafts, saveLogoDraft } from '../../services/logoDrafts.js'

const fileInput = ref(null)
const isDragging = ref(false)
const saving = ref(false)
const statusMessage = ref('')
const statusType = ref('success')
const selectedFile = ref(null)
const previewUrl = ref('')
const savedDrafts = ref([])

const form = ref({
  name: '',
  type: '',
  priority: 5,
})

const hasRequiredData = computed(() => Boolean(form.value.name && form.value.type && selectedFile.value))
const latestDraft = computed(() => savedDrafts.value[0] || null)

function syncSavedDrafts() {
  savedDrafts.value = readLogoDrafts()
}

function openFilePicker() {
  fileInput.value?.click()
}

function setPreview(file) {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
  }

  selectedFile.value = file
  previewUrl.value = file ? URL.createObjectURL(file) : ''
}

function validateFile(file) {
  if (!file) {
    throw new Error('Please choose an image file before saving.')
  }

  const fileName = file.name || ''
  const mimeType = file.type || ''
  const isSvg = mimeType === 'image/svg+xml' || /\.svg$/i.test(fileName)
  const isRasterImage =
    ['image/png', 'image/jpeg', 'image/jpg'].includes(mimeType) || /\.(png|jpe?g)$/i.test(fileName)

  if (!isSvg && !isRasterImage) {
    throw new Error('Only PNG, JPG, and SVG files are supported.')
  }

  const maxSizeBytes = 5 * 1024 * 1024
  if (file.size > maxSizeBytes) {
    throw new Error('The logo file must be 5MB or smaller.')
  }
}

async function fileToDataUrl(file) {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error('Unable to read the selected file.'))
    reader.readAsDataURL(file)
  })
}

async function handleFileSelect(event) {
  try {
    const file = event.target.files?.[0]
    validateFile(file)
    setPreview(file)
    isDragging.value = false
    statusMessage.value = ''
  } catch (error) {
    statusType.value = 'error'
    statusMessage.value = error.message
    if (fileInput.value) {
      fileInput.value.value = ''
    }
  }
}

async function handleDrop(event) {
  try {
    isDragging.value = false
    const file = event.dataTransfer.files?.[0]
    validateFile(file)
    setPreview(file)
    statusMessage.value = ''
    if (fileInput.value) {
      fileInput.value.value = ''
    }
  } catch (error) {
    statusType.value = 'error'
    statusMessage.value = error.message
  }
}

function resetForm() {
  form.value = {
    name: '',
    type: '',
    priority: 5,
  }

  selectedFile.value = null

  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
    previewUrl.value = ''
  }

  if (fileInput.value) {
    fileInput.value.value = ''
  }

  statusMessage.value = ''
  isDragging.value = false
}

async function saveLogo() {
  try {
    statusMessage.value = ''
    statusType.value = 'success'
    saving.value = true

    if (!hasRequiredData.value) {
      throw new Error('Please enter a logo name, choose a type, and upload an image.')
    }

    validateFile(selectedFile.value)
    const logoAsset = await fileToDataUrl(selectedFile.value)

    const draft = {
      id: crypto.randomUUID?.() ?? `logo-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: form.value.name,
      type: form.value.type,
      priority: form.value.priority,
      fileName: selectedFile.value.name,
      fileType: selectedFile.value.type,
      fileSize: selectedFile.value.size,
      asset: logoAsset,
      status: 'draft',
      createdAt: new Date().toISOString(),
    }

    savedDrafts.value = saveLogoDraft(draft)

    statusType.value = 'success'
    statusMessage.value = `Logo "${draft.name}" saved as a draft.`
  } catch (error) {
    statusType.value = 'error'
    statusMessage.value = error.message
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  syncSavedDrafts()
})

onBeforeUnmount(() => {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
  }
})
</script>
