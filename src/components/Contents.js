import { useState, useEffect } from 'react'
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import axios from 'axios'

const Contents = () => {
  const [confirmedData, setConfirmedData] = useState({});
  
  useEffect (() => {
    const fetchEvents = async() => {
      const res = await axios.get("https://api.covid19api.com/total/dayone/country/kr")
      console.log(res)

    }

    fetchEvents()
  })

  return (
    <section>
      <h2>국내 코로나 현황</h2>
      <div className="contents">
        <div>
          <Bar 
            data={confirmedData}
            options={
              ({
                titile: {
                  display: true,
                  text: "누적 확진자 추이",
                  fontsize: 16
                }
              },
              { legend: { display: true, position: "bottom" } })
            }
          />
        </div>
      </div>
    </section>
  )
}

export default Contents
