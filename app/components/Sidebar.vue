<template>
  <div>
    <div id="categories">
      <div id="cat-header">
        <h2><i class="bookmark icon"></i>Bookmark App</h2>
      </div>
      <div class="container">
        <h2>Kategori
          <span class="clickable right-float">
            <i @click="addCategory" class="add icon"></i>
          </span>
        </h2>
        <div class="ui list">
          <div class="item clickable">
            <div class="content">
              <a class="ui grey empty circular label"></a>
              <span @click="categorySelected('')">All</span>
            </div>
          </div>
          <div v-for="(name, color) in categories" class="item clickable">
            <div class="content">
              <a class="ui {{ color }} empty circular label"></a>
              <span @click="categorySelected(name)"
                :class="{selected: selectedCategory === name}">
                {{ name }}
              </span>
              <i v-if="name !== 'Uncategorized'" class="remove icon right-float"
                @click="deleteCategory(name)">
              </i>
            </div>
          </div>
        </div>
        <button @click="addBookmark"
          class="ui grey inverted basic icon circular button right-float">
          <i class="icon add"></i>
        </button>
      </div>
    </div>
    <category-modal></category-modal>
    <bookmark-modal :categories="categories"></bookmark-modal>
  </div>
</template>


<script>
  import store from '../store'
  import CategoryModal from './CategoryModal.vue'
  import BookmarkModal from './BookmarkModal.vue'

  export default {

    data () {
      return {
        selectedCategory: ''
      }
    },

    props: ['categories'],

    components: {
      CategoryModal,
      BookmarkModal
    },

    methods: {

      addBookmark () {
        this.$broadcast('add-bookmark')
      },

      addCategory () {
        this.$broadcast('add-category')
      },

      deleteCategory (category) {
        store.deleteCategory(category)
      },

      categorySelected (category) {
        this.selectedCategory = category
        this.$dispatch('category-selected', category)
      }

    }

  }
</script>
