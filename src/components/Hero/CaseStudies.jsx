import Image from 'next/image'
import { Container } from '../Container'
import dynamic from 'next/dynamic'
import ChooseUs from '@/images/choose-us.webp'
const Intro = dynamic(() =>
  import('@/components/Hero/Intro').then((module) => module.Intro)
)

export async function CaseStudies() {
  return (
    <>
      <Container>
        <div className="grid w-full grid-cols-1 sm:grid-cols-2">
          <Intro
            eyebrow={`Used Engines & Transmissions For Sale |\n Complete Engine & Transmission Assembly`}
            className="mt-24 sm:mt-32 lg:mt-40"
            title="Find Engines & Transmissions Replacement Cost. Buy Cheap Used Engine & Transmissions Near Me."
          >
            {/* <p>
              Used Engines Inc. helps you fix your car troubles with
              high-functioning certified used engines and transmissions without
              burning a hole in your pockets. Whether your problem is an
              overheating engine or a gearbox that’s close to dying we’ll
              provide you with the best possible solution.
            </p> */}
          </Intro>
          <Image className='hidden sm:block' src={ChooseUs} alt="Choose Us" unoptimized />
        </div>
      </Container>
    </>
  )
}
