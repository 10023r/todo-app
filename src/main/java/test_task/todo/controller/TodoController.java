package test_task.todo.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import test_task.todo.dto.TaskEntity;
import test_task.todo.service.TodoService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TodoController {

    TodoService service;

    TodoController(TodoService service) {
        this.service = service;
    }

    @GetMapping("/todos")
    public List<TaskEntity> getAllTodos(
            @RequestParam(required = false) Integer limit,
            @RequestParam(required = false) Integer offset
    ) {
        return service.getAllTasks(limit, offset);
    }

    @GetMapping("/todos/find")
    public List<TaskEntity> getTodoByName(
            @RequestParam String name,
            @RequestParam(required = false) Integer limit,
            @RequestParam(required = false) Integer offset
    ) {
        return service.getTasksByName(name, limit, offset);
    }

    @GetMapping("/todos/unfinished")
    public List<TaskEntity> getUnfinishedTodo(
            @RequestParam(defaultValue = "0") Integer limit,
            @RequestParam(defaultValue = "0") Integer offset
    ) {
        return service.getUnfinishedTasks(limit, offset);
    }

    @GetMapping("/todos/date")
    public List<TaskEntity> getByDateRange(
            @RequestParam Long from,
            @RequestParam Long to,
            @RequestParam(defaultValue = "0") Integer limit,
            @RequestParam(defaultValue = "0") Integer offset
    ){
        return service.getTasksByDateRange(from, to, limit, offset);
    }

    @GetMapping("hello")
    public String getHello() {
        return "Hello World";
    }
}
