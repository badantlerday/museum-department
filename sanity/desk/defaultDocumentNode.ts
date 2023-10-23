import {DefaultDocumentNodeResolver} from 'sanity/desk'
import Iframe from 'sanity-plugin-iframe-pane'
import { SanityDocument } from 'sanity'

const isdev = process.env.NODE_ENV === 'development'
let baseUrl = isdev? 'http://localhost:3000' : 'https:/museum-department.vercel.app'


function getPreviewUrl(doc) {
    switch (doc._type) {
      case 'studio':
        return `${baseUrl}/api/preview?slug=${doc.slug.current}&docType=studio`;
      case 'project':
          return `${baseUrl}/api/preview?slug=${doc.slug.current}&docType=project`;
      default:
        return `${baseUrl}/api/preview`;
    }
  }

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, {schemaType}) => {
  switch (schemaType) {
    case `studio`:
      return S.document().views([
        S.view.form(),
        S.view
          .component(Iframe)
          .options({
            url: (doc: SanityDocument) => getPreviewUrl(doc),
        })
          .title('Preview'),
      ])
      case `project`:
        return S.document().views([
          S.view.form(),
          S.view
            .component(Iframe)
            .options({
              url: (doc: SanityDocument) => getPreviewUrl(doc),
          })
            .title('Preview'),
        ])
    default:
      return S.document().views([S.view.form()])
  }
}

// import {DefaultDocumentNodeResolver} from 'sanity/desk'
// import Iframe from 'sanity-plugin-iframe-pane'
// import { SanityDocument } from 'sanity'

// const isdev = process.env.NODE_ENV === 'development'
// let baseUrl = isdev? 'http://localhost:3000' : 'https:/museum-department.vercel.app'

// function getPreviewUrl(doc: SanityDocument) {
//     switch (doc._type) {
//       case 'page':
//         return `${baseUrl}/api/preview?slug=studio/${doc.slug.current}&docType=page&isHomePage=${doc.isHomePage}`;
//       case 'studio':
//         return `${baseUrl}/api/preview?slug=studio/${doc.slug.current}`;
//       case 'product':
//         return `${baseUrl}/api/preview?slug=studio/${doc.slug.current}&docType=product&isHomePage=${doc.isHomePage}`;
//       default:
//         return `${baseUrl}/api/preview`;
//     }
//   }

// export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, {schemaType}) => {
//   switch (schemaType) {
//     case `page`:
//       return S.document().views([
//         S.view.form(),
//         S.view
//           .component(Iframe)
//           .options({
//             url: (doc: SanityDocument) => getPreviewUrl(doc),
//         })
//           .title('Preview'),
//       ])
//     case `studio`:
//       return S.document().views([
//         S.view.form(),
//         S.view
//           .component(Iframe)
//           .options({
//             url: (doc: SanityDocument) => getPreviewUrl(doc),
//         })
//           .title('Preview studio'),
//       ])
//     case `product`:
//       return S.document().views([
//         S.view.form(),
//         S.view
//           .component(Iframe)
//           .options({
//             url: (doc: SanityDocument) => getPreviewUrl(doc),
//         })
//           .title('Preview'),
//       ])
//     default:
//       return S.document().views([S.view.form()])
//   }
// }