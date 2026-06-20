<template>
    <nav class="navbar">
      <div class="logo">BistroMarket</div>

      <ul class="menu">
        <li><a href="#" class="active">Menu</a></li>
        <li><a href="#">About Us</a></li>
        <li><a href="#">Contact</a></li>
      </ul>

      <div class="search-box">
        <input type="text" placeholder="Search Flavors..." />
      </div>
    </nav>
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

  /* Full Banner Image */
  background-image: url('https://i.pinimg.com/1200x/45/ea/2c/45ea2c14bcca0baa48a77f76d9f9641b.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  position: relative;
}
/* navbar */

.navbar {
  height: 80px;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
}

.logo {
  font-size: 28px;
  font-weight: bold;
  color: #d35400;
}

.menu {
  display: flex;
  list-style: none;
  gap: 30px;
}

.menu a {
  text-decoration: none;
  color: #555;
  font-weight: 500;
}

.menu a.active {
  color: #d35400;
  border-bottom: 2px solid #d35400;
  padding-bottom: 5px;
}

.search-box input {
  width: 220px;
  padding: 10px 15px;
  border-radius: 30px;
  border: 1px solid #ddd;
}

/* Hero Area */
/* Dark Overlay */
.overlay {
  width: 100%;
  height: 100%;

  background: rgba(0, 0, 0, 0.45);

  display: flex;
  align-items: center;
  padding-left: 80px;
}

.content {
  max-width: 600px;
  color: white;
}

.badge {
  background: #ff5a1f;
  padding: 10px 20px;
  border-radius: 30px;
  display: inline-block;
  margin-bottom: 25px;
}

h1 {
  font-size: 70px;
  line-height: 1.1;
  margin-bottom: 20px;
}

h1 span {
  color: #ffb199;
}

p {
  font-size: 18px;
  color: #eee;
  line-height: 1.8;
  margin-bottom: 35px;
}

.buttons {
  display: flex;
  gap: 20px;
}

.order-btn {
  background: #d35400;
  color: white;
  border: none;
  padding: 15px 35px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 16px;
}

.menu-btn {
  background: white;
  color: black;
  border: none;
  padding: 15px 35px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 16px;
}
</style>
