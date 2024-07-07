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
  labels: [new Date().toLocaleTimeString()],
  datasets: initialStocks.map((stock) => ({
    label: stock.name,
    data: [stock.price],
    borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    fill: false,
  })),
}

const Stock = () => {
  const [stocks, setStocks] = useState(initialStocks)
  const [selectedStock, setSelectedStock] = useState(initialStocks[0].name)
  const [chartData, setChartData] = useState(initialChartData)
  const [zoomLevel, setZoomLevel] = useState(60) // Initial zoom level
  const prevPrices = useRef(initialStocks.map((stock) => stock.price))
  const chartRef = useRef(null)
  const containerRef = useRef(null)
  const lastUpdateTime = useRef(new Date())

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
      setChartData((prevData) => {
        const newLabels = [...prevData.labels]
        const currentTime = new Date()
        if (
          currentTime - lastUpdateTime.current >= 5 * 60 * 1000 ||
          newLabels.length === 1
        ) {
          newLabels.push(currentTime.toLocaleTimeString())
          lastUpdateTime.current = currentTime
        } else {
          newLabels.push('')
        }
        const newDatasets = prevData.datasets.map((dataset) => {
          const stock = stocks.find((stock) => stock.name === dataset.label)
          const newData = [...dataset.data, stock.price]
          if (newData.length > zoomLevel) newData.shift()
          return {
            ...dataset,
            data: newData,
          }
        })
        if (newLabels.length > zoomLevel) newLabels.shift()
        return {
          labels: newLabels,
          datasets: newDatasets,
        }
      })
    }

    updateChartData()

    if (chartRef.current && chartRef.current.chartInstance) {
      const chartInstance = chartRef.current.chartInstance
      chartInstance.update()
    }
  }, [stocks, zoomLevel])

  const handleStockSelect = (stockName) => {
    setSelectedStock(stockName)
  }

  const stockMovementColor = (currentPrice, prevPrice) => {
    if (currentPrice > prevPrice) {
      return 'green'
    } else if (currentPrice < prevPrice) {
      return 'red'
    }
    return 'black'
  }

  const handleWheel = (event) => {
    event.preventDefault()
    if (event.deltaY > 0) {
      setZoomLevel((prevZoom) => Math.min(prevZoom + 10, 300))
    } else {
      setZoomLevel((prevZoom) => Math.max(prevZoom - 10, 10))
    }
  }

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = containerRef.current.scrollWidth
    }
  }, [chartData])

  const selectedDataset = chartData.datasets.find(
    (dataset) => dataset.label === selectedStock
  )

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
        <div
          className="chart-container"
          ref={containerRef}
          onWheel={handleWheel}
        >
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
                    type: 'category',
                    position: 'bottom',
                    ticks: {
                      autoSkip: false,
                      maxTicksLimit: 10,
                    },
                  },
                  y: {
                    beginAtZero: false,
                  },
                },
                animation: {
                  duration: 0,
                },
                maintainAspectRatio: false,
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Stock
