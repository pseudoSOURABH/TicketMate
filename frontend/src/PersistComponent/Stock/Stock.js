import React, { useState, useEffect, useRef } from 'react'
import { Line } from 'react-chartjs-2'
import 'chart.js/auto'
import './Stock.css'

const initialStocks = [
  { name: 'AAPL', price: Math.floor(Math.random() * 1000) },
  { name: 'GOOGL', price: Math.floor(Math.random() * 1000) },
  { name: 'AMZN', price: Math.floor(Math.random() * 1000) },
  { name: 'MSFT', price: Math.floor(Math.random() * 1000) },
  { name: 'TSLA', price: Math.floor(Math.random() * 1000) },
]

const strategies = {
  AAPL: (price) => price * (1 + Math.random() * 0.02 - 0.01),
  GOOGL: (price) => price * (1 + 0.005 * Math.sin(Date.now() / 1000)),
  AMZN: (price) => price * (1 + (Math.random() > 0.5 ? 0.015 : -0.015)),
  MSFT: (price) => price * (1 + 0.01 * Math.cos(Date.now() / 1000)),
  TSLA: (price) => price * (1 + (Math.random() * 0.03 - 0.015)),
}

const initialChartData = {
  labels: Array.from({ length: 60 }, (_, i) => i + 1),
  datasets: initialStocks.map((stock) => ({
    label: stock.name,
    data: Array.from({ length: 60 }, () => stock.price),
    borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    fill: false,
  })),
}

const Stock = () => {
  const [stocks, setStocks] = useState(initialStocks)
  const [selectedStock, setSelectedStock] = useState(initialStocks[0].name)
  const [chartData, setChartData] = useState(initialChartData)
  const prevPrices = useRef(initialStocks.map((stock) => stock.price))
  const chartRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setStocks((prevStocks) =>
        prevStocks.map((stock) => ({
          ...stock,
          price: strategies[stock.name](stock.price),
        }))
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const updateChartData = () => {
      setChartData((prevData) => ({
        ...prevData,
        datasets: prevData.datasets.map((dataset, index) => {
          const stock = stocks.find((stock) => stock.name === dataset.label)
          dataset.data.push(stock.price)
          if (dataset.data.length > 60) dataset.data.shift()
          return dataset
        }),
      }))
    }

    updateChartData()

    // Scroll chart to the right to show recent data
    if (chartRef.current) {
      chartRef.current.chartInstance.data.labels = chartData.labels
      chartRef.current.chartInstance.update('none')
      const chartContainer =
        chartRef.current.chartInstance.chart.canvas.parentNode
      chartContainer.scrollLeft =
        chartContainer.scrollWidth - chartContainer.clientWidth
    }
  }, [stocks])

  const handleStockSelect = (stockName) => {
    setSelectedStock(stockName)
  }

  const selectedDataset = chartData.datasets.find(
    (dataset) => dataset.label === selectedStock
  )

  const stockMovementColor = (currentPrice, prevPrice) => {
    if (currentPrice > prevPrice) {
      return 'green'
    } else if (currentPrice < prevPrice) {
      return 'red'
    }
    return 'black'
  }

  return (
    <div className="stock-container">
      <h1>Stock Trading Platform</h1>
      <div className="main-content">
        <div className="stocks-list">
          {stocks.map((stock, index) => (
            <div
              key={stock.name}
              className={`stock-item ${
                stock.name === selectedStock ? 'selected' : ''
              }`}
              onClick={() => handleStockSelect(stock.name)}
            >
              <span>{stock.name}</span>
              <span
                className={`price ${stockMovementColor(
                  stock.price,
                  prevPrices.current[index]
                )}`}
              >
                {stock.price.toFixed(2)}
              </span>
              {(prevPrices.current[index] = stock.price)}
            </div>
          ))}
        </div>
        <div className="chart-container">
          {selectedDataset && (
            <Line
              ref={chartRef}
              data={{
                labels: chartData.labels,
                datasets: [selectedDataset],
              }}
              options={{
                scales: {
                  x: {
                    type: 'linear',
                    position: 'bottom',
                    ticks: {
                      autoSkip: true,
                      maxTicksLimit: 10,
                    },
                  },
                  y: {
                    beginAtZero: false,
                  },
                },
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Stock
