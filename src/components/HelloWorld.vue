<template>
  <v-app>
    <v-app-bar app class="custom-app-bar" elevation="2">
  <v-container class="d-flex align-center justify-space-between">
    
    <!-- Logo & Title -->
    <div class="d-flex align-center">
      <v-img 
        src="/your-logo.png" 
        max-height="45" 
        max-width="45" 
        class="mr-3 rounded-circle"
      ></v-img>
      <v-toolbar-title class="text-white font-weight-bold text-h5">
        Know Your Events
      </v-toolbar-title>
    </div>

    <!-- Search Box (Hidden on Small Screens) -->
    <v-text-field
      v-model="searchTerm"
      label="Search..."
      variant="solo"
      prepend-inner-icon="mdi-magnify"
      density="compact"
      class="custom-search"
      hide-details
      rounded
    ></v-text-field>

    <!-- Search Icon for Mobile -->
    <v-btn icon class="d-md-none" @click="showSearch = !showSearch">
      <v-icon size="24" color="white">mdi-magnify</v-icon>
    </v-btn>
  </v-container>

  <!-- Mobile Search Dialog -->
  <v-dialog v-model="showSearch" max-width="400">
    <v-card class="pa-4">
      <v-text-field
        v-model="searchTerm"
        label="Search..."
        prepend-inner-icon="mdi-magnify"
      
        autofocus
      ></v-text-field>
      <v-card-actions class="justify-end">
        <v-btn text @click="showSearch = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</v-app-bar>



    <v-main :style="{ backgroundImage: `url(${bg1})`, backgroundSize: 'cover', backgroundPosition: 'center' }">
      <v-container>
        <v-row>
          <v-col v-for="item in filteredItems" :key="item.id" cols="12" sm="6" md="4">
            <v-card>
              <v-img :src="item.poster" height="200px" cover></v-img>
              <v-card-title>{{ item.eve }}</v-card-title>
              <v-card-text>
                <p><strong>DATE:</strong> {{ item.date }}</p>
                <p><strong>VENUE:</strong> {{ item.venue }}</p>
                <p><strong>Contact:</strong> {{ item.phone }}</p>
              </v-card-text>
              <v-card-actions>
                <v-btn :href="item.link" color="primary" text>Register</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      searchTerm: '',
      bg1: new URL('@/assets/bg.jpg', import.meta.url).href // ✅ Correct way in Vue 3 + Vite
    };
  },
  computed: {
    filteredItems() {
      if (!this.searchTerm) {
        return this.items;
      }
      const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
      return this.items.filter(item => item.eve.toLowerCase().includes(lowerCaseSearchTerm));
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch('http://127.0.0.1:8005/api/data/');
        const data = await response.json();
        this.items = data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }
};
</script>
<style scoped>
/* ✨ Improved Search Field */
.custom-search :deep(.v-input__control) {
  background: rgba(255, 255, 255, 0.15); /* Soft transparent background */
  color: white;
  border-radius: 25px;
  transition: 0.3s ease-in-out;
  border: none !important;
  box-shadow: none !important;
}

/* 🔍 Hover & Focus Effect */
.custom-search :deep(.v-input__control:hover),
.custom-search :deep(.v-input__control:focus-within) {
  background: rgba(255, 255, 255, 0.25); /* Brighter on focus */
  border: none !important;
  box-shadow: none !important;
}

/* 📱 Mobile-Friendly */
@media (max-width: 960px) {
  .custom-search {
    display: none !important;
  }
}
</style>
