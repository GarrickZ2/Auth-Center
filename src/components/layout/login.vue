<template v-if='active === "login"'>
    <form action="./login" method="post">
        <div class="input"><input type="text" name="username" id="username"
                                  onblur="check('username')"/><label
            class="no_content" for="username">Username</label></div>
        <div class="input"><input type="password" name="password" id="Password"
                                  onblur="check('Password')"/><label
            class="no_content" for="Password">Password</label></div>
        <button type="submit">Login!</button>
    </form>
</template>

<script>
export default {
    name: "login"
}
</script>

<style scoped>

</style>