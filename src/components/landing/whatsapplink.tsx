"use client";
import React from 'react'

function Whatsapplink() {
  return (
    <div className='fixed bottom-5 right-5 z-50 bg-[#25D366] p-3 rounded-full shadow-lg hover:scale-110 transition-transform cursor-pointer justify-center items-center flex'>
        <a href="https://wa.me/4454503606" target="_blank" rel="noopener noreferrer" className='flex'>
            <img src="/assets/socialMedia/WhatsApp.svg" alt="WhatsApp"  width={32}/>
        </a>
    </div>
  )
}

export default Whatsapplink