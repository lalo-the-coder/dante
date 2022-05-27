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
    <PendingItemAdd
      v-if="state.showModal"
      :modalErrorText="state.modalErrorText"
      @cancel="closeModal"
      @saveData="validateModal"
    />
    <div class="counter">
      <section class="counter__active">Active: {{ activePendings }}</section>
      <section class="counter__done">Done: {{ donePendings }}</section>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, watch } from "vue";
import draggable from "vuedraggable";

import PendingItem from "./PendingItem.vue";
import PendingItemNew from "./PendingItemNew.vue";
import PendingItemAdd from "./PendingItemAdd.vue";

const state = reactive({
  pendings: [],
  showModal: false,
  modalErrorText: null,
});

state.pendings.sort((a, b) => b.due_date - a.due_date);

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
  let idx = state.pendings.findIndex((p) => p.id == id);

  state.pendings[idx].status =
    action == "del"
      ? "Deleted"
      : action == "don"
      ? "Done"
      : state.pendings[idx].status;
}

function closeModal(payload) {
  if (payload == "close") {
    state.showModal = false;
  }
}

function validateModal(payload) {
  const exists = state.pendings.find(
    (p) =>
      p.status == "Active" &&
      p.text.trim().toLowerCase() == payload.text.trim().toLowerCase()
  );

  if (exists) {
    state.modalErrorText = "That pendings it's already in list...";
    return;
  }

  payload.id = state.pendings.length;
  state.pendings.push(payload);
  state.showModal = false;
  state.modalErrorText = null;

  state.pendings.sort((a, b) => b.due_date - a.due_date);
}
</script>

<style scoped>
.list {
  padding: 15px;
  display: flex;
  flex-flow: row wrap;
  /* flex-grow: 0; */
  /* overflow-y: scroll; */
  min-height: 580px;
  border: 1px solid #c0c0c0;
}

.counter {
  display: flex;
  margin: 1.5rem;
  color: #c0c0c0;
  font-size: 1.25rem;
  font-weight: bolder;
}

.counter__active {
  display: flex;
  margin-right: 2rem;
}
.counter__done {
  display: flex;
}
</style>