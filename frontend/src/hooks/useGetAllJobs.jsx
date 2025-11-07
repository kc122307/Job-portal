import { setAllJobs, setLoading } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const {searchedQuery} = useSelector(store=>store.job);
    // debounce the search query to limit requests
    const [debounced, setDebounced] = useState(searchedQuery ?? "");
    useEffect(() => {
        const t = setTimeout(() => setDebounced(searchedQuery ?? ""), 350);
        return () => clearTimeout(t);
    }, [searchedQuery]);

    // requestId guards against StrictMode double invoke and races
    const requestId = useRef(0);
    // last fetched value to avoid duplicate fetch on StrictMode double mount
    const lastFetched = useRef(undefined);
    useEffect(()=>{
        // Skip if we just fetched the same value (prevents StrictMode duplicate)
        if (lastFetched.current === debounced) return;
        lastFetched.current = debounced;

        const id = ++requestId.current;
        const ac = new AbortController();

        const fetchAllJobs = async () => {
            try {
                dispatch(setLoading(true));
                const res = await axios.get(`${JOB_API_END_POINT}/get`,{
                    params: { keyword: debounced },
                    withCredentials:true,
                    signal: ac.signal,
                    timeout: 10000
                });
                if(res.data.success && id === requestId.current){
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                if (axios.isCancel && axios.isCancel(error)) return;
                console.log(error);
            } finally {
                dispatch(setLoading(false));
            }
        }
        // Add a small delay to prevent rapid successive fetches
        const timeoutId = setTimeout(fetchAllJobs, 100);
        return () => {
            clearTimeout(timeoutId);
            ac.abort();
        };
    },[debounced, dispatch])
}

export default useGetAllJobs