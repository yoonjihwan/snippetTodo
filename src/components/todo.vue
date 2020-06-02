<template>
    <div class="todo">
        <div class="todos-list">
            <ul class="todos-list-items">
                <draggable v-model="todos" @start="drag=true" @end="doUpdateOrder">
                    <li v-for="(item, $index) in todos" :key="`todo-${item.key}`" class="item">
                        <div class="round todo-handler">
                            <input type="checkbox" v-model="todos[$index].status" name="form_status" :id="`status-${item.key}`" @change="doUpdate($index)" >
                            <label :for="`status-${item.key}`" />
                        </div>
                        <div class="todo-memo" :class="{ complete : todos[$index].status }" @click="setEdit($index)">
                            <p>{{todos[$index].subject}}</p>
                            <p class="text">{{todos[$index].text}}</p>
                        </div>
                        <!--div class="todo-submit">
                            <button type="button" name="form_delete" @click="doDelete($index)">삭제</button>
                        </div-->
                    </li>
                </draggable>
            </ul>
        </div>
        <div class="todo-form">
            <div class="todo-content">
                <input type="hidden" v-model="todoForm.status" name="form_status" >
                <input type="text" v-model="todoForm.subject" name="form_subject" placeholder="Title" class="input" >
                <textarea name="form_text" class="textarea" v-model="todoForm.text" placeholder="Memo"/>
                <input type="date" v-model="todoForm.expireDate" name="form_date" class="input" placeholder="Expire Date" >
                <button type="button" class="todo-submit" @click="doWrite()">SUBMIT</button>
            </div>
        </div>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import util from "@/util"
import _ from 'lodash'

const defaultItem = () => {
  return {
      key: util.makeKey(), // 동일 item 검증
      subject: '',
      text : '',
      status : false, // (false)doing, (true)complete
      expireDate : null,
      registDate : new Date()
  }
}

export default {
  name: "Todo",
  components: {
      draggable,
  },
  data() {
    return {
      todos: [],
      todoForm: defaultItem(), // init
      drag: false,
      alarmId: null
    }
  },
  mounted() {    
    this.todos = this.$store.getters["allItems"]
    this.setAlarm()
  },
  methods: {
    doWrite() {
      this.$store.dispatch("setItem", this.todoForm);
      this.todoForm = defaultItem(); // initialize
      this.todos = [];
      this.$nextTick(function() {
        this.todos = this.$store.getters["allItems"];
      });
    },
    doUpdate(index) {
      this.$store.dispatch("setItem", this.todos[index]);
    },
    doDelete(index) {
      this.todos.splice(index, 1);
      this.$store.dispatch("fetchItems", this.todos);
    },
    doUpdateOrder() {
      this.drag = false
      this.$store.dispatch("fetchItems", this.todos);
    },
    setEdit(i) {
      this.todoForm = {
        key: this.todos[i].key,
        subject: this.todos[i].subject,
        text : this.todos[i].text,
        status : this.todos[i].status,
        expireDate : this.todos[i].expireDate,
        registDate : this.todos[i].registDate
      }
    },
    setAlarm() {
      let date = util.getDateFormat(new Date());
      let todo = _.find(this.todos, function(o) { return (o.expireDate === date && !o.status) });
      for(let i in this.todos){
        if(this.todos[i].expireDate === date && !this.todos[i].status){
          this.$toasted.show(`
            <p class="toast-title">[지난 할 일] ${todo.subject}</p>
          `)
        }
      }
    }
  }
}
</script>

<style scoped>
* {
  font-family: "Segoe","Segoe UI","Arial","sans-serif";
}
ul, ol, li, p {
  margin: 0;
  padding: 0;
}
div.todo {
  position: relative;
  max-width: 700px;
  height: 400px;
  margin: 0 auto;
}
.todo-form {
  width: 100%;
}
.todos-list-items{
  width: 100%;
  height: 600px;
}
.todos-list-items li {
  list-style: none;
  margin-bottom: 3px;
}
.todos-list-items li.item{
  width: 100%;
  height: 60px;
  border-radius: 6px;
  border-bottom: 1px solid #2f2f2f;
}
/* Content */
.todo-handler {
  float: left;
  width: 30px;
  margin: 15px 0px;
}
.todo-memo {
  float: left;
  width: calc(100% - 100px);
  padding: 9px 5px;
  border: 0px solid;
  text-align: left;
  color: #a5a5a5;
}
.todo-memo:hover {
  color: #FFF;
  cursor: pointer;
}
.todo-memo p {
  font-weight: 700;
  line-height: 20px;
}
.todo-memo p.text {
  font-weight: 400;
  font-size: 14px;
}
.todo-memo.complete {
  text-decoration: line-through;
}
.todo-content {
  width: 100%;
  float: left;
}
.todo-content .input, .todo-content .textarea {
  float: left;
  width: 100%;
  height: 30px;
  border: 0px solid;
  border-bottom: 1px solid #2f2f2f;
  background-color: #1b1b1b;
  outline: none;
  color: #a5a5a5;
}
.todo-content .textarea {
  height: 50px;
  overflow: hidden;
  resize: none;
}
.todo-submit {
  margin-top: 10px;
  width: 100%;
  height: 40px;
  background: transparent;
  border: 1px solid #2f2f2f;
  color: #a5a5a5;
}
.todo-submit:hover {
  border: 1px solid #a5a5a5;
  cursor: pointer;
}
/* todo form */

/* Round */
.round {
  display: inline-block;
  position: relative;
  width: 40px;
}
.round label {
  background-color: transparent;
  border: 1px solid #ccc;
  border-radius: 50%;
  cursor: pointer;
  height: 28px;
  left: 0;
  position: absolute;
  top: 0;
  width: 28px;
}
.round label:after {
  border: 2px solid #fff;
  border-top: none;
  border-right: none;
  content: "";
  height: 6px;
  left: 7px;
  opacity: 0;
  position: absolute;
  top: 8px;
  transform: rotate(-45deg);
  width: 12px;
}
.round input[type="checkbox"] {
  visibility: hidden;
}
.round input[type="checkbox"]:checked + label {
  background-color: #66bb6a;
  border-color: #66bb6a;
}
.round input[type="checkbox"]:checked + label:after {
  opacity: 1;
}

.toast-title {
  float:left;
  width: 100%;
  font-weight: 600;
}
.toast-subject {
  float:left;
  clear: left;
  width: 100%;
  font-weight: 400;
}
</style>
