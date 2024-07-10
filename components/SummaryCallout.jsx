import Counter from "./Counter";

export default function SummaryCallout({data}) {
        // Initialize Sets to store unique locations and countries
        const uniqueLocations = new Set();
        const uniqueCountries = new Set();

        // Iterate over the array of studios using destructuring and optional chaining
        data.forEach(({ location }) => {
                location?.forEach(({ name, country }) => {
                        uniqueLocations.add(name);
                        if (country?.name) uniqueCountries.add(country.name);
                });
        });

        // // The size of the Set is the count of unique elements
        const uniqueLocationCount = uniqueLocations.size;
        const uniqueCountryCount = uniqueCountries.size;

        return (
        <div className="uppercase font-medium text-center py-60 tracking-[1%]">
        <h2>There are currently <Counter number={data.length} id="studio-count"/> design studios from <Counter number={uniqueCountryCount} id="country-count" /> countries and from <Counter number={uniqueLocationCount} id="city-count" /> cities</h2>
        <h2 className=" text-md-grey-300">As a patron you can BOOKMARK your favorite studios, projects AND fonts</h2>
        </div>
        );
}