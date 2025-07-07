"use client";
import React, { useState } from 'react'
import { useContextApp } from '@/context/ContextApp';
import { useRouter } from 'next/router';
import InitConsutls from '@/components/panel/admin/consult/InitConsutls';

export default function page({ params }) {
    const { id } = React.use(params);

    return (
        <div className='w-full '>
            <InitConsutls id={id} />
        </div>
    )
}
