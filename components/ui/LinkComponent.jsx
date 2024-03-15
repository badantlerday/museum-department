import Link from 'next/link'

export default function LinkComponent({ data }) {
    // console.log(data)
    if(data.type == 'fragment') {
        return <a href={data.fragment ? data.fragment : ''}>{data.text ? data.text : ''}</a>
    } 
    if(data.type == 'external') {
        return <a href={data.external ? data.external : ''} target="_blank">{data.text ? data.text : ''}</a>
    } 

    return (
        <Link href={data.type == 'relative' ? data.relative : '/'}>{data.text ? data.text : ''}</Link>
    );
  }