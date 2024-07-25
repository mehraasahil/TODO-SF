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
      debugger
      // alert('working')
        if(!this.taskdate){
     this.taskdate = new Date().toISOString().slice(0,10);
        }
       if(this.validateTask()){
        this.incompletetask = [...this.incompletetask,
          {
          taskname:this.taskname,
          taskdate:this.taskdate
        }]
        console.log('completetask',JSON.stringify(this.incompletetask));
        this.resetHandler();
       let sortedArray =  this.sortTask(this.incompletetask);
       this.incompletetask = [...sortedArray]
       console.log(' this.incompletetask',JSON.stringify(this.incompletetask));
       }
        
  }


    validateTask(){
      let isValid = true;
      let element = this.template.querySelector('.taskname');
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
            element.setCustomValidity('Task is already avilable')
          }
      }
      if(isValid){
        element.setCustomValidity('');
      }
      element.reportValidity();
      return isValid
    }


    sortTask(inputArr){
      let sortedArray = inputArr.sort((a,b) =>{
        const dataA = new Date(a.taskdate);
        const dateB = new Date(b.taskdate);
        return dataA - dateB;
         
       })
       return sortedArray;
    }
     

    removeHandler(event){
      let index = event.target.value;
      this.incompletetask.splice(index,1);
      let sortedArray =  this.sortTask(this.incompletetask);
      this.incompletetask = [...sortedArray]
      console.log(' this.incompletetask',JSON.stringify(this.incompletetask))

    }

    completetaskHandler(event){
      let index = event.target.value;
      this.refreshData(index)
    }
      

    

    dragStartHandler(event){
      event.dataTransfer.setData("index",event.target.dataset.item)

    }
   allowDrop(event){
      event.preventDefault();
    }

    dropElementHandler(event){
      let index = event.dataTransfer.getData("index")
      this.refreshData(index)
    }

    refreshData(index){
      let removeItem =  this.incompletetask.splice(index,1);
      let sortedArray =  this.sortTask(this.incompletetask);
      this.incompletetask = [...sortedArray]
     
     this.completetask= [...this.completetask, removeItem[0]];
    }

}


