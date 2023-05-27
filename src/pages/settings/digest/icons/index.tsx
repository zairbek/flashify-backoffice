import React, {ReactElement, useEffect, useState} from 'react';
import LayoutAuthenticated from "../../../../layouts/Authenticated";
import Head from "next/head";
import {getPageTitle} from "../../../../config";
import SectionMain from "../../../../components/SectionMain";
import SectionTitleLineWithButton from "../../../../components/SectionTitleLineWithButton";
import {mdiPencil, mdiPlus, mdiTableBorder, mdiTrashCan} from "@mdi/js";
import BaseButton from "../../../../components/BaseButton";
import CardBox from "../../../../components/CardBox";
import Link from "next/link";
import BaseButtons from "../../../../components/BaseButtons";
import {RootState, useStoreDispatch} from "../../../../stores/store";
import {useSelector} from "react-redux";
import {getIconAction} from "../../../../stores/icon/IconStore";
import Image from "next/image";
import {deleteIconApi} from "../../../../api/icons/DeleteIconApi";
import {Icon} from "../../../../api/icons/GetIconApi";

const IconsIndex = () => {
  const dispatch = useStoreDispatch();
  const iconData = useSelector((state: RootState) => state.icon)
  const [pages, setPages] = useState<number>(0)
  const [current, setCurrent] = useState<number>(0)

  useEffect(() => {
    dispatch(getIconAction({limit: 10})).then(res => {
      setPages(Math.ceil(res.payload.meta.total / res.payload.meta.limit))
      setCurrent(Math.abs(res.payload.meta.offset / res.payload.meta.limit))
    })
  }, [])

  const setCurrentPage = (page: number) => {
    dispatch(getIconAction({limit: 10, offset: Math.ceil(page * 2 )})).then(res => {
      setPages(Math.ceil(res.payload.meta.total / res.payload.meta.limit))
      setCurrent(Math.abs(res.payload.meta.offset / res.payload.meta.limit))
    })
  }

  const deleteCatalog = (icon: Icon) => {
    const agree = window.confirm(`Вы действительно хотите удалить ${icon.name}?`)
    if (agree) {
      deleteIconApi(icon.uuid).then(res => {
        dispatch(getIconAction({limit: 10}))
      })
    }
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Категории')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiTableBorder} title="Иконки" main>
          <BaseButton
            href='/settings/digest/icons/create'
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
                      <th scope="col" className="px-6 py-4">Icon</th>
                      <th scope="col" className="px-6 py-4">Действие</th>
                    </tr>
                    </thead>
                    <tbody>
                    {iconData.data.map((icon, key) => (
                      <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                          key={key}>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">{key + 1}</td>
                        <td className="whitespace-nowrap px-6 py-4 underline">
                          <Link href={`/settings/digest/icons/${icon.uuid}`}>{icon.name}</Link>
                        </td>
                        <td className="whitespace-nowrap px-6 py-1">
                          <Image src={icon.file} alt={icon.name} width={50} height={50}/>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <BaseButtons>
                            <BaseButton
                              href={`/settings/digest/icons/${icon.uuid}/edit`}
                              icon={mdiPencil}
                              color="info"
                              small
                            />
                            <BaseButton
                              onClick={() => deleteCatalog(icon)}
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

IconsIndex.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default IconsIndex;