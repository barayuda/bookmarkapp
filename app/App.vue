<template>
  <!-- template untuk komponen -->
  <div id="app">
    <sidebar
      :categories="categories"
      v-on:category-selected="setSelectedCategory">
    </sidebar>
    <bookmark-list
      :bookmarks="bookmarks | filterByCategory setSelectedCategory"
      :categories="categories">
    </bookmark-list>
  </div>
</template>

<script>
  // logic
  import store from './store'
  import Sidebar from './components/Sidebar.vue'
  import BookmarkList from './components/BookmarkList.vue'
  import { filterByCategory } from './filters'

  export default {
    components: {
      Sidebar,
      BookmarkList
    },

    data() {
      return {
        categories: {},
        bookmarks: {},
        selectedCategory: ''
      }
    },

    filters: {
      filterByCategory
    },

    created() {
      //do something after creating vue instance
      // assign event handler `updateListings` ke `data-updated`
      store.on('data-updated', this.updatedListings)
    },

    methods: {
      updateListings(categories, bookmarks) {
        this.categories = categories
        this.bookmarks = bookmarks
      },

      setSelectedCategory (category) {
        this.selectedCategory = category;
      }
    }
  }
</script>
