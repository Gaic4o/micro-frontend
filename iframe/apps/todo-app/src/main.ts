import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <h1>할 일 목록</h1>
  <div id="todo-list" class="todo-list"></div>
  <input type="text" id="new-todo" placeholder="새로운 할 일 추가" />
  <button id="add-todo">추가</button>
`;

const todos = [
  { id: 1, text: "TypeScript 공부하기", completed: false },
  { id: 2, text: "Vite 프로젝트 설정하기", completed: true },
];

function renderTodos() {
  const listElement = document.querySelector<HTMLDivElement>("#todo-list")!;
  listElement.innerHTML = todos
    .map(
      (todo) => `
      <div class="todo-item ${todo.completed ? "completed" : ""}">
        <input type="checkbox" ${todo.completed ? "checked" : ""} data-id="${
        todo.id
      }" />
        <span>${todo.text}</span>
      </div>
    `
    )
    .join("");
}

document.getElementById("add-todo")!.addEventListener("click", () => {
  const inputElement = document.getElementById("new-todo") as HTMLInputElement;
  const newTodoText = inputElement.value.trim();
  if (newTodoText) {
    todos.push({ id: todos.length + 1, text: newTodoText, completed: false });
    renderTodos();
    inputElement.value = ""; // 입력 필드 초기화
  }
});

renderTodos();
