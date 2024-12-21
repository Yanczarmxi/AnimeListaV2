<template>
    <div>
      <h1>Tabela Anime z Grupami i Separatorami</h1>
      <table>
        <thead>
          <tr>
            <th>Tytuł</th>
            <th>Opis</th>
            <th>Odcinki</th>
          </tr>
        </thead>
        <tbody>
          <!-- Dynamiczne komponenty -->
          <template v-for="(group, groupIndex) in data" :key="groupIndex">
            <!-- Separator component -->
            <SeparatorRow :title="group.title" />
  
            <!-- Row component dla każdego anime w grupie -->
            <AnimeRow v-for="(anime, animeIndex) in group.anime" :key="animeIndex" :data="anime" />
          </template>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import AnimeRow from './AnimeRow.vue';
  import SeparatorRow from './SeparatorRow.vue';
  import axios from 'axios';
  
  export default {
    name: 'TableComponent',
    components: {
      AnimeRow,
      SeparatorRow,
    },
    setup() {
      const data = ref([]);
  
      // Pobieranie danych z serwera
      const fetchData = async () => {
        try {
          const response = await axios.get('/api/anime'); // Zamień na swój URL API
          data.value = response.data;
        } catch (error) {
          console.error('Błąd podczas pobierania danych:', error);
        }
      };
  
      onMounted(() => {
        fetchData();
      });
  
      return {
        data,
      };
    },
  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  th {
    background-color: #f4f4f4;
    text-align: left;
  }
  </style>