import React from 'react'

export function Home(props) {
    

    return (
        <div style={{ height: 'calc(100vh - 52px)' }}
      className="bg-[url('./assets/3.png')] h-screen bg-cover bg-center bg-fixed flex items-center justify-center overflow-y-hidden"
    >
      <div className="text-black text-center">
        <h1 className="text-4xl font-bold">Welcome to the Library</h1>
        <p className="text-lg mt-4">Explore a world of knowledge.</p>
      </div>
    </div>
    )
}
