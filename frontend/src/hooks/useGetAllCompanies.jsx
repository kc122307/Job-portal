import { setCompanies} from '@/redux/companySlice'
import { COMPANY_API_END_POINT} from '@/utils/constant'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    const didRun = useRef(false); // guard StrictMode double-invoke in dev
    useEffect(()=>{
        if (didRun.current) return;
        didRun.current = true;

        const ac = new AbortController();
        const fetchCompanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`,{withCredentials:true, signal: ac.signal, timeout: 10000});
                console.log('called');
                if(res.data.success){
                    dispatch(setCompanies(res.data.companies));
                }
            } catch (error) {
                if (axios.isCancel && axios.isCancel(error)) return;
                console.log(error);
            }
        }
        fetchCompanies();
        return () => ac.abort();
    },[])
}

export default useGetAllCompanies