let baseURL = 'https://lgb4lfe0.lc-cn-n1-shared.com'
export const $http = function(url, method = 'GET', data = {}) {
    return new Promise((resolve, reject) => {
        uni.request({
            url: baseURL + url,
            method,
            header: {
                "X-LC-Id": "LgB4lFe0WYn6dKcSVbQYgDL4-gzGzoHsz",
                "X-LC-Key": "A1TyY1qM9p6mSvifkWJqHXyg",
                "Content-Type": "application/json"
            },
            data,
            success: (res) => {
                resolve(res.data)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}

export const $get = function(url, data = {}) {
    return $http(url, 'GET', data)
}

export const $post = function(url, data = {}) {
    return $http(url, 'POST', data)
}

export const $put = function(url, data = {}) {
    return $http(url, 'PUT', data)
}

export const $delete = function(url, data = {}) {
    return $http(url, 'DELETE', data)
}
