'use client'
import { Disclosure } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'

const faqs = [
  {
    question: 'How much does a used car engine cost?',
    answer:
      "Replacing your old or broken engine with a used car engine is usually the best and least expensive option. It will save your thousands of dollars & will provide the same efficiency as the used engine. The exact cost of a used engine will depend on many factors like the vehicle's model, year of manufacturing, type of engine needed, etc.",
  },
  {
    question: "Is it worth buying a used car engine?",
    answer: "Yes, Totally. Buying a used engine is the most cost-effective solution to bring your car back on road. A used engine offers the same efficiency & performance as the new engine & is 100% certified & safe to use."
  },
  {
    question: "What happens when you put a used engine in your car?",
    answer: "After proper installation of a used engine in your car, your car will run smoothly like before with maximum efficiency. Used Engines are completely cleaned & ready to hit the road just like the new engine & perform better than new ones."
  },
  {
    question: "What information do I need to get a proper quote?",
    answer: "When you require a used engine, it is important to have all of the correct information to get an accurate quote such as the year, make, model, and shipping address. Also, it is important to provide (VIN) Vehicle Identification Number so that we provide an accurate quote."
  },
  {
    question: "Do you provide used engines for all brands?",
    answer: "Yes, we are stocked with used engines for most 'makes and models', including 'foreign as well as domestic' which is difficult to find anywhere else in the United States. We provide used engines for all brands like Audi, BMW, Honda, Chevy, Mercedes, Ford, Porsche, Hyundai, Jaguar, Toyota, and many more."
  },
  // More questions...
]

export default function FAQ() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-20">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h1 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
            Frequently asked questions
          </h1>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                        <span className="text-base font-semibold leading-7">
                          {faq.question}
                        </span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <MinusSmallIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          ) : (
                            <PlusSmallIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base leading-7 text-gray-600">
                        {faq.answer}
                      </p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
