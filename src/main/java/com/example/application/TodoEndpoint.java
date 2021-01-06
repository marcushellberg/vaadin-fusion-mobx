package com.example.application;

import java.util.List;

import com.vaadin.flow.server.connect.Endpoint;
import com.vaadin.flow.server.connect.auth.AnonymousAllowed;

import lombok.RequiredArgsConstructor;

@Endpoint
@AnonymousAllowed
@RequiredArgsConstructor
public class TodoEndpoint {
  private final TodoRepository repo;

  public List<Todo> getTodos() {
    return repo.findAll();
  }

  public Todo saveTodo(Todo todo) {
    return repo.save(todo);
  }
}
