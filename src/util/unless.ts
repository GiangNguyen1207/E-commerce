import {Request, Response, RequestHandler, NextFunction} from 'express'
import {pathToRegexp, Path} from 'path-to-regexp'

const unless = (paths: Path[], middleware: RequestHandler): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    
    const cut = req.url.split('?')[0]

    const regexPath = paths.map(p => pathToRegexp(p))
    const regexUrl = pathToRegexp(cut)
    const path: any = regexPath.find(r => r.toString() === regexUrl.toString())
    if(path === undefined) {
      next()
    } if(path !== undefined) {
      path.test(cut) ? next() : middleware(req, res, next)
    } 
  }
}

export default unless