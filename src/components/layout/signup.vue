<template v-if='active === "register"'>
    <form action="./register" method="post">
        <div class="input"><input type="text" name="username" id="r_username"
                                  onblur="check('r_username')"/><label
            class="no_content" for="r_username">Username</label></div>
        <div class="input"><input type="password" name="password" id="r_password"
                                  onblur="check('r_password')"/><label class="no_content"
                                                                       for="r_password">Password</label>
        </div>
        <div class="input"><input type="text" name="code" id='email' onblur="check('email')"/><label
            class="no_content" for="email">Register Code</label></div>
        <button type="submit">Signup!</button>
    </form>

</template>

<script>
export default {
    name: "signup"
}
</script>

<style scoped>

</style>