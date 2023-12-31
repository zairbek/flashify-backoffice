import React, {ReactElement, useEffect, useState} from 'react';
import LayoutAuthenticated from "../../../layouts/Authenticated";
import Head from "next/head";
import {getPageTitle} from "../../../config";
import SectionTitleLineWithButton from "../../../components/SectionTitleLineWithButton";
import {mdiTableBorder, mdiPlus, mdiPencil, mdiTrashCan, mdiFolderHome, mdiFolderHomeOutline} from "@mdi/js";
import BaseButton from "../../../components/BaseButton";
import CardBox from "../../../components/CardBox";
import SectionMain from '../../../components/SectionMain'
import {RootState, useStoreDispatch} from "../../../stores/store";
import {getCategoryAction} from "../../../stores/category/CategoryStore";
import {useSelector} from "react-redux";
import Link from "next/link";
import BaseButtons from "../../../components/BaseButtons";
import {useRouter} from "next/router";
import BaseIcon from "../../../components/BaseIcon";
import {Category} from "../../../api/categories/GetCategoryApi";
import {deleteCategoryApi} from "../../../api/categories/DeleteCategoryApi";
import Image from "next/image";

const Categories = () => {
  const dispatch = useStoreDispatch();
  const categoryData = useSelector((state: RootState) => state.category)
  const router = useRouter()
  const [pages, setPages] = useState(0)
  const [current, setCurrent] = useState(0)
  const {limit, total, offset} = categoryData.meta

  useEffect(() => {
    dispatch(getCategoryAction({limit: 10, parentUuid: router.query.id}))
  }, [router.query.id])

  useEffect(() => {
    setPages(limit === 0 && total === 0 ? 0 : Math.ceil(total / limit))
    setCurrent(limit === 0 && offset === 0 ? 0 : Math.abs(offset / limit))
  }, [limit, total, offset])

  const setCurrentPage = (page: number) => {
    dispatch(getCategoryAction({limit: 10, offset: Math.ceil(page * 2 ), parentUuid: router.query.id}))
  }

  const deleteCatalog = (category: Category) => {
    const agree = window.confirm(`Вы действительно хотите удалить ${category.name}?`)
    if (agree) {
      deleteCategoryApi(category.uuid).then(res => {
        dispatch(getCategoryAction({limit: 10, parentUuid: router.query.id}))
      })
    }
  }

  return (
    <>

      <Head>
        <title>{getPageTitle('Категории')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiTableBorder} title="Категории" main>
          <BaseButton
            href={`/content/categories/create?p=${router.query.id}`}
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
                    <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                      <td className="whitespace-nowrap px-6 py-3 font-medium">...</td>
                      <td className="whitespace-nowrap px-6 py-3 underline">
                        <Link href={`/content/categories/${categoryData.meta.additional.parent || ''}`}>
                          <BaseIcon path={mdiFolderHomeOutline} size={26}/>
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-6 py-3"></td>
                      <td className="whitespace-nowrap px-6 py-3"></td>
                      <td className="whitespace-nowrap px-6 py-3"></td>
                    </tr>
                    {categoryData.data.map((catalog, key) => (
                      <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                          key={key}>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">{key + 1}</td>
                        <td className="whitespace-nowrap px-6 py-4 underline">
                          <Link href={`/content/categories/${catalog.uuid}`}>{catalog.name}</Link>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">{catalog.slug}</td>
                        <td className="whitespace-nowrap px-6 py-1">
                          {catalog.icon ? (<Image src={catalog.icon.file} alt={catalog.icon.name} width={50} height={50}/>) : ''}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <BaseButtons>
                            <BaseButton
                              href={`/content/categories/${catalog.uuid}/edit`}
                              icon={mdiPencil}
                              color="info"
                              small
                            />
                            <BaseButton
                              onClick={() => deleteCatalog(catalog)}
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
                        {Array(pages).fill(0).map((item, page) => (
                          <BaseButton
                            key={page}
                            active={page === current}
                            label={page + 1}
                            color={page === current ? 'lightDark' : 'whiteDark'}
                            small
                            onClick={() => setCurrentPage(page)}/>
                        ))}
                      </BaseButtons>
                      <small className="mt-6 md:mt-0">
                        Page {current + 1} of {pages}
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