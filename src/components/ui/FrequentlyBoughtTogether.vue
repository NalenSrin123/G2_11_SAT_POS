<template>
  <div class="fbt-section">
    <h2 class="fbt-title">Frequently Bought Together</h2>

    <div class="fbt-wrapper">
      <button
        class="fbt-arrow fbt-arrow--left"
        :class="{ hidden: scrollX <= 5 }"
        @click="arrowScroll(-1)"
        aria-label="Scroll left"
      >&#8249;</button>

      <div class="fbt-outer" ref="outer">
        <div
          class="fbt-track"
          ref="track"
          :class="{ grabbing: isDragging }"
          @mousedown="onMouseDown"
          @touchstart.passive="onTouchStart"
        >
          <div v-for="(item, index) in items" :key="index" class="fbt-card" :style="{ width: cardWidth + 'px' }">
            <div class="fbt-card__image">
              <img :src="item.image" :alt="item.name" draggable="false" />
              <button
                class="fbt-card__add"
                :class="{ added: cart.has(index) }"
                @click.stop="toggleCart(index)"
                :aria-label="cart.has(index) ? 'Remove from cart' : 'Add to cart'"
              >
                <span v-if="!cart.has(index)">+</span>
                <span v-else>&#10003;</span>
              </button>
            </div>
            <div class="fbt-card__body">
              <p class="fbt-card__name">{{ item.name }}</p>
              <p class="fbt-card__price">${{ item.price.toFixed(2) }}</p>
            </div>
          </div>
        </div>
      </div>

      <button
        class="fbt-arrow fbt-arrow--right"
        :class="{ hidden: isAtEnd }"
        @click="arrowScroll(1)"
        aria-label="Scroll right"
      >&#8250;</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FrequentlyBoughtTogether',

  data() {
    return {
      isDragging: false,
      startX: 0,
      startScrollLeft: 0,
      scrollX: 0,
      velocityX: 0,
      lastX: 0,
      lastTime: 0,
      animFrame: null,
      outerWidth: 0,
      cart: new Set(),

      items: [
        { name: 'Local Craft Amber Ale',    price: 8.00,  image: 'https://www.redbaron.com/cdn/shop/files/Red_Baron_Classic_Crust_Pepperoni.jpg?v=1727205080' },
        { name: 'Crispy Panko Onion Rings', price: 9.50,  image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=400&q=80' },
        { name: 'Double Cocoa Milkshake',   price: 10.00, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=80' },
        { name: 'Hand-Pressed Lemonade',    price: 6.50,  image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&q=80' },
        { name: 'BBQ Pulled Pork Slider',   price: 12.00, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&q=80' },
        { name: 'Loaded Nachos',            price: 11.50, image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400&q=80' },
        { name: 'Caesar Salad',             price: 9.00,  image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&q=80' },
        { name: 'Garlic Parmesan Fries',    price: 7.50,  image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80' },
        { name: 'Spicy Chicken Wings',      price: 13.00, image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&q=80' },
        { name: 'Mozzarella Sticks',        price: 8.50,  image: 'https://images.unsplash.com/photo-1531749668029-2db88e4276c7?w=400&q=80' },
        { name: 'Craft Pale Ale',           price: 7.00,  image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&q=80' },
        { name: 'Fresh Berry Smoothie',     price: 7.50,  image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&q=80' },

      ],
    };
  },

  computed: {
    // cards visible per breakpoint
    perPage() {
      if (this.outerWidth >= 1024) return 6;
      if (this.outerWidth >= 600)  return 4;
      return 2;
    },
    // card width = fill outerWidth evenly with 12px gaps
    cardWidth() {
      if (!this.outerWidth) return 160;
      const gap = 12;
      return Math.floor((this.outerWidth - gap * (this.perPage - 1)) / this.perPage);
    },
    stepWidth() {
      return this.cardWidth + 12;
    },
    maxScroll() {
      return Math.max(0, (this.items.length - this.perPage) * this.stepWidth);
    },
    isAtEnd() {
      return this.scrollX >= this.maxScroll - 2;
    },
  },

  mounted() {
    this.measureOuter();
    this._ro = new ResizeObserver(this.measureOuter);
    this._ro.observe(this.$refs.outer);
  },

  beforeUnmount() {
    if (this._ro) this._ro.disconnect();
    if (this.animFrame) cancelAnimationFrame(this.animFrame);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup',   this.onMouseUp);
    window.removeEventListener('touchmove', this.onTouchMove);
    window.removeEventListener('touchend',  this.onTouchEnd);
  },

  methods: {
    measureOuter() {
      if (this.$refs.outer) {
        this.outerWidth = this.$refs.outer.offsetWidth;
        // clamp scrollX after resize
        this.scrollX = Math.min(this.scrollX, this.maxScroll);
        this.applyTransform(this.scrollX);
      }
    },

    getClientX(e) {
      return e.touches ? e.touches[0].clientX : e.clientX;
    },

    arrowScroll(dir) {
      const target = Math.max(0, Math.min(this.maxScroll, this.scrollX + dir * this.stepWidth * this.perPage));
      this.animateToX(target);
    },

    onMouseDown(e) {
      this.startDrag(e);
      window.addEventListener('mousemove', this.onMouseMove);
      window.addEventListener('mouseup',   this.onMouseUp);
    },
    onTouchStart(e) {
      this.startDrag(e);
      window.addEventListener('touchmove', this.onTouchMove, { passive: true });
      window.addEventListener('touchend',  this.onTouchEnd);
    },
    startDrag(e) {
      if (this.animFrame) cancelAnimationFrame(this.animFrame);
      this.isDragging      = true;
      this.startX          = this.getClientX(e);
      this.startScrollLeft = this.scrollX;
      this.velocityX       = 0;
      this.lastX           = this.startX;
      this.lastTime        = Date.now();
    },
    onMouseMove(e) { this.moveDrag(e); },
    onTouchMove(e) { this.moveDrag(e); },

    moveDrag(e) {
      if (!this.isDragging) return;
      const x   = this.getClientX(e);
      const now  = Date.now();
      this.velocityX = (x - this.lastX) / Math.max(1, now - this.lastTime);
      this.lastX     = x;
      this.lastTime  = now;
      this.scrollX   = Math.max(0, Math.min(this.maxScroll, this.startScrollLeft - (x - this.startX)));
      this.applyTransform(this.scrollX);
    },

    onMouseUp()  { this.endDrag(); window.removeEventListener('mousemove', this.onMouseMove); window.removeEventListener('mouseup', this.onMouseUp); },
    onTouchEnd() { this.endDrag(); window.removeEventListener('touchmove', this.onTouchMove); window.removeEventListener('touchend', this.onTouchEnd); },

    endDrag() {
      this.isDragging = false;
      const raw     = this.scrollX - this.velocityX * 120;
      const snapped = Math.round(Math.max(0, Math.min(this.maxScroll, raw)) / this.stepWidth) * this.stepWidth;
      this.animateToX(snapped);
    },
    animateToX(target) {
      const from = this.scrollX, duration = 380, start = performance.now();
      const ease = t => 1 - Math.pow(1 - t, 3);
      const step = now => {
        const t = Math.min(1, (now - start) / duration);
        this.scrollX = from + (target - from) * ease(t);
        this.applyTransform(this.scrollX);
        if (t < 1) this.animFrame = requestAnimationFrame(step);
        else this.scrollX = target;
      };
      this.animFrame = requestAnimationFrame(step);
    },

    applyTransform(x) {
      if (this.$refs.track) this.$refs.track.style.transform = `translateX(${-x}px)`;
    },

    toggleCart(index) {
      const s = new Set(this.cart);
      s.has(index) ? s.delete(index) : s.add(index);
      this.cart = s;
    },
  },
};
</script>

<style scoped>
* { box-sizing: border-box; }

.fbt-section {
  padding: 32px 0 24px;
  background: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.fbt-title {
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 18px;
}

.fbt-wrapper {
  display: flex;
  align-items: center;
  gap: 0;
  background: #ffffff;
}

/* Arrow */
.fbt-arrow {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1.5px solid #e0e0e0;
  background: #ffffff;
  color: #333;
  font-size: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(0,0,0,0.10);
  transition: background 0.15s, opacity 0.2s;
  padding: 0;
  line-height: 1;
}
.fbt-arrow:hover { background: #f5f5f5; }
.fbt-arrow--left  { margin-right: 10px; }
.fbt-arrow--right { margin-left: 10px; }
.fbt-arrow.hidden { opacity: 0; pointer-events: none; }

/* Outer / track */
.fbt-outer {
  flex: 1;
  overflow: hidden;
  background: #ffffff;
}

.fbt-track {
  display: flex;
  gap: 12px;
  cursor: grab;
  user-select: none;
  will-change: transform;
  background: #ffffff;
}
.fbt-track.grabbing { cursor: grabbing; }

/* Card — width set inline via JS-computed cardWidth */
.fbt-card {
  flex-shrink: 0;
  background: #ffffff;
  border: 1px solid #ebebeb;
  border-radius: 14px;
  overflow: hidden;
  pointer-events: none;
  transition: box-shadow 0.2s, transform 0.2s;
}
.fbt-card:hover {
  box-shadow: 0 4px 16px rgba(0,0,0,0.09);
  transform: translateY(-2px);
}

.fbt-card__image {
  position: relative;
  width: 100%;
  padding-top: 72%;   /* ~4:3 ratio, scales with card width */
  background: #f5f5f5;
  overflow: hidden;
}
.fbt-card__image img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  pointer-events: none;
}

.fbt-card__add {
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  background: #ffffff;
  color: #444;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  pointer-events: all;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  transition: background 0.15s, color 0.15s, transform 0.15s;
  line-height: 1;
}
.fbt-card__add:hover      { background: #fff3ee; transform: scale(1.1); }
.fbt-card__add.added      { background: #e05a00; color: #ffffff; }
.fbt-card__add.added:hover{ background: #c44e00; }

.fbt-card__body {
  padding: 10px 12px 13px;
  background: #ffffff;
}
.fbt-card__name {
  font-size: 13px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 4px;
  line-height: 1.35;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.fbt-card__price {
  font-size: 14px;
  color: #e05a00;
  font-weight: 700;
  margin: 0;
}
</style>