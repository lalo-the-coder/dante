<template>
  <div
    class="flex align-center align-vert modal modal--align"
    :class="show ? 'modal--show' : 'modal__close'"
  >
    <div class="modal__container">
      <a class="modal__close modal__close--x" aria-hidden="true">&#x2715;</a>
      <p>
        Although we have an 'X' to close we should always have a button/link to
        cancel the modal
      </p>
      <button class="modal__close">Cancel link</button>
    </div>
  </div>
</template>

<script setup>
import defineProps from "vue";
const props = defineProps(["show"]);

console.log(props);
</script>

<style scoped>
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
  max-height: 800px;
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
</style>