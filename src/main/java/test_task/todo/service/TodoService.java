package test_task.todo.service;


import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import test_task.todo.dto.TaskEntity;

import java.util.List;
import java.util.stream.Stream;

@Service
public class TodoService {

    private final String uri = "https://todo.doczilla.pro";

    public List<TaskEntity> getAllTasks(Integer limit, Integer offset) {
        String endpoint = String.format("%s/api/todos?", uri);
        endpoint = setQueryParams(endpoint, limit, offset);
        return makeRequest(endpoint);
    }

    private String setQueryParams(String endpoint, Integer limit, Integer offset) {
        if (limit != null) {
            endpoint += String.format("&limit=%d", limit);
        }
        if (offset != null) {
            endpoint += String.format("&offset=%d", offset);
        }

        return endpoint;
    }

    public List<TaskEntity> getTasksByName(String name, Integer limit, Integer offset) {
        String endpoint = String.format("%s/api/todos/find?q=%s", uri, name);
        endpoint = setQueryParams(endpoint, limit, offset);
        return makeRequest(endpoint);
    }

    public List<TaskEntity> getUnfinishedTasks(Integer limit, Integer offset) {
        String endpoint = String.format("%s/api/todos", uri);
        List<TaskEntity> tasks = makeRequest(endpoint);
        Stream<TaskEntity> filteredTasks = tasks.stream()
                .filter(t -> !t.isStatus())
                .skip(offset);
        if (limit != 0) {
            return filteredTasks.limit(limit).toList();
        }
        return filteredTasks.toList();
    }

    public List<TaskEntity> getTasksByDateRange(Long from, Long to, Integer limit, Integer offset) {
        String endpoint = String.format("%s/api/todos/date?from=%s&to=%s", uri, from, to);
        endpoint = setQueryParams(endpoint, limit, offset);
        return makeRequest(endpoint);
    }

    private List<TaskEntity> makeRequest(String endpoint) {
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<List<TaskEntity>> result = restTemplate.exchange(endpoint, HttpMethod.GET, null, new ParameterizedTypeReference<>(){});
        return result.getBody();
    }

}
