import { client } from "@/lib/sanity.client";
import GridListing from "@/components/GridListing";

const referenceFields = `
	"projects": *[_type == "project" && references(^._id)]{
		_id,
		title,
		_type,
		slug,
		posterImage {
			crop,
			hotspot,
			asset->
		},
		studio->{
			_id,
			name,
			slug,
			location[]->{
				_id,
				name,
				country->{name}
			},
			posterImage{crop,hotspot,asset->},
		},
	},
	"studios": *[_type == "studio" && references(^._id)]{
		_id,
		name,
		_type,
		slug,
		posterImage {
			crop,
			hotspot,
			asset->
		},
		location[]->{
			_id,
			name,
			country->{name}
		},
	},
	"fontProjects": *[_type == "project" && defined(fontsInUse) && references(^._id)]{
		_id, 
		title, 
		slug,
		publishedAt, 
		studio->{name,slug}, 
		fontsInUse[]->{name,_id,slug,foundry->},
		posterImage{crop,hotspot,asset->},
	}
`;

const referenceFieldsCountry = `
	"projects": *[_type == "project" && studio->location[]->country->_id match ^._id]{
		_id,
		title,
		_type,
		slug,
		posterImage {
			crop,
			hotspot,
			asset->
		},
		studio->{
			_id,
			name,
			slug,
			location[]->{
				_id,
				name,
				country->{
				_id,
				name
				}
			},
			posterImage{crop,hotspot,asset->},
		},
	},
	"studios": *[_type == "studio" && location[]->country->_id match ^._id]{
		_id,
		name,
		_type,
		slug,
		posterImage {
			crop,
			hotspot,
			asset->
		},
		location[]->{
			_id,
			name,
			country->{
			_id,
			name
			}
      	}
	},
	"foundries": *[_type == "foundry" && location[]->country->_id match ^._id]{
		_id,
		name,
		_type,
		slug,
		posterImage {
			crop,
			hotspot,
			asset->
		},
		location[]->{
			_id,
			name,
			country->{
			_id,
			name
			}
      	}
	},
	"fontProjects": *[_type == "project" && defined(fontsInUse) && studio->location[]->country->_id match ^._id]{
		_id, 
		title, 
		slug,
		publishedAt, 
		studio->{name,slug}, 
		fontsInUse[]->{name,_id,slug,foundry->},
		posterImage{crop,hotspot,asset->},
	},
`;

const referenceFieldsCity = `
	"projects": *[_type == "project" && studio->location[]->_id match ^._id]{
		_id,
		title,
		_type,
		slug,
		posterImage {
			crop,
			hotspot,
			asset->
		},
		studio->{
			_id,
			name,
			slug,
			location[]->{
				_id,
				name,
				country->{
				_id,
				name
				}
			},
			posterImage{crop,hotspot,asset->},
		},
	},
	"studios": *[_type == "studio" && location[]->_id match ^._id]{
		_id,
		name,
		_type,
		slug,
		posterImage {
			crop,
			hotspot,
			asset->
		},
		location[]->{
			_id,
			name,
			country->{
			_id,
			name
			}
      	}
	},
	"foundries": *[_type == "foundry" && location[]->_id match ^._id]{
		_id,
		name,
		_type,
		slug,
		posterImage {
			crop,
			hotspot,
			asset->
		},
		location[]->{
			_id,
			name,
			country->{
			_id,
			name
			}
      	}
	},
	"fontProjects": *[_type == "project" && defined(fontsInUse) && location[]->_id match ^._id]{
		_id, 
		title, 
		slug,
		publishedAt, 
		studio->{name,slug}, 
		fontsInUse[]->{name,_id,slug,foundry->},
		posterImage{crop,hotspot,asset->},
	},
`;


// Function to determine the document type based on the slug
async function getDocumentType( slug ) {
    const query = `*[_type in ["category", "city", "country", "person"] && slug.current == $slug][0]._type`;
    const documentType = await client.fetch(query, { slug });
    return documentType;
}

// Function to fetch data based on document type
async function fetchDataByType(type, slug) {
	let query = '';

	switch (type) {
		case 'category':
			query = `*[_type == "category" && slug.current == $slug][0]{
				_id,
				title,
				slug,
				${referenceFields}
			}`;
			break;

		case 'city':
			query = `*[_type == "city" && slug.current == $slug][0]{
				_id,
				name,
				${referenceFieldsCity}
			}`;
			break;

		case 'country':
			query = `*[_type == "country" && slug.current == $slug][0]{
				_id,
				name,
				${referenceFieldsCountry}
			}`;
			break;

		case 'person':
			query = `*[_type == "person" && slug.current == $slug][0]{
				_id,
				name,
				${referenceFields}
			}`;
			break;

		default:
			throw new Error(`Unsupported type: ${type}`);
	}

	const data = await client.fetch(query, { slug });
	return data;
}

export default async function Reference({ params }) {
    const { slug } = params;

	// Get the document type based on the slug
	const documentType = await getDocumentType(slug);

    // Fetch the data based on the document type
	const data = await fetchDataByType(documentType, slug);
    // console.log(data);

    // Extract all fonts from fontProjects
    const fonts = data.fontProjects?.flatMap(project =>
        project.fontsInUse.map(font => ({
            ...font,
            projectTitle: project.title,
            projectSlug: project.slug,
            studioName: project.studio?.name,
            studioSlug: project.studio?.slug
        }))
    );

	return (
		<>
			<section className="my-32 text-center">
				<h1 className="font-black uppercase text-5xl">{data.name ? data.name : data.title}</h1>
				<div className="font-medium text-xl mt-4">is referenced in the following places</div>
			</section>

            <GridListing data={data.studios} title={`${data.studios?.length} Studios`} limit={18} />
            <GridListing data={data.projects} title={`${data.projects?.length} Projects`} limit={18} />
            {/* <GridListing data={data.foundries} title={`${data.foundries?.length} Foundries`} limit={18} /> */}
            {/* <GridListing data={fonts} title={`${fonts?.length} Fonts`} limit={18} /> */}


		</>
	);
}