class Task {
    constructor(name, duration) {
        this.name = name;
        this.duration = duration;
        this.dependencies = [];
        this.EST = 0; 
        this.EFT = 0; 
        this.LST = Infinity; 
        this.LFT = Infinity; 
    }

    addDependency(task) {
        this.dependencies.push(task);
    }
}

function SortTasks(tasks) {
    const visited = new Set();
    const stack = [];

    function dfs(task) {
        if (visited.has(task)) return;
        visited.add(task);
        task.dependencies.forEach(dep => dfs(dep));
        stack.push(task);
    }

    tasks.forEach(task => dfs(task));
    return stack.reverse();
}

function EstimateEarliestTime(sortedTasks) {
    sortedTasks.forEach(task => {
        task.EFT = task.EST + task.duration;
        task.dependencies.forEach(dep => {
            dep.EST = Math.max(dep.EST, task.EFT);
        });
    });
}

function EstimateLatestTime(sortedTasks) {
    const projectCompletionTime = Math.max(...sortedTasks.map(task => task.EFT));
    
    sortedTasks.reverse().forEach(task => {
        if (task.LFT === Infinity) task.LFT = projectCompletionTime;
        task.LST = task.LFT - task.duration;
        task.dependencies.forEach(dep => {
            dep.LFT = Math.min(dep.LFT, task.LST);
        });
    });
}

function finalProjectDuration(tasks) {
    const sortedTasks = SortTasks(tasks);

    EstimateEarliestTime(sortedTasks);

    EstimateLatestTime(sortedTasks);

    const earliestCompletion = Math.max(...sortedTasks.map(task => task.EFT));
    const latestCompletion = Math.max(...sortedTasks.map(task => task.LFT));

    return {
        earliestCompletion,
        latestCompletion
    };
}

const taskA = new Task('A', 4);
const taskB = new Task('B', 2);
const taskC = new Task('C', 3);

taskB.addDependency(taskA); 
taskC.addDependency(taskB);

const tasks = [taskA, taskB, taskC];

const { earliestCompletion, latestCompletion } = finalProjectDuration(tasks);

console.log(`Earliest Completion Time: ${earliestCompletion}`);
console.log(`Latest Completion Time: ${latestCompletion}`);
