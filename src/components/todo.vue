<template>
    <div class="todo">
        <div class="todos-list">
            <ul class="todos-list-items">
                <draggable v-model="todos" @start="drag=true" @end="drag=false">
                    <li v-for="(item, $index) in todos" :key="`todo-${item.key}`" class="item">
                        <input type="checkbox" v-model="todos[$index].status" name="form_status" @blur="doUpdate($index)" >
                        <input type="text" name="form_subject" v-model="todos[$index].subject" @blur="doUpdate($index)" >
                        <input type="text" name="form_text" v-model="todos[$index].text" @blur="doUpdate($index)" >
                        <input type="date" name="form_date" v-model="todos[$index].expireDate" @blur="doUpdate($index)" >
                        <button type="button" name="form_delete" @click="doDelete($index)">삭제</button>
                    </li>
                </draggable>
            </ul>
        </div>
        <div class="todo-form">
            <input type="checkbox" v-model="todoForm.status" name="form_status" >
            <input type="text" v-model="todoForm.subject" name="form_subject" >
            <input type="text" v-model="todoForm.text" name="form_text" >
            <input type="date" v-model="todoForm.expireDate" name="form_date" >
            <button type="button" @click="doWrite()">작성</button>
        </div>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import util from "@/util"

const defaultItem = () => {
  return {
      key: util.makeKey(), // 동일 item 검증
      subject: '',
      text : '',
      status : false, // (false)doing, (true)complete
      expireDate : null,
      registDate : util.getDateFormat(new Date())
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
      drag: false
    }
  },
  mounted() {    
    this.todos = this.$store.getters["allItems"]
  },
  methods: {
    doWrite() {
      this.$store.dispatch("setItem", this.todoForm);
      this.todoForm = defaultItem(); // initialize
    },
    doUpdate(index) {
      this.$store.dispatch("setItem", this.todos[index]);
    },
    doDelete(index) {
      this.todos.splice(index, 1);
      this.$store.dispatch("fetchItems", this.todos);
    }
  }
}
</script>

<style scoped>
div.todo {
  position: relative;
  max-width: 700px;
  height: 400px;
  margin: 0 auto;
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
  min-height: 40px;
  line-height: 40px;
  background-color: #f6f8fa;
  border-radius: 6px;
}
</style>
