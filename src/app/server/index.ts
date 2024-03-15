"use server"

export async function getApplicationsByCouncil(page: number, resultsPerPage: number) {
 const data = await fetch(`${process.env.NEXT_PUBLIC_API}planning_applications?page=${page}&maxresults=${resultsPerPage}`, {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_KEY}`
  }
});

 return data.json()
}