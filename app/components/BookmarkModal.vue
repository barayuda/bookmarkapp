<template>

  <div id="bookmark-modal" class="ui small modal">
    <i class="close icon"></i>
    <div class="header">
      Tambah Bookmark
    </div>
    <div class="content">

      <form class="ui form">
        <div class="field">
          <label>Judul Bookmark</label>
          <input v-model="bookmarkTitle" type="text" placeholder="Masukan judul bookmark" />
        </div>
        <div class="field">
          <label>URL Bookmark</label>
          <input v-model="bookmarkUrl" type="text" placeholder="Masukan URL bookmark" />
        </div>
        <div class="field">
          <label>Kategori</label>
          <select v-model="bookmarkCategory" class="ui simple dropdown">
            <option value="">Pilih kategori</option>
            <template v-for="(name, color) in categories">
              <option value="{{name}}">
                {{ name }}
              </option>
            </template>
          </select>
        </div>
      </form>

    </div>
    <div class="actions">
      <div @click="addBookmark" class="ui inverted purple button">
        Simpan
      </div>
    </div>
  </div>

</template>


<script>
  import store from '../store'

  export default {
    data() {
      return {
        bookmarkTitle: '',
        bookmarkUrl: '',
        bookmarkCategory: ''
      }
    },

    props: ['categories'],

    methods: {
      addBookmark() {
        const newBookmark = {
          title: this.bookmarkTitle,
          url: this.bookmarkUrl,
          category: this.bookmarkCategory
        }
        store.addBookmark(newBookmark)
        $('#bookmark-modal').modal('hide')
      }
    },

    events: {
      'add-category': function( {
        this.bookmarkTitle = this.bookmarkUrl = this.bookmarkCategory = ''
        $('#bookmark-modal').modal('show')
      }
    }
  }
</script>
