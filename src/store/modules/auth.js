import {login, logout} from '@/api/auth'
import {Key, PcCookie} from '@/utils/cookie'

const state = {
    userInfo: PcCookie.get(Key.userInfoKey),
    accessToken: PcCookie.get(Key.accessTokenKey),
    refreshToken: PcCookie.get(Key.refreshTokenKey)
}

const mutations = {
    SET_USER_STATE(state, data) {
        const {userInfo, access_token, refresh_token} = data
        state.userInfo = userInfo
        state.accessToken = access_token
        state.refreshToken = refresh_token

        PcCookie.set(Key.userInfoKey, userInfo)
        PcCookie.set(Key.accessTokenKey, access_token)
        PcCookie.set(Key.refreshTokenKey, refresh_token)
    },

    RESET_USER_STATE(state) {
        state.userInfo = null
        state.accessToken = null
        state.refreshToken = null

        PcCookie.remove(Key.userInfoKey)
        PcCookie.remove(Key.accessTokenKey)
        PcCookie.remove(Key.refreshTokenKey)
    }
}

const actions = {
    UserLogin({commit}, inputInfo) {
        const {username, password} = inputInfo
        return new Promise((resolve, reject) => {
            login( {username: username.trim(), password:password}).then(response => {
                console.log('response', response)
                const {code, data} = response
                if (code === 200) {
                    commit('SET_USER_STATE', data)
                }
                resolve(response)
            }).catch(error => {
                commit('RESET_USER_STATE')
                reject(error)
            })
        })
    },

    UserLogout({state, commit}, redirectURL) {
        logout(state.accessToken).then(() => {
            commit('RESET_USER_STATE')
            window.location.href = redirectURL || '/'
        }).catch(() => {
            commit('RESET_USER_STATE')
            window.location.href = redirectURL || '/'
        })

    }
}
export default {
    state,
    mutations,
    actions
}