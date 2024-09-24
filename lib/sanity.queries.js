// Construct our "image meta" GROQ
export const imageMeta = `
    crop,
    hotspot,
    asset->,
    size,
    "lqip": asset->metadata.lqip,
    "dominant": asset->metadata.palette.dominant.background,
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

export const getPageDesignStudios = `{
  "studios": ${getStudios},
  "recentlyUpdatedProjects": ${getUpdatedProjects},
  "newStudios": ${getNewStudios}
}`;

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
