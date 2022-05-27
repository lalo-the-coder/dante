<template>
  <div class="flex align-center align-vert modal modal--align modal--show">
    <div class="modal__container">
      <h1 class="title no-margin">Add pending</h1>
      <div id="container">
        <div class="form-box">
          <fieldset v-if="props.modalErrorText != null">
            <em class="modal-text-error">
              {{ props.modalErrorText }}
            </em>
          </fieldset>
          <form class="p-form" name="p-form" v-on:submit.prevent>
            <!-- <fieldset>
              <label class="p-form-label" for="priority"
                >Priority<span class="p-form-required"> *</span></label
              >
              <input
                id="priority"
                class="p-form-input"
                type="text"
                placeholder="Type the priority"
                required
                v-model.trim="state.pending.priority"
              />
            </fieldset> -->

            <fieldset>
              <label class="p-form-label" for="Priority">Priority</label>
              <select
                name="priority"
                class="p-form-input"
                id="priority"
                required
                v-model="state.pending.priority"
              >
                <option value="High">High</option>
                <option value="Normal">Normal</option>
                <option value="Low">Low</option>
              </select>
            </fieldset>

            <fieldset>
              <label class="p-form-label" for="pending"
                >Pending:<span class="p-form-required"> *</span></label
              >
              <input
                id="pending"
                class="p-form-input"
                type="text"
                placeholder="What's need to be done?"
                required
                v-model.trim="state.pending.text"
                :class="{ 'p-form-required__error': state.formError }"
              />
            </fieldset>
            <fieldset>
              <label class="p-form-label" for="due_date">Due date:</label>
              <input
                id="due_date"
                class="p-form-input"
                type="datetime-local"
                placeholder="Due date?"
                required
                v-model="state.pending.due_date"
              />
            </fieldset>

            <fieldset>
              <label class="p-form-label" for="status">Status</label>
              <select
                name="status"
                id="status"
                class="p-form-input"
                required
                v-model="state.pending.status"
              >
                <option value="Active">Active</option>
                <option value="Done">Done</option>
                <option value="Deleted">Deleted</option>
              </select>
            </fieldset>
            <div class="two-columns">
              <button
                class="p-form-btn p-form-btn__cancel"
                type="cancel"
                @click.prevent="cancel"
              >
                Cancel
              </button>
              <button
                class="p-form-btn p-form-btn__save"
                type="submit"
                @click.prevent="saveData"
              >
                Save Data
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, reactive } from "vue";
import { format, parseISO } from "date-fns";

const props = defineProps(["show", "modalErrorText"]);

const state = reactive({
  pending: {
    id: null,
    priority: "Normal",
    text: null,
    status: "Active",
    due_date: null,
  },
  formError: false,
});

const emit = defineEmits(["cancel", "saveData"]);

state.pending.due_date = today();

function today() {
  return format(new Date(), "yyyy-MM-dd'T'HH:mm:ss");
}

function cancel() {
  emit("cancel", "close");
}

function saveData() {
  if (state.pending.text === null || state.pending.text === "") {
    state.formError = true;
    return;
  }
  state.formError = false;
  state.pending.due_date = format(
    parseISO(state.pending.due_date),
    "yyyy-MM-dd HH:mm:ss"
  );
  emit("saveData", state.pending);
}
</script>

<style scoped>
.flex {
  display: flex;
}
.align-center {
  justify-content: center;
}
.align-vert,
.align-vert.align-center {
  align-items: center;
}
.modal {
  display: none;
}
.modal--show,
.modal--hide {
  display: flex;
} /* classes fired by js for animation control */
/* This is on the wrapper for the whole modal */
.modal--align {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 999;
}
.modal__container {
  position: relative;
  width: 100%;
  max-width: 600px;
  max-height: 750px;
  padding: 20px;
  margin: 12px;
  background: #fff;
}
/* The .modal__close class is used in js but is modified '--x' here */
.modal__close--x {
  font-size: 30px; /* this is only because we use unicode for the X in this case */
  position: absolute;
  top: 3px;
  right: 10px;
}
/* As there is no href to avoid the hash being added to the URL when clicked we add a pointer */
/* This 'x' is hidden from screen readers as there is an accessible close button in the modal */
.modal__close--x:hover {
  cursor: pointer;
}
/* Animations */
/* Open */
.modal.modal--show {
  animation: modal-open 0.3s;
}
@keyframes modal-open {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
/* Close */
.modal.modal--hide {
  animation: modal-close 0.3s;
}
@keyframes modal-close {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.no-margin {
  margin-bottom: 0;
}

/* Form */
#container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 350px;
  padding: 20px;
}
.form-box {
  width: 100%;
  max-width: 400px;
  padding: 30px 15px;
  border-radius: 4px;
  background-color: #fff;
}
.p-form {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.p-form-label {
  display: inline-block;
  margin: 0.5rem 0;
  color: #3d3935;
  letter-spacing: 0.2px;
  font-size: 1rem;
}
.p-form-input {
  width: 100%;
  padding: 15px 10px;
  border: 1px solid #3d3935;
  border-radius: 4px;
  background-color: #fff;
  color: #3d3935;
  outline: 0;
}
.p-form-input::placeholder {
  color: #867d6c;
  font-size: 1rem;
}
.p-form-required {
  color: #b0092d;
}

.p-form-required__error {
  border: 1px solid #b0092d;
  transition: transform 0.5s ease;
  transform: scale(1.1);
}

.modal-text-error {
  color: #b0092d;
  font-size: 1.25rem;
  font-weight: bold;
}
.two-columns {
  display: grid;
  grid-template-columns: 100%;
}
fieldset {
  margin: 0.4rem 0;
  padding: 0;
  border: none;
}
.p-form-btn {
  width: 100%;
  margin-top: 10px;
  padding: 15px;
  border: none;
  border-radius: 4px;
  background-color: #3d3935;
  color: #fff;
  font-size: 1.125rem;
  letter-spacing: 2px;
  text-align: center;
  outline: none;
  cursor: pointer;
}

.p-form-btn__cancel {
  background-color: #b0092d;
}
.p-form-btn__save {
  background-color: #43ed3f;
}
@media screen and (min-width: 481px) {
  .two-columns {
    grid-template-columns: 48.7804878% 48.7804878%;
    grid-column-gap: 2.43902439%;
  }
}
</style>