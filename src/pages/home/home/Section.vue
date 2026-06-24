<template>
   
  <section class="hero">
    <div class="overlay">
      <div class="content">
        <span class="badge">New Seasonal Special</span>

        <h1>
          Taste the <span>Extraordinary</span>
        </h1>

        <p>
          Experience a curated selection of gourmet flavors
          delivered fresh to your doorstep.
        </p>

        <div class="buttons">
          <button class="order-btn">
            Order Now →
          </button>

          <button class="menu-btn">
            Explore Menu
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  height: 100vh;
  width: 100%;
  background-image: url('https://i.pinimg.com/1200x/45/ea/2c/45ea2c14bcca0baa48a77f76d9f9641b.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
}

/* Overlay */
.overlay {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.45);

  display: flex;
  align-items: center;

  padding: 40px 20px; /* mobile default */
}

/* Content */
.content {
  max-width: 600px;
  color: white;
}

/* Badge */
.badge {
  background: #ff5a1f;
  padding: 8px 16px;
  border-radius: 30px;
  display: inline-block;
  margin-bottom: 20px;
  font-size: 14px;
}

/* Heading (responsive) */
h1 {
  font-size: clamp(32px, 6vw, 70px);
  line-height: 1.1;
  margin-bottom: 20px;
}

h1 span {
  color: #ffb199;
}

/* Paragraph */
p {
  font-size: clamp(14px, 2.2vw, 18px);
  color: #eee;
  line-height: 1.6;
  margin-bottom: 25px;
}

/* Buttons */
.buttons {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

/* Buttons base */
.order-btn,
.menu-btn {
  padding: 12px 28px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 15px;
  transition: 0.3s;
}

/* Primary */
.order-btn {
  background: #d35400;
  color: white;
  border: none;
}

.order-btn:hover {
  background: #b84300;
}

/* Secondary */
.menu-btn {
  background: white;
  color: black;
  border: none;
}

.menu-btn:hover {
  background: #f2f2f2;
}

/* ===== RESPONSIVE BREAKPOINTS ===== */

/* Tablet */
@media (min-width: 768px) {
  .overlay {
    padding: 60px 50px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .overlay {
    padding-left: 80px;
  }
}
</style>