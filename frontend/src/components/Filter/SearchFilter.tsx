import React from 'react'
import { useCommerceStore } from "../../store"

function SearchFilter() {
  const {
    searchFilter,
    setSearchFilter
  } =  useCommerceStore()
  return (
    <input className='w-full rounded-2xl px-4 border-[1px] border-gray-500' type="search" name="search" id="search" placeholder="Search" value={searchFilter} onChange={(e)=>{setSearchFilter(e.target.value)}} />
  )
}

export default SearchFilter