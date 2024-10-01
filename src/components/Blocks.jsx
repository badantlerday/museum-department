// import Hero from "./blocks/Hero"
// import Split from "./blocks/Split"
// import OnDisplay from "./blocks/OnDisplay"
// import Manifest from "./blocks/Manifest"
// import ExploreMore from "./blocks/ExploreMore"
// import CallOut from "./blocks/CallOut"
// import BecomeASupporter from "./blocks/BecomeASupporter"
import CaseMedia from "@/components/blocks/CaseMedia"
// import Slideshow from "./blocks/Slideshow"

export default function Blocks({ data = [] }) {
  return (
    <>
      {data?.map((block, key) => {
        switch (block._type) {
          case "casemedia":
              return <CaseMedia key={`section-${key}`} data={block} />
        }
      })}
    </>
  )
}
