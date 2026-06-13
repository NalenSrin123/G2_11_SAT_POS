<template>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <div>
        <h1 class="font-bold">Units of Measurement</h1>
        <p>
          Manage the standardized units used for inventory, recipes,
          and resource tracking.
        </p>
      </div>

      <button class="add-btn">
        <i class="fas fa-plus"></i>
        Add New Unit
      </button>
    </div>

    <!-- Statistics -->
    <div class="stats">
      <div class="card">
        <div class="card-top">
          <span>TOTAL UNITS</span>
          <i class="fas fa-ruler"></i>
        </div>
        <h2>24</h2>
        <small>+2 added this month</small>
      </div>

      <div class="card">
        <div class="card-top">
          <span>ACTIVE STATUS</span>
          <i class="fas fa-check-circle"></i>
        </div>
        <h2>22</h2>
        <small>92% Operational</small>
      </div>

      <div class="card">
        <div class="card-top">
          <span>USAGE FREQUENCY</span>
          <i class="fas fa-chart-bar"></i>
        </div>
        <h2>High</h2>
        <small>Pounds (lb) most used</small>
      </div>
    </div>

    <!-- Table -->
    <div class="table-card">
      <table>
        <thead>
          <tr>
            <th>Unit Name</th>
            <th>Abbreviation</th>
            <th>Category</th>
            <th>Active Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="unit in units" :key="unit.id">
            <td>
              <div class="unit-name">
                <i :class="unit.icon"></i>
                {{ unit.name }}
              </div>
            </td>

            <td>{{ unit.abbr }}</td>

            <td>
              <span class="badge">
                {{ unit.category }}
              </span>
            </td>

            <td>
              <label class="switch">
                <input type="checkbox" v-model="unit.active" />
                <span class="slider"></span>
              </label>
            </td>

            <td>
              <i class="fas fa-ellipsis-v"></i>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="pagination">
        <span>Showing 1 to 5 of 24 units</span>

        <div class="pages">
          <button>Previous</button>
          <button class="active">1</button>
          <button>2</button>
          <button>3</button>
          <button>Next</button>
        </div>
      </div>
    </div>

    <!-- Footer Cards -->
    <div class="bottom">
      <div class="guide">
        <h2>Standardization Guidelines</h2>

        <div class="note">
          Always use standard international abbreviations for units to
          ensure compatibility with inventory prediction algorithms.
          Custom units should be documented clearly before activation.
        </div>
      </div>

      <div class="banner">
        <div class="overlay">
          Accuracy is the foundation of our resource management system.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ref } from "vue";

const units = ref([
  {
    id: 1,
    name: "Kilograms",
    abbr: "kg",
    category: "Weight",
    active: true,
    icon: "fas fa-weight-hanging",
  },
  {
    id: 2,
    name: "Liters",
    abbr: "L",
    category: "Volume",
    active: true,
    icon: "fas fa-tint",
  },
  {
    id: 3,
    name: "Pounds",
    abbr: "lb",
    category: "Weight",
    active: true,
    icon: "fas fa-balance-scale",
  },
  {
    id: 4,
    name: "Pieces",
    abbr: "pcs",
    category: "Count",
    active: true,
    icon: "fas fa-cubes",
  },
  {
    id: 5,
    name: "Celsius",
    abbr: "°C",
    category: "Temperature",
    active: false,
    icon: "fas fa-temperature-half",
  },
]);
</script>

<style scoped>
.container {
  padding: 30px;
  background: #f7f8fc;
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header p {
  color: #666;
}

.add-btn {
  background: #0d5bd7;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 25px;
}

.card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  font-size: 20px;
}

.card-top {
  display: flex;
  justify-content: space-between;
  color: #0d5bd7;
  font-size: 20px;
  font-weight: bold;
}

.table-card {
  background: white;
  margin-top: 30px;
  border-radius: 12px;
  overflow: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  background: #f3f4f8;
  text-align: left;
  padding: 15px;
}

td {
  padding: 15px;
  border-bottom: 1px solid #eee;
}

.unit-name {
  display: flex;
  align-items: center;
  gap: 10px;
}


.badge {
  background: #e7ebff;
  color: #4059c8;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 12px;
}

.pagination {
  display: flex;
  justify-content: space-between;
  padding: 15px;
}

.pages button {
  margin-left: 5px;
  padding: 8px 12px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
}

.pages .active {
  background: #0d5bd7;
  color: white;
}

.bottom {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-top: 40px;
}

.note {
  background: #eef4ff;
  border-left: 4px solid #0d5bd7;
  padding: 20px;
  margin-top: 15px;
}

.banner {
  height: 220px;
  border-radius: 12px;
  overflow: hidden;
  background: url("https://i.pinimg.com/1200x/5b/73/dd/5b73ddb96e81d2afd90ec43cc89182f8.jpg")
    center/cover;
}

.overlay {
  height: 100%;
  display: flex;
  align-items: end;
  padding: 20px;
  color: white;
  font-weight: bold;
  background: rgba(0, 0, 0, 0.3);
}

/* Toggle Switch */
.switch {
  position: relative;
  display: inline-block;
  width: 46px;
  height: 24px;
}

.switch input {
  display: none;
}

.slider {
  position: absolute;
  inset: 0;
  background: #ccc;
  border-radius: 30px;
  cursor: pointer;
}

.slider:before {
  content: "";
  position: absolute;
  height: 18px;
  width: 18px;
  left: 3px;
  top: 3px;
  background: white;
  border-radius: 50%;
  transition: 0.3s;
}

input:checked + .slider {
  background: #0d5bd7;
}

input:checked + .slider:before {
  transform: translateX(22px);
}
</style>