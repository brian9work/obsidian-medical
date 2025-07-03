import React from 'react'
import { Button } from './ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function Pagination({ pagination, setPagination, children }) {
    return (
        <div className="mt-5">
            <div className="flex items-center justify-between w-44">
                <Button
                    className={"bg-gray-900 text-white hover:bg-gray-800 cursor-pointer"}
                    onClick={() => {
                        if (pagination.page > 0) {
                            setPagination({ ...pagination, page: pagination.page - 1 })
                        }
                    }}
                >
                    <ArrowLeft />
                </Button>
                <span className="text-sm text-gray-800">
                    Página {pagination.page + 1}
                </span>
                <Button
                    className={"bg-gray-900 text-white hover:bg-gray-800 cursor-pointer"}
                    onClick={() => {
                        setPagination({ ...pagination, page: pagination.page + 1 })
                    }}
                >
                    <ArrowRight />
                </Button>
            </div>
            {children}

            <div className='flex '>
                <div className='ml-auto'>
                    <label className="text-sm text-gray-800">
                        Cantidad de registros por página:
                    </label>
                    <div className="flex gap-2 mt-1">
                        {[5, 10, 20, 50, 100].map((size) => (
                            <Button
                                key={"btn-for-size-" + size}
                                className={`${pagination.size === size ? "bg-gray-900" : "bg-gray-500"}  text-white hover:bg-gray-800 cursor-pointer `}
                                onClick={() => setPagination({ page: 0, size: size })}>
                                <span className="font-bold">{size}</span>
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
