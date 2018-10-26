<template>
  <div class="col-sm-6 col-sm-offset-3">
    <h1>Posts</h1>
    <button class="btn btn-primary" v-on:click="listPosts()">List posts</button>
    <div class="quote-area" v-if="post">
      <h2><blockquote>{{ post }}</blockquote></h2>
    </div>
  </div>
</template>

<script>

import Post from '../db/controller/posts';


export default {

  data() {
    return {
      post: ''
    }
  },

  methods: {
    listPosts() {
         // this.post = Post.getAll();
        //.error((err) => console.log(err))
    }
  }

}
</script>