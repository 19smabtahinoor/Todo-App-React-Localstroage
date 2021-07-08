import React, { useState, useEffect} from 'react'
import Todo from './Todo'
import SyncLoader from "react-spinners/SyncLoader";
import { css } from "@emotion/react";

const override = css`
  display: flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  min-height:100vh;
  margin: 0 auto;
  width:100%;
`;

const App = () => {

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  return (
    <>
      {loading ?
        <SyncLoader color={'#4A90E2'} loading={loading} size={20} css={override} />
        :
        <div className="App">
          <Todo />
        </div>

      }
    </>
  )
}

export default App

