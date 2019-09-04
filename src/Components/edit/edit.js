import React from 'react'
import './edit.css'
import { browserHistory } from 'react-router'
import { updateTransformer, getTransformers } from '../../services/api';

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

export default class Edit extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      weaponsValue: '',
      vehicleGroupValue: '',
      vehicleTypeValue: '',
      vehicleModelValue: '',
      statusValue: '',
      isEdit: false,
      editId: '',
      searchValue: '',
      vehicleGroup: Object.keys(dataObj),
      vehicleType: [],
      vehicleModel: [],
      list: []
    }
  }

  getTransformer =  async() => {
    var currentLocation = this.props.location.pathname.split('/')[2]
    let itemsArray = await getTransformers();
    let index = itemsArray.findIndex(
      val => val.id === parseInt(currentLocation)
    )
    let currentEditObj = itemsArray[index]
    this.setState({
      vehicleType: Object.keys(dataObj[currentEditObj.vehicleGroup]),
      vehicleModel:
        dataObj[currentEditObj.vehicleGroup][currentEditObj.vehicleType],
      name: currentEditObj.name,
      statusValue: currentEditObj.status,
      weaponsValue: currentEditObj.weapons,
      vehicleGroupValue: currentEditObj.vehicleGroup,
      vehicleModelValue: currentEditObj.vehicleModel,
      vehicleTypeValue: currentEditObj.vehicleType
    })
  }

  componentWillMount () {
    this.getTransformer();
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

  edit = async () => {
    let currentLocation = this.props.location.pathname.split('/')[2]
    let obj = {
      id: currentLocation,
      name: this.state.name,
      status: this.state.statusValue,
      weapons: this.state.weaponsValue,
      vehicleGroup: this.state.vehicleGroupValue,
      vehicleType: this.state.vehicleTypeValue,
      vehicleModel: this.state.vehicleModelValue
    }
    
    await updateTransformer(obj.id, obj);

    browserHistory.push('/home')
  }

  render () {
    return (
      <div className='jumbotron'>
        <p>{this.temp}</p>
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
                  placeholder='Enter Weapons'
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
                      //   disabled={!this.state.vehicleGroupValue}
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
                      //   disabled={!this.state.vehicleTypeValue}
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
              onClick={this.edit.bind(this)}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    )
  }
}
