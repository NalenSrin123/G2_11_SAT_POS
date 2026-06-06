<template>
    <div class="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6 font-sans">
   <div class="w-full max-w-4xl ">
    <div class="mb-5">
      <h2 class="text-xl text-slate-800">Create Menu</h2>
      <p class="text-sm text-slate-500 mt-1">Add a new item to your establishment's menu with detailed pricing and visuals.</p>
    </div>
  <div class=" bg-white rounded-xl border border-slate-100 shadow-sm p-8">
    
    

    <form class="space-y-6">
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-slate-700 mb -2">Menu Name</label>
          <input 
            type="text" 
            placeholder="e.g. Truffle Mushroom Risotto" 
            class="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-2">Category</label>
          <div class="relative">
            <select class="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-500 appearance-none bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors">
              <option value="" disabled selected>Select category</option>
            
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-slate-700 mb-2">Description</label>
        <textarea 
          rows="4" 
          placeholder="Describe the ingredients, preparation, and unique flavors..." 
          class="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
        ></textarea>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-2">Price ($)</label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500">$</span>
            <input 
              type="number" 
              step="0.01" 
              placeholder="0.00" 
              class="w-full pl-8 pr-4 py-2.5 rounded-lg border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
          </div>
        </div>

        <div class="flex flex-col justify-end pb-1">
          <span class="block text-sm font-medium text-slate-700 mb-2">Availability</span>
          <label class="inline-flex items-center cursor-pointer select-none">
            <input type="checkbox" checked class="sr-only peer">
            <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 relative"></div>
            <span class="ml-3 text-sm text-slate-600">Available for order</span>
          </label>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-slate-700 mb-2">Menu Image</label>
        <div class="border-2 border-dashed border-indigo-100 bg-indigo-50/30 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-indigo-50/50 transition-colors group">
          <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-3 group-hover:scale-105 transition-transform">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
            </svg>
          </div>
          <p class="text-sm font-medium text-slate-800">Click to upload or drag and drop</p>
          <p class="text-xs text-slate-400 mt-1">PNG, JPG or JPEG (Max 5MB, 1200×800px recommended)</p>
        </div>
      </div>

      <div class="border-t border-slate-100 pt-6 flex justify-end space-x-3">
        <button 
          type="button" 
          class="px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button 
          type="submit" 
          class="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <span>Save Menu</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </button>
      </div>

    </form>
  </div>
 </div>
</div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>