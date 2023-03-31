<template>
  <div>
    <the-form @add-handler="handleSubmit"></the-form>
    <div class="search-and-filter">
      <input
        class="search-input"
        type="text"
        v-model="searchTitle"
        placeholder="Search by title"
      />
      <button class="filter-button" @click="toggleSort">
        Sort {{ sortDirection }}
      </button>
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

    <todo-item v-for="todo in currentTodos" :key="todo.id" :todo="todo">
    </todo-item>
  </div>
</template>

<script setup>
import TodoItem from './TodoItem.vue';
import TheForm from './TheForm.vue';
import Paginate from 'vuejs-paginate-next';

import { reactive, watchEffect, computed, watch, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const todos = reactive({ value: [] });
const currentPage = reactive({ value: 1 });
const itemsPerPage = 5;
const searchTitle = ref('');

// const loading = ref(true); // добавляем переменную loading

//пушим объект новой тудушки в массив
const handleSubmit = (todo) => {
  store.dispatch('addTodo', todo);
};

//отслеживаем изменения в указанных переменных для переопределения
watchEffect(() => {
  todos.value = store.getters.getTodos;
  watch(searchTitle, () => {
    currentPage.value = 1;
    currentTodos.value;
    pageCount.value;
  });
});

//фильтруем основной массив тудушек и получаем массивы для каждой страницы пагинации

const currentTodos = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const filteredTodos = todos.value.filter((todo) =>
    todo.title.toLowerCase().includes(searchTitle.value.toLowerCase())
  );
  return filteredTodos.slice(start, end);
});

//получаем количество страниц с тудушками
const pageCount = computed(() => {
  const filteredTodos = todos.value.filter((todo) =>
    todo.title.toLowerCase().includes(searchTitle.value.toLowerCase())
  );
  return Math.ceil(filteredTodos.length / itemsPerPage);
});

//обрабатываем клик по каждой странице пагинации
const handlePageChange = (page) => {
  currentPage.value = page;
};

//сортируем записи по алфавиту
const sortDirection = ref('asc');

const toggleSort = () => {
  sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  if (sortDirection.value === 'asc') {
    return todos.value.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    return todos.value.sort((a, b) => b.title.localeCompare(a.title));
  }
};
</script>

<style scoped>
.search-input {
  height: 2rem;
  font-size: 1.3rem;
  width: 70%;
  border-radius: 0.3rem;
}
.pagination {
  display: flex;
  justify-content: center;
  gap: 1rem;
  list-style-type: none;
  font-size: 1.3rem;
}
.search-and-filter {
  display: flex;
  justify-content: space-between;
  margin: 0 2rem;
}
.filter-button {
  width: 7rem;
}
</style>
