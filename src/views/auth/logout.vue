<template>
    <div>
        <div class="content">
            <span>Logout Successful! Click here to <a @click="logout">go back</a> </span>
        </div>
        <div class="over"></div>
    </div>
</template>

<script>
export default {
    name: "logout",
    methods: {
        logout() {}
    }
}
</script>

<style scoped>
@import "../../assets/style/login.css";
.content {
    position: fixed;
    /*height: 120px;*/
    width: 500px;
    line-height: 60px;
    text-align: center;
    font-size: 19px;
    color: #303133;
    background-color: #fff;
    border-radius: 0.25rem;
    left: 50%;
    top: 30%;
    transform: translate(-50%, -50%);
    z-index: 1000;
}

a {
    color: #345dc2;
    text-decoration: none;
}
a:hover {
    text-decoration: underline;
}
.over {
    position: fixed;
    width: 100%;
    height: 100%;
    opacity: 0.5; /* 透明度为50% */
    filter: alpha(opacity=50);
    top: 0;
    left: 0;
    z-index: 999;
    background-color: #000;
}

</style>