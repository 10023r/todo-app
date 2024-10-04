const searchButton = $("#searchBtn")
const searchInput = $("#searchInput")
const todosContainer = $(".todos-container")
let todos = [
    // {
    //     "id": "bd8b283d-b6c2-42cf-8687-f9238ff5ce0f",
    //     "name": "Idvenenatis",
    //     "shortDesc": "Maurisnulla arcuviverra sociis egestasrisus diam sitnunc vestibulumrhoncus volutpatmassa dolore tempor magna quisamet leoblandit.",
    //     "fullDesc": "Maurisnulla arcuviverra sociis egestasrisus diam sitnunc vestibulumrhoncus volutpatmassa dolore tempor magna quisamet leoblandit. Facilisis quisurna dictumst ut fringillaegestas maecenasdui consectetur tempormorbi nullamvenenatis felissollicitudin nunceget sem maecenaselementum scelerisquefacilisis integerid elitauctor sodales diampellentesque mattisut dolor lobortiscursus fusce odio purus sedporta vitaerutrum.",
    //     "date": "2023-12-23T03:00:00.000+0000",
    //     "status": true
    // },
    // {
    //     "id": "312125215",
    //     "name": "QWEQRTQ",
    //     "shortDesc": "Shot description",
    //     "fullDesc": "Full desctiption",
    //     "date": "1998-12-12T03:00:00.000+0000",
    //     "status": true
    // }
]


$(function () {

    $("button").button()
        .bind('mouseup', () => {
            $(this).blur()

        })

    $("#dialog").dialog({
        autoOpen: false,
        draggable: false,
        resizable: false,
        width: 450,
        height: 500,
        open: function(event, ui)
        {
            $('.ui-widget-overlay').bind('click', function() {
                $("#dialog").dialog('close')
            })
        }
    })

    $("#sort-checkbox").click(el => {
        let target = el.target
        let order = target.checked ? -1 : 1
        todos = todos.sort((a, b) => {
            let x = a["date"], y = b["date"]
            return ((x < y) ? -1 : ((x > y) ? 1 : 0)) * order
        })
        renderFormattedTodoList(todos)
    })

    $("#today-todo").click(() => {
        let dateTime = MyDateParser.getTodayDateTime()
        Api.findByDateRange(dateTime, dateTime, data => {
            todos = data
            renderFormattedTodoList(todos)
        })
        resetStates("", new Date().toLocaleDateString(), null, false)
    })

    $("#week-todo").click(() => {
        let {from, to} = MyDateParser.getCurrentWeekRange()
        Api.findByDateRange(from.getTime(), to.getTime(), data => {
            todos = data
            renderFormattedTodoList(todos)
        })

        let rangeStart = from.toLocaleDateString()
        let rangeEnd = to.toLocaleDateString()
        resetStates("", `${rangeStart} - ${rangeEnd}`, null, false)
    })

    $("#only-finished-todo").click(() => {
        let status = $("#only-finished-todo").is(":checked")
        if (!status) {

            Api.findAll(data => {
                todos = data
                renderFormattedTodoList(todos)
            })
            return
        }
        Api.findUnfinishedTasks(data => {
            todos = data
            renderFormattedTodoList(todos)
        })
        resetStates("", "", [], null)
    })

    searchButton.click(() => {
        let searchText = searchInput.val()
        if (searchText.length === 0) {
            Api.findAll(data => {
                todos = data
                renderFormattedTodoList(todos)
            })
        } else {
            Api.findByName(searchText, (data) => {
                if (searchText.length === 0) todos = []
                else todos = data
                renderFormattedTodoList(todos)
            })
        }

        resetStates(null, "", [], false)

    })

})



