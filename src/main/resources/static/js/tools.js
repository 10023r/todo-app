
function sortBy(array, key, order) {
    return array
}

function renderFormattedTodoList(arr) {
    let formattedString = []
    arr.forEach(el => {
        let todo = new Todo(el)
        formattedString.push(todo.getFormattedString())
    })
    todosContainer.html(formattedString)
}

function resetStates(searchText= null, todoListDate= null, datePickerDates= null, onlyFinishedTodo= null) {
    if (searchText !== null) {
        searchInput.val(searchText)
    }
    if (todoListDate  !== null) {
        $("#todo-list-info").text(todoListDate)
    }
    if (datePickerDates !== null) {
        selectedDates = datePickerDates
        $('#datepicker').datepicker('setDate')
    }
    if (onlyFinishedTodo !== null) {
        $('#only-finished-todo').prop('checked', onlyFinishedTodo)
    }
}