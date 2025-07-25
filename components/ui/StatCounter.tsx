import { useCountUpOnView } from "@/hooks/use-countup";

interface StatData {
    title: string;
    count: number;
}

export default function StatCounter({
    duration = 2,
    StatData,
    lightColor,
    darkColor
}: {
    duration?: number,
    StatData: StatData[],
    lightColor?: string,
    darkColor?: string
}) {
    const count1 = useCountUpOnView(StatData[0].count, duration);
    const count2 = useCountUpOnView(StatData[1].count, duration);
    const count3 = useCountUpOnView(StatData[2].count, duration);

    // Helper function to get border color with opacity
    const getBorderColor = () => {
        if (darkColor) {
            return darkColor + '26'; // Add 15% opacity in hex
        }
        return undefined; // Use default Tailwind classes
    };

    // Helper function to get background color with opacity
    const getBackgroundColor = () => {
        if (lightColor) {
            return lightColor;
        }
        return undefined; // Use default Tailwind classes
    };

    return (
        <div
            className={`col-span-full md:col-span-10 md:col-start-2 md:grid grid-cols-10 gap-4 md:gap-8 font-neulisneue items-center 
                flex flex-col max-md:px-4
                ${darkColor ? '' : 'text-primary-900'}`
            }
            style={darkColor ? { color: darkColor } : {}}
        >
            <div
                className={`max-md:w-fit md:col-span-3  max-md:pt-10 md:pb-10 flex flex-col gap-5 md:gap-9 rounded-[45px] md:rounded-[60px] border text-center overflow-hidden ${!darkColor && !lightColor ? 'border-primary-900/15 bg-primary-200' : ''
                    }`}
                style={{
                    borderColor: getBorderColor(),
                    backgroundColor: getBackgroundColor()
                }}
            >
                <div className={`flex md:order-1 order-2 flex-col gap-3 w-full text-xl md:text-2xl px-12 md:px-8 pt-6 max-md:py-6
                    ${!darkColor ? 'bg-primary-500/15' : ''}`}
                    style={darkColor ? { backgroundColor: darkColor + '26' } : {}}
                >
                    <p className="opacity-50 font-neulisneue leading-tight ">{StatData[0].title}</p>
                    <div className={`max-md:hidden w-full rounded-full  h-[2px] 
                        ${!darkColor ? 'bg-primary-900/25' : ''}`}
                        style={darkColor ? { backgroundColor: darkColor + '19' } : {}} />
                </div>
                <div
                    ref={count1.ref}
                    className="md:order-2 order-1 text-5xl md:text-7xl font-neulissans font-medium tracking-tighter"
                    style={darkColor ? { color: darkColor } : {}}
                >
                    {count1.count}+
                </div>
            </div>

            <div
                className={`max-md:w-full md:col-span-4  max-md:pt-10 md:pb-10 flex flex-col gap-5 md:gap-9 rounded-[45px] md:rounded-[60px] border text-center overflow-hidden ${!darkColor && !lightColor ? 'border-primary-900/15 bg-primary-200' : ''
                    }`}
                style={{
                    borderColor: getBorderColor(),
                    backgroundColor: getBackgroundColor()
                }}
            >
                <div className={`flex md:order-1 order-2 flex-col gap-3 w-full text-xl md:text-2xl px-12 md:px-8 pt-6 max-md:py-6
                    ${!darkColor ? 'bg-primary-500/15' : ''}`}
                    style={darkColor ? { backgroundColor: darkColor + '26' } : {}}
                >
                    <p className="opacity-50 font-neulisneue leading-tight ">{StatData[1].title}</p>
                    <div className={`max-md:hidden w-full rounded-full  h-[2px] 
                        ${!darkColor ? 'bg-primary-900/25' : ''}`}
                        style={darkColor ? { backgroundColor: darkColor + '19' } : {}} />
                </div>
                <div
                    ref={count2.ref}
                    className="md:order-2 order-1 text-5xl md:text-7xl font-neulissans font-medium tracking-tighter"
                    style={darkColor ? { color: darkColor } : {}}
                >
                    {count2.count}+
                </div>
            </div>

            <div
                className={`max-md:w-fit md:col-span-3  max-md:pt-10 md:pb-10 flex flex-col gap-5 md:gap-9 rounded-[45px] md:rounded-[60px] border text-center overflow-hidden ${!darkColor && !lightColor ? 'border-primary-900/15 bg-primary-200' : ''
                    }`}
                style={{
                    borderColor: getBorderColor(),
                    backgroundColor: getBackgroundColor()
                }}
            >
                <div className={`flex md:order-1 order-2 flex-col gap-3 w-full text-xl md:text-2xl px-12 md:px-8 pt-6 max-md:py-6
                    ${!darkColor ? 'bg-primary-500/15' : ''}`}
                    style={darkColor ? { backgroundColor: darkColor + '26' } : {}}
                >
                    <p className="opacity-50 font-neulisneue leading-tight ">{StatData[2].title}</p>
                    <div className={`max-md:hidden w-full rounded-full  h-[2px] 
                        ${!darkColor ? 'bg-primary-900/25' : ''}`}
                        style={darkColor ? { backgroundColor: darkColor + '19' } : {}} />
                </div>
                <div
                    ref={count3.ref}
                    className="md:order-2 order-1 text-5xl md:text-7xl font-neulissans font-medium tracking-tighter"
                    style={darkColor ? { color: darkColor } : {}}
                >
                    {count3.count}+
                </div>
            </div>
        </div>
    );
}