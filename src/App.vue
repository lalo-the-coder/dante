<template>
  <div>
    <h1 class="title">Pendings</h1>
    <pendings-list class="app" />
  </div>
</template>

<script>
import PendingsList from "./components/PendingsList.vue";

export default {
  name: "App",
  components: {
    PendingsList,
  },
};
</script>


<style>
.app {
  margin: 1em auto;
  max-width: 1000px;

  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.06);
}

.title {
  color: #c0c0c0;
}
</style>
