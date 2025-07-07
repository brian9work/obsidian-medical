import AllInfoOfConsult from '@/components/allInfoOfConsult/AllInfoOfConsult';
import React from 'react'

export default function page({ params }) {
   const { id } = React.use(params);
   return (
      <div>
         <AllInfoOfConsult idDate={id} />
      </div>
   )
}
