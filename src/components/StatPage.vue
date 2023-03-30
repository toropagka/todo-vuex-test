<template>
  <the-preloader v-if="statusArray.length === 0"></the-preloader>

  <Bar :data="data" :options="options" />
</template>

<script setup>
import ThePreloader from './ThePreloader.vue';

import { ref, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { Bar } from 'vue-chartjs';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const store = useStore();

const chartData = ref([]);

const data = computed(() => {
  return {
    labels: statusArray.value,
    datasets: [
      {
        label: '',
        data: countArray.value,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(75, 192, 192)',
        ],
        borderWidth: 1,
      },
    ],
  };
});

const options = {
  responsive: true,
  plugins: { legend: { display: false } },
  scales: {
    x: {
      ticks: {
        color: 'black', // цвет шрифта
        font: {
          size: '20',
        }, // размер шрифта
      },
    },
  },
};

const statusArray = computed(() => {
  return Array.from(new Set(chartData.value.map((obj) => obj.status))); // Получаем массив со всеми статусами
});

const countArray = computed(() => {
  return statusArray.value.map(
    (status) => chartData.value.filter((obj) => obj.status === status).length
  ); // Получаем массив с количеством объектов с каждым статусом
});

onMounted(() => {
  store.dispatch('loadTodos');
});

watchEffect(() => {
  chartData.value = store.getters.getTodos;
});
</script>
