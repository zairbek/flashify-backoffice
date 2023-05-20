import React, {ReactElement, useEffect} from 'react';
import LayoutAuthenticated from "../../../../layouts/Authenticated";
import Head from "next/head";
import {getPageTitle} from "../../../../config";
import SectionMain from "../../../../components/SectionMain";
import SectionTitleLineWithButton from "../../../../components/SectionTitleLineWithButton";
import {mdiBallotOutline} from "@mdi/js";
import BaseButton from "../../../../components/BaseButton";
import CardBox from "../../../../components/CardBox";
import {Field, Form, Formik, FormikHelpers, FormikValues} from "formik";
import FormField from "../../../../components/FormField";
import BaseDivider from "../../../../components/BaseDivider";
import BaseButtons from "../../../../components/BaseButtons";
import FormCheckRadioGroup from "../../../../components/FormCheckRadioGroup";
import FormCheckRadio from "../../../../components/FormCheckRadio";
import * as Yup from 'yup';
import {CreateCategory, createCategoryApi} from "../../../../api/categories/CreateCategoryApi";
import {useRouter} from "next/router";
import {parseCookies} from "nookies";
import {wrapper} from "../../../../stores/store";
import {showCategoryApi} from "../../../../api/categories/ShowCategoryApi";


const CategoriesEdit = ({data}) => {
  const router = useRouter();
  const initialValues = {
    name: data.name,
    slug: data.slug,
    icon: data.icon,
    description: data.description,
    active: data.active,
  }

  const categoryCreateSchema = Yup.object().shape({
    name: Yup.string().required(),
    slug: Yup.string().nullable(),
    icon: Yup.string().nullable(),
    description: Yup.string().nullable(),
    active: Yup.boolean().nullable(),
  })
  const submitHandler = (values: CreateCategory, action: FormikHelpers<FormikValues>): void => {
    updateCa(values).then(res => {
      if (res.errors) {
        const formState = {
          name: null,
          slug: null,
          icon: null,
          description: null,
          active: null,
        }

        if (res.errors.name) formState.name = res.errors.name.join('. ')
        if (res.errors.slug) formState.slug = res.errors.slug.join('. ')
        if (res.errors.icon) formState.icon = res.errors.icon.join('. ')
        if (res.errors.description) formState.description = res.errors.description.join('. ')
        if (res.errors.active) formState.active = res.errors.active.join('. ')

        action.setErrors(formState)
      } else {
        router.back()
      }
    })

  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Forms')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton icon={mdiBallotOutline} title="Редактирование категории" main/>

        <CardBox>
          <Formik
            initialValues={initialValues}
            validationSchema={categoryCreateSchema}
            onSubmit={(values, action) => submitHandler(values, action)}
          >
            {({errors, touched}) => (
              <Form>
                <FormField label="Название"
                           help={(errors.name && touched.name) || (errors.slug && touched.slug)
                             ? errors.name || errors.slug
                             : null}
                >
                  <Field name="name"/>
                  <Field name="slug" placeholder="Slug"/>
                </FormField>

                <FormField label="Иконки"
                           labelFor="icon"
                           help={errors.icon && touched.icon
                             ? errors.icon
                             : null
                           }
                >
                  <Field name="icon" id="icon" component="select">
                    <option defaultChecked>Выбрать</option>
                    <option value="red">Red</option>
                    <option value="green">Green</option>
                    <option value="blue">Blue</option>
                  </Field>
                </FormField>
                <BaseDivider />

                <FormField label="Описание"
                           hasTextareaHeight
                           help={errors.description && touched.description
                             ? errors.description
                             : null}
                >
                  <Field name="description" as="textarea" placeholder="" />
                </FormField>

                <BaseDivider />

                <FormField label="Активность"
                           help={errors.active && touched.active
                             ? errors.active
                             : null
                           }
                >
                  <FormCheckRadioGroup>
                    <FormCheckRadio type="switch">
                      <Field type="checkbox" name="active"/>
                    </FormCheckRadio>
                  </FormCheckRadioGroup>
                </FormField>

                <BaseDivider />

                <BaseButtons>
                  <BaseButton type="submit" color="info" label="Сохранить" />
                  <BaseButton onClick={() => router.back()} color="info" outline label="Отменить" />
                  <BaseButton type="reset" color="warning" outline label="Reset" />
                </BaseButtons>
              </Form>
            )}
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};


CategoriesEdit.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ctx => {
  const {accessToken} = parseCookies(ctx)
  const data = {
    name: null,
    slug: null,
    icon: null,
    description: null,
    active: null,
  }
  await showCategoryApi(ctx.query.id, accessToken).then(res => {
    data.name = res.name
    data.slug = res.slug
    data.icon = res.icon
    data.description = res.description
    data.active = res.isActive
  })

  return {
    props: {
      data
    }
  }
});

export default CategoriesEdit;