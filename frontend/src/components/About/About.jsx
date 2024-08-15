import Reaact from "react";

export default function About() {
  return (
    <div className="py-16 bg-yellow-50">
      <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
        <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-start lg:gap-12">
          <div className="md:5/12 lg:w-5/12 ">
            <img src="../../../public/AboutImages/sahil.png" />
          </div>
          <div className="md:7/12 lg:w-6/12">
            <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
              Message from the Founder
            </h2>
            <p className="mt-6 text-gray-600">
              <b>"Grow Through What You Go Through. </b> Founded in 2020, ARC was
              established to provide emergency aid to animals in distress. Over
              the years, our rescue and rehabilitation efforts have reached
              thousands of animals across, improved public
              health and safety, and actively worked to prevent human-animal
              conflicts in both urban and rural areas. 
              <br></br>
              As I reflect on the past
              4 years, I’m struck by the journey we’ve undertaken. Our community
              organization has continuously adapted to the evolving needs of our
              environment. Each year, as we assess our strengths, weaknesses,
              opportunities, and threats, it helps us plan effectively for the
              lives we impact—both animal and human—and for the dedicated volunteer
              working tirelessly towards our cause. Our commitment to
              change has always been intentional. Whether it's responding to the
              needs of the environment or recognizing the importance of policy
              reform, our efforts are guided by mindful deliberation. We work on
              the frontlines and at the grassroots level because we understand
              that protecting animals also means educating and raising awareness
              among the communities that share their spaces. Our multidisciplinary approach
              connects people, animals, and the environment, powered by a
              dedicated team of over 60 employees. Together, we work towards a
              vision of conservation and coexistence between wildlife,
              communities, and their animals. Annually, ARC directly impacts
              over 10,000 animal lives through rescue, medical aid, and
              rehabilitation. Our outreach and education efforts also foster
              connections with both urban and rural communities, helping prevent
              human-animal conflicts and protecting countless animals in their
              natural habitats. Change is the only
              constant, and at ARC, we ensure that our ability to evolve is
              just as steadfast. For over 4 years, ARC has been helping
              animals, people, and the environment. It has been a long and
              enriching journey, and one we continue with unwavering
              commitment—there is no stopping or turning back. With joy, love,
              and determination."
             
            <p className="mt-4 text-gray-600">
              <b>
              Sahil Kamble
              </b>
              <br></br>
              Founder & President, ARC
            </p>
            </p>
          </div>
        </div>

        <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-start lg:gap-12x my-12">
          <div className="md:7/12 lg:w-6/12">

            <h2 className="text-2xl text-gray-900 font-bold md:text-4xl mt-12">
              What we do at ARC?
            </h2>
            <p className="mt-6 text-gray-600">
            </p>
            <p className="mt-4 text-gray-600">
              Nobis minus voluptatibus pariatur dignissimos libero quaerat iure
              expedita at? Asperiores nemo possimus nesciunt dicta veniam
              aspernatur quam mollitia.
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

            <h2 className="text-2xl text-gray-900 font-bold md:text-4xl mt-12">
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
            </p>
          </div>
          <div className="md:5/12 lg:w-5/12">
            <img src="./AboutImages/meme.png" />
          </div>
        </div>
      </div>
    </div>
  );
}
