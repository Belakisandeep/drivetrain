'use client'

import { handleCallClick } from '@/lib/callButton'
import { PhoneIcon } from '@heroicons/react/24/outline'
import React from 'react'

export function InstButton() {
  return (
    <button
      id="call-inst-quote"
      onClick={handleCallClick}
      className="call-btn flex w-fit rounded-lg bg-orange-500 px-4 py-2 text-white transition duration-300 hover:bg-orange-600 sm:mr-4"
    >
      <PhoneIcon className="animate-phone-ring h-6" />
      <span className="ml-2">Give us a call.</span>
    </button>
  )
}

export function AvailButton() {
  return (
    <button
      id="call-part-avail"
      onClick={handleCallClick}
      className="call-btn mt-4 flex w-fit rounded-lg bg-orange-500 px-4 py-2 text-white transition duration-300 hover:bg-orange-600"
    >
      <PhoneIcon className="animate-phone-ring h-6" />
      <span className="ml-2">Call Now</span>
    </button>
  )
}

function NavButton() {
  return (
    <button
      id="call-hero-main"
      onClick={handleCallClick}
      className="call-btn mx-auto flex w-fit items-center rounded-lg bg-orange-500 px-4 py-2 text-white transition duration-300 hover:bg-orange-600 sm:mx-0"
    >
      <PhoneIcon className="animate-phone-ring h-6" />
      <span className="ml-2">+1-888-233-8259</span>
    </button>
  )
}

export default NavButton
