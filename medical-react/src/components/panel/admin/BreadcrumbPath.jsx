import React from 'react'
import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from 'next/navigation'

export default function BreadcrumbPath() {
   const pathname = usePathname()

   const pathParts = pathname.split('/')


   return (
      <Breadcrumb>
         <BreadcrumbList>
            {pathParts.map((part, index) => {
               return (
                  <BreadcrumbItem key={index}>
                     <BreadcrumbLink href={`/${pathParts.slice(1, index + 1).join('/')}`}>
                        {part}
                     </BreadcrumbLink>
                     {/* {index < pathParts.length - 1 && <BreadcrumbSeparator />} */}
                     {index < pathParts.length - 0 && <p>/</p>}
                  </BreadcrumbItem>
               )
            })}
         </BreadcrumbList>
      </Breadcrumb>
   )
}
