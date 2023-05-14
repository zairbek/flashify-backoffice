import React, {ReactElement, useEffect} from 'react';
import LayoutAuthenticated from "../../../layouts/Authenticated";
import Head from "next/head";
import {getPageTitle} from "../../../config";
import SectionTitleLineWithButton from "../../../components/SectionTitleLineWithButton";
import {mdiTableBorder, mdiPlus, mdiPencil, mdiTrashCan} from "@mdi/js";
import BaseButton from "../../../components/BaseButton";
import CardBox from "../../../components/CardBox";
import SectionMain from '../../../components/SectionMain'
import {RootState, useStoreDispatch} from "../../../stores/store";
import {getCategoryAction} from "../../../stores/category/CategoryStore";
import {useSelector} from "react-redux";
import Link from "next/link";
import BaseButtons from "../../../components/BaseButtons";
import {useRouter} from "next/router";

const Categories = () => {
  const dispatch = useStoreDispatch();
  const categoryData = useSelector((state: RootState) => state.category)
  const router = useRouter()

  useEffect(() => {
    dispatch(getCategoryAction({limit: 2, parentUuid: router.query.id})).then(res => {
      console.log(res);
    })
  }, [router.query.id])


  const pagination = {
    'pages': Math.ceil(categoryData.meta.total / categoryData.meta.limit),
    'current': Math.abs(categoryData.meta.offset / categoryData.meta.limit),
  }

  const setCurrentPage = (page: number) => {
    dispatch(getCategoryAction({limit: 2, offset: Math.ceil(page * 2 ), parentUuid: router.query.id})).then(res => {
      console.log(res);
    })
  }


  return (
    <>

      <Head>
        <title>{getPageTitle('Категории')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiTableBorder} title="Категории" main>
          <BaseButton
            href='/content/categories/create'
            icon={mdiPlus}
            label="Добавить"
            color="contrast"
            roundedFull
            small
          />
        </SectionTitleLineWithButton>

        <CardBox className="mb-6" hasTable>
          <div className="flex flex-col overflow-x-auto">
            <div className="sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">#</th>
                      <th scope="col" className="px-6 py-4">Названия</th>
                      <th scope="col" className="px-6 py-4">Slug</th>
                      <th scope="col" className="px-6 py-4">Icon</th>
                      <th scope="col" className="px-6 py-4">Действие</th>
                    </tr>
                    </thead>
                    <tbody>
                    {categoryData.data.map((catalog, key) => (
                      <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                          key={key}>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">{key + 1}</td>
                        <td className="whitespace-nowrap px-6 py-4 underline">
                          <Link href={`/content/categories/${catalog.uuid}`}>{catalog.name}</Link>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">{catalog.slug}</td>
                        <td className="whitespace-nowrap px-6 py-4">{catalog.icon}</td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <BaseButtons>
                            <BaseButton
                              href={`/content/categories/${catalog.uuid}/edit`}
                              icon={mdiPencil}
                              color="info"
                              small
                            />
                            <BaseButton
                              href="/content/categories/create"
                              icon={mdiTrashCan}
                              color="danger"
                              small
                            />
                          </BaseButtons>
                        </td>
                      </tr>
                    ))}
                    </tbody>
                  </table>


                  <div className="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
                    <div className="flex flex-col md:flex-row items-center justify-between py-3 md:py-0">
                      <BaseButtons>
                        {Array(pagination.pages).fill(0).map((item, page) => (
                          <BaseButton
                            key={page}
                            active={page === pagination.current}
                            label={page + 1}
                            color={page === pagination.current ? 'lightDark' : 'whiteDark'}
                            small
                            onClick={() => setCurrentPage(page)}/>
                        ))}
                      </BaseButtons>
                      <small className="mt-6 md:mt-0">
                        Page {pagination.current + 1} of {pagination.pages}
                      </small>
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </div>
        </CardBox>
      </SectionMain>
    </>
  );
};

Categories.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default Categories;