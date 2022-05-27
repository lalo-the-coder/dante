<template>
  <div class="item">
    <article class="content">
      <header class="text">{{ pending.text }}</header>
      <div class="item__dual">
        <section class="info_item priority">
          Priority: {{ pending.priority }}
        </section>
        <section class="info_item status">Status: {{ pending.status }}</section>
      </div>
      <section class="due_date">
        <strong>Due date</strong> {{ pending.due_date }}
      </section>
    </article>
    <!-- {{ pending }} -->
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps(["pending"]);
// console.log(props.pending);
</script>

<style>
/* #43ED3F; */

.item {
  width: calc(100% / 4 - 24px);
  /* width: calc((100% / 4) - 24px); */
  margin: 0.75rem;
  text-align: center;
  /* border: 1px solid #232323; */
  background-color: #f0f0f0;
  border-radius: 7px;
  /* transition: all 0.2s ease-in-out; */
}

.content {
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
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

.text {
  padding: 2.75rem 0.95rem;
  background-color: #43ed3f;
  border-radius: 7px 7px 0 0;
  display: flex;
  flex-direction: column;
  height: 50%;
  /* flex: 1; */
  display: flex;
  justify-content: center;
  align-items: center;
  /* font-size: 1.3rem; */
  /* flex: 0 1 auto; */
}

.item__dual {
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 30%;
}

.info_item {
  padding: 0.55rem;
  color: #282a36;
  font-size: 0.9rem;
}

.priority {
}

.status {
}

.due_date {
  padding: 0.5rem;
  /* margin-bottom: auto; */
  font-size: 0.85rem;
  background: #0034b1;
  color: #f0f0f0;
  border-radius: 0 0 7px 7px;
}
</style>