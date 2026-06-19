<template>
  <div
    class="min-h-screen bg-[#f8f9fd] flex flex-col justify-between font-sans text-gray-800"
  >
    <header
      class="w-full bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center"
    >
      <div class="text-blue-700 font-bold text-xl tracking-tight">
        WorkspaceAuth
      </div>
      <a href="#" class="text-gray-500 hover:text-gray-700 text-sm">Support</a>
    </header>
    <main class="flex-grow flex items-center justify-center p-4">
      <div
        class="bg-white rounded-xl shadow-sm border border-gray-50 p-8 max-w-md w-full text-center"
      >
        <div
          class="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600 mb-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
            />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">
          Verify Your Identity
        </h2>
        <p class="text-gray-500 text-sm mb-6 leading-relaxed">
          We've sent a 6-digit confirmation code to your registered email
          address. Please enter it below.
        </p>
        <div class="flex justify-center gap-2 mb-6">
          <input
            v-for="(digit, index) in 6"
            :key="index"
            :ref="
              (el) => {
                if (el) inputs[index] = el;
              }
            "
            v-model="otp[index]"
            type="text"
            maxLength="1"
            class="w-12 h-14 text-center text-xl font-semibold border rounded-lg focus:outline-none transition-colors"
            :class="
              activeIndex === index
                ? 'border-blue-600 ring-1 ring-blue-600'
                : 'border-gray-200'
            "
            @focus="activeIndex = index"
            @blur="activeIndex = null"
            @input="handleInput($event, index)"
            @keydown.delete="handleDelete(index)"
          />
        </div>
        <button
          @click="verifyOTP"
          class="w-full bg-[#0052cc] hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors mb-4"
        >
          Verify
        </button>

        <p class="text-xs text-gray-500">
          Didn't receive the code?
          <a
            href="#"
            @click.prevent="resendCode"
            class="text-blue-600 hover:underline"
            >Resend Code</a
          >
        </p>
      </div>
    </main>
    <footer
      class="w-full bg-white border-t border-gray-100 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500"
    >
      <div class="font-semibold text-gray-700">WorkspaceAuth</div>
      <div class="flex gap-4">
        <a href="#" class="hover:text-gray-700">Privacy Policy</a>
        <a href="#" class="hover:text-gray-700">Terms of Service</a>
        <a href="#" class="hover:text-gray-700">Security</a>
        <a href="#" class="hover:text-gray-700">Status</a>
      </div>
      <div>© 2026 WorkspaceAuth. All rights reserved.</div>
    </footer>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
const otp = reactive(new Array(6).fill(""));
const inputs = ref([]);
const activeIndex = ref(0);
const handleInput = (event, index) => {
  const val = event.target.value;
  if (!/^\d*$/.test(val)) {
    otp[index] = "";
    return;
  }
  if (val && index < 5) {
    inputs.value[index + 1].focus();
  }
};
const handleDelete = (index) => {
  if (!otp[index] && index > 0) {
    otp[index - 1] = "";
    inputs.value[index - 1].focus();
  }
};
const verifyOTP = () => {
  const code = otp.join("");
  if (code.length < 6) {
    alert("សូមបំពេញកូដឲ្យបានគ្រប់ ៦ ខ្ទង់");
    return;
  }
  alert(`កំពុងផ្ទៀងផ្ទាត់កូដ: ${code}`);
};

const resendCode = () => {
  alert("ប្រព័ន្ធបានផ្ញើកូដថ្មីទៅកាន់អ៊ីមែលរបស់អ្នកហើយ!");
};
</script>
