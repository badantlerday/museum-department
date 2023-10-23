import type { NextApiRequest, NextApiResponse } from 'next'

export default function preview(req: NextApiRequest, res: NextApiResponse) {
    const query = req.query;
    const { slug, docType } = query;
    res.setDraftMode({ enable: true })
    if(docType == 'studio') {
        res.writeHead(307, {Location: slug ? `/studio/${slug}` : '/'})
    } else if(docType == 'project') { 
        res.writeHead(307, {Location: slug ? `/project/${slug}` : '/'})
    } else {
        res.writeHead(307, { Location: '/' })
    }
    res.end()
}