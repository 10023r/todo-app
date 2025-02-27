package test_task.todo.dto;

import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class TaskEntity {
    String id;
    String name;
    String shortDesc;
    String fullDesc;
    String date;
    boolean status;
}
