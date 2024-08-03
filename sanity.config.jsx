import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemas';
import { visionTool } from '@sanity/vision';
import { structure } from './sanity/config/structure';
// import { defaultDocumentNode } from './sanity/config/structure';
import {media} from 'sanity-plugin-media'
import {cloudinarySchemaPlugin} from 'sanity-plugin-cloudinary'
// import { assist } from '@sanity/assist'
// import {presentationTool} from 'sanity/presentation'
// import { locate } from "@/sanity/plugins/locate";
import "./sanity/custom.css";

// We recommend configuring the preview location base URL using
// environment variables to support multiple environments
// const SANITY_STUDIO_PREVIEW_URL = (
// 	process.env.SANITY_STUDIO_PREVIEW_URL
// 	|| 'http://localhost:3000'
// )


export default defineConfig({
  basePath: '/admin',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  title: 'Museum Department',
  icon: CustomLogo,
  scheduledPublishing: {enabled: false,},
  tasks: { enabled: false },
  document: {
    comments: {
      enabled: false,
    },
  },
  schema: {
		types: schemaTypes,
	},
  plugins: [
    structureTool({
      structure,
      // defaultDocumentNode,
    }),
    media(),
    cloudinarySchemaPlugin(),
    visionTool(),
    // presentationTool({
    //   locate,
    //   previewUrl: { previewMode: { enable: "/api/draft" } },
    // }),
    // presentationTool({
    //   // Required: set the base URL to the preview location in the front end
    //   previewUrl: SANITY_STUDIO_PREVIEW_URL,
    // }),
  ],
  //https://github.com/sanity-io/sanity/issues/3142#issuecomment-1666561482 All Field
  form: {
    components: {
      input: (props) => {
        if (Array.isArray(props.groups) && props.groups.length > 0) {
          if (props.groups[0].name === 'all-fields') {
            props.groups.push(props.groups.shift())
          }
        }
        return props.renderDefault(props)
      },
    },
  },
})

function CustomLogo(props) {
	return (
    <svg width="74" height="74" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="74" height="74" fill="white"/>
    <path d="M16.26 29.168V25.904L37.456 11L58.652 25.904V29.168H16.26Z" stroke="black" stroke-width="1.087" stroke-miterlimit="10"/>
    <path d="M37.457 22.423C38.0339 22.4228 38.587 22.1934 38.9947 21.7853C39.4024 21.3772 39.6313 20.8239 39.631 20.247C39.6307 19.6702 39.4013 19.1171 38.9933 18.7094C38.5852 18.3017 38.0319 18.0728 37.455 18.073C37.1694 18.0732 36.8866 18.1295 36.6227 18.239C36.3589 18.3484 36.1192 18.5087 35.9173 18.7108C35.7155 18.9128 35.5554 19.1527 35.4462 19.4166C35.337 19.6805 35.2809 19.9634 35.281 20.249C35.2811 20.5347 35.3375 20.8175 35.447 21.0813C35.5564 21.3451 35.7167 21.5848 35.9188 21.7867C36.1208 21.9886 36.3607 22.1487 36.6246 22.2578C36.8885 22.367 37.1714 22.4232 37.457 22.423Z" stroke="black" stroke-width="0.761" stroke-miterlimit="10"/>
    <path d="M22.782 29.168V53.101M28.215 29.168V53.101M25.498 29.277V53.101M34.739 29.168V53.101M40.174 29.168V53.101M37.455 29.277V53.101M46.694 29.168V53.101M52.128 29.168V53.101M49.411 29.277V53.101M17.347 52.992V56.909H13V61.695H61.913V56.909H57.565V52.992H17.347Z" stroke="black" stroke-width="1.087" stroke-miterlimit="10"/>
    </svg>
	);
}