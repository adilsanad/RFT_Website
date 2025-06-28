import React from "react";

interface CardDetails {
    imgUrl: string;
    title: string;
}

const cardDetails: Record<number, CardDetails> = {
    0: {
        imgUrl: "https://picsum.photos/id/237/200/300",
        title: "Text 1"
    },

    1: {
        imgUrl: "https://picsum.photos/id/238/200/300",
        title: "Text 2"
    },

    2: {
        imgUrl: "https://picsum.photos/id/239/200/300",
        title: "Text 3"
    },

    3: {
        imgUrl: "https://picsum.photos/id/240/200/300",
        title: "Text 4"
    },

    4: {
        imgUrl: "https://picsum.photos/id/241/200/300",
        title: "Text 5"
    },

    5: {
        imgUrl: "https://picsum.photos/id/42/200/300",
        title: "Text 6"
    },

    6: {
        imgUrl: "https://picsum.photos/id/243/200/300",
        title: "Text 7",
    },


}
export default function AutoplayCarousel() {
    return (
        <div className="overflow-hidden relative h-full w-full border">
            <div style={{
                display: "flex",
                position: "absolute",
                left: 0,
                justifyContent: "center",
                alignItems: "center",
                height: "80px",
                gap: "16px",
                width: "200%",
            }}>
                {Object.keys(cardDetails).map((detailKey) => {
                    const key = Number(detailKey);
                    return (
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            height: "100%",
                            borderRadius: "20%",
                            background: "rgb(41, 40, 40)"
                        }} key={key}
                        >
                            <img src={cardDetails[key].imgUrl} alt={cardDetails[key].title}></img>
                        </div>
                    );
                })}
                {Object.keys(cardDetails).map((detailKey) => {
                    const key = Number(detailKey);
                    return (
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            height: "100%",
                            borderRadius: "20%",
                            background: "rgb(41, 40, 40)"
                        }}
                            key={`duplicate-${key}`}>
                            <img src={cardDetails[key].imgUrl} alt={cardDetails[key].title}></img>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}