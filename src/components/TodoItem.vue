<template>
  <div class="wrapper">
    <div class="item">
      <div class="item_header">
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
            @click="deleteTodo"
          >
            delete
          </button>
        </div>
      </div>
      <h3 class="item_text">{{ todo.title }}</h3>

      <p class="item_details">{{ todo.details }}</p>
    </div>
  </div>
  <the-form
    v-if="clickedEdit"
    :todo="todo"
    @add-handler="saveChanges"
    class="edit-form"
  ></the-form>

  <div v-if="clickedDelete" class="popup-wrapper">
    <span class="popup-wrapper_text"
      >Are you sure you want to delete the entry?</span
    >
    <div class="popup-wrapper_buttons">
      <button
        type="button"
        class="popup-wrapper_button__yes"
        @click="confirmDelete(todo)"
      >
        YES
      </button>
      <button
        type="button"
        class="popup-wrapper_button__no"
        @click="deleteTodo"
      >
        NO
      </button>
    </div>
  </div>
</template>

<script setup>
import TheForm from './TheForm.vue';

import { ref, onBeforeMount, onUnmounted } from 'vue';
import { useStore } from 'vuex';
const props = defineProps({
  todo: {
    type: Object,
  },
});

const store = useStore();

const clickedEdit = ref(false);
const clickedDelete = ref(false);
const editTodo = () => {
  clickedEdit.value = !clickedEdit.value;
};
const saveChanges = (todo) => {
  clickedEdit.value = !clickedEdit.value;

  store.dispatch('updateTodo', todo);
};

const confirmDelete = (todo) => {
  store.dispatch('deleteTodo', todo);
  clickedDelete.value = !clickedDelete.value;
};
const deleteTodo = () => {
  clickedDelete.value = !clickedDelete.value;
};

const hidePopupAndForm = (event) => {
  const clickedElement = event.target;
  if (
    !clickedElement.closest('.popup-wrapper') &&
    !clickedElement.closest('.edit-form')
  ) {
    clickedDelete.value = false;
    clickedEdit.value = false;
  }
};

onBeforeMount(() => {
  document.addEventListener('mouseup', hidePopupAndForm);
});

onUnmounted(() => {
  document.removeEventListener('mouseup', hidePopupAndForm);
});
</script>

<style scoped>
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
.item_text {
  overflow: hidden;
  padding-right: 1rem;
}
.item_details,
.item_text {
  width: 100%;
  word-wrap: break-word;
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
.header_button__delete {
  background: rgb(130, 129, 129);
}
.header_button__edit {
  background: #35df90;
}

.queued {
  background-color: rgb(218, 50, 50);
}
.in-progress {
  background-color: rgb(228, 228, 72);
}
.completed {
  background-color: rgb(39, 205, 39);
}

.edit-form {
  position: fixed;
  left: 20%;
  top: 40%;
  z-index: 10;
  width: 50%;
  background: #29486e;
}

/*стили для попапа подтверждения удаления*/
.popup-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: fixed;
  padding-top: 5rem;
  z-index: 999999;
  background-color: rgba(0, 0, 0, 0.9);
  width: 40%;
  height: 40%;
  text-align: center;
  left: 30%;
  top: 40%;
  border-radius: 10px;
  box-sizing: border-box;
}
.popup-wrapper_text {
  color: white;
}
.popup-wrapper_text {
  font-size: 1.5rem;
}
.popup-wrapper_buttons {
  display: flex;
  justify-content: center;
  gap: 5rem;
}
</style>
