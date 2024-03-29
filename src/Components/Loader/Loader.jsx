import React from 'react'
import { ThreeDots } from 'react-loader-spinner'
import './Loader.css'

function Loader() {

  return (
    <div className="react-loader">
      <ThreeDots
      visible={true}
      height="80"
      width="80"
      color="#536081"
      radius="9"
      ariaLabel="three-dots-loading"
      />
    </div> 
  )
}

export default Loader