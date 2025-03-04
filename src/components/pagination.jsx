import React from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
const PaginationComponent = ({ currentPage, setCurrentPage , totalItems  , itemsPerPage}) => {
    const isLastPage = Math.ceil(totalItems / itemsPerPage);

    console.log({isLastPage})
    const handleNext = () => {
        setCurrentPage((prev) => prev + 1);
    }
    const handlePrev = () => {
        setCurrentPage(prev => prev - 1);
    }
    return (
        <Pagination className="mt-6 mb-3 ">
            <PaginationContent className="select-none cursor-pointer">
                {currentPage > 1 && <PaginationItem>
                    <PaginationPrevious onClick={handlePrev} />
                </PaginationItem>
                }
                <PaginationItem>
                    <PaginationLink className="bg-amber-600 text-white">{currentPage}</PaginationLink>
                </PaginationItem>
                {currentPage !== isLastPage && <><PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                    <PaginationItem>
                        <PaginationNext onClick={handleNext} />
                    </PaginationItem>
                </>
                }
            </PaginationContent>
        </Pagination>
    )
}

export default PaginationComponent
