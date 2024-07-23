import { LightningElement } from 'lwc';

export default class TodoApplication extends LightningElement {
      taskname= '';
      taskdate = null;

      incompletetask = [];
      completetask = [];

    changeHandler(event){
      let{name,value} = event.target;
      if(name === 'taskname'){
         this.taskname = value;
      }
      else if (name === 'taskdate'){
        this.taskdate = value;
      }
    }


    resetHandler(){
        this.taskname = "";
        this.taskdate = null;
    }


    addTaskHandler(){
        if(!this.taskdate){
     this.taskdate = new Date().toISOString().slice(0,10);
        }
       if(this.validateTask()){
        this.incompletetask = [...this.incompletetask,{
          taskname:this.tagName,
          taskdate:this.taskdate
        }]
       } 
  }


    validateTask(){
      let isValid = true;
      //check if task name is empty
      if(!this.taskname){
        isValid = false;
      }else{
        let taskItem=this.incompletetask.find(
           currentItem =>currentItem.taskname === this.taskname &&
           currentItem.taskdate === this.taskdate
          );
          if(taskItem){
            isValid = false;
          }
      }
    }
}
