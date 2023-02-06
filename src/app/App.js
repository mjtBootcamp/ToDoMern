import React, { Component } from 'react';

class App extends Component {

  constructor() {//Inicia el componente con state vacio, y binde los metodos onchange y addtask
    super();
    this.state = {
      title: '',
      description: '',
      _id: '',
      tasks: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  handleChange(e) { //Onchange recupera datos y los manda al state
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  addTask(e) {
    //Si id existe se manda GET de ella,
    e.preventDefault();
    if(this.state._id) {// se manda el estado al cuerpo (la ruta GET consulta a la BD), 
      //se notifica al usuario, se limpia el estado, y se refrescan todas las tareas
      fetch(`/api/tasks/${this.state._id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: this.state.title,
          description: this.state.description
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          window.M.toast({html: 'Tarea actualizada'});
          this.setState({_id: '', title: '', description: ''});
          this.fetchTasks();
        });
    } else { //Si id no existe se manda POTS, se manda el estado al cuerpo (la ruta POST escribe en la BD), 
              //se notifica al usuario, se limpia el estado, y se refrescan todas las tareas
      fetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          window.M.toast({html: 'Tarea guardada'});
          this.setState({title: '', description: ''});
          this.fetchTasks();
        })
        .catch(err => console.error(err));
    }

  }

  deleteTask(id) { //Envia y valida confirmacion, manda id como DELETE
    // (la ruta DELETE Elimina de la BD) se notifica al usuario, y se refrescan todas las tareas
    if(confirm('Quieres borrar la tarea?')) {
      fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          M.toast({html: 'Task deleted'});
          this.fetchTasks();
        });
    }
  }

  editTask(id) {//Manda peticion get de tarea especifica, en addData se edita ya que tiene id
    fetch(`/api/tasks/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          title: data.title,
          description: data.description,
          _id: data._id
        });
      });
  }

  componentDidMount() {//Ver tareas cuando la aplucación se cargue
    this.fetchTasks();
  }

  fetchTasks() {
    fetch('/api/tasks')//GET todas las tareas, las asigna al estado
      .then(res => res.json())
      .then(data => {
        this.setState({tasks: data});
        console.log("state",this.state.tasks);
      });
  }

  render() {
    return (
      <div>
        <nav className="light-blue darken-4"> <div className="container"> <div className="nav-wrapper">
              <a href="#" className="brand-logo">ToDo MERN Stack</a>
          </div> </div> </nav>
        <div className="container"> <div className="row"> <div className="col s5"> <div className="card"> <div className="card-content">
                  <form onSubmit={this.addTask}>
                    <div className="row"> <div className="input-field col s12">
                        <input name="title" onChange={this.handleChange} value={this.state.title} type="text" placeholder="Titulo de la tarea" autoFocus/>
                      </div> </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea name="description" onChange={this.handleChange} value={this.state.description} cols="30" rows="10" placeholder="Descripcion de la tarea" className="materialize-textarea"></textarea>
                      </div> </div>
                    <button type="submit" className="btn light-blue darken-4"> Enviar </button>
                  </form>
                </div></div></div>
            <div className="col s7">
              <table>
                <thead><tr><th>Titulo</th><th>Descripcion</th></tr></thead>
                 <tbody>
                  { this.state.tasks.map(task => {
                      return (
                        <tr key={task._id}>
                          <td>{task.title}</td>
                          <td>{task.description}</td><td>
                            <button onClick={() => this.deleteTask(task._id)} className="btn light-blue darken-4"><i className="material-icons">delete</i> </button>
                            <button onClick={() => this.editTask(task._id)} className="btn light-blue darken-4" style={{margin: '4px'}}><i className="material-icons">edit</i></button>
                          </td></tr>
                      )})}
                </tbody>
              </table>
            </div> </div> </div> </div>
    )
  }
}
export default App;