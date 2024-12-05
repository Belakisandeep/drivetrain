import engine1 from '@/images/engines/engine1.jpg'
import engine2 from '@/images/engines/engine2.jpg'
import engine3 from '@/images/engines/engine3.jpg'
import engine4 from '@/images/engines/engine4.jpg'
import engine5 from '@/images/engines/engine5.jpg'
import engine6 from '@/images/engines/engine6.jpg'
import transmission1 from '@/images/engines/transmission1.jpg'
import transmission2 from '@/images/engines/transmission2.jpg'
import transmission3 from '@/images/engines/transmission3.jpg'
import transmission4 from '@/images/engines/transmission4.jpg'
import transmission5 from '@/images/engines/transmission5.jpg'
import transmission6 from '@/images/engines/transmission6.jpg'
import Image from 'next/image'

const images = [
  {
    src: engine1,
    alt: 'Acura',
    title: 'Acura',
  },
  {
    src: engine2,
    alt: 'Audi',
    title: 'Audi',
  },
  {
    src: engine3,
    alt: 'BMW',
    title: 'BMW',
  },
  {
    src: engine4,
    alt: 'Buick',
    title: 'Buick',
  },
  {
    src: engine5,
    alt: 'Cadillac',
    title: 'Cadillac',
  },
  {
    src: engine6,
    alt: 'Chevrolet',
    title: 'Chevrolet',
  },
]
const images2 = [
  {
    src: transmission1,
    alt: 'Chrysler',
    title: 'Chrysler',
  },
  {
    src: transmission2,
    alt: 'Dodge',
    title: 'Dodge',
  },
  {
    src: transmission3,
    alt: 'Fiat',
    title: 'Fiat',
  },
  {
    src: transmission4,
    alt: 'Ford',
    title: 'Ford',
  },
  {
    src: transmission5,
    alt: 'GMC',
    title: 'GMC',
  },
  {
    src: transmission6,
    alt: 'Honda',
    title: 'Honda',
  },
]

const ImageGrid = ({ images, title, subtitle, h1 }) => {
    return (
      <div className="mt-10 flex flex-col items-center justify-center sm:mt-24">
        <h1 className="text-center text-orange-400 sm:text-2xl sm:font-semibold">
          {h1}
        </h1>
        <h2 className="mb-8 max-w-xl text-center text-orange-950 sm:text-xl">
          {title}
          {subtitle}
        </h2>
        <div className="grid w-4/5 grid-cols-2 gap-4 md:grid-cols-3">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg shadow-lg"
            >
              <Image
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex bg-black bg-opacity-60 text-center text-white transition duration-300 ease-in-out group-hover:opacity-100 sm:items-center sm:justify-center sm:opacity-0">
                <h2 className="ml-2 mt-2 sm:text-lg sm:font-semibold sm:ml-0 sm:mt-0">
                  {image.title}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

export function ImagesGroup() {
  return (
    <>
      <ImageGrid
        h1={'Best Seller in Engines'}
        title={'Used Engines & Transmissions For Sale. '}
        subtitle={'Find Engines & Transmissions Replacement Cost.'}
        images={images}
      />
      <ImageGrid
        h1={'Best Seller in Transmissions'}
        title={'Complete Engine & Transmission Assembly. '}
        subtitle={'Buy Cheap Used Engine & Transmissions Near Me.'}
        images={images2}
      />
    </>
  )
}
