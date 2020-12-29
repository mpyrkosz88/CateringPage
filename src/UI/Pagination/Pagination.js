//libraries
import React from 'react';

import './Pagination.scss' 

const pagination = (props) => {
    
        const currentPage = props.currentPage;
        const postsPerPage = props.postsPerPage;
        const totalPosts = props.totalPosts;
        const paginationPages = Math.ceil(totalPosts/postsPerPage);
        const paginationButtons = []
        let pagination
        let nextPage
        let previousPage

        if (currentPage < 2) {
            previousPage = currentPage - 1
            nextPage = currentPage + 2
        } 
        else if (currentPage === paginationPages) {
            previousPage = currentPage - 3
            nextPage = currentPage
        } 
        else {
            nextPage = props.currentPage + 1
            previousPage = props.currentPage - 2
        }

        for (let i=1; i<paginationPages+1; i++) {
            paginationButtons.push(i)
        }


        if (paginationPages < 2) {
            pagination = null
        }
        else if (paginationPages < 4) {
            pagination = (
                <ul className="pagination_list">
                    {paginationButtons.map(number => {
                        if(currentPage === number) {
                            return <li key={number} className={"active-pagination"}>{number}</li>
                        }
                        return <li key={number} value={number} onClick={props.onChange}>{number}</li>
                     })
                    }
                </ul>
                )
        }
        else {
            pagination = (
                <ul className="pagination_list">
                    <li value="1" onClick={props.onChange}>First</li>
                    {paginationButtons.slice(previousPage, nextPage).map(number => {
                        if(currentPage === number) {
                            return <li key={number} className={"active-pagination "}>{number}</li>
                        }
                        return <li key={number} value={number} onClick={props.onChange}>{number}</li>
                     })
                    }
                    <li value={paginationPages} onClick={props.onChange}>Last</li>
                </ul>
                )
        }

        return pagination
}

export default pagination