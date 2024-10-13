// FRAGMENTS
export const imageMeta = `
    crop,
    hotspot,
    asset->,
    size,
    "lqip": asset->metadata.lqip,
    "dominant": asset->metadata.palette.dominant.background,
`;
export const locationMeta = `
		location[]->{
			_id, name, _type, slug, country->{name,_type,slug}
		},
`;

// GLOBAL
export const getAllPageTitles = `
  	*[_type in ["project","studio","typeface","foundry","interview","city","country","person","category"]]{
        _type,
        title,
        name,
        slug,
    }
`;

// SINGLE
export const getCurrentStudio = `{
	"studio": *[_type == "studio" && slug.current == $slug][0]{
		_id,
		name,
		slug,
		description,
		founded,
		size,
		mainImage{${imageMeta}},
		studioSoundsPlaylist,
		interview->{
			_id,
			title,
			slug,
			posterImage{${imageMeta}},
		},
		website,
		instagram,
		category[]->,
		exploreMore{documentTypes,city[]->{_id},country[]->{_id,name},category[]->{_id}},
		location[]->{
			_id, name,slug, country->{name,slug}
		  },
		  "works": *[_type == "project" && references(^._id)]{
			_id,
			_type,
			slug,
			title,
			studio->{name},
			posterImage{${imageMeta}},
		},
	}
  }`;

export const getFoundry = `
  *[_type == "foundry" && slug.current == $slug][0]{
  _id,
    _type,
  name,
  slug,
  size,
  founded,
  information,
  typeDesigners[]->{
    _id,
  		name,
  		_type,
  		slug
  },
  mainImage{crop,hotspot,asset->},
  mainFontImage{asset->},
  location[]->{
  	_id, name, country->{name,slug},slug
    },
  studioSoundsPlaylist,
  interview->{
  	_id,
  	title,
  	slug,
  	posterImage{crop,hotspot,asset->},
  },
  staff[]{title,people[]->{_id,name,slug}},
  "typefaces": *[_type == "typeface" && references(^._id)] | order(name asc){
  	_id,
      _type,
  	slug,
  	name,
      realaseYear,
      style,
      foundry->{
        _id,
          _type,
        name,
        slug,
        location[]->{
          _id,name,_type,slug,country->{name,slug,_type}
        },
      },
      posterImage{crop,hotspot,asset->},
      specimenPoster{crop,hotspot,asset->},
      mainImage{crop,hotspot,asset->},
  },
  "projects": *[_type == "project" && fontsInUse[]->foundry->_id match ^._id]{
  	_id,
  	slug,
  	_type,
  	title,
  	name,
  	posterImage{crop,hotspot,asset->},
  	studio->{name,slug},
  	fontsInUse[]->{name,_id,slug}
  },
  "foundries": *[_type == "foundry"] | order(_createdAt desc){
  	_id,
  	slug,
  	_type,
  	title,
  	name,
  	posterImage{crop,hotspot,asset->},
  	mainImage{crop,hotspot,asset->},
  	location[]->{
  	_id, name, country->{name,slug},slug
    },
  }
   }
`;

export const getStudios = `
  *[_type == "studio" ] | order(name asc){
    _id,
		_type,
		_createdAt,
		_type,
		name,
		slug,
		location[]->{
			_id, name, _type, slug, country->{name,_type,slug}
		},
		mainImage{${imageMeta}},
		posterImage{${imageMeta}}
  }
`;

export const getNewStudios = `
  *[_type == "studio"] | order(publishedAt desc) {
    _id,
		_createdAt,
		publishedAt,
		name,
		slug,
		location[]->{
			_id, name, _type, slug, country->{name,_type,slug}
		},
		mainImage{${imageMeta}},
		posterImage{${imageMeta}},
		"projects": *[_type == "project" && references(^._id)]{
			name,
			posterImage{${imageMeta}},
		},
  }
`;

export const getProject = `
  	*[_type == "project" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    information,
    publishedAt,
    pageBlocks[]{
		_type,
		_key,
		image{${imageMeta}},
		layoutoptions
	},
    category[]->,
    sizeMedia,
   	mainImage{${imageMeta}},
    mainVideo,
		fontsInUse[]->{
			name,
			slug,
			foundry->{
				name,
				slug
			}
		},
		gallery{
			images[]{
        _key,
        display,
        asset->
			}
		},
    content[]{
      image[]{
      _key,
      asset->
      }
    },
		studio->{
			_id, name, slug,
			location[]->{
				_id, name, country->{name,slug},slug
			  }
		},
		credits[]{category->{title},title,people[]->{_id,name,slug}},
	  }
`;

export const getInterview = `
  	*[_type == "interview" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    body,
    excerpt,
	textCollage,
	textCollageIntro,
    posterImage{${imageMeta}},
	studio->{
		name,
		slug,
		_type,
		"projects": *[_type == "project" && references(^._id)]{
			_id,
			_type,
			name,
			slug,
			posterImage{${imageMeta}},
		},
	},
	'readTime': length(string::split(pt::text(body), ' ')) / 200,
    }
`;

export const getInterviews = `
  	*[_type == "interview"]{
    _id,
	_type,
    title,
    slug,
	excerpt,
    posterImage{${imageMeta}},
    posterImage{${imageMeta}},
	studio->{
		name,
		slug,
		_type,
		${locationMeta}
	},
	'readTime': length(string::split(pt::text(body), ' ')) / 200,
    }
`;

export const getLatestProject = `
  *[_type == "project"] | order(_createdAt desc)[0]{
        _id,
        title,
        slug,
        mainImage{${imageMeta}},
        mainVideo,
        studio->{name},
    }
`;

export const getUpdatedProjects = `
  *[_type == "project" ] | order(updatedAt asc){
    _id,
		title,
		_type,
		slug,
		posterImage{${imageMeta}},
		studio->{
			_id,
			name,
			slug,
			location[]->{
				_id,
				name,
				slug,
				country->{name,slug}
			},
			posterImage{${imageMeta}},
			"countProjects": count(*[_type == "project" && references(^._id)])
		},
  }
`;

export const getTypefaces = `
  *[_type == "typeface" ] | order(name asc){
    _id,
	_type,
	name,
	slug,
	realaseYear,
	style,
	foundry->{
		_id,
    	_type,
		name,
		slug,
		location[]->{
			_id,name,_type,slug,country->{name,slug,_type}
		},
	},
	mainImage{${imageMeta}},
	specimenPoster{${imageMeta}},
	posterImage{${imageMeta}},
    }
`;

export const getFontsInUse = `
  *[_type == "project" && defined(fontsInUse)] {
        _id,
        title,
        slug,
		publishedAt,
        studio->{name,slug},
        fontsInUse[]->{name,_id,slug},
        posterImage{${imageMeta}},
    }
`;

export const getFontGalleryItems = `
  *[_type == "project" && defined(fontsInUse) && !defined(ondisplay)] {
        _id,
        title,
        slug,
		publishedAt,
        studio->{name,slug},
        fontsInUse[]->{name,_id,slug},
        posterImage{${imageMeta}},
    }
`;

// PAGES

export const getOnDisplay = `
  *[_type == "project" && ondisplay == true] | order(publishedAt desc){
		_id,
		_type,
		title,
		slug,
		mainImage{${imageMeta}},
		posterImage{${imageMeta}},
		displaySettings,
		studio->{name,slug}
	}
`;

export const getPageDesignStudios = `{
	"studios": ${getStudios},
	"recentlyUpdatedProjects": ${getUpdatedProjects},
  }`;

export const getPageFontsGallery = `{
	  "fontsinuse": ${getFontsInUse},
	  "typefaces": ${getTypefaces}
	}`;
