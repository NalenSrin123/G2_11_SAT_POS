<template>
  <footer class="site-footer">
    <div class="footer-top">
      <div class="brand-col">
        <div class=" footer-logo">BistroMarket</div>
        <p class="footer-desc">Crafting premium culinary experiences since 2024. Elevate your everyday dining.</p>
      </div>

      <div class="footer-col">
        <h4>Quick Links</h4>
        <a href="#">Menu</a>
        <a href="#">FAQ</a>
        <a href="#">Careers</a>
      </div>

      <div class="footer-col">
        <h4>Support</h4>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Contact Us</a>
      </div>

      <div class="footer-col">
        <h4>Newsletter</h4>
        <p class="newsletter-desc">Get delicious updates in your inbox.</p>
        <div class="newsletter-form">
          <input v-model="email" type="email" placeholder="Email address" />
          <button class="join-btn" @click="handleJoin">Join</button>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <span>© 2024 BistroMarket. Premium Food &amp; Drink Marketplace.</span>
      <div class="footer-icons">
        <Instagram :size="18" />
        <Home :size="18" />
        <Globe :size="18" />
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'
import { Instagram, Home, Globe } from 'lucide-vue-next'

const email = ref('')

function handleJoin() {
  if (email.value) {
    alert(`Thanks for subscribing with ${email.value}!`)
    email.value = ''
  }
}
</script>

<style scoped>
.site-footer {
  background: #1a1a1a;
  color: #ccc;
  margin-top: 40px;
}

.footer-top {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 2fr;
  gap: 32px;
  padding: 48px 80px;
}

.footer-logo {
  font-size: 20px;
  font-weight: 800;
  color: red;
  margin-bottom: 10px;
}
.footer-desc {
  font-size: 13px;
  color: #999;
  line-height: 1.7;
}

.footer-col h4 {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #fff;
  margin-bottom: 14px;
}
.footer-col a {
  display: block;
  text-decoration: none;
  color: #999;
  font-size: 13px;
  margin-bottom: 8px;
  transition: color 0.15s;
}
.footer-col a:hover { color: #fff; }

.newsletter-desc {
  font-size: 13px;
  color: #999;
  margin-bottom: 12px;
}
.newsletter-form {
  display: flex;
}
.newsletter-form input {
  flex: 1;
  padding: 9px 14px;
  border: 1px solid #444;
  border-right: none;
  border-radius: 6px 0 0 6px;
  background: #2a2a2a;
  color: #ccc;
  font-size: 13px;
  outline: none;
}
.newsletter-form input::placeholder { color: #666; }
.join-btn {
  padding: 9px 18px;
  background: #c0392b;
  color: #fff;
  border: none;
  border-radius: 0 6px 6px 0;
  cursor: pointer;
  font-weight: 700;
  font-size: 13px;
  transition: background 0.18s;
}
.join-btn:hover { background: #a93226; }

.footer-bottom {
  border-top: 1px solid #2a2a2a;
  padding: 16px 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #666;
}
.footer-icons {
  display: flex;
  gap: 14px;
  font-size: 18px;
  color: #888;
}
.footer-icon { cursor: pointer; transition: color 0.15s; }
.footer-icon:hover { color: #fff; }

@media (max-width: 900px) {
  .footer-top { grid-template-columns: 1fr 1fr; padding: 32px 24px; }
  .footer-bottom { padding: 16px 24px; }
}
@media (max-width: 600px) {
  .footer-top { grid-template-columns: 1fr; }
}
</style>
