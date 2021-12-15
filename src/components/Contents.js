import { useState, useEffect } from 'react'
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import axios from 'axios'

const Contents = () => {
  const [confirmedData, setConfirmedData] = useState({});
  const [quarantinedData, setQuarantinedData] = useState({});

  useEffect (() => {
    const fetchEvents = async() => {
      const res = await axios.get("https://api.covid19api.com/total/dayone/country/kr")
      makeData(res.data)
    }

    const makeData = (items) => {
      const arr = items.reduce((acc, cur) => {
        const currentDate = new Date(cur.Date);
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const date = currentDate.getDate();
        const confirmed = cur.Confirmed;
        const active = cur.Active;
        const death = cur.Deaths;
        const recovered = cur.Recovered;

        const findItem = acc.find(a => a.year === year && a.month === month);

        if (!findItem) {
          acc.push({ year, month, date, confirmed, active, death, recovered })
        }

        if ( findItem && findItem.date < date ) {
          findItem.active = active;
          findItem.death = death;
          findItem.date = date;
          findItem.year = year;
          findItem.month = month;
          findItem.confirmed = confirmed;
          findItem.recovered = recovered;
        }

        return acc
      }, [])

      const labels = arr.map(a => `${a.month+1}월`);

      setConfirmedData({
        labels,
        datasets: [
          {
            label: "국내 누적 확진자",
            backgroundColor: "salmon",
            fill: true,
            data: arr.map(a => a.confirmed)
          }

        ],
      });

      console.log(arr)
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

          <Line 
            data={quarantinedData}
            options={
              ({
                titile: {
                  display: true,
                  text: "월별 격리자 현황",
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
