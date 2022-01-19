<template>
    <div class="login_page">
        <div class="panel">
            <div class="content login">
                <p class="title" style="color: #755bc5; font-size: 30px;"> <b>GProject</b> </p>
                <p class="title" style="color: #e6affa; font-size: 20px;">Formal</p>
                <p class="title" style="color: #2d87de"> SSO Login System</p>
                <br/>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "index.vue"
}
</script>

<style scoped>
@import "../../assets/style/login_style_3.css";
</style>