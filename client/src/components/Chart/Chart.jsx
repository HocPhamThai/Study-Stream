import React, { useState, useEffect } from 'react'
import ReactApexChart from 'react-apexcharts'
import 'tailwindcss/tailwind.css'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

const getInitialChartConfig = () => ({
  series: [
    {
      name: 'Hours',
      data: [],
    },
  ],
  chart: {
    type: 'bar',
    height: 240,
    toolbar: {
      show: false,
    },
  },
  title: {
    show: '',
  },
  dataLabels: {
    enabled: false,
  },
  colors: ['#ffbe76'],
  plotOptions: {
    bar: {
      columnWidth: '40%',
      borderRadius: 2,
    },
  },
  xaxis: {
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    labels: {
      style: {
        colors: '#616161',
        fontSize: '12px',
        fontFamily: 'inherit',
        fontWeight: 400,
      },
    },
    categories: [], // Categories sẽ được cập nhật
  },
  yaxis: {
    labels: {
      style: {
        colors: '#616161',
        fontSize: '12px',
        fontFamily: 'inherit',
        fontWeight: 400,
      },
    },
  },
  grid: {
    show: true,
    borderColor: '#dddddd',
    strokeDashArray: 5,
    xaxis: {
      lines: {
        show: true,
      },
    },
    padding: {
      top: 5,
      right: 20,
    },
  },
  fill: {
    opacity: 0.8,
  },
  tooltip: {
    theme: 'dark',
  },
})

const Chart = () => {
  const [timeFrame, setTimeFrame] = useState('weekly')
  const [series, setSeries] = useState(getInitialChartConfig().series)
  const [options, setOptions] = useState(getInitialChartConfig)
  const [weekRange, setWeekRange] = useState('')
  const { user } = useSelector((state) => state.authReducer.authData)
  const { t } = useTranslation('analytics')

  useEffect(() => {
    const fetchWeekly = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/workingtime/${user._id}/weekly/daily`
        )
        const data = response.data

        if (timeFrame === 'weekly') {
          const processedData = processWeeklyData(data)
          setSeries([
            {
              name: 'Hours',
              data: processedData.map((item) => item.durationInHours),
            },
          ])
          setOptions((prevOptions) => ({
            ...prevOptions,
            xaxis: {
              ...prevOptions.xaxis,
              categories: processedData.map((item) => item.day),
            },
          }))
          const startDate = new Date(processedData[0].date)
          const endDate = new Date(processedData[processedData.length - 1].date)
          setWeekRange(
            `${startDate.toLocaleDateString(
              'vi-VN'
            )} -> ${endDate.toLocaleDateString('vi-VN')}`
          )
        }
      } catch (err) {
        console.log(err)
      }
    }

    const fetchMonthly = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/workingtime/${user._id}/monthly/daily`
        )
        const data = response.data

        if (timeFrame === 'monthly') {
          const processedData = processMonthlyData(data)
          setSeries([
            {
              name: 'Hours',
              data: processedData.map((item) => item.durationInHours),
            },
          ])
          setOptions((prevOptions) => ({
            ...prevOptions,
            xaxis: {
              ...prevOptions.xaxis,
              categories: processedData.map((item) => item.date),
            },
          }))
        }
      } catch (err) {
        console.log(err)
      }
    }

    if (timeFrame === 'weekly') {
      fetchWeekly()
    } else if (timeFrame === 'monthly') {
      fetchMonthly()
    }
  }, [timeFrame, user._id])

  const processWeeklyData = (data) => {
    return data.map((item) => {
      const date = new Date(item.date)
      const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' })
      const durationInHours = (item.duration / 3600).toFixed(0) // Chuyển đổi từ phút sang giờ và làm tròn đến 2 chữ số thập phân
      return { day: dayOfWeek, durationInHours, date }
    })
  }

  const processMonthlyData = (data) => {
    // Lấy các ngày 1, 3, 5, ...
    const specificDays = data.filter((item) => {
      const date = new Date(item.date).getDate()
      return date
    })

    return specificDays.map((item) => {
      const date = new Date(item.date)
      const options = { day: '2-digit', month: '2-digit' }
      const dateString = date.toLocaleDateString('vi-VN', options) // dd/MM format
      const durationInHours = (item.duration / 3600).toFixed(0) // Chuyển đổi từ phút sang giờ và làm tròn đến 2 chữ số thập phân
      return { date: dateString, durationInHours }
    })
  }

  return (
    <div className="relative flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md p-4">
      <div className="relative mx-4 mt-4 flex flex-col gap-4 overflow-hidden rounded-none bg-transparent bg-clip-border text-gray-700 shadow-none md:flex-row md:items-center">
        <div>
          <h6 className="block font-sans text-base font-semibold leading-relaxed tracking-normal text-blue-gray-900 antialiased">
            {t('Work hours')}
          </h6>
        </div>
      </div>
      <div className=" px-2 pb-0">
        <div className="flex justify-end mb-4">
          <select
            value={timeFrame}
            onChange={(e) => setTimeFrame(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="weekly">{t('Weekly')}</option>
            <option value="monthly">{t('Monthly')}</option>
          </select>
        </div>
        {timeFrame === 'weekly' && (
          <div className="mb-4 text-center">{weekRange}</div>
        )}
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={240}
        />
      </div>
    </div>
  )
}

export default Chart
