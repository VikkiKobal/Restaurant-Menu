<template>
  <footer class="footer">
    <div class="overlay">
      <h2 class="footer-text">
        We are always ready to surprise<br />
        you with new flavours
      </h2>

      <div class="contact-info">
        <div class="contact-item">
          <img src="@/assets/location.png" alt="Address" class="icon" />
          <span>Uzhhorod, 14 Universytetska Street</span>
        </div>
        <div class="contact-item">
          <img src="@/assets/call.png" alt="Phone" class="icon" />
          <span>+380 67 123 45 67</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped lang="scss">
$color-yellow: #FFD700;

.footer {
  position: relative;
  height: 350px;
  background: url(~@/assets/footer-photo.png) center center/cover no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 350px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 130px;
  padding-right: 20px;
  box-sizing: border-box;
  color: white;
}

.footer-text {
  align-self: center;
  font-family: 'DM Serif Display', serif;
  font-weight: 400;
  font-size: 45px;
  line-height: 1.2;
  text-align: center;
  white-space: pre-line;
  z-index: 2;
  color: white;
  max-width: 700px;
  margin-bottom: 40px;
  padding: 0 20px;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 25px; /* відстань між контактами */
  width: 100%;
  max-width: 350px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: 'DM Serif Display', serif;
  font-size: 18px;
  color: white;
}

.icon {
  width: 30px;
  height: 40px;
  filter: #FFC164;
}
</style>
