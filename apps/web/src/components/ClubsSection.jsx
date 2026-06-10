import React from 'react';
import ClubCard from './ClubCard.jsx';

function ClubsSection() {
  const clubs = [
    { name: 'Hunnids AC', location: 'South Side', logo: 'https://res.cloudinary.com/dfpj9filc/image/upload/v1781027090/Firefly_Gemini_Flash_Take_out_the_wild_hundreds_part.___Take_out_the_est_1917._use_the_100_emoji_as_inspir_735066_1_-jukebox-bg-removed_oxqh2o.png'},
    { name: 'Bronzeville AC', location: 'South Side' },
    { name: 'Midway FC', location: 'South Side' },
    { name: 'Pilsen FC', location: 'South Side', logo: 'https://res.cloudinary.com/dfpj9filc/image/upload/v1781027089/Signature__8Go6IybUUoK5JYPylWzcMjFFa2FQs6rsJq7ndWNNOqvRx1IqoKQtQXgwiwMzWu2v0SbBsRf67B0kGgR52ZrVvXu5Lq_BR96eT0N9XCMwY87xB8nr6nBZfa9sLYlbXUphwd9guwCpjk05k2ly9J6P4oObvUa_OBQcDR4uUM9zlGUYyS54y08OL9PCgW4a1pd3g98zOD6zJBd_aaqb3l.png' },
    { name: 'Hyde Park Rangers', location: 'South Side', logo: 'https://res.cloudinary.com/dfpj9filc/image/upload/v1781027195/IMG_0095_1_luswdi.png' },
    { name: 'Beverly FC', location: 'South Side', logo: 'https://res.cloudinary.com/dfpj9filc/image/upload/v1781027245/209b06adf739c0419ebb82b952b3ddbf_2_-jukebox-bg-removed_wgiywf.png' },
    { name: 'Al Farooq FC', location: 'South Side', logo: 'https://res.cloudinary.com/dfpj9filc/image/upload/v1781027101/Image-1_1_-jukebox-bg-removed_rs6ks7.png' },
    { name: 'GF.Chicago.SN', location: 'South Side' }
  ];

  return (
    <section id="clubs" className="py-20 md:py-24 bg-[hsl(var(--light-bg))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-2 block">CLUBS</span>
          <h2 className="text-[hsl(var(--black))] mb-4">Meet the Teams</h2>
          <p className="text-[hsl(var(--gray))] text-lg max-w-2xl">Eight diverse clubs representing Chicago neighborhoods, competing for glory in the inaugural season.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {clubs.map((club, index) => (
            <ClubCard key={index} name={club.name} location={club.location} logo={club.logo}/>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ClubsSection;