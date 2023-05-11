import React, {ReactNode, useEffect} from 'react'
import {useAppDispatch, useAppSelector} from '../stores/hooks'
import {useSelector} from "react-redux";
import {useGetUserData} from "../helpers/useGetUserData";
import {useRouter} from "next/router";

type Props = {
  children: ReactNode
}

export default function LayoutGuest({ children }: Props) {
  const dispatch = useAppDispatch()
  const userUuid = useSelector((state) => state.user.uuid);
  const router = useRouter()
  useGetUserData()

  useEffect(() => {
    if (userUuid !== null) {
      router.push('/dashboard')
    } else {
      router.push('/')
    }
  }, [userUuid])


  const darkMode = useAppSelector((state) => state.style.darkMode)

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="bg-gray-50 dark:bg-slate-800 dark:text-slate-100">{children}</div>
    </div>
  )
}
