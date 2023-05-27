import React, {ReactElement} from 'react';
import LayoutAuthenticated from "../../../../../layouts/Authenticated";
import Head from "next/head";
import {getPageTitle} from "../../../../../config";
import SectionMain from "../../../../../components/SectionMain";
import SectionTitleLineWithButton from "../../../../../components/SectionTitleLineWithButton";
import {mdiBallotOutline, mdiUpload} from "@mdi/js";
import BaseButton from "../../../../../components/BaseButton";
import CardBox from "../../../../../components/CardBox";
import {Field, Form, Formik, FormikHelpers, FormikValues} from "formik";
import FormField from "../../../../../components/FormField";
import BaseDivider from "../../../../../components/BaseDivider";
import BaseButtons from "../../../../../components/BaseButtons";
import * as Yup from 'yup';
import {useRouter} from "next/router";
import {parseCookies} from "nookies";
import {wrapper} from "../../../../../stores/store";
import {showIconApi} from "../../../../../api/icons/ShowIconApi";
import FormFilePicker from "../../../../../components/FormFilePicker";
import {UpdateIcon, updateIconApi} from "../../../../../api/icons/UpdateIconApi";


const IconsEdit = ({data}) => {
  console.log(data)

  const router = useRouter();
  const initialValues = {
    name: data.name,
    file: data.file,
  }

  const MAX_FILE_SIZE = 102400 * 10; //100KB
  // const validFileExtensions = { image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'] };
  const validFileExtensions = { image: ['svg'] };
  const isValidFileType = (fileName, fileType) => {
    return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
  }

  const iconCreateSchema = Yup.object().shape({
    name: Yup.string().required(),
    file: Yup.mixed()
      .notRequired()
      .test("is-valid-type", "Not a valid image type",
        value => typeof value === 'string'
          ? true
          : isValidFileType(value && value.name.toLowerCase(), "image"))
      .test("is-valid-size", "Max allowed size is 100KB",
        value => typeof value === 'string'
          ? true
          : value && value.size <= MAX_FILE_SIZE)
    ,
  })

  const submitHandler = (values: UpdateIcon, action: FormikHelpers<FormikValues>): void => {
    const data = {
      name: values.name,
      file: null
    }
    if (typeof values.file !== 'string') {
      data.file = values.file;
    }

    updateIconApi(router.query.id, data).then(res => {
      if (res.errors) {
        const formState = {
          name: '',
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
        <SectionTitleLineWithButton icon={mdiBallotOutline} title="Редактирование иконок" main/>

        <CardBox>
          <Formik
            initialValues={initialValues}
            validationSchema={iconCreateSchema}
            onSubmit={(values, action) => submitHandler(values, action)}
          >
            {({errors, touched, setFieldValue}) => (
              <Form>
                <FormField label="Название"
                           help={errors.name && touched.name
                             ? errors.name
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


IconsEdit.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ctx => {
  const {accessToken} = parseCookies(ctx)
  const data = {
    uuid: null,
    name: null,
    file: null,
  }
  await showIconApi(ctx.query.id, accessToken).then(res => {
    data.uuid = res.uuid
    data.name = res.name
    data.file = res.file
  })

  return {
    props: {
      data
    }
  }
});

export default IconsEdit;