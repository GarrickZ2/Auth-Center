import request from '@/utils/request'

// Add request header: Authorization

const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
}

const auth = {
    username: "garrick",
    password: "zzx135246",
}

export function login(data){
    return request({
        headers,
        auth,
        url: `/login`,
        method: 'post',
        params: data
    })
}

export function getProtocol() {
    let baseUrl = '';
    const originalUrl = `${window.location.href}`
    let count = 0;
    for(let i = 0; i < originalUrl.length; i++) {
        if (originalUrl[i] === '/') count++
        baseUrl += originalUrl[i]
        if (count >= 3) break
    }
    return request({
        url: `${baseUrl}/protocol.html`
    })
}

export function getUserByUsername(username) {
    return request({
        url: `/system/api/user/username/${username}`,
        method: 'get'
    })
}

export function register(data) {
    return request({
        url: `/system/api/user/register`,
        method: 'post',
        params: data
    })
}

export function logout(accessToken) {
    return request({
        url: `/auth/logout`,
        method: 'get',
        params: {
            accessToken
        }
    })
}