import {useState,useEffect} from 'react'

export function useFetch(url) {
    const [datab, setDatab] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        fetch(url)
        .then(res=> res.json())
        .then(data => setDatab(data.hits))
        .catch((err)=>{throw err})
        .finally(()=>setLoading(false))
    }, []);
  
  return { datab, loading }
}

