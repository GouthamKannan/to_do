import { React, Component } from "react";

/**
 * Component for Todo application
 */
class Todo extends Component {
  /**
   * Intialize the task list of the component
   */
  constructor(props) {
    super(props);
    this.state = {
      task: "",
      error: {
        task: "",
      },
      touch: {
        task: false,
      },
      taskList: [],
    };
  }

  /**
   * Handle the change in input text field
   */
  handleChange = ({ target: { name, value } }) => {
    const error = { ...this.state.error };
    error.task = !value ? " Please enter a task" : "";
    this.setState({ ...this.state, [name]: value, error });
  };

  handleBlur = ({ target: { name } }) => {
    const touch = { ...this.state.touch, [name]: true };
    this.setState({ touch });
  };

  /**
   * Handle add button click
   */
  handleSubmit = (event) => {
    event.preventDefault();
    const touchList = Object.values(this.state.touch).filter((value) => !value);
    const errorList = Object.values(this.state.error).filter(
      (value) => value !== ""
    );
    if (!touchList.length && !errorList.length) {
      const task = {
        id: this.state.taskList.length
          ? this.state.taskList.slice(-1)[0].id + 1
          : 0,
        value: this.state.task,
        completed: false,
      };
      const taskList = this.state.taskList;
      taskList.push(task);
      const touch = { ...this.state.touch, task: false };
      this.setState({ ...this.state, task: "", touch, taskList });
    }
  };

  /**
   * Handle checking check boxes
   */
  handleCheck = (event, id) => {
    const task = this.state.taskList.filter((value) => value.id === id);
    task[0].completed = event.target.checked;
    const taskList = [...this.state.taskList];
    this.setState({ ...this.state, taskList });
  };

  /**
   * Handle remove button
   */
  handleDelete = (event, id) => {
    event.preventDefault();
    const taskList = this.state.taskList.filter((value) => value.id !== id);
    this.setState({ ...this.state, taskList });
  };

  // Render the input text field and list of tasks
  render() {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card card-white">
                <div className="card-body">
                  <h1 className="text-center pt-2 pb-4">TODO App</h1>
                  <form onSubmit={this.handleSubmit}>
                    <div className="row">
                      <div className="col-sm-1"></div>
                      <div className="form-group col-sm-9">
                        <input
                          type="text"
                          name="task"
                          placeholder="Enter a Task"
                          value={this.state.task}
                          onChange={this.handleChange}
                          onBlur={this.handleBlur}
                          required
                          className="form-control add-task mb-2"
                        ></input>
                        <span className="error">{this.state.error.task}</span>
                      </div>
                      <div className="col-sm-2">
                        <button
                          className="btn btn-primary btn-block"
                          type="submit"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </form>

                  <div className="todo-list">
                    {this.state.taskList !== []
                      ? this.state.taskList.map((task) => (
                          <div className="row">
                            <div className="col-sm-1"></div>
                            <div className="todo-item col-sm-10">
                              <div className="row">
                                <div className="col-sm-10">
                                  <input
                                    className="checker mx-2 align-middle"
                                    type="checkbox"
                                    onChange={(event) => {}}
                                    checked={task.completed ? true : false}
                                    id={task.id}
                                    onClick={(event) =>
                                      this.handleCheck(event, task.id)
                                    }
                                  ></input>
                                  <label
                                    className={
                                      task.completed
                                        ? "checked align-middle"
                                        : "align-middle"
                                    }
                                    for={task.id}
                                  >
                                    {task.value}
                                  </label>
                                </div>
                                <div className="col-sm-2">
                                  <button
                                    className="btn btn-primary"
                                    onClick={(event) =>
                                      this.handleDelete(event, task.id)
                                    }
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Todo;
