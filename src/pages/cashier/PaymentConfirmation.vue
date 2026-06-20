<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
    <div class="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
      
      <div class="px-6 pt-6 pb-3 border-b border-gray-200 bg-white">
        <h1 class="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
          <CreditCard class="w-8 h-8 text-indigo-600" />
          Process Payment
        </h1>
        <p class="text-gray-500 text-sm font-medium mt-1">Select method & enter tender amount</p>
      </div>

      <div class="flex flex-col md:flex-row gap-6 p-6">
        
        <div class="flex-1 md:flex-[1.2]">
          <div class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 border-l-2 border-indigo-500 pl-2">
            PAYMENT METHOD
          </div>
          <div class="space-y-3">
            <div 
              @click="selectedMethod = 'cash'"
              class="flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all"
              :class="selectedMethod === 'cash' ? 'border-indigo-400 bg-indigo-50 shadow-md ring-1 ring-indigo-300' : 'border-gray-200 bg-white hover:border-indigo-300 hover:bg-gray-50'"
            >
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <DollarSign class="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 class="text-lg font-bold text-gray-800">Cash</h3>
                  <p class="text-xs text-gray-500 font-medium">Manual tender entry</p>
                </div>
              </div>
              <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center" :class="selectedMethod === 'cash' ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300 bg-white'">
                <div v-if="selectedMethod === 'cash'" class="w-1.5 h-1.5 rounded-full bg-white"></div>
              </div>
            </div>

            <div 
              @click="selectedMethod = 'card'"
              class="flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all"
              :class="selectedMethod === 'card' ? 'border-indigo-400 bg-indigo-50 shadow-md ring-1 ring-indigo-300' : 'border-gray-200 bg-white hover:border-indigo-300 hover:bg-gray-50'"
            >
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <CreditCard class="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 class="text-lg font-bold text-gray-800">Card</h3>
                  <p class="text-xs text-gray-500 font-medium">Terminal integrated</p>
                </div>
              </div>
              <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center" :class="selectedMethod === 'card' ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300 bg-white'">
                <div v-if="selectedMethod === 'card'" class="w-1.5 h-1.5 rounded-full bg-white"></div>
              </div>
            </div>

            <div 
              @click="selectedMethod = 'wallet'"
              class="flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all"
              :class="selectedMethod === 'wallet' ? 'border-indigo-400 bg-indigo-50 shadow-md ring-1 ring-indigo-300' : 'border-gray-200 bg-white hover:border-indigo-300 hover:bg-gray-50'"
            >
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Smartphone class="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 class="text-lg font-bold text-gray-800">Digital Wallet</h3>
                  <p class="text-xs text-gray-500 font-medium">QR / NFC Scan</p>
                </div>
              </div>
              <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center" :class="selectedMethod === 'wallet' ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300 bg-white'">
                <div v-if="selectedMethod === 'wallet'" class="w-1.5 h-1.5 rounded-full bg-white"></div>
              </div>
            </div>
          </div>
          
          <div class="mt-5 text-xs text-gray-400 flex items-center gap-1 bg-gray-50 p-2 rounded-lg">
            <Zap class="w-3 h-3" />
            <span v-if="selectedMethod === 'cash'">Cash: Insert exact or tendered amount.</span>
            <span v-else-if="selectedMethod === 'card'">Card: Tap / Insert / Swipe terminal.</span>
            <span v-else>Wallet: Show QR code or NFC ready.</span>
          </div>
        </div>

        <div class="flex-1 md:flex-[1.4]">
          <div class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex justify-between items-center">
            <span class="flex items-center gap-1">
              <DollarSign class="w-3 h-3" />
              AMOUNT RECEIVED
            </span>
            <span class="text-[11px] font-mono bg-gray-100 px-2 py-0.5 rounded-full">0.00 due</span>
          </div>
          
          <div class="bg-white rounded-2xl p-4 mb-4 border border-gray-200 flex items-center gap-1 focus-within:ring-2 focus-within:ring-indigo-300">
            <span class="text-3xl font-bold text-gray-500">$</span>
            <input 
              ref="amountInput"
              type="text" 
              :value="displayValue" 
              @input="handleInput"
              @blur="formatOnBlur"
              class="w-full text-3xl md:text-4xl font-mono font-bold bg-transparent border-none focus:outline-none text-gray-800 text-right tracking-wide"
              placeholder="0.00"
              inputmode="decimal"
            />
          </div>

          <div class="grid grid-cols-3 gap-3 mt-2">
            <button v-for="key in ['1','2','3']" :key="key" @click="pressKey(key)" class="bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl py-3.5 text-2xl font-semibold text-gray-700 transition-all shadow-sm active:scale-95 hover:shadow">{{ key }}</button>
            <button v-for="key in ['4','5','6']" :key="key" @click="pressKey(key)" class="bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl py-3.5 text-2xl font-semibold text-gray-700 transition-all shadow-sm active:scale-95">{{ key }}</button>
            <button v-for="key in ['7','8','9']" :key="key" @click="pressKey(key)" class="bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl py-3.5 text-2xl font-semibold text-gray-700 transition-all shadow-sm active:scale-95">{{ key }}</button>
            <button @click="pressKey('.')" class="bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl py-3.5 text-2xl font-semibold text-gray-700 transition-all shadow-sm active:scale-95">.</button>
            <button @click="pressKey('0')" class="bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl py-3.5 text-2xl font-semibold text-gray-700 transition-all shadow-sm active:scale-95">0</button>
            <button @click="deleteLastChar" class="bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl py-3.5 text-md font-bold text-amber-700 transition-all flex items-center justify-center gap-1 active:scale-95 shadow-sm">
              <Delete class="w-5 h-5" />
              <span class="hidden sm:inline">Del</span>
            </button>
          </div>
          
          <div class="flex gap-2 mt-4 justify-end">
            <button @click="setAmount('10')" class="text-xs bg-gray-100 px-3 py-1.5 rounded-full text-gray-600 hover:bg-gray-200 transition">$10</button>
            <button @click="setAmount('20')" class="text-xs bg-gray-100 px-3 py-1.5 rounded-full text-gray-600 hover:bg-gray-200 transition">$20</button>
            <button @click="setAmount('50')" class="text-xs bg-gray-100 px-3 py-1.5 rounded-full text-gray-600 hover:bg-gray-200 transition">$50</button>
            <button @click="setAmount('100')" class="text-xs bg-gray-100 px-3 py-1.5 rounded-full text-gray-600 hover:bg-gray-200 transition">$100</button>
          </div>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row justify-between items-center gap-4 px-6 py-5 bg-gray-50 border-t border-gray-200">
        <div class="bg-white px-5 py-2 rounded-full flex items-center gap-2 shadow-sm border border-gray-100">
          <span class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Remaining Due:</span>
          <span class="text-xl md:text-2xl font-black text-emerald-700">$0.00</span>
          <span class="text-xs text-gray-400 ml-1">(Paid in full)</span>
        </div>
        <div class="flex gap-3">
          <button @click="printReceipt" class="px-5 py-2.5 rounded-full bg-white border border-gray-300 text-gray-700 font-semibold text-sm flex items-center gap-2 hover:bg-gray-100 transition-all shadow-sm hover:shadow">
            <Printer class="w-4 h-4" />
            Print Receipt
          </button>
          <button @click="finalizeTransaction" class="px-6 py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm flex items-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-95">
            <Check class="w-4 h-4" />
            Finalize Transaction
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { 
  CreditCard, 
  DollarSign, 
  Smartphone, 
  Zap, 
  Delete, 
  Printer, 
  Check 
} from 'lucide-vue-next'

const selectedMethod = ref('cash')
const displayValue = ref('0.00')
const amountInput = ref(null)

const pressKey = (key) => {
  let current = displayValue.value
  
  if (current === '0.00' || current === '0') {
    if (key === '.') {
      displayValue.value = '0.'
    } else {
      displayValue.value = key
    }
    return
  }
  
  if (key === '.') {
    if (!current.includes('.')) {
      displayValue.value = current + '.'
    }
    return
  }
  
  if (current.includes('.')) {
    const parts = current.split('.')
    if (parts[1].length >= 2) {
      return
    }
  }
  
  if (current.replace('.', '').length >= 10) {
    return
  }
  
  displayValue.value = current + key
}

const deleteLastChar = () => {
  let current = displayValue.value
  
  if (current.length <= 1 || current === '0.' || current === '0.00') {
    displayValue.value = '0.00'
    return
  }
  
  let newValue = current.slice(0, -1)
  
  if (newValue === '' || newValue === '-') {
    displayValue.value = '0'
    return
  }
  
  displayValue.value = newValue
}

const handleInput = (event) => {
  let val = event.target.value
  
  let filtered = val.replace(/[^0-9.]/g, '')
  
  let dotCount = (filtered.match(/\./g) || []).length
  if (dotCount > 1) {
    const firstIdx = filtered.indexOf('.')
    let before = filtered.substring(0, firstIdx + 1)
    let after = filtered.substring(firstIdx + 1).replace(/\./g, '')
    filtered = before + after
  }
  
  const dotIndex = filtered.indexOf('.')
  if (dotIndex !== -1) {
    const beforeDot = filtered.substring(0, dotIndex)
    let afterDot = filtered.substring(dotIndex + 1)
    if (afterDot.length > 2) afterDot = afterDot.slice(0, 2)
    filtered = beforeDot + '.' + afterDot
  }
  
  displayValue.value = filtered || '0'
}

const formatOnBlur = () => {
  const num = parseFloat(displayValue.value)
  if (!isNaN(num)) {
    displayValue.value = num.toFixed(2)
  } else {
    displayValue.value = '0.00'
  }
}

const setAmount = (value) => {
  displayValue.value = value
}

const printReceipt = () => {
  const methodMap = { cash: 'Cash', card: 'Card', wallet: 'Digital Wallet' }
  const methodDetailMap = { cash: 'Manual Tender Entry', card: 'Chip / Tap / Swipe', wallet: 'QR Code / NFC Scan' }
  const methodName = methodMap[selectedMethod.value]
  const methodDetail = methodDetailMap[selectedMethod.value]
  const tenderAmount = displayValue.value
  const dateTime = new Date().toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', year: 'numeric', month: 'short', day: 'numeric' })
  
  const receiptHTML = `
    <!DOCTYPE html>
    <html>
    <head><title> Receipt | Payment</title>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { background: #e9eef3; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: 'Courier New', 'Menlo', monospace; padding: 1.5rem; }
      .receipt-card { max-width: 420px; margin: auto; background: white; border-radius: 28px; box-shadow: 0 20px 35px -12px rgba(0,0,0,0.2); padding: 2rem 1.8rem; }
      .header { text-align: center; border-bottom: 2px dashed #cbd5e1; margin-bottom: 1.2rem; padding-bottom: 0.7rem; }
      .header h2 { font-size: 1.6rem; font-weight: 800; letter-spacing: -0.3px; color: #0f172a; }
      .store-name { font-size: 0.7rem; color: #475569; margin-top: 4px; }
      .row { display: flex; justify-content: space-between; margin: 10px 0; font-size: 0.9rem; }
      .total-row { margin-top: 16px; padding-top: 12px; border-top: 1px dashed #94a3b8; font-weight: 800; font-size: 1.1rem; }
      .thankyou { text-align: center; margin-top: 24px; font-size: 0.7rem; color: #334155; border-top: 1px dashed #cbd5e1; padding-top: 14px; }
      .badge { background: #f1f5f9; padding: 4px 8px; border-radius: 40px; font-size: 0.7rem; display: inline-block; margin-top: 6px; }
    </style>
    </head>
    <body>
    <div class="receipt-card">
      <div class="header">
        <h2> POS STORE </h2>
        <div class="store-name">${dateTime}</div>
      </div>
      <div class="row"><span>Payment Method:</span><strong>${methodName}</strong></div>
      <div class="row"><span>Terminal Mode:</span><span>${methodDetail}</span></div>
      <div class="row"><span>Amount Received:</span><strong>$${tenderAmount}</strong></div>
      <div class="row"><span>Total Due:</span><span>$0.00</span></div>
      <div class="row total-row"><span>TOTAL PAID:</span><strong style="color:#0e7c5c;">$${tenderAmount}</strong></div>
      <div class="row"><span>Change:</span><span>$0.00</span></div>
      <div class="thankyou">
         Transaction finalized <br/>
        Thank you for your purchase!<br/>
        <span class="badge">#${Math.floor(Math.random() * 10000)}</span>
      </div>
    </div>
    <script>
      window.onload = () => { 
        setTimeout(() => { window.print(); setTimeout(() => window.close(), 800); }, 200);
      };
    <\/script>
    </body></html>
  `
  
  const printWin = window.open('', '_blank', 'width=500,height=700,toolbar=yes,menubar=yes,scrollbars=yes')
  if (!printWin) {
    alert(" Popup blocked! Please allow pop-ups to print receipt.\n\nReceipt details:\n" + 
          `Method: ${methodName}\nAmount: $${tenderAmount}\nStatus: Paid in full`)
    return
  }
  printWin.document.write(receiptHTML)
  printWin.document.close()
}

const finalizeTransaction = () => {
  const amountNum = parseFloat(displayValue.value)
  if (isNaN(amountNum) || amountNum <= 0) {
    alert(" Invalid tender amount. Please enter a valid amount greater than zero.")
    return
  }
  const methodPretty = selectedMethod.value === 'cash' ? 'Cash' : (selectedMethod.value === 'card' ? 'Card' : 'Digital Wallet')
  alert(` PAYMENT SUCCESSFUL!\n\nPayment Method: ${methodPretty}\nAmount: $${displayValue.value}\nDue: $0.00\nTransaction ID: POS-${Math.floor(Math.random() * 100000)}\nStatus: COMPLETED`)
}

onMounted(() => {
  displayValue.value = '0.00'
})
</script>

<style scoped>
button:active {
  transform: scale(0.96);
}

input[type="text"]::-webkit-inner-spin-button,
input[type="text"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="text"] {
  -moz-appearance: textfield;
}
</style>