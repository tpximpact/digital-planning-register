"use server"

export async function getApplicationsByCouncil() {
 const data = await fetch(`${process.env.NEXT_PUBLIC_API}`, {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_KEY}`
  }
});

 return data.json()
}