let selectedDates = []

$(function () {
    $("#datepicker").datepicker({
        onSelect: function (dateText, inst) {
            processOnDateSelect(dateText)
            let rangeStart
            let rangeEnd
            if (selectedDates.length === 0) {
                let from = new Date()
                let to = new Date()
                to.setDate(from.getDate() + 1)
                Api.findByDateRange(from.getTime(), to.getTime(), data => {
                    todos = data
                    renderFormattedTodoList(todos)
                })
                rangeStart = from
                rangeEnd = to
            }
            else if (selectedDates.length === 1) {
                let from = new Date(selectedDates[0])
                let to = new Date()
                to.setDate(from.getDate() + 1)
                Api.findByDateRange(from.getTime(), to.getTime(), data => {
                    todos = data
                    renderFormattedTodoList(todos)
                })
                rangeStart = from
                rangeEnd = to
            } else {  //  (selectedDates.length === 2)
                let date1 = new Date(selectedDates[0]).getTime()
                let date2 = new Date(selectedDates[1]).getTime()
                let from = Math.min(date1, date2)
                let to = Math.max(date1, date2)
                Api.findByDateRange(from, to, data => {
                    todos = data
                    renderFormattedTodoList(todos)
                })
                rangeStart = new Date(from)
                rangeEnd = new Date(to)
            }

            resetStates("", `${rangeStart.toLocaleDateString()} - ${rangeEnd.toLocaleDateString()}`, null, false)
        },
        beforeShowDay: function (date) {
            let year = date.getFullYear()
            let month = ("0" + (date.getMonth() + 1)).slice(-2)
            let day = ("0" + date.getDate()).slice(-2)
            let dateString = month + "/" + day + "/" + year

            let idx = selectedDates.indexOf(dateString)
            if (idx >= 0) {
                return [true, "onselect-date"]
            }
            return [true, ""]
        }
    })

})

function processOnDateSelect(date) {
    if (selectedDates.length === 2) {
        selectedDates = []
    }
    let index = selectedDates.indexOf(date)
    if (index >= 0) {
        selectedDates.splice(index, 1)
    } else {
        selectedDates.push(date)
    }
}