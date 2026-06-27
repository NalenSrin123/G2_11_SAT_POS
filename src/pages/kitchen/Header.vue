<template>
    <nav class="navbar">
        <div class="logo">BistroMarket</div>
    <!-- Desktop nav links -->
    <div class="nav-links">
      <a href="#" class="active">Menu</a>
      <a href="#">About Us</a>
      <a href="#">Contact</a>
    </div>

    <div class="nav-right">
      <!-- Search bar -->
      <div class="search-bar">
        <Search :size="14" stroke="#888" />
        <input
          :value="search"
          @input="$emit('search', $event.target.value)"
          placeholder="Search menu..."
        />
      </div>

      <!-- Cart -->
      <div class="cart-btn">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#444" stroke-width="2">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
        <span class="cart-badge">{{ cartCount }}</span>
      </div>

      <!-- Hamburger (mobile only) -->
      <button class="hamburger" @click="menuOpen = !menuOpen" aria-label="Toggle menu">
        <span :class="{ open: menuOpen }"></span>
        <span :class="{ open: menuOpen }"></span>
        <span :class="{ open: menuOpen }"></span>
      </button>
    </div>

    <!-- Mobile dropdown menu -->
    <div class="mobile-menu" :class="{ open: menuOpen }">
      <div class="mobile-search">
        <Search :size="14" stroke="#888" />
        <input
          :value="search"
          @input="$emit('search', $event.target.value)"
          placeholder="Search menu..."
        />
      </div>
      <a href="#" class="active" @click="menuOpen = false">Menu</a>
      <a href="#" @click="menuOpen = false">About Us</a>
      <a href="#" @click="menuOpen = false">Contact</a>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { Search } from 'lucide-vue-next'

defineProps({
  cartCount: { type: Number, default: 0 },
  search:    { type: String, default: '' }
})
defineEmits(['search'])

const menuOpen = ref(false)
</script>

<style scoped>
.navbar {
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
  padding: 0 40px;
  display: flex;
  align-items: center;
  height: 60px;
  position: sticky;
  top: 0;
  z-index: 100;
  flex-wrap: wrap;           /* allows mobile-menu to drop below */
}

/* ── Logo ── */
.logo {
  font-size: 20px;
  font-weight: 800;
  color: #c0392b;
  margin-right: 40px;
  letter-spacing: -0.5px;
  flex-shrink: 0;
}

/* ── Desktop nav links ── */
.nav-links {
  display: flex;
  gap: 24px;
  flex: 1;
}

.nav-links a {
  text-decoration: none;
  color: #444;
  font-size: 14px;
  padding-bottom: 2px;
  border-bottom: 2px solid transparent;
  transition: color 0.2s;
}

.nav-links a.active,
.nav-links a:hover {
  color: #c0392b;
  border-bottom-color: #c0392b;
}

/* ── Right cluster ── */
.nav-right {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: auto;
}

/* ── Search bar (desktop) ── */
.search-bar {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 6px 14px;
  gap: 8px;
  background: #fafafa;
}

.search-bar input {
  border: none;
  outline: none;
  background: transparent;
  font-size: 13px;
  width: 140px;
  color: #555;
}

/* ── Cart ── */
.cart-btn {
  position: relative;
  cursor: pointer;
  flex-shrink: 0;
}

.cart-badge {
  position: absolute;
  top: -6px;
  right: -8px;
  background: #c0392b;
  color: #fff;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}
/* ── Hamburger button ── */
.hamburger {
  display: none;          /* hidden on desktop */
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  flex-shrink: 0;
}
.hamburger span {
  display: block;
  height: 2px;
  width: 100%;
  background: #444;
  border-radius: 2px;
  transition: transform 0.25s, opacity 0.25s;
  transform-origin: center;
}
/* Animate to X when open */
.hamburger span:nth-child(1).open { transform: translateY(7px) rotate(45deg); }
.hamburger span:nth-child(2).open { opacity: 0; }
.hamburger span:nth-child(3).open { transform: translateY(-7px) rotate(-45deg); }

/* ── Mobile dropdown menu ── */
.mobile-menu {
  display: none;
  width: 100%;
  flex-direction: column;
  background: #fff;
  border-top: 1px solid #f0f0f0;
  padding: 12px 0;
  gap: 4px;
}
.mobile-menu.open {
  display: flex;
}
.mobile-menu a {
  text-decoration: none;
  color: #444;
  font-size: 15px;
  padding: 10px 16px;
  border-radius: 8px;
  transition: background 0.15s, color 0.15s;
}
.mobile-menu a.active,
.mobile-menu a:hover {
  color: #c0392b;
  background: #fff5f5;
}

/* ── Mobile search (inside dropdown) ── */
.mobile-search {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 8px 14px;
  gap: 8px;
  background: #fafafa;
  margin: 4px 16px 8px;
}
.mobile-search input {
  border: none;
  outline: none;
  background: transparent;
  font-size: 13px;
  flex: 1;
  color: #555;
}

/* ════════════════════════════
   BREAKPOINTS
════════════════════════════ */

/* Tablet: hide desktop search, show hamburger */
@media (max-width: 768px) {
  .navbar { padding: 0 16px; }
  .nav-links  { display: none; }   /* move links into mobile menu */
  .search-bar { display: none; }   /* move search into mobile menu */
  .hamburger  { display: flex; }
}

/* Small mobile: tighten spacing */
@media (max-width: 480px) {
  .logo { font-size: 17px; margin-right: 0; }
  .cart-badge { width: 14px; height: 14px; font-size: 9px; }
}
</style>