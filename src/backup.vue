<template>
    <div id='app' class="container">
        <img src="./assets/image/bg.jpg" alt="Background"/>
        <div class="panel">
            <div class="content login">
                <p class="title" style="color: #755bc5; font-size: 30px;"> <b>GProject</b> </p>
                <p class="title" style="color: #e6affa; font-size: 20px;"> Formal</p>
                <p class="title" style="color: #2d87de"> SSO Login System</p>

                <br/>
                <div class="error_msg" style="font-size: 11px; color: red;"><p> {{loginMessage}} </p></div>
                <br/>
                <div class="switch">
                    <span :class='{"active": active === "login"}' @click='go("login")'>Login</span>
                    <span>/</span>
                    <span :class='{"active": active === "register"}' @click='go("register")'>Signup</span>
                </div>
                <div class='form' id="fromLogin">
                    <transition name="plus-icon">
                        <template v-if='active === "register"'>
                            <form @submit.prevent="regSubmit">
                                <div class="input">
                                    <input type="text" v-model="registerData.username" id="r_username" @blur="check('r_username')" autocomplete="off"/>
                                    <label class="no_content" for="r_username">Username</label>
                                </div>
                                <div class="input">
                                    <input type="password" v-model="registerData.password" id="r_password" @blur="check('r_password')"/>
                                    <label class="no_content" for="r_password">Password</label>
                                </div>
                                <div class="input">
                                    <input type="text" v-model="registerData.rePassword" id='email' @blur="check('email')"/>
                                    <label class="no_content" for="email">Re-enter Password</label>
                                </div>
                                <div class="agree">
                                    <input type="checkbox" id="tonyi" v-model="registerData.check">
                                    <label for="tonyi">I have read and consent </label><a href="jvascript:;"  @click="protocol = true"><i>user protocol</i></a>
                                </div>
                                <button type="submit" v-if="subState" disabled="disabled">Submitting...</button>
                                <button type="submit" v-else>Signup!</button>
                            </form>
                        </template>
                    </transition>


                    <transition name="plus-icon">
                        <template v-if='active === "login"'>
                            <form @submit.prevent="loginSubmit">
                                <div class="input">
                                    <input type="text" v-model="loginData.username" id="username" @blur="check('username')" autocomplete="off"/>
                                    <label class="no_content" for="username">Username</label>
                                </div>

                                <div class="input">
                                    <input type="password" v-model="loginData.password" name="password" id="Password" @blur="check('Password')" autocomplete="off"/>
                                    <label class="no_content" for="Password">Password</label>
                                </div>
                                <button type="submit" v-if="subState" disabled="disabled">Login...</button>
                                <button type="submit" v-else @submit="loginSubmit">Login!</button>
                            </form>
                        </template>
                    </transition>
                </div>
            </div>
        </div>

        <div class="protocol" v-if="protocol" @click.self="protocol = false">
            <div class="protocol_content">
                <div class="protocol_title">Please read following user protocol</div>
                <div class="protocol_body" v-if="protocolContent" v-html="protocolContent">
                </div>
                <input type="button" class="protocol_btn" value="Exit" @click="protocol = false">
            </div>
        </div>
    </div>
</template>

<script>
import {isvalidUsername} from '@/utils/validate'
import {getProtocol, getUserByUsername, register} from '@/api/auth'

export default {
    name: 'App',
    el: '#app',
    data() {
        return {
            active: 'login',
            tab:  1, // 高亮当前标签名
            reverse:  1, // 旋转 1 登录，2 注册
            loginMessage: ' ', //登录错误提示信息
            regMessage: '', //注册错误提示信息
            subState: false, //提交状态
            protocol: false, // 显示隐藏协议内容
            protocolContent: null, // 协议内容
            redirectURL: '//www.garrick.cn', // 登录成功后重写向地址
            loginData: { // 登录表单数据
                username: '',
                password: ''
            },
            registerData: { // 注册表单数据
                username: '',
                password: '',
                rePassword: '',
                check: false
            },
        }
    },
    methods: {
        check(id) {
            const input = document.getElementById(id).value;
            const label = document.getElementById(id).nextElementSibling;
            if (input === "") {
                label.className = "no_content";
            } else {
                label.className = "input_content";
            }
        },
        go (type) {
            this.active = type
        },
        // 提交登录
        loginSubmit() {
            if (this.subState) {
                return false
            }
            if (!isvalidUsername(this.loginData.username)) {
                this.loginMessage = 'Username or Password Incorrect'
                return false
            }
            if (this.loginData.password.length < 6) {
                this.loginMessage = 'Username or Password Incorrect'
                return false
            }
            this.subState = true
            this.$store.dispatch('UserLogin', this.loginData).then(response => {
                console.log('client:' , response)
                const {code, message} = response
                if (code === 200) {
                    window.location.href = this.redirectURL
                } else {
                    this.loginMessage = message
                    this.subState = false
                }
            }).catch(error => {
                this.loginMessage = error
                this.subState = false
            })
        },

        // 提交注册
        async regSubmit() {
            if (this.subState) {
                return false
            }

            if (!isvalidUsername(this.registerData.username)) {
                this.loginMessage = 'Please input correct username format'
                return false
            }

            if (this.registerData.password.length < 6 || this.registerData.password.length > 30) {
                this.loginMessage = 'Password Length should between 6 and 30'
                return false
            }

            if (!this.registerData.check) {
                this.loginMessage = 'Please read and consent user protocol'
                return false
            }
            if (this.registerData.password !== this.registerData.rePassword) {
                this.loginMessage = "The passwords entered twice do not match"
                return false
            }

            this.subState = true
            const {code, message, data} = await getUserByUsername(this.registerData.username)
            if (data) {
                this.loginMessage = 'Username has been registered'
                this.subState = false
                return false
            }
            if (code !== 200) {
                this.loginMessage = message
                this.subState = false
                return false
            }
            register(this.registerData).then(response => {
                this.subState = false
                const {code, message} = response
                if (code === 200) {
                    this.loginMessage = 'Register Successfully, Please Login'
                    this.go('login')
                } else {
                    this.loginMessage = message
                }
            }).catch(error => {
                this.loginMessage = error
            })
            this.subState = false
        },
    },
    async created() {
        // Acquire the protocol
        // this.protocolContent = getProtocol().then(response => {
        getProtocol().then(response => {
            this.protocolContent = response
        }).catch(error=>{
            console.log(error)
        })
        if (this.$route.query.redirectURL) {
            this.redirectURL = this.$route.query.redirectURL
        }
    },
    components:[

    ]
}
</script>

<style>
@import "./assets/style/login_style_3.css";
.agree {
    font-size: 11px;
    margin-top: -1rem;
    margin-bottom: 1rem;
    color: gray;
}

.plus-icon-enter-active{
    transition: opacity 1.5s 0.2s;
}
.plus-icon-enter{
    visibility: hidden;
    opacity: 0;
}
.plus-icon-enter-to{
    visibility: visible;
    opacity: 1;
}
.plus-icon-leave{
    opacity: 0;
}
.plus-icon-leave-active{
    transition: opacity 0s;
}
.plus-icon-leave-to{
    /*visibility: hidden;*/
    opacity: 0;
}

</style>
