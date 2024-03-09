'use client'
import { useState } from 'react'

function Watch() {
  const [time, setTime] = useState<number>(0)
  const [lapTime, setLapTime] = useState<number[]>([])
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null)
  const [isRunning, setIsRunning] = useState<boolean>(false)

  const handleStartStop = () => {
    if (timerId) {
      clearInterval(timerId)
      setTimerId(null)
      setIsRunning(false)
    } else {
      const id: NodeJS.Timeout = setInterval(
        () => setTime(prevTime => prevTime + 10),
        10
      )
      setTimerId(id)
      setIsRunning(true)
    }
  }

  const handleReset = () => {
    setTime(0)
    if (timerId) clearInterval(timerId)
    setTimerId(null)
    setIsRunning(false)
    setLapTime([])
  }

  const handleLap = () => {
    setLapTime([...lapTime, time])
  }

  const lap = lapTime.map((element, index) => {
    return (
      <div key={index}>
        {index + 1}: {(element / 1000).toFixed(2)} s
      </div>
    )
  })

  return (
    <div className=' flex items-center justify-center min-h-[100vh] '>
      <div className='w-[360px] max-h-[100vh] rounded-md p-3 m-3 my-10 bg-gradient-to-bl from-slate-800 to-slate-900 text-white shadow-xl shadow-slate-950'>
        <div className='py-8 text-4xl'>{(time / 1000).toFixed(2)} s</div>
        <div className='flex flex-row'>
          <div className='flex-1'>
            <button
              onClick={handleReset}
              className='w-5/6 rounded border border-slate-300 bg-gray-800 py-4 text-white hover:bg-gray-900'
            >
              Reset
            </button>
          </div>
          <div className='flex-1'>
            <button
              onClick={handleStartStop}
              className='w-5/6 rounded bg-indigo-400 py-4 text-white hover:bg-indigo-600'
            >
              {isRunning ? 'Stop' : 'Start'}
            </button>
          </div>
          <div className='flex-1'>
            <button
              onClick={handleLap}
              disabled={isRunning ? false : true}
              className='w-5/6 rounded border border-slate-300 bg-gray-800 py-4 text-white hover:bg-gray-900 disabled:bg-transparent disabled:text-black'
            >
              Lap
            </button>
          </div>
        </div>
        <div className='py-8'>
          <div className='h-80 overflow-y-auto'>{lap}</div>
        </div>
      </div>
    </div>
  )
}

export default Watch
