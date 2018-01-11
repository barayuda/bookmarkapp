import { EventEmitter } from 'events'
import Firebase from 'firebase'

// setup database
const db = new Firebase("https://bookmarking-app-5df7b.firebaseio.com/")
const categoriesRef = db.child('categories')
const bookmarksRef = db.child('bookmarks')
const store = new EventEmitter()

let categories = {}
let bookmarks = {}

// #1 snapshot data ke lokal
db.on('value', (snapshot) => {
  var bookmarkData = snapshot.val()
  if (bookmarkData) {
    categories = bookmarkData.categories
    bookmarks = bookmarkData.bookmarks
    store.emit('data-updated', categories, bookmarks)
  }
})

// #2 add delete categories
store.addCategory = (category) => {
  categoriesRef.update(category)
}

store.deleteCategory = (catName) => {
  // cek klo ada bookmark yg ga punya kategori, klo ada warnanya kasi warna putih
  if (!('Uncategorized' in categories)) {
    categoriesRef.update({'Uncategorized': 'white'})
  }

  for (var key in bookmarks) {
    if (bookmarks[key].category === catName) {
      bookmarksRef.child(key).update({category: 'Uncategorized'})
    }
  }

  categoriesRef.child(catName).remove()
}

// #3 add delete bookmark
store.addBookmark = (bookmark) => {
  bookmarksRef.push(bookmark)
}

store.deleteBookmark = (bookmarkId) => {
  bookmarksRef.child(bookmarkId).remove()
}


// export
export default store
