<template>
  <form @submit.prevent="handleSubmit">
    <label>Title: </label>
    <input type="text" v-model="title" required />
    <label>Details: </label>
    <textarea v-model="details" required></textarea>
    <label>Status: </label>
    <div class="form_status">
      <label class="status_label">
        <input
          class="status_input"
          type="radio"
          v-model="status"
          value="queued"
        />
        Queued
      </label>
      <label class="status_label">
        <input
          class="status_input"
          type="radio"
          v-model="status"
          value="in-progress"
        />
        In Progress
      </label>
      <label class="status_label">
        <input
          class="status_input"
          type="radio"
          v-model="status"
          value="completed"
        />
        Completed
      </label>
    </div>
    <!-- <input type="radio" v-model="title" required /> -->

    <button>Add Project</button>
  </form>
  <todo-item
    v-if="todos"
    v-for="todo in todos"
    :key="todo.id"
    :todo="todo"
  ></todo-item>
</template>
<script setup>
import TodoItem from './TodoItem.vue';
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { computed } from '@vue/reactivity';

//unique ID
let guidFactory = (function () {
  function getRandomString() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  function gen(t) {
    let result = '';
    for (let i = 0; i < t; ++i) result += getRandomString();
    return result;
  }
  return {
    create: function () {
      return [gen(2), gen(1), gen(1), gen(1), gen(3)].join('-');
    },
  };
})();

const title = ref('');
const details = ref('');
const status = ref('');
const id = ref(guidFactory.create(1));

const store = useStore();
const todos = computed(() => store.getters.getTodos);

const handleSubmit = () => {
  const todo = {
    title: title.value,
    details: details.value,
    status: status.value,
    id: id.value,
  };
  console.log(todo);

  store.dispatch('addTodo', todo);

  //clear form
  title.value = '';
  details.value = '';
  status.value = '';
  id.value = guidFactory.create(1);
};

onMounted(() => {
  store.dispatch('loadTodos', todos);
});
</script>
<style scoped>
form {
  background: #2f4765;
  padding: 20px;
  border-radius: 10px;
  margin: 0 2rem 2rem;
}
label {
  display: block;
  color: #bbb;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1px;
  margin: 0 0 10px;
}
input {
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  padding: 10px;
  border: 0;
  border-bottom: 2px solid #ddd;
  width: 100%;
  box-sizing: border-box;
  background-color: #2f4765;
  color: #bbb;
}
textarea {
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  background-color: #2f4765;
  border: 2px solid #ddd;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  height: 100px;
  color: #bbb;
}
form button {
  display: block;
  margin: 20px auto 0;
  background: #35df90;
  color: #fff;
  padding: 10px;
  border: 0;
  border-radius: 7px;
  font-size: 16px;
}

.form_status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

.status_label {
  cursor: pointer;
}
.status_input {
  cursor: pointer;
  width: 1rem;
}
</style>
