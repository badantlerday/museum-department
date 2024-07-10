// Construct our "image meta" GROQ
export const imageMeta = `
    crop,
    hotspot,
    asset->,
    size,
    "lqip": asset->metadata.lqip,
    "dominant": asset->metadata.palette.dominant.background,
`;
