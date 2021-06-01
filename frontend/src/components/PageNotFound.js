import React from 'react'
import svg from '../SVGs/404.svg'

function PageNotFound({notShow}) {
    notShow.map(stateSetter=>{stateSetter(false)})
    return (
        <div className='container d-flex justify-content-center'>
            <img src={svg} width='80%' alt="" />
        </div>
    )
}

export default PageNotFound
