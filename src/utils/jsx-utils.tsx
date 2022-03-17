import { Navigate, RouteObject } from 'react-router'

export const protectedRoute = (predicate: () => boolean, route: RouteObject, replacementURL: string = '/'): RouteObject => {
  if(predicate()){
    return route
  }else{
    return { path: route.path, element: <Navigate to={replacementURL} replace/> } as RouteObject
  }
}