<template>
  <div id="app">
    <header>
      <div class="logo">
        <img src="./assets/logo.png" alt="Logo vue" class="logo-vue">
      </div>
    </header>
    <main>
      <router-view/>
    </main>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
  #app {
    background-image: url('assets/black-background.jpg');
    height: 100vh;
  }
  #app > header {
    width: 100%;
    max-height: 100px;
    background-color: rgba(0, 0, 0, 0.6);
    position: relative;
    margin: 0;
    padding: 5px 0;
    z-index: 100;
  }
  .logo {
    width: 70px;
    margin: 0 auto;
  }
</style>
