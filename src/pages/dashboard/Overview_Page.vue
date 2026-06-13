<template>
  <div class="p-4 md:p-8 bg-slate-50 min-h-screen font-sans text-slate-800 antialiased">
    
    <div class="mb-8">
      <h2 class="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Welcome back, Admin</h2>
      <p class="text-xs md:text-sm text-slate-500 mt-1">Here is a snapshot of your workspace metrics for today.</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
      
      <div class="bg-white p-5 md:p-6 rounded-2xl border border-slate-100 shadow-sm transition-all duration-200 hover:shadow-md">
        <div class="flex justify-between items-start mb-4">
          <div class="w-10 h-10 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center p-2">
            <img 
              src="https://img.icons8.com/color/48/restaurant.png" 
              alt="Total Menus" 
              class="w-5 h-5 object-contain"
            />
          </div>
          <span class="text-[11px] font-bold px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full select-none">+12%</span>
        </div>
        <p class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total Menus</p>
        <p class="text-2xl md:text-3xl font-extrabold text-slate-800 mt-1">1,284</p>
      </div>

      <div class="bg-white p-5 md:p-6 rounded-2xl border border-slate-100 shadow-sm transition-all duration-200 hover:shadow-md">
        <div class="flex justify-between items-start mb-4">
          <div class="w-10 h-10 bg-slate-50 border border-slate-200/60 rounded-xl flex items-center justify-center p-2">
            <img 
              src="https://img.icons8.com/color/48/categorize.png" 
              alt="Active Categories" 
              class="w-5 h-5 object-contain"
            />
          </div>
          <span class="text-[11px] font-bold px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full select-none">+5%</span>
        </div>
        <p class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Active Categories</p>
        <p class="text-2xl md:text-3xl font-extrabold text-slate-800 mt-1">42</p>
      </div>

      <div class="bg-white p-5 md:p-6 rounded-2xl border border-slate-100 shadow-sm transition-all duration-200 hover:shadow-md sm:col-span-2 lg:col-span-1">
        <div class="flex justify-between items-start mb-4">
          <div class="w-10 h-10 bg-slate-50 border border-slate-200/60 rounded-xl flex items-center justify-center p-2">
            <img 
              src="https://img.icons8.com/color/48/conference-call.png" 
              alt="Registered Users" 
              class="w-5 h-5 object-contain"
            />
          </div>
          <span class="text-[11px] font-bold px-2 py-0.5 bg-red-50 text-red-500 rounded-full select-none">-2%</span>
        </div>
        <p class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Registered Users</p>
        <p class="text-2xl md:text-3xl font-extrabold text-slate-800 mt-1">24,592</p>
      </div>

    </div>

    <div class="bg-white p-5 md:p-6 rounded-2xl border border-slate-100 shadow-sm">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h3 class="text-base md:text-lg font-bold text-slate-800">Menu Performance</h3>
          <p class="text-xs text-slate-400 mt-0.5">Revenue and engagement trends over the last 30 days</p>
        </div>
        
        <div class="bg-slate-100/80 p-1 rounded-xl flex gap-1 text-xs font-medium text-slate-500 w-full sm:w-auto justify-center">
          <button 
            v-for="tab in ['Revenue', 'Orders', 'Views']" 
            :key="tab"
            @click="activeTab = tab"
            :class="[
              'px-4 py-1.5 rounded-lg transition-all duration-200 active:scale-95 flex-1 sm:flex-none text-center', 
              activeTab === tab ? 'bg-white text-blue-600 shadow-sm font-semibold' : 'hover:text-slate-800'
            ]"
          >
            {{ tab }}
          </button>
        </div>
      </div>

      <div class="h-64 md:h-72 w-full relative">
        <Line :data="chartData" :options="chartOptions" />
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler);

const activeTab = ref('Revenue');

// គណនាផ្លាស់ប្តូរទិន្នន័យទៅតាម Tab ដែលបានចុច (Dynamic Chart Data)
const chartData = computed(() => {
  // បង្កើតទិន្នន័យគំរូផ្សេងៗគ្នាសម្រាប់ Tab នីមួយៗ
  const dataMap = {
    'Revenue': [10000, 11500, 12200, 14290, 15100, 15500],
    'Orders': [320, 450, 410, 580, 620, 690],
    'Views': [2300, 3100, 2900, 4200, 4800, 5100]
  };

  return {
    labels: ['Sep 20', 'Sep 27', 'Oct 04', 'Oct 11', 'Oct 18', 'Today'],
    datasets: [
      {
        label: activeTab.value,
        data: dataMap[activeTab.value] || dataMap['Revenue'],
        borderColor: '#2563eb',
        borderWidth: 3,
        tension: 0.4,
        pointBackgroundColor: '#2563eb',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 1,
        pointHoverRadius: 6,
        fill: true,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, context.chart.height);
          gradient.addColorStop(0, 'rgba(37, 99, 235, 0.18)');
          gradient.addColorStop(1, 'rgba(37, 99, 235, 0.0)');
          return gradient;
        },
      },
    ],
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      enabled: true,
      backgroundColor: '#1e293b',
      titleFont: { size: 10, weight: '500', family: 'sans-serif' },
      bodyFont: { size: 13, weight: '700', family: 'sans-serif' },
      padding: 12,
      cornerRadius: 8,
      displayColors: false,
      callbacks: {
        title: () => 'OCT 14, 2023',
        label: (context) => {
          if (activeTab.value === 'Revenue') {
            return `$${context.raw.toLocaleString()}`;
          }
          return `${context.raw.toLocaleString()} ${activeTab.value}`;
        }
      }
    }
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: '#94a3b8', font: { size: 11 } }
    },
    y: { 
      display: false 
    }
  }
};
</script>