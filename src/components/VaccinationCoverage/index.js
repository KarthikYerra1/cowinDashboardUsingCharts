import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'

import './index.css'

const VaccinationCoverage = props => {
  const {details} = props

  const DataFormatter = number => {
    const value = (number % 1500000) * 750
    return `${value.toString()}k`
  }

  return (
    <div className="graph-container">
      <h1 className="graph-heading">Vaccination Coverage</h1>

      <BarChart width={1000} height={300} data={details} margin={{top: 5}}>
        <XAxis
          dataKey="vaccineDate"
          tick={{
            stroke: '#cbd5e1',
            strokeWidth: 1,
          }}
        />
        <YAxis
          tickFormatter={DataFormatter}
          tick={{
            stroke: '#cbd5e1',
            strokeWidth: 1,
          }}
        />
        <Legend
          wrapperStyle={{
            padding: 30,
          }}
        />
        <Bar dataKey="dose1" name="Dose 1" fill="#2d87bb" barSize="15%" />
        <Bar dataKey="dose2" name="Dose 2" fill="#f54394" barSize="15" />
      </BarChart>
    </div>
  )
}

export default VaccinationCoverage
