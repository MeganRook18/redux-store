import { renderTodos } from "./utils";
import * as fromStore from "./store";

const input = document.querySelector("input") as HTMLInputElement;
const button = document.querySelector("button") as HTMLButtonElement;
const destroy = document.querySelector(".unsubscribe") as HTMLButtonElement;
const todoList = document.querySelector(".todos") as HTMLLIElement;

const reducers = {
  todos: fromStore.reducer,
};

const store = new fromStore.Store(reducers);

button.addEventListener(
  "click",
  () => {
    if (!input.value.trim()) return;

    const payload = { label: input.value, complete: false };

    store.dispatch({
      type: fromStore.ADD_TODO,
      payload: payload,
    });
    // store.dispatch(new fromStore.AddTodo(payload)) <- this not working

    console.log(store.value);

    input.value = "";
  },
  false
);

const unsubscribe = store.subscrible((state) => {
  renderTodos(state.todos.data);
});

destroy.addEventListener("click", unsubscribe, false);

todoList.addEventListener("click", function (event) {
  const target = event.target as HTMLButtonElement;
  if (target.nodeName.toLowerCase() === "button") {
    const todo = JSON.parse(target.getAttribute("data-todo") as any);
    store.dispatch({
      type: fromStore.REMOVE_TODO,
      payload: todo,
    });

    // store.dispatch(new fromStore.RemoveTodo(todo));
  }
});

store.subscrible((state) => console.log("STATE: ", state));
