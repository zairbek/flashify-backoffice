import React, {ReactElement} from 'react';
import LayoutAuthenticated from "../../../../layouts/Authenticated";
import Head from "next/head";
import {getPageTitle} from "../../../../config";
import SectionMain from "../../../../components/SectionMain";
import SectionTitleLineWithButton from "../../../../components/SectionTitleLineWithButton";
import {mdiBallotOutline, mdiUpload} from "@mdi/js";
import BaseButton from "../../../../components/BaseButton";
import CardBox from "../../../../components/CardBox";
import {Field, Form, Formik, FormikHelpers, FormikValues} from "formik";
import FormField from "../../../../components/FormField";
import BaseDivider from "../../../../components/BaseDivider";
import BaseButtons from "../../../../components/BaseButtons";
import * as Yup from 'yup';
import {useRouter} from "next/router";
import FormFilePicker from "../../../../components/FormFilePicker";
import {CreateIcon, createIconApi} from "../../../../api/icons/CreateIconApi";


const IconCreate = () => {
  const router = useRouter();
  const initialValues = {
    name: '',
    file: null,
  }

  const MAX_FILE_SIZE = 102400; //100KB
  // const validFileExtensions = { image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'] };
  const validFileExtensions = { image: ['svg'] };
  const isValidFileType = (fileName, fileType) => {
    return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
  }

  const categoryCreateSchema = Yup.object().shape({
    name: Yup.string().required(),
    file: Yup.mixed()
      .required()
      .test("is-valid-type", "Not a valid image type",
        value => isValidFileType(value && value.name.toLowerCase(), "image"))
      .test("is-valid-size", "Max allowed size is 100KB",
        value => value && value.size <= MAX_FILE_SIZE)
    ,
  })
  const submitHandler = (values: CreateIcon, action: FormikHelpers<FormikValues>): void => {
    console.log(values)

    createIconApi(values).then(res => {
      if (res.errors) {
        const formState = {
          name: null,
          file: null,
        }

        if (res.errors.name) formState.name = res.errors.name.join('. ')
        if (res.errors.file) formState.file = res.errors.file.join('. ')
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
            {({errors, touched, setFieldValue}) => (
              <Form>
                <Field name="parentCategory" type="hidden"/>
                <FormField label="Название"
                           help={(errors.name && touched.name) || (errors.slug && touched.slug)
                             ? errors.name || errors.slug
                             : null}
                >
                  <Field name="name"/>
                </FormField>

                <FormField
                  help={(errors.file && touched.file)
                    ? errors.file
                    : null}
                >
                  <FormFilePicker name="file" label="Upload" color="info" icon={mdiUpload} setFieldValue={setFieldValue} />
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


IconCreate.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default IconCreate;