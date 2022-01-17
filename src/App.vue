<template>
    <div id='app' class="container">
        <img src="./assets/image/bg.jpg" alt="Background"/>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'App',
}
</script>

<style>
@import "./assets/style/login_style_3.css";
#app {
    text-align: center;
    color: #2c3e50;
}
</style>
