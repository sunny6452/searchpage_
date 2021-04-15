import React, { useState, useRef, useCallback } from 'react';
import TodoTemplate from '../useState/components/TodoTemplate';
import TodoInsert from '../useState/components/TodoInsert';
import TodoList from '../useState/components/TodoList';

//많은 데이터 렌더링하기
function createBulkTodo() {
  const array = [];
  for (let i = 1; i <= 2500; i++) {
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false,
    });
  }
  return array;
}

const Test = () => {
  const [todos, setTodos] = useState(createBulkTodo);
  //고윳값으로 사용될 id
  //ref를 사용하여 변수 담기
  const nextId = useRef(2501);
  console.log('createBulkTodo', createBulkTodo);

  const onInsert = useCallback((text) => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    setTodos((todos) => todos.concat(todo));
    nextId.current += 1; // nextId 1씩 더하기
  }, []);

  const onRemove = useCallback((id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }, []);

  const onToggle = useCallback((id) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo,
      ),
    );
  }, []);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default Test;

/* 느려지는 원인 분석

  1. 자신이 전달받은 props가 변경될 때
  2. 자신의 state가 바뀔 때
  3. 부모 컴포넌트가 리렌더링될 때
  4. forceUpdate 함수가 실행될 때

  이럴 때 React.memo를 사용하여 컴포넌트 성능을 최적화 한다.
  (TodoListItem.js 참고)
*/
