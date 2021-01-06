package com.example.application;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Todo {
  @Id
  @GeneratedValue
  public Long id;
  public String task = "";
  public boolean done = false;
}
