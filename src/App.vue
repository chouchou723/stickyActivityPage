<template>
  <div id="app">
    <component v-bind:is="currentTabComponent"></component>
    <!-- <ticketShare/> -->
  </div>
</template>

<script>
  // import articleShare from './components/articleShare'
  // import productShare from './components/productShare'
  // import ticketShare from './components/ticketShare'
  const articleShare = () =>
    import ('./components/articleShare')
  const productShare = () =>
    import ('./components/productShare')
  const ticketShare = () =>
    import ('./components/ticketShare')
  export default {
    name: 'App',
    components: {
      articleShare,
      productShare,
      ticketShare
    },
    computed: {
      currentTabComponent() {
        let a = location.href;
        if (a.indexOf('articles') > -1) {
          return 'articleShare'
        } else if (a.indexOf('goods') > -1) {
          return 'productShare'
        } else if (a.indexOf('tickets') > -1) {
          return 'ticketShare'
        } else {
          return ''
        }
      }
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    /* -webkit-overflow-scrolling: touch; */
  }
  html,
  body {
    width: 100%;
    /* height: 100%; */
    /* overflow: auto; */
    color: #212121;
    font-family: 'PingFangSC-Regular';
  }
  #app {
    width: 100%;
    /* height: 100%; */
  }
  /* #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  } */
</style>
