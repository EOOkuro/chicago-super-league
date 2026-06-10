import React from 'react';

function ClubCard({ name, location, logo }) {
  return (
    <div className="bg-[hsl(var(--true-white))] p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group border border-[hsl(var(--white))] cursor-pointer">
      
      <div className="flex items-center gap-4">

        {/* Logo Circle */}
        <div className="w-16 h-16 rounded-full bg-[hsl(var(--light-bg))] flex items-center justify-center overflow-hidden group-hover:bg-[hsl(var(--primary))] transition-colors duration-300">

          {logo ? (
            <img
              src={logo}
              alt={`${name} logo`}
              className="w-12 h-12 object-contain"
            />
          ) : (
            <span className="font-['Bebas_Neue'] text-2xl text-[hsl(var(--black))] group-hover:text-[hsl(var(--true-white))]">
              {name.charAt(0)}
            </span>
          )}

        </div>

        {/* Club Info */}
        <div>
          <h3 className="text-2xl mb-1 group-hover:text-[hsl(var(--primary))] transition-colors">
            {name}
          </h3>

          <p className="label-text text-[hsl(var(--gray))] text-sm">
            {location}
          </p>
        </div>

      </div>
    </div>
  );
}

export default ClubCard;