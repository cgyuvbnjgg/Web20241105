// 定义一个函数来设置每个待办事项列表
function setupTodo(inputId, ulId) {
	const input = document.getElementById(inputId);
	const todosUL = document.getElementById(ulId);

	// 初始化本地存储中的待办事项
	let todos = JSON.parse(localStorage.getItem(ulId)) || [];

	// 如果本地存储中有待办事项，则添加到列表中
	todos.forEach((todo) => addTodo(todo, todosUL));

	// 为输入框添加键盘事件监听器，以便在按下Enter键时添加待办事项
	input.addEventListener("keypress", (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			addTodo({ text: input.value, completed: false }, todosUL);
			input.value = "";
		}
	});
}

// 修改addTodo函数以接受额外的参数
function addTodo(todo, todosUL) {
	let todoText = todo.text;

	if (todoText) {
		const todoEl = document.createElement("li");
		if (todo.completed) {
			todoEl.classList.add("completed");
		}

		todoEl.innerText = todoText;

		todoEl.addEventListener("click", () => {
			todoEl.classList.toggle("completed");
			updateLS(todosUL.id);
		});

		todoEl.addEventListener("contextmenu", (e) => {
			e.preventDefault();
			todoEl.remove();
			updateLS(todosUL.id);
		});

		todosUL.appendChild(todoEl);
		updateLS(todosUL.id);
	}
}

// 修改updateLS函数以接受ulId参数
function updateLS(ulId) {
	const todosEl = document.querySelectorAll(`#${ulId} li`);
	const todos = [];

	todosEl.forEach((todoEl) => {
		todos.push({
			text: todoEl.innerText,
			completed: todoEl.classList.contains("completed"),
		});
	});

	localStorage.setItem(ulId, JSON.stringify(todos));
}

// 为每个输入框和无序列表设置事件监听器
setupTodo("input1", "todos1");
setupTodo("input2", "todos2");
setupTodo("input3", "todos3");
setupTodo("input4", "todos4");
