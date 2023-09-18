import Image from 'next/image'

import { Border } from '@/components/Border'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { SectionIntro } from '@/components/SectionIntro'
import { StatList, StatListItem } from '@/components/StatList'
import FormComponent from '@/components/Form'
import FAQ from '@/components/FAQs'
import { PhoneIcon } from '@heroicons/react/24/outline'

import Return from '@/images/warranty/return.svg'
import Certified from '@/images/warranty/certified.svg'
import WarrantyImage from '@/images/warranty/warranty.svg'
import Headphones from '@/images/warranty/headphone.svg'
import Shipped from '@/images/warranty/shipped.svg'

export const metadata = {
  title: 'FAQs',
  description:
    'We believe that our strength lies in our collaborative approach, which puts our clients at the center of everything we do.',
}

export default function FaqPage() {
  return (
    <>
      <Container formContainer={true} className="mt-12 sm:mt-40">
        <FadeIn className="flex-column items-center justify-between pt-16 sm:flex md:pt-0">
          <FormComponent />
          <div className="px-2 sm:px-0 sm:pl-16">
            <h1 className="hidden font-display text-2xl font-semibold tracking-tight text-orange-400 [text-wrap:balance] sm:text-3xl sm:text-orange-950 md:block">
              Have some questions for us?
            </h1>
            <div className="flex items-center py-3">
              <div className="mr-2 flex h-12 w-12 items-center  rounded-full bg-white">
                <Image
                  src={Shipped}
                  alt="Shipping"
                  className="h-8"
                  unoptimized
                />
              </div>
              <div>
                <p className="font-display font-medium text-orange-400 sm:text-orange-950 ">
                  Flat Rate Shipping (Commercial address)
                </p>
              </div>
            </div>
            <div className="flex items-center py-3">
              <div className="mr-2 flex h-12 w-12 items-center  rounded-full bg-white">
                <Image
                  src={WarrantyImage}
                  alt="Shipping"
                  className="h-8"
                  unoptimized
                />
              </div>
              <div>
                <p className="font-display font-medium text-orange-400 sm:text-orange-950 ">
                  Up to 5 Years Unlimited Mile Warranty
                </p>
              </div>
            </div>
            <div className="flex items-center py-3">
              <div className="mr-2 flex h-12 w-12 items-center  rounded-full bg-white">
                <Image
                  src={Headphones}
                  alt="Shipping"
                  className="h-8"
                  unoptimized
                />
              </div>
              <div>
                <p className="font-display font-medium text-orange-400 sm:text-orange-950 ">
                  Excellent Customer Support
                </p>
              </div>
            </div>
            <div className="flex items-center py-3">
              <div className="mr-2 flex h-12 w-12 items-center  rounded-full bg-white">
                <Image
                  src={Return}
                  alt="Shipping"
                  className="h-8"
                  unoptimized
                />
              </div>
              <div>
                <p className="font-display font-medium text-orange-400 sm:text-orange-950 ">
                  No core charge for 30 days <br /> (For Transmission)
                </p>
              </div>
            </div>
            <div className="mt-4 text-2xl">
              <span className="text-white">Speak with our specialist.</span>
              <a
                id="call-hero-main"
                href="tel:+18882338259"
                className="flex w-fit items-center rounded-lg bg-orange-500 px-4 py-2 text-white transition duration-300 hover:bg-orange-600"
              >
                <PhoneIcon className="animate-phone-ring h-6" />
                <span className="ml-2">+1-888-233-8259</span>
              </a>
            </div>
          </div>
        </FadeIn>
      </Container>
      <FAQ />
      <Container className="mt-16">
        <StatList>
          <StatListItem
            value="Client-centric"
            label="Our clients our first priority."
          />
          <StatListItem
            value="Exemplary"
            label="World- Class Industrial Experience"
          />
          <StatListItem
            value="Expansive"
            label="Largest Network of Inventory Yards"
          />
        </StatList>
      </Container>

      {/* <Team /> */}
      <ContactSection />
    </>
  )
}
