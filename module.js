{
    const form = document.querySelector('.createTaskForm');

    form.onsubmit = event => {
        event.preventDefault();

        const formData = new FormData(event.target);

        // task → input name
        const task = formData.get('task');

        console.log(task);

        addTask(task);
        form.reset();
    };

    const getUpdatedTemplate = task => `
        <div class="content">
            <button class="checkbox"></button>
            <input type="text" disabled value="${task}" class="taskInput"/>
        </div>
        <div class="actions">
            <button class="star"></button>
            <button class="edit"></button>
            <button class="remove"></button>
        </div>
    `;

    const addRemoveHandler = taskDom => {
        const removeDom = taskDom.querySelector('.remove');
        removeDom.onclick = () => taskDom.remove();
    };

    const addEditHandler = taskDom => {
        const editDom = taskDom.querySelector('.edit');
        editDom.onclick = () => {
            const input = taskDom.querySelector('.taskInput');
            const isDisabled = input.getAttribute('disabled') === null;

            if (isDisabled) {
                input.setAttribute('disabled', true);
            } else {
                input.removeAttribute('disabled');
            }
        };
    };

    const addFavoriteHandler = taskDom => {
        const starDom = document.querySelector('.star');
        starDom.onclick = () => {
            starDom.classList.toggle('selected');
        };
    };

    const addCompleteHandler = taskDom => {
        const checkboxDom = taskDom.querySelector('.checkbox');
        checkboxDom.onclick = () => {
            checkboxDom.classList.toggle('selected');
            taskDom.classList.toggle('completed');
        };
    };

    const addCompleteAllHandler = () => {
        const selectAllDom = document.querySelector('.selectAll');

        selectAllDom.onclick = () => {
            const tasks = document.querySelectorAll('.tasks li');

            tasks.forEach(task => {
                task.classList.add('completed');
                task.querySelector('.checkbox').classList.add('selected');
            });

            selectAllDom.classList.add('selected');
        };
    };

    const addTask = task => {
        const tasksDom = document.querySelector('.tasks');
        const taskDom = document.createElement('li');

        taskDom.innerHTML = getUpdatedTemplate(task);
        tasksDom.prepend(taskDom);

        addRemoveHandler(taskDom);
        addEditHandler(taskDom);
        addFavoriteHandler(taskDom);
        addCompleteHandler(taskDom);
    };

    addCompleteAllHandler();
}