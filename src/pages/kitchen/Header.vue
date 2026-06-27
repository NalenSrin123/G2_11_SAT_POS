<template>
    <nav class="navbar">
        <div class="logo">BistroMarket</div>

        <div class="nav-links">
            <a href="#">Menu</a>
            <a href="#">About Us</a>
            <a href="#">Contact</a>
        </div>

        <div class="nav-right">
            <div class="search-bar">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <Search :size="22" />
                    <path d="m21 21-4.35-4.35" />
                </svg>
                <input :value="search" @input="$emit('search', $event.target.value)" placeholder="Search menu..." />
            </div>

            <router-link to="/ShoppingCartPage" class="cart-btn">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#444" stroke-width="2">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <span class="cart-badge">{{ cartCount }}</span>
        </router-link>
        </div>
    </nav>
</template>

<script setup>

import { Search } from 'lucide-vue-next'
defineProps({
    cartCount: { type: Number, default: 0 },
    search: { type: String, default: '' }
})
defineEmits(['search'])
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
}

.logo {
    font-size: 20px;
    font-weight: 800;
    color: #c0392b;
    margin-right: 40px;
    letter-spacing: -0.5px;
}

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

.nav-right {
    display: flex;
    align-items: center;
    gap: 16px;
}

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

.cart-btn {
    position: relative;
    cursor: pointer;
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

@media (max-width: 900px) {
    .navbar {
        padding: 0 16px;
    }
}
.cart-btn.router-link-active svg {
    stroke: #c0392b;
}
.cart-btn.router-link-active .cart-badge {
    background: #e74c3c; 
    transform: scale(1.1); 
}
/* ប្រើ class .router-link-active ដែល vue-router បង្កើតឱ្យស្វ័យប្រវត្តិ */
.cart-btn.router-link-active svg {
    stroke: #c0392b; /* ប្តូរពណ៌ Icon ទៅជាក្រហម */
}

.cart-btn.router-link-active .cart-badge {
    background: #c0392b; /* ធានាថាពណ៌ badge នៅតែក្រហមដដែល ឬដិតជាងមុន */
}

/* បន្ថែម transition ដើម្បីឱ្យវាក្រឡេកមើលទៅរលូនពេលប្តូរពណ៌ */
.cart-btn svg {
    transition: stroke 0.3s ease;
}
.navbar {
    background: #fff;
    border-bottom: 1px solid #e8e8e8;
    width: 100%; /* បន្ថែមនេះដើម្បីឱ្យវាលាតពេញ */
    padding: 0 40px;
    display: flex;
    align-items: center;
    height: 60px;
    position: sticky;
    top: 0;
    z-index: 100;
    box-sizing: border-box; /* សំខាន់៖ ដើម្បីកុំឱ្យ padding ធ្វើឱ្យវាលើសអេក្រង់ */
}
</style>
