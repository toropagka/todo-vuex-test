<template>
  <div class="wrapper">
    <div class="item">
      <div class="item_header">
        <h3 class="header_text">{{ todo.title }}</h3>
        <div class="header_status" :class="todo.status">
          {{ todo.status }}
        </div>
        <div class="header_buttons">
          <button
            type="button"
            class="header_button header_button__edit"
            @click="editTodo"
          >
            edit
          </button>
          <button
            type="button"
            class="header_button header_button__delete"
            @click="deleteTodo(todo)"
          >
            delete
          </button>
        </div>
      </div>

      <p class="item_details">{{ todo.details }}</p>
    </div>
    <the-form
      v-if="clickedEdit"
      :todo="todo"
      @add-handler="saveChanges"
      class="edit-form"
    ></the-form>
  </div>
</template>

<script setup>
import TheForm from './TheForm.vue';

import { defineProps, toRef, ref } from 'vue';
import { useStore } from 'vuex';
const props = defineProps({
  todo: {
    type: Object,
  },
});

const store = useStore();
// const todos = toRef(props, 'todo');

const clickedEdit = ref(false);
const editTodo = () => {
  clickedEdit.value = !clickedEdit.value;
};
const saveChanges = (todo) => {
  clickedEdit.value = !clickedEdit.value;

  store.dispatch('updateTodo', todo);
};

const deleteTodo = (todo) => {
  store.dispatch('deleteTodo', todo);
};
</script>

<style scoped>
.wrapper {
  position: relative;
}
.item {
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background: #6796ce;
  padding: 20px;
  margin: 0 2rem 1rem;
}
.item_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header_text {
  width: 9rem;
}
.header_status {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 7rem;
  height: 2.5rem;
  border-radius: 10px;
  color: white;
}
.header_buttons {
  display: flex;
  align-items: center;
  gap: 1rem;
}
/* button {
  width: 4rem;
  height: 2.5rem;
  border-radius: 10px;
} */
.queued {
  background-color: rgb(218, 50, 50);
}
.in-progress {
  background-color: rgb(228, 228, 72);
}
.completed {
  background-color: rgb(39, 205, 39);
}
.edit-popup {
  width: 100vw;
  height: 100vh;
  background-color: rgba(131, 131, 132, 0.5);
}
.edit-form {
  position: absolute;
  top: 0;
  left: 15rem;
  z-index: 10;
  width: 50%;
  background: #29486e;
}
</style>
