<template>
  <div class="item" :class="{ item__due: dueNear() }">
    <article class="content">
      <div class="item__dual">
        <section class="info_item priority">
          Priority: {{ pending.priority }}
        </section>
        <section class="info_item status">Status: {{ pending.status }}</section>
      </div>
      <section class="text">{{ pending.text }}</section>
      <section class="due_date">
        <strong>Due date</strong> {{ pending.due_date }}
      </section>
      <div class="item__dual">
        <div class="btn btn__delete" @click.prevent="deletePending">Delete</div>
        <div class="btn btn__done" @click.prevent="donePending">Done</div>
      </div>
    </article>
    <!-- {{ pending }} -->
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import { format, parseISO, isTomorrow } from "date-fns";
const props = defineProps(["pending"]);
const emit = defineEmits(["deletePending", "donePending"]);

function deletePending(id) {
  emit("deletePending");
}

function donePending() {
  emit("donePending");
}

function dueNear() {
  var result = isTomorrow(
    format(parseISO(props.pending.due_date), "yyyy-MM-dd")
  );
  return result;
}
</script>

<style>
/* #43ED3F; */
/* #FFD6D6 */
/* #FFFFFF */

.item {
  width: calc(100% / 4 - 24px);
  margin: 0.75rem;
  text-align: center;
  background-color: #ffffff;
  border-radius: 7px;
  max-height: 250px;
}

.item__due {
  background-color: #ffd6d6;
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
  /* background-color: #43ed3f; */
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
  /* border-radius: 0 0 7px 7px; */
}

.delete {
  padding: 2px;
  display: flex;
  background: #b0092d;
  text-align: center;
  color: aliceblue;
}

.done {
  background: #43ed3f;
  text-align: center;
  pad: 0.5rem;
  padding: 2px;
}

.btn {
  width: 100%;
  margin-top: 0px;
  padding: 5px;
  border: none;
  border-radius: 0 4px 0 4px;
  color: #fff;
  font-size: 0.95rem;
  letter-spacing: 2px;
  text-align: center;
  outline: none;
  cursor: pointer;
}

.btn__delete {
  background-color: #b0092d;
  margin-right: 5px;
}
.btn__done {
  background-color: #43ed3f;
  margin-left: 5px;
}
</style>