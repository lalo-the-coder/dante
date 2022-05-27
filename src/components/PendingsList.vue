<template>
  <div class="list">
    <PendingItem
      :pending="item"
      v-for="(item, index) in pendings"
      :key="index"
      draggable="true"
      @dragover="dragOver(evt)"
      @dragend="dragEnd(evt)"
    />
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useMainStore } from "../store.js";
import PendingItem from "./PendingItem.vue";

const main = useMainStore();

const pendings = computed(() => main.getAllPendings);
const isEmpty = computed(() => main.pendingsEmpty);

let selected = ref();

// function startDrag(evt, item) {
//   evt.dataTransfer.dropEffect = "move";
//   evt.dataTransfer.effectAllowed = "move";
//   evt.dataTransfer.setData("itemID", item.id);
// }

// function onDrop(evt, list) {
//   console.log(evt);
//   const itemID = evt.dataTransfer.getData("itemID");
//   const item = this.pendings.find((item) => item.id == itemID);
// }

function dragOver(e) {
  if (isBefore(selected, e.target)) {
    e.target.parentNode.insertBefore(selected, e.target);
  } else {
    e.target.parentNode.insertBefore(selected, e.target.nextSibling);
  }
}

function dragEnd() {
  selected = null;
}

function dragStart(e) {
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/plain", null);
  selected = e.target;
}

function isBefore(el1, el2) {
  let cur;
  if (el2.parentNode === el1.parentNode) {
    for (cur = el1.previousSibling; cur; cur = cur.previousSibling) {
      if (cur === el2) return true;
    }
  }
  return false;
}
</script>

<style>
.list {
  padding: 15px;
  display: flex;
  flex-flow: row wrap;
}
</style>