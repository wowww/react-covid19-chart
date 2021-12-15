import { useState, useEffect } from 'react'
import axios from 'axios'

const Contents = () => {

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

      </div>
    </section>
  )
}

export default Contents
