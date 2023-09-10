import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    last7DaysVaccinationData: [],
    vaccinationByAge: [],
    vaccinationByGender: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(apiUrl)
    if (response.ok) {
      const fetchedData = await response.json()
      const last7DaysVaccinationData = fetchedData.last_7_days_vaccination.map(
        each => ({
          vaccineDate: each.vaccine_date,
          dose1: each.dose_1,
          dose2: each.dose_2,
        }),
      )
      const vaccinationByAge = fetchedData.vaccination_by_age
      const vaccinationByGender = fetchedData.vaccination_by_gender
      this.setState({
        last7DaysVaccinationData,
        vaccinationByAge,
        vaccinationByGender,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderCharts = () => {
    const {
      last7DaysVaccinationData,
      vaccinationByAge,
      vaccinationByGender,
    } = this.state

    return (
      <>
        <VaccinationCoverage details={last7DaysVaccinationData} />
        <VaccinationByGender details={vaccinationByGender} />
        <VaccinationByAge details={vaccinationByAge} />
      </>
    )
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-text">Something went wrong</h1>
    </div>
  )

  renderData() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCharts()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <div className="app-container">
          <div className="logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
              className="logo-img"
            />
            <h1 className="logo-name">Co-WIN</h1>
          </div>
          <h1 className="heading">CoWin Vaccination in India</h1>
          {this.renderData()}
        </div>
      </div>
    )
  }
}

export default CowinDashboard
