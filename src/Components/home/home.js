import React from 'react'
import './home.css'
import { Table } from 'react-bootstrap'
import { browserHistory } from 'react-router'
import { getTransformers, deleteTransformer } from '../../services/api';

export default class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      list: []
    }
  }

  componentWillMount ()  {
    this.getData();
  }

  getData =  async() => {
    let values = await getTransformers();
    if (values) {
      let arr = values
      this.setState({ list: arr })
    }
  }

  add () {
    browserHistory.push('/add')
  }

  deleteValue = value => {
    let items = this.state.list.filter(obj => {
      return obj.id !== value.id
    })
    deleteTransformer(value.id);
    this.setState({ list: items })
  }

  searchHandler = async (event) => {
    let value = event.target.value;

    let storageArray = await getTransformers();
    let items = storageArray.filter(val => {
      return val.name.toLocaleLowerCase().indexOf(value) !== -1
    })
    this.setState({ list: items, searchValue: value })
  }

  filterHandler = async(event) => {
    let value = event.target.value;

    if (value === 'All') {
      let storageArray = await getTransformers();
      this.setState({ list: storageArray })
    } else {
      let storageArray = await getTransformers();
      let items = storageArray.filter(val => {
        return val.status === value
      })
      this.setState({ list: items })
    }
  }

  editValue (value) {
    browserHistory.push(`/edit/${value.id}`)
  }

  render () {
    return (
      <div className='jumbotron'>
        <div className='add-btn-div'>
          <button
            className='btn btn-primary add-btn'
            onClick={this.add.bind(this)}
          >
            Add
          </button>
        </div>
        <div>
          <hr className='center-line' />
        </div>
        <div className='fiter-container'>
          <div className='fiter-container-input'>
            <input
              type='text'
              className='form-control'
              id='name'
              placeholder='Search'
              value={this.state.searchValue}
              onChange={this.searchHandler.bind(this)}
            />
          </div>
          <div>
            <select
              className='custom-select mr-sm-2'
              onChange={this.filterHandler.bind(this)}
            >
              <option value='All'>All</option>
              <option value='OK'>OK</option>
              <option value='MIA'>MIA</option>
              <option value='INJURED'>INJURED</option>
            </select>
          </div>
        </div>
        <div>
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Status</th>
                <th>Weapons</th>
                <th>Vehicle Group</th>
                <th>Vehicle Type</th>
                <th>Vehicle Model</th>
              </tr>
            </thead>
            {this.state.list.map((data, index) => {
              return (
                <tbody key={index}>
                  <tr>
                    <td>{data.id}</td>
                    <td>{data.name}</td>
                    <td>{data.status}</td>
                    <td>{data.weapons}</td>
                    <td>{data.vehicleGroup}</td>
                    <td>{data.vehicleType}</td>
                    <td>{data.vehicleModel}</td>
                    <td>
                      <a className='icon' onClick={() => this.editValue(data)}>
                        <img
                          alt='My Awesome Image'
                          src={require('./../../assets/edit.svg')}
                        />
                      </a>
                    </td>
                    <td>
                      <a
                        className='icon'
                        onClick={() => this.deleteValue(data)}
                      >
                        <img
                          alt=' Awesome Image'
                          src={require('./../../assets/trash.svg')}
                        />
                      </a>
                    </td>
                  </tr>
                </tbody>
              )
            })}
          </Table>
        </div>
      </div>
    )
  }
}
