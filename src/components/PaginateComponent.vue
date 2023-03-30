<!-- Pagination.vue -->
<template>
  <div>
    <paginate
      :page-count="pageCount"
      :margin-pages="2"
      :page-range="2"
      :prev-text="'Previous'"
      :next-text="'Next'"
      :click-handler="fetchData"
      :container-class="'pagination'"
      :page-class="'page-item'"
      :prev-class="'page-item'"
      :next-class="'page-item'"
      :page-link-class="'page-link'"
      :prev-link-class="'page-link'"
      :next-link-class="'page-link'"
      :active-class="'active'"
      :disabled-class="'disabled'"
    />
  </div>
</template>

<script setup>
import Paginate from 'vuejs-paginate-next';
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const todos = computed(() => {
  return store.getters.getTodos;
});

const pageSize = 10;
const pageCount = computed(() => Math.ceil(todos.value.length / pageSize));

const fetchData = (pageNumber) => {
  store.dispatch('loadTodos', { pageNumber, pageSize });
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  gap: 1rem;
  list-style-type: none;
  font-size: 1.3rem;
}
</style>
