import {PieChart, Pie, Legend, Cell} from 'recharts'

const VaccinationByAge = props => {
  const {details} = props

  const legendMargin = {top: 300, right: 30, bottom: 50, left: 30}

  return (
    <div className="graph-container">
      <h1 className="graph-heading">Vaccination By Age</h1>

      <PieChart width={1000} height={300}>
        <Pie
          cx="50%"
          cy="50%"
          data={details}
          startAngle={0}
          endAngle={360}
          dataKey="count"
        >
          <Cell name="18-44" fill="#5a8dee" />
          <Cell name="44-60" fill="#a3df9f" />
          <Cell name="Above 60" fill="#2cc6c6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="middle"
          align="center"
          wrapperStyle={legendMargin}
        />
      </PieChart>
    </div>
  )
}

export default VaccinationByAge
