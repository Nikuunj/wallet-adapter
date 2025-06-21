"use client"
import { BallTriangle } from 'react-loader-spinner'

function Loader() {
    return (
        <div className="fixed flex-col inset-0 flex w-full bg-black/40 items-center justify-center gap-4 h-screen z-50">
            <BallTriangle
                height={55}
                width={55}
                radius={4.5}
                color="#B100E8"
                ariaLabel="ball-triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    )
}

export default Loader