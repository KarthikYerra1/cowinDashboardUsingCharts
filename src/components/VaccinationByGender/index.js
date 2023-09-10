import {PieChart, Pie, Legend, Cell} from 'recharts'

const VaccinationByGender = props => {
  const {details} = props

  const legendMargin = {top: 200, right: 30, bottom: 20, left: 30}

  return (
    <div className="graph-container pie-graph">
      <h1 className="graph-heading">Vaccination By Gender</h1>

      <PieChart width={1000} height={300}>
        <Pie
          cx="50%"
          cy="50%"
          data={details}
          startAngle={180}
          endAngle={0}
          innerRadius="40%"
          outerRadius="70%"
          dataKey="count"
        >
          <Cell name="Male" fill="#f54394" />
          <Cell name="Female" fill="#5a8dee" />
          <Cell name="Others" fill="#2cc6c6" />
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

export default VaccinationByGender
