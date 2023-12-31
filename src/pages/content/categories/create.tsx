import React, {ReactElement, useEffect} from 'react';
import LayoutAuthenticated from "../../../layouts/Authenticated";
import Head from "next/head";
import {getPageTitle} from "../../../config";
import SectionMain from "../../../components/SectionMain";
import SectionTitleLineWithButton from "../../../components/SectionTitleLineWithButton";
import {mdiBallotOutline} from "@mdi/js";
import BaseButton from "../../../components/BaseButton";
import CardBox from "../../../components/CardBox";
import {Field, Form, Formik, FormikHelpers, FormikValues} from "formik";
import FormField from "../../../components/FormField";
import BaseDivider from "../../../components/BaseDivider";
import BaseButtons from "../../../components/BaseButtons";
import FormCheckRadioGroup from "../../../components/FormCheckRadioGroup";
import FormCheckRadio from "../../../components/FormCheckRadio";
import * as Yup from 'yup';
import {CreateCategory, createCategoryApi} from "../../../api/categories/CreateCategoryApi";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import {useStoreDispatch} from "../../../stores/store";
import {getIconAction} from "../../../stores/icon/IconStore";


const CategoriesCreate = () => {
  const router = useRouter();
  const dispatch = useStoreDispatch();
  const icons = useSelector(state => state.icon.data)

  useEffect(() => {
    dispatch(getIconAction({limit: 9999}))
  }, [])

  const initialValues = {
    name: '',
    slug: '',
    icon: '',
    description: '',
    parentCategory: router.query.p || '',
    active: false
  }

  const categoryCreateSchema = Yup.object().shape({
    name: Yup.string().required(),
    slug: Yup.string().nullable(),
    icon: Yup.string().nullable(),
    description: Yup.string().nullable(),
    active: Yup.boolean().nullable(),
  })
  const submitHandler = (values: CreateCategory, action: FormikHelpers<FormikValues>): void => {
    createCategoryApi(values).then(res => {
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
        <SectionTitleLineWithButton icon={mdiBallotOutline} title="Создание категории" main/>

        <CardBox>
          <Formik
            initialValues={initialValues}
            validationSchema={categoryCreateSchema}
            onSubmit={(values, action) => submitHandler(values, action)}
          >
            {({errors, touched}) => (
              <Form>
                <Field name="parentCategory" type="hidden"/>
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
                    {icons.map((icon, key) => (
                      <option value={icon.uuid} key={key}>{icon.name}</option>
                    ))}
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


CategoriesCreate.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default CategoriesCreate;