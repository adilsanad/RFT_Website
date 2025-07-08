import { useCountUpOnView } from "@/hooks/use-countup";
interface StatData {
    title: string;
    count: number;
}
export default function StatCounter({duration = 2, StatData}: {duration?: number, StatData: StatData[]}) {

    const count1 = useCountUpOnView(StatData[0].count, duration);
    const count2 = useCountUpOnView(StatData[1].count, duration);
    const count3 = useCountUpOnView(StatData[2].count, duration);

    return (
        <div className="col-span-10 col-start-2 grid grid-cols-10 gap-8 font-neulisneue text-primary-900">
            <div className="col-span-3 pb-10 flex flex-col gap-9 bg-primary-200 rounded-[60px] border border-primary-900/15 text-center overflow-hidden">
                <div className="flex flex-col gap-3 w-full bg-primary-500/15 text-2xl px-8 pt-6">
                    <p className="opacity-50">projects executed</p>
                    <div className="w-full rounded-full bg-primary-900/25 h-[2px]" />
                </div>
                <div ref={count1.ref} className="text-7xl font-medium tracking-tighter ">{count1.count}+</div>
            </div>
            <div className="col-span-4 pb-10 flex flex-col gap-9 bg-primary-200 rounded-[60px] border border-primary-900/15 text-center overflow-hidden">
                <div className="flex flex-col gap-3 w-full bg-primary-500/15 text-2xl px-8 pt-6">
                    <p className="opacity-50">gallons of water saved</p>
                    <div className="w-full rounded-full bg-primary-900/25 h-[2px]" />
                </div>
                <div ref={count2.ref} className="text-7xl font-medium tracking-tighter ">{count2.count}</div>
            </div>
            <div className="col-span-3 pb-10 flex flex-col gap-9 bg-primary-200 rounded-[60px] border border-primary-900/15 text-center overflow-hidden">
                <div className="flex flex-col gap-3 w-full bg-primary-500/15 text-2xl px-8 pt-6">
                    <p className="opacity-50">products sold</p>
                    <div className="w-full rounded-full bg-primary-900/25 h-[2px]" />
                </div>
                <div ref={count3.ref} className="text-7xl font-medium tracking-tighter ">{count3.count}+</div>
            </div>
        </div>
    );
}