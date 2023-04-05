<template>
  <form @submit.prevent="handleClick">
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

    <button>SAVE</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  todo: {
    type: Object,
  },
});

//создаем уникальный айди
const guidFactory = (function () {
  function getRandomString() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  function gen(numberOfFunctionCalls) {
    let result = '';
    for (let i = 0; i < numberOfFunctionCalls; ++i) result += getRandomString();
    return result;
  }

  return {
    create: function () {
      return [gen(2), gen(1), gen(1), gen(1), gen(3)].join('-');
    },
  };
})();

const title = ref(props.todo?.title || '');
const details = ref(props.todo?.details || '');
const status = ref(props.todo?.status || 'queued');
const id = ref(props.todo?.id || guidFactory.create());

const emit = defineEmits(['add-handler']);

function handleClick() {
  const todo = {
    title: title.value,
    details: details.value,
    status: status.value,
    id: id.value,
  };

  emit('add-handler', todo);

  //очищаем поля формы
  title.value = '';
  details.value = '';
  status.value = props.todo?.status || 'queued';
  id.value = guidFactory.create(1);
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  background: #4578b7;
  padding: 20px;
  border-radius: 10px;
  margin: 0 2rem 2rem;
  font-family: 'Open Sans', sans-serif;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1px;
}
label {
  display: block;
  color: #bbb;

  margin: 0 0 10px;
}
input {
  padding: 10px;
  border: 0;
  border-bottom: 2px solid #ddd;
  width: 100%;
  box-sizing: border-box;
  background-color: inherit;
  color: #bbb;
}
textarea {
  background-color: inherit;
  border: 2px solid #ddd;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  height: 100px;
  color: #bbb;
  margin-bottom: 1rem;
}
form button {
  display: block;
  margin: 20px 0 0;
  width: 10rem;
  background: #35df90;
  color: #fff;
  padding: 10px;
  border: 0;
  border-radius: 7px;
  font-size: 16px;
}

.form_status {
  align-self: self-start;
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
