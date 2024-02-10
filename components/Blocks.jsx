import Hero from "./blocks/Hero"
import Split from "./blocks/Split"
import OnDisplay from "./blocks/OnDisplay"
import Manifest from "./blocks/Manifest"
import ExploreMore from "./blocks/ExploreMore"
import CallOut from "./blocks/CallOut"
import BecomeASupporter from "./blocks/BecomeASupporter"

export default function Blocks({ data = [] }) {
  return (
    <>
      {data?.map((block, key) => {
        switch (block._type) {
          case "hero":
            return <Hero key={`section-${key}`} data={block} />
          case "split":
            return <Split key={`section-${key}`} data={block} />
          case "ondisplay":
              return <OnDisplay key={`section-${key}`} data={block} />
          case "manifest":
              return <Manifest key={`section-${key}`} data={block} />
          case "exploremore":
              return <ExploreMore key={`section-${key}`} data={block} />
          case "callout":
              return <CallOut key={`section-${key}`} data={block} />
          case "becomeasupporter":
              return <BecomeASupporter key={`section-${key}`} data={block} />
        }
      })}
    </>
  )
}
