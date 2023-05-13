import React, {ReactElement} from 'react';
import LayoutAuthenticated from "../../../layouts/Authenticated";
import CardBoxModal from "../../../components/CardBoxModal";
import Head from "next/head";
import {getPageTitle} from "../../../config";
import SectionTitleLineWithButton from "../../../components/SectionTitleLineWithButton";
import {mdiGithub, mdiMonitorCellphone, mdiTableBorder, mdiTableOff, mdiPlus} from "@mdi/js";
import BaseButton from "../../../components/BaseButton";
import NotificationBar from "../../../components/NotificationBar";
import CardBox from "../../../components/CardBox";
import CardBoxComponentEmpty from "../../../components/CardBoxComponentEmpty";
import SectionMain from '../../../components/SectionMain'

const Categories = () => {
  return (
    <>

      <Head>
        <title>{getPageTitle('Категории')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiTableBorder} title="Категории" main>
          <BaseButton
            href="/content/categories/create"
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
                    <tr className="border-b dark:border-neutral-500">
                      <td className="whitespace-nowrap px-6 py-4 font-medium">1</td>
                      <td className="whitespace-nowrap px-6 py-4">Cell</td>
                      <td className="whitespace-nowrap px-6 py-4">Cell</td>
                      <td className="whitespace-nowrap px-6 py-4">Cell</td>
                      <td className="whitespace-nowrap px-6 py-4">

                      </td>
                    </tr>
                    <tr className="border-b dark:border-neutral-500">
                      <td className="whitespace-nowrap px-6 py-4 font-medium ">2</td>
                      <td className="whitespace-nowrap px-6 py-4">Cell</td>
                      <td className="whitespace-nowrap px-6 py-4">Cell</td>
                      <td className="whitespace-nowrap px-6 py-4">Cell</td>
                      <td className="whitespace-nowrap px-6 py-4">

                      </td>
                    </tr>
                    <tr className="border-b dark:border-neutral-500">
                      <td className="whitespace-nowrap px-6 py-4 font-medium ">3</td>
                      <td className="whitespace-nowrap px-6 py-4">Cell</td>
                      <td className="whitespace-nowrap px-6 py-4">Cell</td>
                      <td className="whitespace-nowrap px-6 py-4">Cell</td>
                      <td className="whitespace-nowrap px-6 py-4">

                      </td>
                    </tr>
                    </tbody>
                  </table>
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