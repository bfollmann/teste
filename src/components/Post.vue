<template>
  <div class="col-sm-6 col-sm-offset-3">
    <h1>Full post</h1>
    <button class="btn btn-warning" v-on:click="viewPost()">Full post</button>
    <div class="quote-area" v-if="post">
      <h2><blockquote>{{ post }}</blockquote></h2>
    </div>
  </div>
</template>

<script>
import auth from '../auth'

export default {

  data() {
    return {
      post: ''
    }
  },

  methods: {
    getPost() {
        //.error((err) => console.log(err))
    }
  },

  route: {
    canActivate() {
      return auth.user.authenticated
    }
  }

}
</script>