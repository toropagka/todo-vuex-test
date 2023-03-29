<template>
  <the-form @add-handler="handleSubmit"></the-form>
  <todo-item
    v-if="todos"
    v-for="todo in todos"
    :key="todo.id"
    :todo="todo"
    @edit="editTodo"
  >
    <the-form
      :todo="todo"
      @add-handler="saveChanges"
      v-if="clickedEdit"
    ></the-form>
  </todo-item>
</template>

<script setup>
import TodoItem from './TodoItem.vue';
import TheForm from './TheForm.vue';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { computed } from '@vue/reactivity';

const clickedEdit = ref(false);
const editTodo = () => {
  clickedEdit.value = !clickedEdit.value;
};

const saveChanges = (todo) => {
  clickedEdit.value = !clickedEdit.value;

  store.dispatch('updateTodo', todo);
};

const store = useStore();
const todos = computed(() => store.getters.getTodos);

const handleSubmit = (todo) => {
  store.dispatch('addTodo', todo);
};

onMounted(() => {
  store.dispatch('loadTodos', todos);
});
</script>
