import seedrandom from 'seedrandom'

export default class Util {

    static format(str, ...args) {
        let i = -1
        return str.replace(/%s/g, () => {
            return args[++i]
        })
    }

    static time() {
        return Date.now()
    }

    static setSeed(seed) {
        seedrandom(seed, {
            global: true
        })
    }

    // [begin, end)
    static randomInt(begin, end) {
        if (!end) {
            end = begin
            begin = 0
        }
        let ret = begin + Math.floor(Math.random() * (end - begin))
        return ret
    }

    static randomFromArray(array) {
        return array[Util.randomInt(array.length)]
    }

    static timeFormat(timestamp) {
        let date = new Date(timestamp)
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        let hours = date.getHours()
        let minutes = date.getMinutes()
        let seconds = date.getSeconds()
        return year +
            (month > 9 ? '-' + month : '-0' + month) +
            (day > 9 ? '-' + day : '-0' + day) +
            (hours > 9 ? ' ' + hours : ' 0' + hours) +
            (minutes > 9 ? ':' + minutes : ':0' + minutes) +
            (seconds > 9 ? ':' + seconds : ':0' + seconds)
    }

    static timeFormatMMSS(timestamp) {
        let ss = Math.floor(timestamp / 1000)
        let s = ss % 60
        let m = (ss - s) / 60
        return (m > 9 ? m : '0' + m) + (s > 9 ? ':' + s : ':0' + s)
    }

    static timeFormatHHMM(timestamp) {

    }

    static toFixed(number, decimalCount) {
        let p = Math.pow(10, decimalCount)
        return Math.round(number * p) / p
    }

    static request(params) {
        let xhr = new XMLHttpRequest()
        xhr.responseType = 'json'
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 &&
                (xhr.status == 200 || xhr.status == 304)) {
                if (params.cb) {
                    params.cb(true, xhr.response)
                }
            }
        }
        xhr.timeout = params.timeout || 5000
        if (params.cb) {
            xhr.ontimeout =
                params.cb.bind(null, false, `timeout ${xhr.timeout}MS`)
            xhr.onerror = params.cb.bind(null, false)
        }
        if (params.header) {
            for (let k in params.header) {
                xhr.setRequestHeader(k, params.header[k])
            }
        }
        xhr.open(params.method, params.url, true)
        xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8')
        xhr.send(JSON.stringify(params.data))
    }

    static shadowCopy(obj) {
        return Object.assign({}, obj)
    }

    static mergeSort(arr, fn) {
        function sort(arr, first, last) {
            if (first >= last) {
                return
            }
            let middle = Math.floor((first + last) / 2)
            sort(arr, first, middle)
            sort(arr, middle + 1, last)
            while (first <= middle && middle + 1 <= last) {
                if (fn(arr[first], arr[middle + 1])) {
                    ++first
                } else {
                    let tmp = arr[middle + 1]
                    for (let i = middle; i >= first; --i) {
                        arr[i + 1] = arr[i]
                    }
                    arr[first] = tmp
                    ++middle
                }
            }
        }
        sort(arr, 0, arr.length - 1)
    }

}