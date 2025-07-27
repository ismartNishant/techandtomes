
import { HiOutlineUser } from "react-icons/hi2";
import React from 'react'
import { BsBarChartSteps } from "react-icons/bs";
import { BsHandbag } from "react-icons/bs";
import { TbBrightness } from 'react-icons/tb';
import StatCard from '@/components/common/cards/StatCard';
import {ChartSkinTypeDistribution }from '@/components/common/charts/ChartSkinTypeDistribution';
import { AgeDistribution} from '@/components/common/charts/AgeDistribution';
import { GenderDistribution } from '@/components/common/charts/GenderDistribution';
import SurveyTable  from '@/components/common/Tables/SurveyTable';
const Dashboard = () => {
    return (
        <div className=' space-y-6'>
            <div className=' gap-2 grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
                <StatCard
                    title="Active Users"
                    value="1,250"
                    icon={<HiOutlineUser className="w-10 h-10" />}
                    accentColor="bg-[#fbd7e0] dark:bg-secondary"
                    barColor="bg-secondary/70"
                />
                <StatCard
                    title="Number of Routines"
                    value="3,450"
                    icon={<BsBarChartSteps className="w-10 h-10" />}
                    accentColor="bg-violet-200 dark:bg-violet-500"
                    barColor="bg-violet-300 "
                />
                <StatCard
                    title="Avg Routines per User"
                    value="1.7"
                    icon={<TbBrightness className="w-10 h-10" />}
                    accentColor="bg-[#fbd7e0] dark:bg-secondary"
                    barColor="bg-secondary"
                />
                <StatCard
                    title="Avg Products of Routines"
                    value="4.3"
                    icon={<BsHandbag className="w-10 h-10" />}
                    accentColor="bg-blue-200 dark:bg-blue-500"
                    barColor="bg-blue-300 "
                />
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                <GenderDistribution />
                <AgeDistribution />
                <ChartSkinTypeDistribution />
            </div>
            <SurveyTable />
        </div>
    )
}

export default Dashboard