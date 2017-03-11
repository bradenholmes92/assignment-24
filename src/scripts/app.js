import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';

//Bubba helped me get it functioning properly in terms of deleting
//the items from the list. Owe him big for sticking it out with me,
// gotta give credit where it's due. Also got the basic layout of all
//the JSX from your demo.


const ToDoListPage = React.createClass({
   getInitialState: function(){
	 	return {
	 		theToDoList: []
	 	}
	 },
   _removeToDoItem: function(indexToDo){
     let toDoDeleteCopy = this.state.theToDoList.filter(function(copy, index){
       if(index === indexToDo){
         return false

       }else {
         return true
       }
     })
	 	this.setState({
	 		theToDoList: toDoDeleteCopy
	 	})

   },

   _updateToDoList: function(newToDo){
     let toDoListArrayCopy = this.state.theToDoList.map(function(copy){return copy})
  		toDoListArrayCopy.push(newToDo)
	 	this.setState({
	 		theToDoList: toDoListArrayCopy
	 	})
   },
   _createToDoThings: function(arrayOfToDoObjects){
     let self = this
    let toDoArray = arrayOfToDoObjects.map(function(objToDo, index){
      return (
          <ToDoItem objToDo={objToDo} index={index} removeItem={self._removeToDoItem} />
      )

    })
    return toDoArray
  },

  render: function(){
    console.log('this.state.theToDoList :',this.state.theToDoList)
    return (
    <div>
      <h1>To Do List</h1>
      <InputComponent updateToDoCb={this._updateToDoList}/>
     <hr/>
     <div className="todo_stuff">
      <h3 className="bg-info"></h3>
      {this._createToDoThings(this.state.theToDoList)}

    </div>

    </div>
		)
  }
})

const InputComponent = React.createClass({
  _handleNewToDo: function(){
    let newObjToDo = {
      item: this.refs.toDoInput.value
    }

    this.props.updateToDoCb(newObjToDo)
    this.refs.toDoInput.value = ''

  },

  render: function(){

    return (
      <div className="input-box">
        <input ref="toDoInput" type='text' className="form-control"/>
				<button className="btn btn-success btn-lg" onClick={this._handleNewToDo}>
 					<i className="fa fa-plus"/>+
				</button>
      </div>
    )
  }


})

const ToDoItem = React.createClass({

  _handleRemove: function(){
    console.log(this.props.index)

    this.props.removeItem(this.props.index)
  },

  render: function(){
    return(
      <div>
        <h3> {this.props.objToDo.msg}</h3>
        <h3 className="text-right">
          <cite>{this.props.objToDo.item}</cite>
           <button type="button" class="close" onClick={this._handleRemove} aria-label="Close"><span aria-hidden="true">&times;</span></button>
        </h3>
      </div>
    )
  },


})




ReactDOM.render(<ToDoListPage/>, document.querySelector('#app-container'));
