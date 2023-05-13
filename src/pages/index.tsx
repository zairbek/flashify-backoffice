import React from 'react'
import type {ReactElement} from 'react'
import Head from 'next/head'
import BaseButton from '../components/BaseButton'
import CardBox from '../components/CardBox'
import SectionFullScreen from '../components/SectionFullScreen'
import LayoutGuest from '../layouts/Guest'
import {Field, Form, Formik} from 'formik'
import FormField from '../components/FormField'
import BaseDivider from '../components/BaseDivider'
import BaseButtons from '../components/BaseButtons'
import {getPageTitle} from '../config'
import {useStoreDispatch} from "../stores/store";
import {authorization} from "../stores/auth/AuthDataStore";
import * as Yup from 'yup';
import {SignInError, Token} from "../api/auth/types";
import {ValidationErrors} from "../api/root/types";
import {getMeAction} from "../stores/user/UserStore";

export default function SignIn() {
  const dispatch = useStoreDispatch()

  const signInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required()
  })

  const handleSubmit = ({email, password}, action) => {
    dispatch(authorization({email, password})).then((res) => {
      const data = res.payload as ValidationErrors<SignInError>
      if (data.errors) {
        const errors = res.payload as ValidationErrors<SignInError>
        const state = {
          email: null,
          password: null
        }

        if (errors.errors.email) state.email = errors.errors.email.join('. ')
        if (errors.errors.password) state.password = errors.errors.password.join('. ')
        action.setErrors(state)
      } else {
        const token = res.payload as Token
        localStorage.setItem('token', JSON.stringify(token));
        dispatch(getMeAction({accessToken: token.accessToken}))
      }
    })
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Login')}</title>
      </Head>

      <SectionFullScreen bg="purplePink">
        <CardBox className="w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 shadow-2xl">
          <Formik
            initialValues={{email: 'john@example.com', password: '119663'}}
            validationSchema={signInSchema}
            onSubmit={(values, action) => handleSubmit(values, action)}
          >
            {({errors, touched}) => (
              <Form>
                <FormField label="Email"
                           help={errors.email && touched.email
                             ? errors.email
                             : null
                           }
                >
                  <Field name="email"/>
                </FormField>

                <FormField label="Password"
                           help={errors.password && touched.password
                             ? errors.password
                             : null
                           }
                >
                  <Field name="password" type="password"/>
                </FormField>

                <BaseDivider/>

                <BaseButtons>
                  <BaseButton type="submit" label="Login" color="info"/>
                  <BaseButton href="/dashboard" label="Home" color="info" outline/>
                </BaseButtons>
              </Form>
            )}
          </Formik>
        </CardBox>
      </SectionFullScreen>
    </>
  )
}

SignIn.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>
}

export const getServerSideProps = async ({ req, params }) => {
  return {
    props: {
      data: {}
    }
  }
}