<template>
  <div class="explore-wrapper">
    <div class="explore-header">
      <div class="header-left">
        <h2 class="explore-title">Explore Categories</h2>
        <p class="explore-subtitle">Find exactly what you're craving today.</p>
      </div>
      <a href="#" class="view-all-link">
        View All Categories <span class="arrow">›</span>
      </a>
    </div>

    <div class="categories-grid">
      <!-- Large featured card -->
      <div class="card card--large" @mouseenter="hovered = 'pizza'" @mouseleave="hovered = null">
        <img
          src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80"
          alt="Artisanal Pizza"
          class="card__img"
        />
        <div class="card__overlay"></div>
        <div class="card__content">
          <h3 class="card__title">Artisanal Pizza</h3>
          <p class="card__meta">12 Local Kitchens</p>
        </div>
      </div>

      <!-- Right column -->
      <div class="cards-right">
        <!-- Top row: two small cards -->
        <div class="cards-row">
          <div class="card card--small" @mouseenter="hovered = 'asian'" @mouseleave="hovered = null">
            <img
              src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80"
              alt="Asian Fusion"
              class="card__img"
            />
            <div class="card__overlay"></div>
            <div class="card__content card__content--bottom">
              <h3 class="card__title card__title--sm">Asian Fusion</h3>
            </div>
          </div>

          <div class="card card--small" @mouseenter="hovered = 'sweet'" @mouseleave="hovered = null">
            <img
              src="https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80"
              alt="Sweet Treats"
              class="card__img"
            />
            <div class="card__overlay"></div>
            <div class="card__content card__content--bottom">
              <h3 class="card__title card__title--sm">Sweet Treats</h3>
            </div>
          </div>
        </div>

        <!-- Wide bottom card -->
        <div class="card card--wide" @mouseenter="hovered = 'drinks'" @mouseleave="hovered = null">
          <img
            src="https://images.unsplash.com/photo-1470338745628-171cf53de3a8?w=900&q=80"
            alt="Craft Drinks"
            class="card__img"
          />
          <div class="card__overlay"></div>
          <div class="card__content">
            <h3 class="card__title">Craft Drinks</h3>
            <p class="card__meta">Signature Cocktails &amp; Juices</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExploreCategory',
  data() {
    return {
      hovered: null
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.explore-wrapper {
  background-color: #faf8f5;
  padding: 48px 40px;
  font-family: 'Inter', sans-serif;
  max-width: 100%;
  margin: 0 auto;
}

/* Header */
.explore-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 28px;
}

.explore-title {
  font-size: 26px;
  font-weight: 700;
  color: #1a1a1a;
  letter-spacing: -0.3px;
  line-height: 1.2;
}

.explore-subtitle {
  font-size: 13.5px;
  color: #888;
  margin-top: 4px;
  font-weight: 400;
}

.view-all-link {
  font-size: 13.5px;
  font-weight: 600;
  color: #c0392b;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 3px;
  white-space: nowrap;
  transition: opacity 0.2s;
}

.view-all-link:hover {
  opacity: 0.75;
}

.arrow {
  font-size: 16px;
  line-height: 1;
}

/* Grid layout */
.categories-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  height: 520px;
}

.cards-right {
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 520px;
}

.cards-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  height: 250px;
}

/* Card base */
.card {
  position: relative;
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
}

.card--large {
  height: 520px;
}

.card--small {
  height: 250px;
}

.card--wide {
  height: 258px;
}

.card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}

.card:hover .card__img {
  transform: scale(1.05);
}

/* Gradient overlay */
.card__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 30%,
    rgba(0, 0, 0, 0.65) 100%
  );
}

/* Card content */
.card__content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px 18px 18px;
}

.card__content--bottom {
  padding: 12px 14px 13px;
}

.card__title {
  font-size: 17px;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.2px;
  line-height: 1.2;
  text-shadow: 0 1px 3px rgba(0,0,0,0.3);
}

.card__title--sm {
  font-size: 14px;
  font-weight: 600;
}

.card__meta {
  font-size: 12.5px;
  color: rgba(255, 255, 255, 0.82);
  margin-top: 3px;
  font-weight: 400;
}

/* Responsive */
@media (max-width: 600px) {
  .explore-wrapper {
    padding: 28px 16px;
  }

  .categories-grid {
    grid-template-columns: 1fr;
    height: auto;
  }

  .card--large {
    height: 240px;
  }

  .cards-row {
    height: 160px;
    grid-template-columns: 1fr 1fr;
  }

  .card--small {
    height: 160px;
  }

  .card--wide {
    height: 160px;
  }
}
</style>