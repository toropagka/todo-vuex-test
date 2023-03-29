<template>
  <the-form @add-handler="handleSubmit"></the-form>
  <todo-item v-if="todos" v-for="todo in todos" :key="todo.id" :todo="todo">
  </todo-item>
</template>

<script setup>
import TodoItem from './TodoItem.vue';
import TheForm from './TheForm.vue';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { computed } from '@vue/reactivity';

const store = useStore();
const todos = computed(() => store.getters.getTodos);

const handleSubmit = (todo) => {
  store.dispatch('addTodo', todo);
};

onMounted(() => {
  store.dispatch('loadTodos', todos);
});
</script>
