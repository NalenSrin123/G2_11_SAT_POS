<template>
  <new_-dashboard>
    <!-- Page Content -->
    <main class="flex-1 overflow-y-auto p-6">
      <div class="max-w-4xl mx-auto">
        <div class="mb-6">
          <h2 class="text-2xl font-bold text-slate-800">Create Menu</h2>

          <p class="text-slate-500">Add a new item to your restaurant menu.</p>
        </div>

        <div class="bg-white rounded-xl shadow-sm border p-8">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block mb-2 text-sm font-medium">
                  Menu Name
                </label>

                <input
                  v-model="form.name"
                  type="text"
                  class="w-full border rounded-lg px-4 py-3"
                  placeholder="Burger"
                  required
                />
              </div>

              <div>
                <label class="block mb-2 text-sm font-medium"> Category </label>

                <select
                  v-model="form.category"
                  class="w-full border rounded-lg px-4 py-3"
                  required
                >
                  <option value="">Select Category</option>

                  <option
                    v-for="category in categories"
                    :key="category"
                    :value="category"
                  >
                    {{ category }}
                  </option>
                </select>
              </div>
            </div>

            <div>
              <label class="block mb-2 text-sm font-medium">
                Description
              </label>

              <textarea
                v-model="form.description"
                rows="4"
                class="w-full border rounded-lg px-4 py-3"
              ></textarea>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block mb-2 text-sm font-medium"> Price </label>

                <input
                  v-model.number="form.price"
                  type="number"
                  step="0.01"
                  class="w-full border rounded-lg px-4 py-3"
                  required
                />
              </div>

              <div>
                <label class="block mb-2 text-sm font-medium">
                  Available
                </label>

                <input v-model="form.isAvailable" type="checkbox" />
              </div>
            </div>

            <div>
              <label class="block mb-2 text-sm font-medium"> Menu Image </label>

              <input
                ref="fileInput"
                type="file"
                accept="image/*"
                @change="onFileSelected"
              />

              <img
                v-if="imagePreview"
                :src="imagePreview"
                class="mt-4 h-40 rounded-lg object-cover"
              />
            </div>

            <div class="flex justify-end gap-3">
              <button
                type="button"
                @click="resetForm"
                class="px-5 py-2 rounded-lg border"
              >
                Cancel
              </button>

              <button
                type="submit"
                class="px-5 py-2 rounded-lg bg-blue-600 text-white"
              >
                Save Menu
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </new_-dashboard>
</template>

<script setup>
import { ref, reactive } from "vue";
import New_Dashboard from "./New_Dashboard.vue";

const categories = ["Appetizers", "Mains", "Desserts", "Beverages", "Sides"];

const fileInput = ref(null);
const imagePreview = ref(null);

const form = reactive({
  name: "",
  category: "",
  description: "",
  price: null,
  isAvailable: true,
  imageFile: null,
});

const onFileSelected = (event) => {
  const file = event.target.files[0];

  if (!file) return;

  form.imageFile = file;
  imagePreview.value = URL.createObjectURL(file);
};

const handleSubmit = () => {
  const formData = new FormData();

  formData.append("name", form.name);
  formData.append("category", form.category);
  formData.append("description", form.description);
  formData.append("price", form.price);
  formData.append("isAvailable", String(form.isAvailable));

  if (form.imageFile) {
    formData.append("image", form.imageFile);
  }

  console.log(Object.fromEntries(formData.entries()));

  alert("Menu Created Successfully");
};

const resetForm = () => {
  form.name = "";
  form.category = "";
  form.description = "";
  form.price = null;
  form.isAvailable = true;
  form.imageFile = null;

  imagePreview.value = null;

  if (fileInput.value) {
    fileInput.value.value = "";
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
</style>
