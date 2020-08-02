// 获取DOM 结点
const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const filter = document.querySelector("#filter");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");

//加载所有监听事件

//加载所有监听事件函数(ES6语法)
const loadEventListeners = () => {
    //DOM加载完毕后，执行
    document.addEventListener("DOMContentLoaded",getTask);

    //添加任务事件
    form.addEventListener("submit",addTask);

    //删除任务事件(单个)
    taskList.addEventListener("click",removeTask);

    //删除所有任务事件
    clearBtn.addEventListener("click",clearTasks);

    //过滤任务事件
    //keyup:放开鼠标就触发过滤器
    filter.addEventListener("keyup",filterTasks);

}

//getTask()
const getTask = task => {
    let tasks;
    if(localStorage.getItem("tasks") == null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    //渲染到页面
    tasks.forEach(task =>{
        const li = document.createElement("li");
        li.className = "collection-item";
        li.appendChild(document.createTextNode(task));
        const link = document.createElement("a");
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-times"></i>';
        li.appendChild(link);
        taskList.appendChild(li);

    })

}




//添加任务
const addTask = e =>{
    //判断输入框是否为空
    if(taskInput.value === ""){
        alert("Add a Task");
    }else{
        //创建li结点
        const li = document.createElement("li");
        //给li结点添加类名（样式）
        li.className = "collection-item";
        //给li结点添加文本内容 <li class="collection-item">文本内容(taskInput.value)</li>
        li.appendChild(document.createTextNode(taskInput.value));
        //创建a标签
        const link = document.createElement("a");
        //给a标签添加类名（样式）
        link.className = 'delete-item secondary-content';
        //添加字体图标
        link.innerHTML = '<i class="fa fa-times"></i>';
        //将a标签插入li结点中
        //<li class="collection-item">文本内容(taskInput.value)<a href="" class="delete-item secondary-content"><i class="fa fa-times"></i></a></li>
        li.appendChild(link);
        //将li元素插入到ul中
        taskList.appendChild(li);

        //将任务进行本地储存
        storeTaskInLocalStorage(taskInput.value);

        //清除input
        taskInput.value = "";
    }

    e.preventDefault();
}

//storeTaskInLocalStorage();
//task是我们添加的内容
const storeTaskInLocalStorage = task => {
    let tasks;
    //判断本地储存是否为空
    //若为空，将tasks设置为空数组
    if(localStorage.getItem('tasks') == null){
        tasks = [];
    }else{  //不为空，将获得的任务赋值给tasks数组
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    //将task添加到tasks数组中
    tasks.push(task);
    //将tasks数组的内容添加到本地仓库
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//removeTask
const removeTask = e =>{
    //e.target：可以获得当前点击的对象i标签
   // console.log(e.target);
   //可以通过i标签来获得a标签
   //再通过a标签来获得li标签，从而实现删除任务
   if(e.target.parentElement.classList.contains("delete-item")){
      // console.log(e.target);
     if(confirm("Are You Sure")){
        e.target.parentElement.parentElement.remove();
        //删除本地储存任务(删除li元素)
        removeTaskInLocalStorage(e.target.parentElement.parentElement);
    }
     } 
}

//removeTaskInLocalStorage删除本地存储任务
// taskItem相当于li标签
const removeTaskInLocalStorage = taskItem => {
    let tasks;
    if(localStorage.getItem("tasks") == null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem("tasks"));//将字符串转化为数组
    }
    //判断taskItem跟本地储存里面的的task是否一致
    //获取li的文本内容
    tasks.forEach((task,index) =>{
        if(taskItem.textContent === task){
            tasks.splice(index,1);//splice删除：index:开始的位置，1：删除一个
        }
        //重新更新本地存储
        localStorage.setItem("tasks",JSON.stringify(tasks));//数组转化为字符串
    })

}

//clearTasks

const clearTasks = () =>{
    //方法一
  //  taskList.innerHTML = "";

    //方法二(更高效)
    //循环删除taskList的firstChild
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    //删除所有本地储存任务
    removeTasksFromLocalStorage();
}

//删除所有本地储存任务
const removeTasksFromLocalStorage = () => {
    localStorage.clear();
}

//filterTasks
const filterTasks = e =>{
    //获取过滤输入框的内容
    const text =  e.target.value.toLowerCase();

    //获取所有的li：document.querySelectorAll(".collection-item")
    //遍历所有li,判断li里面的文本内容(item)是否与text的一致
    //indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置
    document.querySelectorAll(".collection-item").forEach(task => {
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text)!=-1){
            task.style.display = "block";//显示li
        }else{
            task.style.display = "none"; //隐藏li
        }

    })
}

//使用ES6语法，需要先定义函数，再调用
loadEventListeners();