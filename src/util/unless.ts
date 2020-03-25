import {Request, Response, RequestHandler, NextFunction} from 'express'
import {pathToRegexp, Path} from 'path-to-regexp'

const unless = (paths: Path[], middleware: RequestHandler): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    
    let cut = ''
    if(req.url.includes('v1/products')) {
      cut = req.url.substring(0, req.url.indexOf('products/') + 9)
    } else cut = req.url.split('?')[0]

    const regexPath = paths.map(p => pathToRegexp(p))
    const regexUrl = pathToRegexp(cut)
    const path: any = regexPath.find(r => r.toString() === regexUrl.toString())
    if(path === undefined) {
      middleware(req, res, next)
    } if(path !== undefined) {
      path.test(cut) ? next() : middleware(req, res, next)
    } 
  }
}

export default unless