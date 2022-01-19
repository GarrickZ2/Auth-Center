<template>
    <div>
        <div class="content">
            <span v-html="message"></span>
            <div class="spinner" id="load">
                <div class="rect1"></div> &nbsp;
                <div class="rect2"></div> &nbsp;
                <div class="rect3"></div> &nbsp;
                <div class="rect4"></div> &nbsp;
                <div class="rect5"></div>
            </div>
        </div>
        <div class="over"></div>
    </div>
</template>

<script>
export default {
    name: "refresh",
    data() {
        return {
            message: 'Please wait, verifying your identity...',
            redirectURL: null,
        }
    },
    created() {
        this.redirectURL = this.$route.query.redirectURL || '/'
        this.refreshLogin()
    },

    methods: {
        // Gain new key by refresh token
        refreshLogin() {
            this.$store.dispatch('SendRefreshToken').then(() => {
                    window.location.href = this.redirectURL
                }
            ).catch(() => {
                const load = document.getElementById('load')
                load.hidden = true
                this.message = `Your identity has been expired, please click
                <a href="/?redirectURL=${this.redirectURL}"> login </a>`
            })
        },
    },
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


.spinner {
    margin: 10px auto;
    width: 50px;
    height: 60px;
    text-align: center;
    font-size: 10px;
}

.spinner > div {
    background-color: #287bd5;
    height: 100%;
    width: 6px;
    display: inline-block;

    -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
    animation: stretchdelay 1.2s infinite ease-in-out;
}

.spinner .rect2 {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
}

.spinner .rect3 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
}

.spinner .rect4 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
}

.spinner .rect5 {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
}

@-webkit-keyframes stretchdelay {
    0%, 40%, 100% { -webkit-transform: scaleY(0.4) }
    20% { -webkit-transform: scaleY(1.0) }
}

@keyframes stretchdelay {
    0%, 40%, 100% {
        transform: scaleY(0.4);
        -webkit-transform: scaleY(0.4);
    }  20% {
           transform: scaleY(1.0);
           -webkit-transform: scaleY(1.0);
       }
}
</style>