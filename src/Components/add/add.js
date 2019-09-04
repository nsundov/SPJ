import React from 'react'
import './Add.css'
import { browserHistory } from 'react-router'
import '../../services/api'
import { addTransformer, getTransformers } from '../../services/api';

let dataObj = {
  air: {
    plane: ['Boeing 737', 'Boeing 747'],
    helicopter: ['Bell', 'Eurocopter']
  },
  ground: {
    car: ['Porsche', 'Lamborghini'],
    truck: ['Man', 'Volvo']
  }
}

export default class Add extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      vehicleGroupValue: '',
      vehicleTypeValue: '',
      vehicleModelValue: '',
      statusValue: '',
      weaponsValue: '',
      isEdit: false,
      editId: '',
      searchValue: '',
      vehicleGroup: Object.keys(dataObj),
      vehicleType: [],
      vehicleModel: [],
      list: []
    }
  }
  componentWillMount () {
    let values = getTransformers();
    if (values) {
      this.setState({ list: values })
    }
  }
  inputNameHandler (event) {
    this.setState({ name: event.target.value })
  }

  inputWeaponsHandler (event) {
    this.setState({ weaponsValue: event.target.value })
  }

  onValueChange (event) {
    let d = event.target.value
    this.setState({
      vehicleGroupValue: event.target.value,
      vehicleType: Object.keys(dataObj[d])
    })
  }

  vehicleGroupHandler (event) {
    let d = event.target.value
    this.setState({
      vehicleTypeValue: event.target.value,
      vehicleModel: dataObj[this.state.vehicleGroupValue][d]
    })
  }

  vehicleTypeHandler (event) {
    this.setState({
      vehicleModelValue: event.target.value
    })
  }

  statusValueHandler (event) {
    this.setState({
      statusValue: event.target.value
    })
  }

  add () {
    let items = []
    items = this.state.list
    if (
      this.state.name &&
      this.state.statusValue &&
      this.state.weaponsValue &&
      this.state.vehicleGroupValue &&
      this.state.vehicleTypeValue &&
      this.state.vehicleModelValue
    ) {
      let submit = {
        id: items.length + 1,
        name: this.state.name,
        status: this.state.statusValue,
        weapons: this.state.weaponsValue,
        vehicleGroup: this.state.vehicleGroupValue,
        vehicleType: this.state.vehicleTypeValue,
        vehicleModel: this.state.vehicleModelValue
      }
      addTransformer(submit);
      this.setState({
        list: items,
        name: '',
        statusValue: '',
        weaponsValue: '',
        vehicleGroupValue: '',
        vehicleTypeValue: '',
        vehicleModelValue: ''
      })
      browserHistory.push('/home')
    }
    else{
      alert('Enter all required info!')
    }
  }
  searchHandler (event) {
    let storageArray = getTransformers();
    let items = storageArray.filter(val => {
      return val.name.toLocaleLowerCase().indexOf(event.target.value) !== -1
    })
    this.setState({ list: items, searchValue: event.target.value })
  }

  filterHandler (event) {
    if (event.target.value === 'All') {
      let storageArray = getTransformers();
      this.setState({ list: storageArray })
    } else {
      let storageArray = getTransformers();
      let items = storageArray.filter(val => {
        return val.status === event.target.value
      })
      this.setState({ list: items })
    }
  }

  render () {
    return (
      <div className='jumbotron'>
        <div>
          <div className='row'>
            <div className='col-md-2'>Name:</div>
            <div className='col-md-10'>
              <div>
                <input
                  type='text'
                  className='form-control'
                  id='name'
                  placeholder='Enter Name'
                  value={this.state.name}
                  onChange={this.inputNameHandler.bind(this)}
                />
              </div>
              <div>
                <input
                  type='text'
                  className='form-control'
                  id='name'
                  placeholder='Enter weapons'
                  value={this.state.weaponsValue}
                  onChange={this.inputWeaponsHandler.bind(this)}
                />
              </div>
              <div className='row  dropdown-buttons'>
                <div className='col-md-3'>
                  <div className='col-auto my-1'>
                    <select
                      className='custom-select mr-sm-2'
                      value={this.state.statusValue}
                      onChange={this.statusValueHandler.bind(this)}
                    >
                      <option>Select Status</option>
                      <option value='OK'>OK</option>
                      <option value='MIA'>MIA</option>
                      <option value='INJURED'>INJURED</option>
                    </select>
                  </div>
                </div>
                <div className='col-md-3'>
                  <div className='col-auto my-1'>
                    <select
                      disabled={!this.state.statusValue}
                      className='custom-select mr-sm-2'
                      value={this.state.vehicleGroupValue}
                      onChange={this.onValueChange.bind(this)}
                    >
                      <option>Select vehicle Group</option>
                      {this.state.vehicleGroup.map((data, index) => {
                        return (
                          <option key={index} value={data}>
                            {data}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                </div>
                <div className='col-md-3'>
                  <div className='col-auto my-1'>
                    <select
                      disabled={!this.state.vehicleGroupValue}
                      className='custom-select mr-sm-2'
                      value={this.state.vehicleTypeValue}
                      onChange={this.vehicleGroupHandler.bind(this)}
                    >
                      <option>Select vehicle type</option>
                      {this.state.vehicleType.map((data, index) => {
                        return (
                          <option key={index} value={data}>
                            {data}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                </div>
                <div className='col-md-3'>
                  <div className='col-auto my-1'>
                    <select
                      className='custom-select mr-sm-2'
                      disabled={!this.state.vehicleTypeValue}
                      value={this.state.vehicleModelValue}
                      onChange={this.vehicleTypeHandler.bind(this)}
                    >
                      <option>Select vehicle Model</option>
                      {this.state.vehicleModel.map((data, index) => {
                        return (
                          <option key={index} value={data}>
                            {data}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='add-btn-div'>
            <button
              className='btn btn-primary add-btn'
              onClick={this.add.bind(this)}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    )
  }
}
