import React from 'react'
import Noteform from '../components/Noteform'

function Createnote() {
  return (
    <div className="relative flex min-h-[70vh] items-center justify-center py-12">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),_transparent_55%)]" />
      <Noteform />
    </div>
  );
}

export default Createnote
