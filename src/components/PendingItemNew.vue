<template>
  <div class="item">
    <div class="content">+</div>
  </div>
</template>

<script setup>
</script>

<style scoped>
/* #43ED3F; */

.item {
  width: calc(100% / 4 - 24px);
  margin: 0.75rem;
  text-align: center;
  background-color: #43ed3f;
  border-radius: 7px;
  text-align: center;
}

.content {
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  font-size: 8rem;
  cursor: pointer;
  color: #dfdfdf;
}

.content:hover {
  transition: transform 0.5s ease;
  transform: scale(1.5);
}

@media screen and (max-width: 991.98px) {
  .item {
    width: calc((100% / 3) - 30px);
  }
}
@media screen and (max-width: 767.98px) {
  .item {
    width: calc((100% / 2) - 24px);
  }
}
@media screen and (max-width: 575.98px) {
  .item {
    width: 100%;
  }
}
</style>