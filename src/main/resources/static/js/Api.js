
const URI = "http://localhost:8080/api"

class Api {

    static findAll(cb) {
        $.get(`${URI}/todos`, cb)
    }

    static findByName(name, cb) {
        $.get(`${URI}/todos/find?name=${name}`, cb)
    }

    static findByDateRange(from, to, cb) {
        $.get(`${URI}/todos/date?from=${from}&to=${to}`, cb)
    }

    static findUnfinishedTasks(cb) {
        $.get(`${URI}/todos/unfinished`, cb)
    }

}