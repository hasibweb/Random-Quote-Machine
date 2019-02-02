import React from 'react'
import { Spinner } from 'reactstrap';

function Loading({ color }) {
  return (
    <div className="d-flex justify-content-center align-items-center h-100 w-100">
      <Spinner color={color} />
    </div>
  )
}

export default Loading;