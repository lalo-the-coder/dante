<template>
  <div>
    <draggable
      class="list"
      :list="state.pendings"
      group="people"
      @start="drag = true"
      @end="drag = false"
      item-key="id"
    >
      <template #item="{ element }">
        <PendingItem
          :pending="element"
          v-if="element.status != 'Done' && element.status != 'Deleted'"
          @deletePending="updatePending(element.id, 'del')"
          @donePending="updatePending(element.id, 'don')"
        />
      </template>
      <template #header>
        <PendingItemNew @click.prevent="addPending('click')" />
      </template>
    </draggable>
    <PendingItemAdd :show="state.showModal" />
    <div>Active: {{ activePendings }} Done: {{ donePendings }}</div>
  </div>
</template>

<script setup>
import { computed, reactive } from "vue";
// import { useMainStore } from "../store.js";
import { dummy } from "../dummy";
import draggable from "vuedraggable";

import PendingItem from "./PendingItem.vue";
import PendingItemNew from "./PendingItemNew.vue";
import PendingItemAdd from "./PendingItemAdd.vue";

const state = reactive({ pendings: dummy, showModal: false });

// state.pendings = state.pendings.filter((p) => p.status != "Done");

const activePendings = computed(() => {
  return state.pendings.filter((p) => p.status === "Active").length;
});

const donePendings = computed(() => {
  return state.pendings.filter((p) => p.status === "Done").length;
});

function addPending() {
  state.showModal = true;
}

function updatePending(id, action) {
  console.log(action);
  let idx = state.pendings.findIndex((p) => p.id == id);
  console.log(`ID: ${idx}`);
  state.pendings[idx].status =
    action == "del"
      ? "Deleted"
      : action == "don"
      ? "Done"
      : state.pendings[idx].status;
}

function showCard(element) {
  console.log(element.status);
  return;
}
</script>

<style>
.list {
  padding: 15px;
  display: flex;
  flex-flow: row wrap;
  /* overflow-y: scroll;
  max-height: 580px; */
}
</style>