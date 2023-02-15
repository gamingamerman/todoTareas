const {createApp} = Vue;

createApp({
    data() {
        return{
            tasks: [
                
            ],
            newTask: '',
            newPriority:'low',
            filter: '',
            priority_options:['low','medium','high'],
            changedTasks: false,
        }
    },
    methods: {
        addTask() {
            let max = Math.max(0,...this.tasks.map(t=>t.id))
            this.tasks.push({
                id: max+1,
                name: this.newTask,
                priority: this.newPriority
            });
            this.newTask = ''
        },
        deleteTask(id) {
            // let index = this.tasks.indexOf(t => t.id == id)
            // this.tasks.splice(index,1);
            this.tasks = this.tasks.filter(t => t.id != id)
        },
        storageSave(){
            localStorage.tasks = JSON.stringify(this.tasks); 
        },
        updateTask(id)  {
            this.changedTasks = true
        }
    },
    computed: {
        taskSize() {
            this.changedTasks = true;
            return this.tasks.length;
        },
        searchTasks() {
            return this.tasks.filter(t => t.name.includes(this.filter))
        }
    },
    mounted() {
        this.tasks = localStorage.tasks ? JSON.parse(localStorage.tasks) : [];

    },
    watch: {
        newTask(newNewTask, oldNewTask) {
            newNewTask = newNewTask.toUpperCase();
            console.log('watched:' + newNewTask, oldNewTask)
        },
        taskSize() {
            if (this.changedTasks) localStorage.tasks = JSON.stringify(this.tasks);
            this.changedTasks = false;
            // this.tasks = newTasks;
        } 
    }
}).mount('#app')