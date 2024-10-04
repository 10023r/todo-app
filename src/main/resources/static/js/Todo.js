

class Todo {
    constructor(todo) {
        this.todo = todo
    }
    static htmlToNodes(html) {
        const template = document.createElement('template')
        template.innerHTML = html
        return template.content.childNodes
    }

    getFormattedDateTime() {
        let date = new Date(this.todo.date)
        let hours = ("0" + date.getHours()).slice(-2)
        let minutes = ("0" + date.getMinutes()).slice(-2)
        let day = ("0" + date.getDate()).slice(-2)
        let month = ("0" + (date.getMonth() + 1)).slice(-2)
        let year = date.getFullYear()
        return `${hours}:${minutes} ${day}.${month}.${year}`
    }

    getFormattedString() {
        let checked = this.todo.status === true ? "checked" : ""
        let date = this.getFormattedDateTime(this.todo.date)
        let todoId = this.todo.id
        let template = `
            <div class="todo-element" id="${todoId}"">
                <h2>${this.todo.name}</h2>
                <div class="todo-description">
                    <p>${this.todo.shortDesc}</p>
                    <label class="check-todo-container">
                        <input class="check-todo" type="checkbox" ${checked} disabled>
                    </label>
                </div>
                <span class="todo-date">${date}</span>
            </div>
        `
        let res = Todo.htmlToNodes(template)[1]
        res.addEventListener("click", () => {
            let dialog = $("#dialog")
            this.prepareDialogInfo(dialog)
            dialog.dialog("open")
        })
        return res
    }

    prepareDialogInfo(dialog) {
        $("#dialog-date-info").text(this.getFormattedDateTime(this.todo.date))
        $('#check-dialog-todo').prop('checked', this.todo.status)
        $("#dialog-description").text(this.todo.fullDesc)
        $("#finish-editing-todo").click(() => {
            $("#dialog").dialog('close')
        })
        dialog.dialog( "option", "title", this.todo.name)
        dialog.dialog( "option", "modal", true)
    }

}
