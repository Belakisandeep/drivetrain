import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const ContactSection = dynamic(() => import('@/components/ContactSection').then(module => module.ContactSection))

// import { ContactSection } from '@/components/ContactSection'
import { loadMDXMetadata } from '@/lib/loadMDXMetadata'
import FormComponent from '@/components/Form'

import Return from '@/images/warranty/return.svg'
import WarrantyImage from '@/images/warranty/warranty.svg'
import Headphones from '@/images/warranty/headphone.svg'
import Shipped from '@/images/warranty/shipped.svg'

import NavButton from '@/components/shared/NavButton'
const Clients = dynamic(() => import('@/components/Hero/Clients').then(module => module.Clients))
const Services = dynamic(() => import('@/components/Hero/Services').then(module => module.Services))
const CaseStudies = dynamic(() => import('@/components/Hero/CaseStudies').then(module => module.CaseStudies))
// import dynamic from 'next/dynamic'

export function HeroForm({ type='Engine' }) {
  return (
    <div className="flex-col-reverse sm:flex-row items-center justify-between pt-4 flex mt-20 sm:mt-36">
      <FormComponent part="Engine" />
      <div className="mx-auto max-w-xl px-2 sm:px-0 ">
        <h1 className="hidden  text-2xl font-semibold tracking-tight text-orange-400 [text-wrap:balance] sm:text-3xl sm:text-orange-950 md:block">
          Find A grade used {type} with 3-5 Years warranty.
        </h1>
        <div className="flex items-center sm:py-3">
          <div className="mr-2 flex h-12 w-12 items-center  rounded-full bg-white">
            <Image src={Shipped} alt="Shipping" className="h-8" unoptimized />
          </div>
          <div>
            <p className=" font-medium text-orange-400 sm:text-orange-950 ">
              Flat Rate Shipping (Commercial address)
            </p>
          </div>
        </div>
        <div className="flex items-center sm:py-3">
          <div className="mr-2 flex h-12 w-12 items-center  rounded-full bg-white">
            <Image
              src={WarrantyImage}
              alt="Shipping"
              className="h-8"
              unoptimized
            />
          </div>
          <div>
            <p className=" font-medium text-orange-400 sm:text-orange-950 ">
              Up to 5 Years Unlimited Mile Warranty
            </p>
          </div>
        </div>
        <div className="flex items-center sm:py-3">
          <div className="mr-2 flex h-12 w-12 items-center  rounded-full bg-white">
            <Image
              src={Headphones}
              alt="Shipping"
              className="h-8"
              unoptimized
            />
          </div>
          <div>
            <p className=" font-medium text-orange-400 sm:text-orange-950 ">
              Excellent Customer Support
            </p>
          </div>
        </div>
        <div className="flex items-center sm:py-3">
          <div className="mr-2 flex h-12 w-12 items-center  rounded-full bg-white">
            <Image src={Return} alt="Shipping" className="h-8" unoptimized />
          </div>
          <div>
            <p className=" font-medium text-orange-400 sm:text-orange-950 ">
              No core charge for 30 days <br /> (For Transmission)
            </p>
          </div>
        </div>
        <div className="mt-4 text-center sm:text-left text-2xl">
          <span className="text-black">Speak with our specialist.</span>
          <NavButton />
        </div>
      </div>
    </div>
  )
}

export const metadata = {
  description: `Engines & Drivetrain was established in 2010 with the objective to provide
    customers with high- quality and low mileage used engines. Keeping the
    fact in mind that new vehicle or engine can cost a fortune, we offer
    largest collection of car engines for sale which is as reliable as the
    new one & will deliver excellent performance at a low price. We are
    very particular about the quality of used engines and try & test every
    piece before selling. Hence, you can be assured of purchasing a
    reliable used engine for your vehicle.`,
}

export default async function Home() {
  let caseStudies = (await loadMDXMetadata('used-engines-for-sale')).slice(0, 3)

  return (
    <>
      <HeroForm />

      <Clients />

      <CaseStudies caseStudies={caseStudies} />

      {/* <Testimonial
        className="mt-24 sm:mt-32 lg:mt-40"
        client={{ name: 'Phobia', logo: logoPhobiaDark }}
      >
        The team at Studio went above and beyond with our onboarding, even
        finding a way to access the user’s microphone without triggering one of
        those annoying permission dialogs.
      </Testimonial> */}

      <Services />

      <ContactSection />
    </>
  )
}
