<template>
  <the-form @add-handler="handleSubmit"></the-form>
  <paginate
    :pageCount="pageCount"
    :currentPage="currentPage.value"
    :clickHandler="handlePageChange"
    :container-class="'pagination'"
    :page-class="'page-item'"
    :prev-class="'prev-item'"
    :next-class="'next-item'"
  />
  <todo-item
    v-if="todos"
    v-for="todo in currentTodos"
    :key="todo.id"
    :todo="todo"
  >
  </todo-item>
</template>

<script setup>
import TodoItem from './TodoItem.vue';
import TheForm from './TheForm.vue';
import Paginate from 'vuejs-paginate-next';

import { onMounted, reactive, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const todos = reactive({ value: [] });
const currentPage = reactive({ value: 1 });
const itemsPerPage = 5;

const handleSubmit = (todo) => {
  store.dispatch('addTodo', todo);
};

onMounted(() => {
  store.dispatch('loadTodos');
});

watchEffect(() => {
  todos.value = store.getters.getTodos;
});

const currentTodos = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return todos.value.slice(start, end);
});

const pageCount = computed(() => {
  return Math.ceil(todos.value.length / itemsPerPage);
});

const handlePageChange = (page) => {
  currentPage.value = page;
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
.search-and-filter {
  display: flex;
  flex-direction: column;
}
</style>

<!-- <template>
  <div>
    <the-form @add-handler="handleSubmit"></the-form>
    <input type="text" v-model="searchTitle" placeholder="Search by title" />
    <div>
      <button @click="toggleSort">Sort {{ sortDirection }}</button>
    </div>

    <paginate
      :pageCount="pageCount"
      :currentPage="currentPage.value"
      :clickHandler="handlePageChange"
      :container-class="'pagination'"
      :page-class="'page-item'"
      :prev-class="'prev-item'"
      :next-class="'next-item'"
    />
    <todo-item
      v-if="todos"
      v-for="todo in currentTodos"
      :key="todo.id"
      :todo="todo"
    >
    </todo-item>
  </div>
</template>

<script setup>
import TodoItem from './TodoItem.vue';
import TheForm from './TheForm.vue';
import Paginate from 'vuejs-paginate-next';

import { onMounted, reactive, watchEffect, computed, watch, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const todos = reactive({ value: [] });
const currentPage = reactive({ value: 1 });
const itemsPerPage = 5;
const searchTitle = ref('');

const handleSubmit = (todo) => {
  store.dispatch('addTodo', todo);
};

onMounted(() => {
  store.dispatch('loadTodos');
});

watchEffect(() => {
  todos.value = store.getters.getTodos;
  watch(searchTitle, () => {
    currentPage.value = 1;
    currentTodos.value;
    pageCount.value;
  });
});

const currentTodos = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const filteredTodos = todos.value.filter((todo) =>
    todo.title.toLowerCase().includes(searchTitle.value.toLowerCase())
  );
  return filteredTodos.slice(start, end);
});

const pageCount = computed(() => {
  const filteredTodos = todos.value.filter((todo) =>
    todo.title.toLowerCase().includes(searchTitle.value.toLowerCase())
  );
  return Math.ceil(filteredTodos.length / itemsPerPage);
});

const handlePageChange = (page) => {
  currentPage.value = page;
};

const sortDirection = ref('asc');

const toggleSort = () => {
  sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  if (sortDirection.value === 'asc') {
    return currentTodos.value.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    return currentTodos.value.sort((a, b) => b.title.localeCompare(a.title));
  }
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
.search-and-filter {
  display: flex;
  flex-direction: column;
}
</style> -->
