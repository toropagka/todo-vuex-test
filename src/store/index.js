import { createStore } from 'vuex';

const store = createStore({
  state: {
    todos: [],
  },
  mutations: {
    SET_TODOS(state, todos) {
      state.todos = todos;
    },
    ADD_TODO(state, todo) {
      state.todos.push(todo);
    },
    UPDATE_TODO(state, todo) {
      const index = state.todos.findIndex((t) => t.id === todo.id);
      state.todos.splice(index, 1, todo);
    },
    DELETE_TODO(state, todo) {
      const index = state.todos.findIndex((t) => t.id === todo.id);

      state.todos.splice(index, 1);
    },
  },
  actions: {
    // loadTodos({ commit }) {
    //   const todos = JSON.parse(localStorage.getItem('todos') || '[]');
    //   commit('SET_TODOS', todos);

    loadTodos({ commit }) {
      // Возвращаем промис
      return new Promise((resolve) => {
        // Имитируем задержку ответа на 2 секунды
        setTimeout(() => {
          const todos = JSON.parse(localStorage.getItem('todos') || '[]');
          commit('SET_TODOS', todos);
          console.log('vuex');

          // Вызываем resolve после выполнения таймера
          resolve();
        }, 2000);
      });
    },
    addTodo({ commit, state }, todo) {
      const newTodo = { ...todo };
      commit('ADD_TODO', newTodo);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    updateTodo({ commit, state }, todo) {
      commit('UPDATE_TODO', todo);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    deleteTodo({ commit, state }, todo) {
      commit('DELETE_TODO', todo);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
  },
  getters: {
    getTodos(state) {
      return state.todos;
    },
  },
});
export default store;
