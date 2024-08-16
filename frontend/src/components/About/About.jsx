import React from "react";
import { useInView } from "react-intersection-observer";


export default function About() {
  const { ref: imageRef, inView: imageInView } = useInView({ triggerOnce: true });
  const { ref: textRef, inView: textInView } = useInView({ triggerOnce: true });
  const { ref: image2Ref, inView: image2InView } = useInView({ triggerOnce: true });

  return (
    <div className="py-16 bg-yellow-50">
      <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
        <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-start lg:gap-12">
          <div
            ref={imageRef}
            className={`md:5/12 lg:w-5/12 transition-transform duration-700 ${
              imageInView ? "transform-none" : "transform translate-y-20 opacity-0"
            }`}
          >
            <img src="../../../public/AboutImages/sahil.png" />
          </div>
          <div
            ref={textRef}
            className={`md:7/12 lg:w-6/12 transition-transform duration-500 ${
              textInView ? "transform-none" : "transform translate-y-20 opacity-0"
            }`}
          >
            <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
              Message from the Founder
            </h2>
            <p className="mt-6 text-gray-600">
            <b>"Grow Through What You Go Through. </b> Founded in 2020, ARC
              was established to provide emergency aid to animals in distress.
              Over the years, our rescue and rehabilitation efforts have reached
              thousands of animals across, improved public health and safety,
              and actively worked to prevent human-animal conflicts in both
              urban and rural areas.
              </p>
              <p className="mt-6 text-gray-600">
              As I reflect on the past 4 years, I’m struck by the journey we’ve
              undertaken. Our community organization has continuously adapted to
              the evolving needs of our environment. Each year, as we assess our
              strengths, weaknesses, opportunities, and threats, it helps us
              plan effectively for the lives we impact—both animal and human—and
              for the dedicated volunteer working tirelessly towards our cause.
              </p>
              <p className="mt-6 text-gray-600">
              Our commitment to change has always been intentional. Whether it's
              responding to the needs of the environment or recognizing the
              importance of policy reform, our efforts are guided by mindful
              deliberation. We work on the frontlines and at the grassroots
              level because we understand that protecting animals also means
              educating and raising awareness among the communities that share
              their spaces. 
              </p>
              <p className="mt-6 text-gray-600">
                Our multidisciplinary approach connects people,
              animals, and the environment, powered by the dedicated community of over
              500 volunteers. Together, we work towards a vision of conservation
              and coexistence between animals and humans.
              Annually, ARC directly impacts over 10,000 animal lives through
              rescue, medical aid, and rehabilitation.
              </p>
              <p className="mt-6 text-gray-600">
              Change is
              the only constant, and at ARC, we ensure that our ability to
              evolve is just as steadfast. For over 4 years, ARC has been
              helping animals, people, and the environment. It has been a long
              and enriching journey, and one we continue with unwavering
              commitment—there is no stopping or turning back. With joy, love,
              and determination."
              <p className="mt-4 text-gray-600">
                <b>Sahil Kamble</b>
                <br></br>
                Founder & President, ARC
              </p>
            </p>
          </div>
        </div>


        <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-start lg:gap-12x my-12">
          <div
            ref={textRef}
            className={`md:7/12 lg:w-6/12 transition-transform duration-700 ${
              textInView ? "transform-none" : "transform translate-y-20 opacity-0"
            }`}
          >
            <h2 className="text-2xl text-gray-900 font-bold md:text-4xl mt-12">
            What we do at ARC?
            </h2>
            <p className="mt-6 text-gray-600">
              At ARC, we are dedicated to improving the lives of stray animals
              in Pune and PCMC. Our comprehensive approach ensures that every
              animal receives the care and support they need. Here’s how we make
              a difference:
            </p>
            <h3 className="mt-4 text-gray-800 font-semibold">Adoptions</h3>
            <p className="mt-2 text-gray-600">
              We strive to find loving homes for indies through our adoption
              campaigns. Our team carefully vets potential adopters to ensure
              each animal is placed in a safe and caring environment. So far, we
              have successfully facilitated over 1000+ happy adoptions in Pune.
            </p>

            <h3 className="mt-4 text-gray-800 font-semibold">Rescues</h3>
            <p className="mt-2 text-gray-600">
              Our rescue team is always on standby, responding to calls for help
              across the city. Whether it’s an injured stray or a vulnerable
              puppy, we provide every possible assistance to get them admitted
              in nearby shelter, ensuring that every animal receives the medical
              attention and care they need.
            </p>

            <h3 className="mt-4 text-gray-800 font-semibold">
              Onsite Treatment
            </h3>
            <p className="mt-2 text-gray-600">
              We offer onsite treatment for strays who require immediate medical
              care. Our volunteers, equipped with basic first-aid knowledge,
              tend to injured or sick animals on the spot, stabilizing them
              before further treatment.
            </p>

            <h3 className="mt-4 text-gray-800 font-semibold">
              Feeding Programs
            </h3>
            <p className="mt-2 text-gray-600">
              Our feeding programs ensure that strays across Pune have access to
              regular, nutritious meals. We coordinate with volunteers and local
              communities to establish feeding points, providing food and clean
              water to countless animals every day.
            </p>

            <h3 className="mt-4 text-gray-800 font-semibold">
              Reflective Collar Drives
            </h3>
            <p className="mt-2 text-gray-600">
              To enhance the safety of stray dogs, especially at night, we often
              organize reflective collar drives. These collars help make strays
              more visible to drivers, reducing the risk of accidents and
              ensuring their safety on the streets.
            </p>

            <h3 className="mt-4 text-gray-800 font-semibold">
              Vaccinations & Sterilizations
            </h3>
            <p className="mt-2 text-gray-600">
              We conduct regular vaccination & sterilisation drives for strays.
              By vaccinating animals, we aim to prevent the spread of illnesses
              and maintain the overall health of Pune's stray population.
            </p>

            {/* <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
              Who is Sahil?
              </h2>
              <p className="mt-6 text-gray-600">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum
              omnis voluptatem accusantium nemo perspiciatis delectus atque
              autem! Voluptatum tenetur beatae unde aperiam, repellat expedita
              consequatur! Officiis id consequatur atque doloremque!
              </p>
              <p className="mt-4 text-gray-600">
              Nobis minus voluptatibus pariatur dignissimos libero quaerat iure
              expedita at? Asperiores nemo possimus nesciunt dicta veniam
              aspernatur quam mollitia.
              </p> */}

            {/* <h2 className="text-2xl text-gray-900 font-bold md:text-4xl mt-12">
              What does Volunteer do at ARC?
            </h2>
            <p className="mt-6 text-gray-600">
              Volunteers, once inducted and selected based on their skills,
              experience and time availability help at the Centre with upkeep,
              cleaning and equipment maintenance, admin related tasks, assist
              the veterinarians with treatment of animals, assist the
              rehabilitators with feed preparation and enrichment of the
              rehabilitation enclosures. More experienced volunteers and ones
              who have shown commitment by coming regularly also assist the team
              with field rescues and releases of animals.
            </p>
            <p className="mt-4 text-gray-600">
              Nobis minus voluptatibus pariatur dignissimos libero quaerat iure
              expedita at? Asperiores nemo possimus nesciunt dicta veniam
              aspernatur quam mollitia.
            </p> */}
          </div>
          <div
            ref={image2Ref}
            className={`md:5/12 lg:w-5/12 transition-transform duration-700 ${
              image2InView ? "transform-none" : "transform translate-y-20 opacity-0"
            }`}
          >
            <img src="../../../public/AboutImages/turtle.png" />
          </div>
        </div>
      </div>
    </div>
  );
}
