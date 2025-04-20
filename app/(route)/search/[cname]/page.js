'use client'
import React, { useEffect } from 'react'
import { use } from 'react'; // Обязательно импортировать
function Search({ params }) {
	const routeParams = use(params);
	useEffect(() => {
		console.log(routeParams.cname);
		
	}, [])
  return (
	<div>
	  <h2>Search</h2>
	</div>
  )
}

export default Search
